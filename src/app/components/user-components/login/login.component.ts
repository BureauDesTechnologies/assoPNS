import {Component, OnInit} from "@angular/core";
import {User} from "../../../models/user";
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    userToConnect: User;
    hidePwd: boolean;

    constructor(private userService: UserService, private router: Router) {
    }

    ngOnInit() {
        this.hidePwd = true;
        this.userToConnect = new User('', '', '', '', [], [], '');
    }

    connect() {
        this.userService.tryConnect(this.userToConnect).then(_ => {
            this.userService.getLoggedUser().subscribe(user => {
                if (user !== null) {
                    this.router.navigate(['/']);
                }
            });
        });
    }

}
