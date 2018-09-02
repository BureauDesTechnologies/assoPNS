import {Component, EventEmitter, Inject, Input, OnInit, Output} from "@angular/core";
import {Article} from "../../../models/article";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatIconRegistry, MatSnackBar} from "@angular/material";
import {DomSanitizer} from "@angular/platform-browser";
import {UserService} from "../../../services/user.service";
import {User} from "../../../models/user";
import {isNullOrUndefined} from "util";
import {ArticleService} from "../../../services/article.service";
import {DialogGiveRightsComponent} from "../../user-components/give-rights/give-rights.component";

@Component({
    selector: 'app-article-view',
    templateUrl: './article-view.component.html',
    styleUrls: ['./article-view.component.css']
})
export class ArticleViewComponent implements OnInit {
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
    }

    /**
     * Display or hidePwd comment, only load once
     */
    displayOrHideComments() {
        if (!this.commentsLoaded) {
            this.articleService.loadComments(this.article).then(_ => {
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
            this.articleService.updateArticle(this.article).then(_ => {
                this.articleBase = new Article(this.article.id, this.article.title, this.article.content,
                    this.article.imageUrl, this.article.category, [], [], this.article.creation);
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