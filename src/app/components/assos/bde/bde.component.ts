import {Component, OnInit} from "@angular/core";
import {ArticleService} from "../../../services/article.service";
import {Article} from "../../../models/article";

@Component({
    selector: 'app-bde',
    templateUrl: './bde.component.html',
    styleUrls: ['./bde.component.css']
})
export class BdeComponent implements OnInit {

    loading = true;
    articles: Article[];

    constructor(private articleService: ArticleService) {
    }

    async ngOnInit() {
        this.articles = await this.articleService.getAllArticlesOf('Bureau des Élèves');
        this.loading = false;
    }

}
