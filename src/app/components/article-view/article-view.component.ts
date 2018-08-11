import {Component, Input, OnInit} from "@angular/core";
import {Article} from "../../models/article";

@Component({
    selector: 'app-article-view',
    templateUrl: './article-view.component.html',
    styleUrls: ['./article-view.component.css']
})
export class ArticleViewComponent implements OnInit {

    @Input()
    article: Article;

    /**
     * Enable to display asso Name in the detail view
     * Default : false
     */
    @Input()
    mustDisplayAssoName: boolean;

    constructor() {
        this.mustDisplayAssoName = false;
    }

    ngOnInit() {
    }

}
