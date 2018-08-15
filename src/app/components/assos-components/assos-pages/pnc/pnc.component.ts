import {Component, OnInit} from "@angular/core";
import {ArticleService} from "../../../../services/article.service";
import {Article} from "../../../../models/article";

@Component({
    selector: 'app-bds',
    templateUrl: './pnc.component.html',
    styleUrls: ['./pnc.component.css']
})
export class PncComponent implements OnInit {

    loading = true;
    articles: Article[];

    constructor(private articleService: ArticleService) {
    }

    async ngOnInit() {
        this.articles = await this.articleService.getAllArticlesOf('Polytech Nice Conseil');
        this.loading = false;
    }

}
