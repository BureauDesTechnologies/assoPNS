import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./components/articles-components/home/home.component";
import {ProfileComponent} from "./components/user-components/profile/profile.component";
import {RegistrationComponent} from "./components/user-components/registration/registration.component";
import {LoginComponent} from "./components/user-components/login/login.component";
import {AddArticleComponent} from "./components/articles-components/add-article/add-article.component";
import {AssosOverviewComponent} from "./components/assos-components/assos-overview/assos-overview.component";
import {BdeComponent} from "./components/assos-components/assos-pages/bde/bde.component";
import {BdsComponent} from "./components/assos-components/assos-pages/bds/bds.component";
import {BdcComponent} from "./components/assos-components/assos-pages/bdc/bdc.component";
import {BdjComponent} from "./components/assos-components/assos-pages/bdj/bdj.component";
import {BdaComponent} from "./components/assos-components/assos-pages/bda/bda.component";
import {BdhComponent} from "./components/assos-components/assos-pages/bdh/bdh.component";
import {NgModule} from "@angular/core";
import {CguComponent} from "./components/utilities/cgu/cgu.component";
import {PncComponent} from "./components/assos-components/assos-pages/pnc/pnc.component";
import {GiveRightsComponent} from "./components/user-components/give-rights/give-rights.component";
import {SubscribeToComponent} from "./components/user-components/subscribe-to/subscribe-to.component";


const appRoutes: Routes = [
    {path: "", component: HomeComponent},
    {path: "profile", component: ProfileComponent},
    {path: "registration", component: RegistrationComponent},
    {path: "login", component: LoginComponent},
    {path: "addArticle", component: AddArticleComponent},
    {path: "aboutAll", component: AssosOverviewComponent},
    {path: "giveRights", component: GiveRightsComponent},
    {path: "subscriptions", component: SubscribeToComponent},
    {path: "cgu", component: CguComponent},
    {path: "bde", component: BdeComponent},
    {path: "bds", component: BdsComponent},
    {path: "bdc", component: BdcComponent},
    {path: "bdj", component: BdjComponent},
    {path: "bda", component: BdaComponent},
    {path: "bdh", component: BdhComponent},
    {path: "pnc", component: PncComponent},
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
