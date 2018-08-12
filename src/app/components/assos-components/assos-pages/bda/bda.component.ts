import {Component, OnInit} from "@angular/core";
import {ArticleService} from "../../../../services/article.service";
import {Article} from "../../../../models/article";

@Component({
    selector: 'app-bda',
    templateUrl: './bda.component.html',
    styleUrls: ['./bda.component.css']
})
export class BdaComponent implements OnInit {

    loading = true;
    articles: Article[];

    constructor(private articleService: ArticleService) {
    }

    async ngOnInit() {
        this.articles = await this.articleService.getAllArticlesOf('Bureau de l\'Art');
        this.loading = false;
    }
}
