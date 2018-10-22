import {ChangeDetectorRef, Component, OnInit} from "@angular/core";
import {User} from "../../../models/user";
import {UserService} from "../../../services/user.service";
import {MatSnackBar} from "@angular/material";

@Component({
    selector: 'app-subscribe-to',
    templateUrl: './subscribe-to.component.html',
    styleUrls: ['./subscribe-to.component.css']
})
export class SubscribeToComponent implements OnInit {


    subscriptions: string[];
    user: User;

    assos: string[] = [
        "Bureau du Code",
        "Bureau des Jeux",
        "Bureau des Élèves",
        "Bureau du Sport",
        "Bureau de l'Humanitaire et de l'Environnement",
        "Bureau des Arts",
        "Polytech Nice Conseil"
    ];

    constructor(private userService: UserService, private ref: ChangeDetectorRef, private snackbar: MatSnackBar) {
    }

    ngOnInit() {
        this.subscriptions = [];
        this.userService.getLoggedUser().subscribe(async user => {
            if (user === null && this.user != null) { // Disconnect
                this.user = null;
            } else {
                this.user = user;
                if (this.user !== null) {
                    this.subscriptions = this.user.subscriptions;
                }
            }
            this.ref.detectChanges();
        });
    }

    validate() {
        this.user.subscriptions = this.subscriptions;
        this.userService.updateSubscriptions(this.user).then(() => {
            this.snackbar.open('Vos abonnements ont été mis à jour', null, {duration: 1500});
        });
    }

    changeSubscription(asso, event) {
        if (event.checked) {
            this.subscriptions.push(asso);
        } else {
            const aux: string[] = [];
            for (const subscriptionsC of this.subscriptions) {
                if (subscriptionsC !== asso) {
                    aux.push(subscriptionsC);
                }
            }
            this.subscriptions = aux;
        }
    }
}
