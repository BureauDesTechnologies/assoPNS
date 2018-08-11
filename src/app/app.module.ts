/*
 * ................................................................................................................................
 *  . Copyright (c)
 *  .
 *  . The app.module.ts class was created by :
 *  . A.Bolot, O.Osgart, L.Oms and G.Peltier
 *  .
 *  . As part of the polygame project
 *  .
 *  . Last modified : 22/07/18 11:56
 *  .
 *  . Contact : idevedit@gmail.com
 *  ...............................................................................................................................
 *
 */

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
import {ArticleViewComponent} from "./article-view/article-view.component";
import { AddArticleComponent } from './add-article/add-article.component';
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
