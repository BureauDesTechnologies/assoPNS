/*
 * ................................................................................................................................
 *  . Copyright (c)
 *  .
 *  . The app.component.ts class was created by :
 *  . A.Bolot, O.Osgart, L.Oms and G.Peltier
 *  .
 *  . As part of the polygame project
 *  .
 *  . Last modified : 29/06/18 11:24
 *  .
 *  . Contact : idevedit@gmail.com
 *  ...............................................................................................................................
 *
 */

import {ChangeDetectorRef, Component, OnInit} from "@angular/core";
import {UserService} from "../../services/user.service";
import {User} from "../../models/user";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    connectedUser: User;

    constructor(private userService: UserService, private ref: ChangeDetectorRef) {
    }

    ngOnInit() {
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
