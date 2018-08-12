import {Component, OnInit} from "@angular/core";
import {ArticleService} from "../../../../services/article.service";
import {Article} from "../../../../models/article";

@Component({
    selector: 'app-bdh',
    templateUrl: './bdh.component.html',
    styleUrls: ['./bdh.component.css']
})
export class BdhComponent implements OnInit {

    loading = true;
    articles: Article[];

    constructor(private articleService: ArticleService) {
    }

    async ngOnInit() {
        this.articles = await this.articleService.getAllArticlesOf('Bureau de l\'Humanitaire');
        this.loading = false;
    }

}
