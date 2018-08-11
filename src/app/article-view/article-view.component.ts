import {Component, Input, OnInit} from "@angular/core";
import {Article} from "../models/article";

@Component({
    selector: 'app-article-view',
    templateUrl: './article-view.component.html',
    styleUrls: ['./article-view.component.css']
})
export class ArticleViewComponent implements OnInit {

    @Input()
    article: Article;

    constructor() {
    }

    ngOnInit() {
    }

}
