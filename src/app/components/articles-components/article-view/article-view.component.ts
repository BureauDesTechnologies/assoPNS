import {Component, Input, OnInit} from "@angular/core";
import {Article} from "../../../models/article";
import {MatIconRegistry} from "@angular/material";
import {DomSanitizer} from "@angular/platform-browser";
import {UserService} from "../../../services/user.service";
import {User} from "../../../models/user";
import {isNullOrUndefined} from "util";
import {ArticleService} from "../../../services/article.service";

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

    connectedUser: User = null;

    hasBeenFav: boolean;
    hasBeenClap: boolean;
    commentsLoaded: boolean;

    constructor(private userService: UserService, private articleService: ArticleService,
                private icons: MatIconRegistry, private domSanitizer: DomSanitizer) {
        this.mustDisplayAssoName = false;
        this.hasBeenFav = false;
        this.hasBeenClap = false;
        this.commentsLoaded = false;
        icons.addSvgIcon('clap',
            this.domSanitizer.bypassSecurityTrustResourceUrl("../../../../assets/icons/clap.svg"));
        icons.addSvgIcon('clap_outlined',
            this.domSanitizer.bypassSecurityTrustResourceUrl("../../../../assets/icons/clap_outlined.svg"));
    }

    ngOnInit() {
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

    loadCommentsAndDisplay() {
        this.articleService.loadComments(this.article).then(_ => {
            this.commentsLoaded = true;
        });
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

}
