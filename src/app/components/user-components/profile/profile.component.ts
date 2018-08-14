import {ChangeDetectorRef, Component, OnInit} from "@angular/core";
import {User} from "../../../models/user";
import {UserService} from "../../../services/user.service";
import {MatSnackBar} from "@angular/material";
import {isNullOrUndefined} from "util";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    /**
     * Used as a placeholder
     */
    defaultImageUrl = 'https://scontent-cdg2-1.xx.fbcdn.net/v/t1.0-9/36726886_1687340718058441_5442986713913753600_n.jpg' +
        '?_nc_cat=0&oh=9b1fabee280eb257a34a9111259d903d&oe=5BE90E9D';
    user: User;
    url = this.defaultImageUrl;

    firstName = '';
    lastName = '';
    mail = '';

    constructor(private userService: UserService, private ref: ChangeDetectorRef, private snackBar: MatSnackBar) {
    }

    ngOnInit() {
        this.userService.getLoggedUser().subscribe(user => {
            if (user === null && this.user != null) { // Disconnect
                this.user = null;
            } else {
                this.user = user;
                if (user !== null) {
                    this.firstName = this.user.firstName;
                    this.lastName = this.user.lastName;
                    this.mail = this.user.mail;
                    if (this.user.photoUrl !== '' && this.user.photoUrl !== null) {
                        if (isNullOrUndefined(this.user.downloadPhotoUrl)) {
                            this.userService.getDownloadUrl(this.user.photoUrl).subscribe(link => {
                                this.url = link;
                                this.user.downloadPhotoUrl = link;
                            });
                        } else {
                            this.url = this.user.downloadPhotoUrl;
                        }
                    }
                }
            }
            this.ref.detectChanges();
        });
    }

    getUrl() {
        return {
            'background-image': 'url(\'' + this.url + '\')'
        };
    }

    submitChanges() {
        const promises = [];
        if (this.user.firstName !== this.firstName) {
            promises.push(this.userService.updateFirstName(this.user, this.firstName));
        }
        if (this.user.lastName !== this.lastName) {
            promises.push(this.userService.updateLastName(this.user, this.lastName));
        }
        if (this.user.mail !== this.mail) {
            promises.push(this.userService.updateMailOfConnectedUser(this.mail));
        }

        Promise.all(promises).then(res => {
            this.user.firstName = this.firstName;
            this.user.lastName = this.lastName;
            this.user.mail = this.mail;
            this.snackBar.open('Les modifications ont bien été prises en compte.', null, {
                duration: 2500,
            });
        });
    }
}
