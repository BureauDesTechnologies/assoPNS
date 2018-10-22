import {Component, EventEmitter, Inject, Input, OnInit, Output} from "@angular/core";
import {Article} from "../../../models/article";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatIconRegistry, MatSnackBar} from "@angular/material";
import {DomSanitizer} from "@angular/platform-browser";
import {UserService} from "../../../services/user.service";
import {User} from "../../../models/user";
import {isNullOrUndefined} from "util";
import {ArticleService} from "../../../services/article.service";
import {DialogGiveRightsComponent} from "../../user-components/give-rights/give-rights.component";

export class ArticleToken {
    type: TokenType;
    data;

    constructor(type: TokenType, data: ArticleToken[] | string | null) {
        this.type = type;
        this.data = data;
    }
}

export enum TokenType {
    LINE = 0,
    TEXT = 1,
    EMOTE = 2
}

@Component({
    selector: 'app-article-view',
    templateUrl: './article-view.component.html',
    styleUrls: ['./article-view.component.css']
})
export class ArticleViewComponent implements OnInit {

    /**
     * First element is the emote text, second is the link of the img to display
     * @type {MapConstructor<string, string>}
     */
    private static emotes: Map<string, string> = new Map(
        [
            [':)', 'assets/emotes/smile.png'],
            [':D', 'assets/emotes/big_smile.png']
        ]
    );

    @Input()
    article: Article;

    articleBase: Article;

    /**
     * Enable to display asso Name in the detail view
     * Default : false
     */
    @Input()
    mustDisplayAssoName: boolean;

    @Output()
    hasBeenDeleted = new EventEmitter<boolean>();

    connectedUser: User = null;

    editable = false;
    editing = false;

    hasBeenFav: boolean;
    hasBeenClap: boolean;
    commentsLoaded: boolean;

    hideComments = true;

    writtenComment: string;

    tokens;

    constructor(private userService: UserService, private articleService: ArticleService,
                private icons: MatIconRegistry, private domSanitizer: DomSanitizer,
                private dialog: MatDialog, private snackbar: MatSnackBar) {
        this.mustDisplayAssoName = false;
        this.hasBeenFav = false;
        this.hasBeenClap = false;
        this.commentsLoaded = false;
        this.writtenComment = '';
        icons.addSvgIcon('clap',
            this.domSanitizer.bypassSecurityTrustResourceUrl("../../../../assets/icons/clap.svg"));
        icons.addSvgIcon('clap_outlined',
            this.domSanitizer.bypassSecurityTrustResourceUrl("../../../../assets/icons/clap_outlined.svg"));
    }

    ngOnInit() {
        this.articleBase = new Article(this.article.id, this.article.title, this.article.content,
            this.article.imageUrl, this.article.category, [], [], this.article.creation);
        this.userService.getLoggedUser().subscribe(user => {
            this.connectedUser = user;
            if (this.connectedUser === null) {
                return;
            }
            if (this.article.clap.has(this.connectedUser.userId)) {
                this.hasBeenClap = true;
            }
            if (this.article.favorite.has(this.connectedUser.userId)) {
                this.hasBeenFav = true;
            }
        });
        this.tokens = this.tokenize(this.article);
    }

    /**
     * Display or hidePwd comment, only load once
     */
    displayOrHideComments() {
        if (!this.commentsLoaded) {
            this.articleService.loadComments(this.article).then(() => {
                this.commentsLoaded = true;
                this.hideComments = false;
            });
        } else {
            this.hideComments = !this.hideComments;
        }
    }

    favArticle() {
        if (isNullOrUndefined(this.connectedUser)) {
            return;
        }
        this.hasBeenFav = true;
        this.articleService.favArticle(this.article, this.connectedUser);
    }

    clapArticle() {
        if (isNullOrUndefined(this.connectedUser)) {
            return;
        }
        this.hasBeenClap = true;
        this.articleService.clapArticle(this.article, this.connectedUser);
    }

    unfavArticle() {
        if (isNullOrUndefined(this.connectedUser)) {
            return;
        }
        this.hasBeenFav = false;
        this.articleService.unfavArticle(this.article, this.connectedUser);
    }

    unclapArticle() {
        if (isNullOrUndefined(this.connectedUser)) {
            return;
        }
        this.hasBeenClap = false;
        this.articleService.unclapArticle(this.article, this.connectedUser);
    }

    postComment() {
        this.articleService.postComment(this.article, this.connectedUser, this.writtenComment)
            .then(() => this.writtenComment = '');
    }

    edit() {
        this.editable = !this.editable;
        if (this.editable === false) {
            if (this.article.title === this.articleBase.title && this.article.content === this.articleBase.content) {
                return;
            }
            this.editing = true;
            this.articleService.updateArticle(this.article).then(() => {
                this.articleBase = new Article(this.article.id, this.article.title, this.article.content,
                    this.article.imageUrl, this.article.category, [], [], this.article.creation);
                this.tokens = this.tokenize(this.article);
                this.editing = false;
            });
        }
    }

    confirmDelete() {
        const dialogRef = this.dialog.open(DialogConfirmDeleteComponent, {
            maxWidth: '600px',
            minWidth: '200px',
            data: {article: this.article}
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.articleService.deleteArticle(this.article).then(() => {
                    this.snackbar.open("L'article a été supprimé", null, {duration: 1500});
                    this.hasBeenDeleted.emit(true);
                });
            }
        });
    }

    tokenize(article: Article): ArticleToken[] {
        const tokens: ArticleToken[] = [];
        for (const line of article.content.split('\n')) {
            tokens.push(new ArticleToken(TokenType.LINE, this.tokenizeLine(line)));
        }
        return tokens;
    }

    private tokenizeLine(lineIn: string): ArticleToken[] {
        const tokens: ArticleToken[] = [];
        let line = '';
        for (const word of lineIn.split(' ')) {
            if (ArticleViewComponent.emotes.has(word)) {
                tokens.push(new ArticleToken(TokenType.TEXT, line));
                tokens.push(new ArticleToken(TokenType.EMOTE, {
                    text: word,
                    url: ArticleViewComponent.emotes.get(word)
                }));
                line = '';
            } else {
                line += word + ' ';
            }
        }
        if (line.length > 0) {
            tokens.push(new ArticleToken(TokenType.TEXT, line));
        }
        return tokens;
    }
}

export interface DialogData {
    article: Article;
}

@Component({
    selector: 'app-dialog-confirm-delete',
    templateUrl: 'confirm-delete.dialog.html',
})
export class DialogConfirmDeleteComponent {

    article: Article;

    constructor(public dialogRef: MatDialogRef<DialogGiveRightsComponent>,
                @Inject(MAT_DIALOG_DATA) public data: DialogData) {
        this.article = data.article;
    }

    validate() {
        this.dialogRef.close(true);
    }

    cancel() {
        this.dialogRef.close(false);
    }
}
