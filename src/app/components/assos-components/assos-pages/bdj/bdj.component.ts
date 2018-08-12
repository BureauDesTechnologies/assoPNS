import {Component, OnInit} from "@angular/core";
import {ArticleService} from "../../../../services/article.service";
import {Article} from "../../../../models/article";

@Component({
    selector: 'app-bdj',
    templateUrl: './bdj.component.html',
    styleUrls: ['./bdj.component.css']
})
export class BdjComponent implements OnInit {

    loading = true;
    articles: Article[];

    constructor(private articleService: ArticleService) {
    }

    async ngOnInit() {
        this.articles = await this.articleService.getAllArticlesOf('Bureau des Jeux');
        this.loading = false;
    }

}
