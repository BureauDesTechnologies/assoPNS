import {Component, OnInit} from "@angular/core";
import {Article} from "../../../models/article";
import {ArticleService} from "../../../services/article.service";

@Component({
    selector: 'app-bdc',
    templateUrl: './bdc.component.html',
    styleUrls: ['./bdc.component.css']
})
export class BdcComponent implements OnInit {

    loading = true;
    articles: Article[];

    constructor(private articleService: ArticleService) {
    }

    async ngOnInit() {
        this.articles = await this.articleService.getAllArticlesOf('Bureau du Code');
        this.loading = false;
    }

}
