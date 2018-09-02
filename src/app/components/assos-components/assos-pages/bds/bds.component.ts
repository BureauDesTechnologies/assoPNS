import {Component, OnInit} from "@angular/core";
import {ArticleService} from "../../../../services/article.service";
import {Article} from "../../../../models/article";

@Component({
    selector: 'app-bds',
    templateUrl: './bds.component.html',
    styleUrls: ['./bds.component.css']
})
export class BdsComponent implements OnInit {

    loading = true;
    articles: Article[];

    constructor(private articleService: ArticleService) {
    }

    async ngOnInit() {
        this.articles = await this.articleService.getAllArticlesOf('Bureau du Sport');
        this.loading = false;
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
}
