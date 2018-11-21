import {Component, OnInit} from "@angular/core";
import {ArticleService} from "../../../services/article.service";
import {Article} from "../../../models/article";
import {isNullOrUndefined} from "util";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    articles: Article[];

    constructor(private articleService: ArticleService) {
    }

    async ngOnInit() {
        this.articles = [];
        this.articleService.streamLastArticles(articles => {
            articles.forEach(async article => {
                const articleC = Article.fromDB(article);
                // If we didn't had this article yet, we load it, then we resort our list
                if (!this.articles.map(fromArticleToId => fromArticleToId.id).includes(articleC.id)) {
                    this.articles.push(articleC);
                    this.articles.sort((a, b) => b.creation.getTime() - a.creation.getTime());
                    if (!isNullOrUndefined(articleC.imageUrl) && articleC.imageUrl !== '') {
                        articleC.downloadableImageUrl = await this.articleService.getDownloadImageUrl(articleC);
                    }
                } else {
                    // This is just to redraw clap, fav and coms count,
                    // we don't need to reload comments because this is only for a dashboard
                    const articleToModify = this.getArticleById(articleC.id);
                    articleToModify.clap = articleC.clap;
                    articleToModify.favorite = articleC.favorite;
                    if (articleToModify.commentsCount !== articleC.commentsCount) {
                        articleToModify.commentsCount = articleC.commentsCount;
                        await this.articleService.loadComments(articleToModify);
                    }
                }
            });
        });
    }

    /**
     * Use to remove article from current list when has been deleted (the trigger only triggers when true)
     * @param {article} article
     */
    remove(article: Article) {
        const newList = [];
        for (let i = 0; i < this.articles.length; ++i) {
            if (this.articles[i].id !== article.id) {
                newList.push(this.articles[i]);
            }
        }
        this.articles = newList;
    }

    private getArticleById(id: string): Article {
        for (let i = 0; i < this.articles.length; ++i) {
            if (this.articles[i].id === id) {
                return this.articles[i];
            }
        }
    }

}
