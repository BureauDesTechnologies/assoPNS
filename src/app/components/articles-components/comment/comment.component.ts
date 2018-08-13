import {Component, Input, OnInit} from "@angular/core";
import {ArticleComment} from "../../../models/article-comment";

@Component({
    selector: 'app-comment',
    templateUrl: './comment.component.html',
    styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

    @Input()
    comment: ArticleComment;

    constructor() {
    }

    ngOnInit() {
        this.comment.date = Date.now();
    }

}
