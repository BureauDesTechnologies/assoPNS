import {RouterModule, Routes} from "@angular/router";
import {RegistrationComponent} from "./components/registration/registration.component";
import {LoginComponent} from "./components/login/login.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {NgModule} from "@angular/core";
import {HomeComponent} from "./home/home.component";
import {AddArticleComponent} from "./add-article/add-article.component";


const appRoutes: Routes = [
    {path: "", component: HomeComponent},
    {path: "profile", component: ProfileComponent},
    {path: "registration", component: RegistrationComponent},
    {path: "login", component: LoginComponent},
    {path: "addArticle", component: AddArticleComponent},
    // {
    //     path: 'admin',
    //     loadChildren: 'src/app/components/administration/administration.module#AdministrationModule',
    //     data: {preload: true}
    // },
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes,
        )
    ],
    exports: [
        RouterModule
    ],
    providers: []
})
export class AppRoutingModule {
}
