import {Component, OnInit} from "@angular/core";
import {UserService} from "../../services/user.service";
import {User} from "../../models/user";
import {Router, RoutesRecognized} from "@angular/router";
import {PopupService} from "../../services/popup.service";

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

    isLogged = false;

    constructor(private userService: UserService, private popupService: PopupService,
                private router: Router) {
        this.currentRoute = '';
        this.mobileMenuOpened = false;
        this.displayAssosPages = false;
    }

    async ngOnInit() {
        this.router.events.subscribe(event => {
            if (event instanceof RoutesRecognized) {
                this.currentRoute = event.url;
            }
        });

        this.connectedUser = await this.userService.getLoggedUser();
        if (this.connectedUser !== null) {
            this.isLogged = true;
        }
        (await this.userService.streamLoggedUser()).subscribe(user => {
            if (user === null && this.connectedUser !== null) {
                // Disconnect from user
                this.isLogged = false;
                this.router.navigate(['/']);
            }
            this.connectedUser = user;
        });


        // Open popup to inform of cookie using
        if (localStorage.getItem("knowCookies") !== 'true') {
            setTimeout(() => {
                // Must open only if the user never said ok
                this.popupService.openCookiePopup();
            }, 1500);
        }
    }

    disconnect() {
        this.userService.disconnectUser();
    }
}
