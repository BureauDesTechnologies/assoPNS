import {ChangeDetectorRef, Component, OnInit} from "@angular/core";
import {UserService} from "../../../services/user.service";
import {User} from "../../../models/user";
import {Event} from "../../../models/event";
import {ArticleService} from "../../../services/article.service";
import {Article} from "../../../models/article";
import {MatSnackBar} from "@angular/material";
import {Router} from "@angular/router";

@Component({
    selector: 'app-publish',
    templateUrl: './publish.component.html',
    styleUrls: ['./publish.component.css']
})
export class PublishComponent implements OnInit {

    user: User;
    canPublish = false;

    articleToSupply;
    eventToSupply;

    constructor(private userService: UserService, private articleService: ArticleService,
                private snackbar: MatSnackBar, private ref: ChangeDetectorRef, private router: Router) {
        this.user = new User('', '', '', '', [], [], 'placeholder');
    }

    ngOnInit() {
        this.articleToSupply =
            new Article(null, "", "", "", "", [], [], null);
        this.eventToSupply = new Event(this.articleToSupply, null, null);

        // this.user = this.userService.getLoggedUserInstantly();
        this.userService.getLoggedUser().subscribe(user => {
            if (this.user.userId === 'placeholder' && user === null) {
                return;
            }
            this.user = user;
            console.log("Can publish ? : ");
            console.log(user);
            if (this.user.canPublishAs.length === 1) {
                this.canPublish = true;
            }
            this.ref.detectChanges();
        });
    }

    publishArticle() {
        this.articleToSupply.emit(this.articleToSupply);
        if (this.articleToSupply.title !== '' && this.articleToSupply.content !== '' && this.articleToSupply.category !== '') {
            this.articleService.addArticle(this.articleToSupply).then(_ => {
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
