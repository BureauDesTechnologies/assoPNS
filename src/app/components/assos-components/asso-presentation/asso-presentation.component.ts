import {Component, Input, OnInit} from "@angular/core";

@Component({
    selector: 'app-asso-presentation',
    templateUrl: './asso-presentation.component.html',
    styleUrls: ['./asso-presentation.component.css']
})
export class AssoPresentationComponent implements OnInit {
    @Input()
    name: string;
    /**
     * Default : doesn't align but justify text
     */
    @Input()
    align: 'left' | 'right' | 'justify';
    @Input()
    descriptions: string[];
    @Input()
    contact: string;
    /**
     * Default '', doesn't display if not supplied
     */
    @Input()
    logo: string;

    constructor() {
        this.name = '';
        this.descriptions = [];
        this.contact = '';
        this.logo = '';
        this.align = 'justify';
    }

    ngOnInit() {
    }

}
