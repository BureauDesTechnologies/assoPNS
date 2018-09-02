import {ChangeDetectorRef, Component, Inject, OnInit} from "@angular/core";
import {User} from "../../../models/user";
import {UserService} from "../../../services/user.service";
import {MAT_DIALOG_DATA, MatCheckboxChange, MatDialog, MatDialogRef, MatSnackBar} from "@angular/material";

@Component({
    selector: 'app-give-rights',
    templateUrl: './give-rights.component.html',
    styleUrls: ['./give-rights.component.css']
})
export class GiveRightsComponent implements OnInit {

    user: User;

    loading: boolean;
    private dialogRef;

    constructor(private userService: UserService, private ref: ChangeDetectorRef,
                private dialog: MatDialog, private snackBar: MatSnackBar) {
        this.user = new User('', '', '', '', [], [], 'placeholder');
        this.loading = true;
    }

    ngOnInit() {
        this.userService.getLoggedUser().subscribe(user => {
            if (this.user.userId === 'placeholder' && user === null) {
                return;
            }
            this.user = user;
            this.loading = false;
            console.log("updated");
            this.ref.detectChanges();
        });
    }

    selectUser(user: User) {
        this.dialogRef = this.dialog.open(DialogGiveRightsComponent, {
            maxWidth: '600px',
            minWidth: '200px',
            data: {user: user, userConnected: this.user}
        });
        this.dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.snackBar.open('Cet utilisateur peut désormais publier comme défini', null, {duration: 2500});
            }
        });
    }
}

export interface DialogData {
    user: User;
    userConnected: User;
}

@Component({
    selector: 'app-dialog-give-rights',
    templateUrl: 'give-rights.dialog.html',
})
export class DialogGiveRightsComponent {

    user: User;
    userConnected: User;

    private giveRights: string[] = [];
    hasOnlyChoice;

    constructor(public dialogRef: MatDialogRef<DialogGiveRightsComponent>,
                private userService: UserService,
                @Inject(MAT_DIALOG_DATA) public data: DialogData) {
        this.user = data.user;
        this.userConnected = data.userConnected;
        this.hasOnlyChoice = this.userConnected.canPublishAs.length === 1;
        if (this.hasOnlyChoice) {
            this.giveRights.push(this.userConnected.canPublishAs[0]);
        }
    }

    changeRight(right: string, event: MatCheckboxChange) {
        if (event.checked) {
            this.giveRights.push(right);
        } else {
            const aux: string[] = [];
            for (const rightC of this.giveRights) {
                if (rightC !== right) {
                    aux.push(rightC);
                }
            }
            this.giveRights = aux;
        }
    }

    validate() {
        this.userService.addRightsToPublish(this.user, this.giveRights).then(_ => {
            this.dialogRef.close(true);
        });
    }
}

