import {AppComponent} from "./components/app/app.component";
import {NgModule} from "@angular/core";
import {DropZoneDirective} from "./directives/drop-zone.directive";
import {FileUploadComponent} from "./components/utilities/file-upload/file-upload.component";
import {FileSizePipe} from "./components/utilities/pipes/file-size";
import {LoginComponent} from "./components/login/login.component";
import {RegistrationComponent} from "./components/registration/registration.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSidenavModule,
    MatSnackBarModule
} from "@angular/material";
import {AngularFireStorageModule} from "angularfire2/storage";
import {AngularFirestoreModule} from "angularfire2/firestore";
import {AngularFireAuth, AngularFireAuthModule} from "angularfire2/auth";
import {environment} from "../environments/environment";
import {AngularFireModule} from "angularfire2";
import {AppRoutingModule} from "./routes";
import {UserService} from "./services/user.service";
import {HomeComponent} from "./home/home.component";
import {ArticleService} from "./services/article.service";
import {ArticleViewComponent} from "./components/article-view/article-view.component";
import {AddArticleComponent} from "./components/add-article/add-article.component";
import {BdcComponent} from "./components/assos/bdc/bdc.component";
import {BdeComponent} from "./components/assos/bde/bde.component";
import {BdsComponent} from "./components/assos/bds/bds.component";
import {BdjComponent} from "./components/assos/bdj/bdj.component";
import {BdhComponent} from "./components/assos/bdh/bdh.component";
import {BdaComponent} from "./components/assos/bda/bda.component";
@NgModule({
    declarations: [
        AppComponent,
        RegistrationComponent,
        DropZoneDirective,
        FileUploadComponent,
        FileSizePipe,
        LoginComponent,
        ProfileComponent,
        HomeComponent,
        ArticleViewComponent,
        AddArticleComponent,
        BdcComponent,
        BdeComponent,
        BdsComponent,
        BdjComponent,
        BdhComponent,
        BdaComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatCardModule,
        MatButtonModule,
        MatSnackBarModule,
        MatDividerModule,
        MatIconModule,
        MatListModule,
        MatSidenavModule,
        MatProgressSpinnerModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireStorageModule,
        AngularFireAuthModule,

        AppRoutingModule,
    ],
    providers: [UserService, ArticleService, AngularFireAuth],
    bootstrap: [AppComponent]
})
export class AppModule {
}
