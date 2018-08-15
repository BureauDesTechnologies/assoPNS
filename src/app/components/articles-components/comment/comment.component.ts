import {Component, Input, OnInit} from "@angular/core";
import {ArticleComment} from "../../../models/article-comment";
import {UserService} from "../../../services/user.service";
import {isNullOrUndefined} from "util";

@Component({
    selector: 'app-comment',
    templateUrl: './comment.component.html',
    styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

    @Input()
    comment: ArticleComment;

    link: string;

    constructor(private userService: UserService) {
        this.link = 'assets/user_placeholder.png';
    }

    async ngOnInit() {
        if (!isNullOrUndefined(this.comment.author.photoUrl) && this.comment.author.photoUrl !== '') {
            // this.userService.getDownloadUrl(this.comment.author.photoUrl);
            if (!isNullOrUndefined(this.comment.author.downloadPhotoUrl) && this.comment.author.downloadPhotoUrl !== '') {
                this.link = this.comment.author.downloadPhotoUrl;
            } else {
                this.comment.author.downloadPhotoUrl = await this.userService.getDownloadUrl(this.comment.author.photoUrl);
                this.link = this.comment.author.downloadPhotoUrl;
            }
        }
    }

    getUrl() {
        return {
            'background-image': 'url(\'' + this.link + '\')'
        };
    }

}
