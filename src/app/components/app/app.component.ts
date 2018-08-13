import {ChangeDetectorRef, Component, OnInit} from "@angular/core";
import {UserService} from "../../services/user.service";
import {User} from "../../models/user";
import {Router, RoutesRecognized} from "@angular/router";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    connectedUser: User;

    currentRoute: string;

    mobileMenuOpened: boolean;
    displayAssosPages: boolean;

    constructor(private userService: UserService, private ref: ChangeDetectorRef, private route: Router) {
        this.currentRoute = '';
        this.mobileMenuOpened = false;
        this.displayAssosPages = false;
    }

    ngOnInit() {
        this.route.events.subscribe(event => {
            if (event instanceof RoutesRecognized) {
                this.currentRoute = event.url;
            }
        });
        this.ref.reattach();
        this.userService.getLoggedUser().subscribe(user => {
            this.connectedUser = user;
            this.ref.detectChanges();
        });
    }

    disconnect() {
        this.userService.disconnectUser();
    }
}
