import {Injectable} from "@angular/core";
import {PopupComponent} from "../components/popup/popup.component";
import {MatSnackBar} from "@angular/material";

/**
 * This class contains all functions used to manage users
 */
@Injectable()
export class PopupService {
    private currentPopup: any = null;

    constructor(private snackbar: MatSnackBar) {
    }

    openCookiePopup() {
        this.currentPopup = this.snackbar.openFromComponent<PopupComponent>(PopupComponent, {
            duration: 600000,
            panelClass: 'popupSnackBar',
            horizontalPosition: 'right',
        });
        this.currentPopup.instance.text = "Nous utilisons des cookies pour améliorer votre navigation, " +
            "pour en savoir plus, consultez les conditions d'utilisation.";
        this.currentPopup.instance.validateLabel = "OK";
    }


    open(text: string, duration: number) {
        this.currentPopup = this.snackbar.openFromComponent<PopupComponent>(PopupComponent, {
            duration: duration,
            panelClass: 'popupSnackBar',
            horizontalPosition: 'right',
        });
        this.currentPopup.instance.text = text;
    }

    close() {
        if (this.currentPopup === null) {
            return;
        }
        this.currentPopup.close();
        this.currentPopup = null;
    }
}
