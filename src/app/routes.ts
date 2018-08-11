import {RouterModule, Routes} from "@angular/router";
import {RegistrationComponent} from "./components/registration/registration.component";
import {LoginComponent} from "./components/login/login.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {NgModule} from "@angular/core";
import {HomeComponent} from "./home/home.component";
import {AddArticleComponent} from "./components/add-article/add-article.component";
import {BdeComponent} from "./components/assos/bde/bde.component";
import {BdsComponent} from "./components/assos/bds/bds.component";
import {BdhComponent} from "./components/assos/bdh/bdh.component";
import {BdaComponent} from "./components/assos/bda/bda.component";
import {BdjComponent} from "./components/assos/bdj/bdj.component";
import {BdcComponent} from "./components/assos/bdc/bdc.component";


const appRoutes: Routes = [
    {path: "", component: HomeComponent},
    {path: "profile", component: ProfileComponent},
    {path: "registration", component: RegistrationComponent},
    {path: "login", component: LoginComponent},
    {path: "addArticle", component: AddArticleComponent},
    {path: "bde", component: BdeComponent},
    {path: "bds", component: BdsComponent},
    {path: "bdc", component: BdcComponent},
    {path: "bdj", component: BdjComponent},
    {path: "bda", component: BdaComponent},
    {path: "bdh", component: BdhComponent},
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
