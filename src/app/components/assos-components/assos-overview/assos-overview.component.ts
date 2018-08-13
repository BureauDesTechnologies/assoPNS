import {Component, OnInit} from "@angular/core";
import {DomSanitizer} from "@angular/platform-browser";
import {MatIconRegistry} from "@angular/material";

@Component({
    selector: 'app-assos-overview',
    templateUrl: './assos-overview.component.html',
    styleUrls: ['./assos-overview.component.css']
})
export class AssosOverviewComponent implements OnInit {

    constructor(private icons: MatIconRegistry, private domSanitizer: DomSanitizer) {
        icons.addSvgIcon('hand_holding_heart',
            this.domSanitizer.bypassSecurityTrustResourceUrl("../../../../assets/icons/hand_holding_heart.svg"));
    }

    ngOnInit() {
    }

}
