import {NgModule} from "@angular/core";
import {DropZoneDirective} from "./directives/drop-zone.directive";
import {FileSizePipe} from "./components/utilities/pipes/file-size";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatIconRegistry,
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
import {ArticleService} from "./services/article.service";
import {AppComponent} from "./components/app/app.component";
import {RegistrationComponent} from "./components/user-components/registration/registration.component";
import {FileUploadComponent} from "./components/utilities/file-upload/file-upload.component";
import {LoginComponent} from "./components/user-components/login/login.component";
import {ProfileComponent} from "./components/user-components/profile/profile.component";
import {HomeComponent} from "./components/articles-components/home/home.component";
import {
    ArticleViewComponent,
    DialogConfirmDeleteComponent
} from "./components/articles-components/article-view/article-view.component";
import {AddArticleComponent} from "./components/articles-components/add-article/add-article.component";
import {BdcComponent} from "./components/assos-components/assos-pages/bdc/bdc.component";
import {BdeComponent} from "./components/assos-components/assos-pages/bde/bde.component";
import {BdsComponent} from "./components/assos-components/assos-pages/bds/bds.component";
import {BdjComponent} from "./components/assos-components/assos-pages/bdj/bdj.component";
import {BdhComponent} from "./components/assos-components/assos-pages/bdh/bdh.component";
import {BdaComponent} from "./components/assos-components/assos-pages/bda/bda.component";
import {AssosOverviewComponent} from "./components/assos-components/assos-overview/assos-overview.component";
import {AssoPresentationComponent} from "./components/assos-components/asso-presentation/asso-presentation.component";
import {HttpClientModule} from "@angular/common/http";
import {CommentComponent} from "./components/articles-components/comment/comment.component";
import {CguComponent} from "./components/utilities/cgu/cgu.component";
import {PncComponent} from "./components/assos-components/assos-pages/pnc/pnc.component";
import {UsersListComponent} from "./components/user-components/users-list/users-list.component";
import {
    DialogGiveRightsComponent,
    GiveRightsComponent
} from "./components/user-components/give-rights/give-rights.component";
import {PopupService} from "./services/popup.service";
import {PopupComponent} from "./components/popup/popup.component";
import {SubscribeToComponent} from "./components/user-components/subscribe-to/subscribe-to.component";
import {AddEventComponent} from "./components/articles-components/add-event/add-event.component";
import {PublishComponent} from './components/articles-components/publish/publish.component';

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
        AddEventComponent,
        BdcComponent,
        BdeComponent,
        BdsComponent,
        BdjComponent,
        BdhComponent,
        BdaComponent,
        PncComponent,
        AssosOverviewComponent,
        AssoPresentationComponent,
        CommentComponent,
        CguComponent,
        GiveRightsComponent,
        UsersListComponent,
        DialogGiveRightsComponent,
        PopupComponent,
        DialogConfirmDeleteComponent,
        SubscribeToComponent,
        PublishComponent
    ],
    entryComponents: [
        DialogGiveRightsComponent,
        PopupComponent,
        DialogConfirmDeleteComponent
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
        MatCheckboxModule,
        MatDialogModule,
        MatSnackBarModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireStorageModule,
        AngularFireAuthModule,

        HttpClientModule,
        AppRoutingModule,
    ],
    providers: [UserService, ArticleService, PopupService, AngularFireAuth, MatIconRegistry],
    bootstrap: [AppComponent]
})
export class AppModule {
}
