import {Component, OnInit} from "@angular/core";
import {ArticleService} from "../services/article.service";
import {Article} from "../models/article";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    constructor(private articleService: ArticleService) {
    }

    articles: Article[];

    async ngOnInit() {
        // this.articleService.addArticle(new Article('Titre', 'Contenu', null, 'Bureau du Code'));
        // this.articleService.addArticle(new Article('Titre2', 'Contenu2', 'uploads/1533965251403_Loutre8.jpg', 'Bureau du Code'));
        // this.articleService.addArticle(new Article('Titre3', 'Contenu4', null, 'Bureau des Élèves'));
        this.articles = await this.articleService.getAllArticles();
    }

}
