import {Component, Input, OnInit} from "@angular/core";
import {ArticleComment} from "../../../models/article-comment";
import {UserService} from "../../../services/user.service";
import {isNullOrUndefined} from "util";
import {Emotes} from "../emotes";

export class CommentToken {
    type: CommentTokenType;
    data;

    constructor(type: CommentTokenType, data) {
        this.type = type;
        this.data = data;
    }
}

export enum CommentTokenType {
    LINE = 0,
    TEXT = 1,
    EMOTE = 2
}

@Component({
    selector: 'app-comment',
    templateUrl: './comment.component.html',
    styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

    @Input()
    comment: ArticleComment;

    tokens: CommentToken[];

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
        this.tokens = this.tokenize(this.comment);
    }

    getUrl() {
        return {
            'background-image': 'url(\'' + this.link + '\')'
        };
    }

    tokenize(comment: ArticleComment): CommentToken[] {
        const tokens: CommentToken[] = [];
        for (const line of comment.content.split('\n')) {
            tokens.push(new CommentToken(CommentTokenType.LINE, this.tokenizeLine(line)));
        }
        return tokens;
    }

    private tokenizeLine(lineIn: string): CommentToken[] {
        const tokens: CommentToken[] = [];
        let line = '';
        for (const word of lineIn.split(' ')) {
            if (Emotes.all.has(word)) {
                tokens.push(new CommentToken(CommentTokenType.TEXT, line));
                tokens.push(new CommentToken(CommentTokenType.EMOTE, {
                    text: word,
                    url: Emotes.all.get(word)
                }));
                line = '';
            } else {
                line += word + ' ';
            }
        }
        if (line.length > 0) {
            tokens.push(new CommentToken(CommentTokenType.TEXT, line));
        }
        return tokens;
    }

}
