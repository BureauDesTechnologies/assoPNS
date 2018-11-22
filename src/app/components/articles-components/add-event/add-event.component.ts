import {Component, OnInit} from "@angular/core";
import {User} from "../../../models/user";
import {UserService} from "../../../services/user.service";
import {ArticleService} from "../../../services/article.service";
import {MatSnackBar} from "@angular/material";
import {Article} from "../../../models/article";
import {Router} from "@angular/router";

@Component({
    selector: 'app-add-event',
    templateUrl: './add-event.component.html',
    styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {
    user: User;
    articleToAdd;

    imageToDisplay: string;


    constructor(private userService: UserService, private articleService: ArticleService,
                private snackbar: MatSnackBar, private router: Router) {
        this.articleToAdd = new Article('', '', '', '', '', [], [], new Date(Date.now()));
        this.user = new User('', '', '', '', [], [], 'placeholder');
        this.imageToDisplay = '';
    }

    async ngOnInit() {
        this.user = await this.userService.getLoggedUser();
        if (this.user.canPublishAs.length === 1) {
            this.articleToAdd.category = this.user.canPublishAs[0];
        }
    }

    addArticleOnSubmit() {
        if (this.articleToAdd.title !== '' && this.articleToAdd.content !== '' && this.articleToAdd.category !== '') {
            this.articleService.addArticle(this.articleToAdd).then(() => {
                this.snackbar.open('L\'article a été ajouté', null, {duration: 1500});
            });
            setTimeout(() => {
                this.router.navigate(['/']);
            }, 1500);
        } else {
            this.snackbar.open('Veuillez renseigner les champs obligatoires', null, {duration: 1500});
        }
    }
}
