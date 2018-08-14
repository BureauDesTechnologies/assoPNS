import {Component, OnInit} from "@angular/core";
import {User} from "../../../models/user";
import {UserService} from "../../../services/user.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    userToConnect: User;
    hidePwd: boolean;

    constructor(private userService: UserService) {
    }

    ngOnInit() {
        this.hidePwd = true;
        this.userToConnect = new User('', '', '', '', [], [], '');
    }

    connect() {
        this.userService.tryConnect(this.userToConnect).then(_ => {
            this.userService.getLoggedUser().subscribe(user => {
                if (user !== null) {
                    location.href = '/';
                }
            });
        });
    }

}
