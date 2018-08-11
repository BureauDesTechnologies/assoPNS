import {ChangeDetectorRef, Component, OnInit} from "@angular/core";
import {UserService} from "../services/user.service";
import {User} from "../models/user";
import {Article} from "../models/article";
import {ArticleService} from "../services/article.service";
import {MatSnackBar} from "@angular/material";

@Component({
    selector: 'app-add-article',
    templateUrl: './add-article.component.html',
    styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent implements OnInit {
    private user: User;
    articleToAdd;

    imageToDisplay: string;


    constructor(private userService: UserService, private articleService: ArticleService,
                private snackbar: MatSnackBar, private ref: ChangeDetectorRef) {
        this.articleToAdd = new Article('', '', '', '');
        this.user = new User('', '', '', '', [], [], 'placeholder');
        this.imageToDisplay = '';
    }

    ngOnInit() {
        this.userService.getLoggedUser().subscribe(user => {
            if (this.user.userId === 'placeholder' && user === null) {
                return;
            }
            this.user = user;
            this.ref.detectChanges();
        });
        console.log(this.user);
    }

    addArticleOnSubmit() {
        if (this.articleToAdd.title !== '' && this.articleToAdd.content !== '' && this.articleToAdd.category !== '') {
            this.articleService.addArticle(this.articleToAdd).then(_ => {
                this.snackbar.open('L\'article a été ajouté', null, {duration: 1500});
            });
        } else {
            this.snackbar.open('Veuillez renseigner les champs obligatoires', null, {duration: 1500});
        }
    }
}
