import {Component, Input, OnInit} from "@angular/core";

@Component({
    selector: 'app-popup',
    templateUrl: './popup.component.html',
    styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

    @Input()
    text: string;

    isDisplayed = true;

    constructor() {
    }

    ngOnInit(): void {
    }

    close() {
        this.isDisplayed = false;
    }
}
