import {Component, Input, OnInit} from "@angular/core";
import {User} from "../../../models/user";
import {Article} from "../../../models/article";

@Component({
    selector: 'app-add-article',
    templateUrl: './add-article.component.html',
    styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent implements OnInit {
    @Input()
    article;
    @Input()
    user: User;
    imageToDisplay: string;

    constructor() {
        this.imageToDisplay = '';
        this.article =
            new Article(null, "", "", "", "", [], [], null);

    }

    ngOnInit() {
    }
}
