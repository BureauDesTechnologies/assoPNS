import {Injectable} from "@angular/core";
import {AngularFirestore} from "angularfire2/firestore";
import {AngularFireStorage} from "angularfire2/storage";
import {User} from "../models/user";
import {BehaviorSubject} from "rxjs";
import * as firebase from "firebase";
import {firestore} from "firebase";
import {Observable} from "rxjs-compat/Observable";
import {isNullOrUndefined} from "util";
import UserCredential = firebase.auth.UserCredential;

/**
 * This class contains all functions used to manage users
 */
@Injectable()
export class UserService {

    private readonly loggedUser: BehaviorSubject<User>;


    constructor(private st: AngularFireStorage, private db: AngularFirestore) {
        this.loggedUser = new BehaviorSubject(null);
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.getLoggedUserFromCache();
            }
        });
    }

    /**
     * Use this function to register the user in firebase
     * Will automatically register the user in your Users collection as well
     *
     * @param {User} user to register, you have to set user.mail and user.password
     * @returns {Promise<UserCredential>}
     */
    public registerUser(user: User): Promise<UserCredential> {
        return firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(user.mail, user.password)
            .then(res => {
                // register user in database when registered on firebase
                this.registerUserInDatabase(user, res.user.uid);
                return res;
            });
    }

    /**
     * Get firebase user is usefull to update thing such as password or to have his official display name
     *
     * @returns {firebase.User} User registered in firebase
     */
    public getLoggedFirebaseUser(): firebase.User {
        return firebase.auth().currentUser;
    }

    /**
     * You have to subscribe to this to use the logged in User
     *
     * If you intend to display this, you should use {@link ChangeDetectorRef}
     * and ChangeDetectorRef.detectChanges() in the subscribe method
     *
     * @returns {BehaviorSubject<User>} null if the user isn't logged in, a User otherwise
     */
    public getLoggedUser(): BehaviorSubject<User> {
        return this.loggedUser;
    }

    /**
     * Try to connect the User
     * Set the persistence of the data so you won't have to reconnect later manually
     *
     * @param {User} userToConnect, the mail and password must have been set
     * @returns Promise<void> to listen when user is connected then redirect him
     */
    tryConnect(userToConnect: User): Promise<void> {
        return firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            .then(() => {
                return firebase.auth().signInWithEmailAndPassword(userToConnect.mail, userToConnect.password).then(res => {
                    const docRef = this.db.collection('Users').doc(this.getLoggedFirebaseUser().uid).ref;
                    docRef.get().then((doc) => {
                        const user = User.fromDB(doc);
                        user.supplyWithFirebaseUser(firebase.auth().currentUser);
                        this.loggedUser.next(user);
                    });
                });
            })
            .catch((error) => {
                // Handle Errors here.
                console.error('Error while connecting');
            });
    }

    /**
     * Disconnect the user and clear cache
     */
    disconnectUser() {
        firebase.auth().signOut().then(() => {
            // Signout successful
            this.loggedUser.next(null);
        });
    }

    /**
     * Set the photo url of the user
     * Doesn't delete the lost url
     *
     * @param {User} user to update must have his id set
     * @param {string} link
     * @returns {Promise<void>}
     */
    updateUrlPhoto(user: User, link: string): Promise<void> {
        this.db.collection('Users').doc(user.userId).update({
            photoUrl: link
        });

        return firebase.auth().currentUser.updateProfile({
            displayName: this.getLoggedUser().value.lastName,
            photoURL: link
        });
    }

    /**
     * Get the photo URL used to display it
     *
     * @param {string} photoUrl
     * @returns {Observable<string>}
     */
    getDownloadUrl(photoUrl: string): Promise<string> {
        return this.st.ref(photoUrl).getDownloadURL().toPromise();
    }

    /**
     * Return the user from his id
     *
     * @param {string} userId
     * @returns {Promise<User>}
     */
    async getUser(userId: string): Promise<User> {
        return User.fromDB((await this.db.collection<User>('Users').doc(userId).ref.get()));
    }

    /**
     * get all users
     *
     * @returns {Promise<User[]>}
     */
    async getUsers(): Promise<User[]> {
        const result = [];
        const usersSnap = await firestore().collection('Users').get();
        usersSnap.forEach(user => {
            result.push(User.fromDB(user));
        });
        return result;
    }

    private updateLastConnection(userId: string) {
        const timestamp = firebase.firestore.FieldValue.serverTimestamp();
        this.db.collection('Users').doc(userId).update({
            lastConnection: timestamp,
        }).catch(error => {
            console.error('From userService.updateLastConnection : ' + error.toString());
        });
    }

    private getLoggedUserFromCache() {
        const docRef = this.db.collection('Users').doc(this.getLoggedFirebaseUser().uid).ref;
        docRef.get().then((doc) => {
            const user = User.fromDB(doc);
            user.supplyWithFirebaseUser(this.getLoggedFirebaseUser());
            this.loggedUser.next(user);
            this.updateLastConnection(user.userId);
        });
    }

    private registerUserInDatabase(user: User, uid: string) {
        const timestamp = firebase.firestore.FieldValue.serverTimestamp();
        this.db.collection('Users').doc(uid).ref.set({
            mail: user.mail,
            firstName: user.firstName,
            lastName: user.lastName,
            photoUrl: user.photoUrl,
            lastConnection: timestamp,
            registrationDate: timestamp,
            state: 0,
            roles: ['user']
        });
    }

    updateSubscriptions(user: User) {
        return this.db.collection('Users').doc(user.userId).update({
            'subscriptions': user.subscriptions
        });
    }

    updateFirstName(user: User, firstName: string) {
        return this.db.collection('Users').doc(user.userId).update({
            'firstName': firstName
        });
    }

    updateLastName(user: User, lastName: string) {
        return this.db.collection('Users').doc(user.userId).update({
            'lastName': lastName
        });
    }

    updateMailOfConnectedUser(mail: string) {
        const toUpdate = this.getLoggedFirebaseUser();
        return toUpdate.updateEmail(mail);
    }

    /**
     * Grant new permissions to User
     * @param user
     * @param rightsToGrant
     */
    async addRightsToPublish(user: User, rightsToGrant: string[]) {
        if (isNullOrUndefined(rightsToGrant) || rightsToGrant.length === 0) {
            throw Error("Vous essayez d'ajouter aucun droit ... Vérifiez votre utilisation");
        }
        const updatedUser: User = await this.getUser(user.userId);
        const totalRights: string[] = updatedUser.canPublishAs;
        const totalUniqueRights: string[] = totalRights.filter((x, i, a) => a.indexOf(x) === i);
        rightsToGrant.forEach(right => totalRights.push(right));
        return firestore().collection('Users').doc(user.userId).update({
            canPublishAs: totalUniqueRights
        });
    }
}
