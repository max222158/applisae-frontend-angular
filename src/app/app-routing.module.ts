import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './page/login/login.component';
import { DashbordComponent } from './page/dashbord/dashbord.component';
import { HomeComponent } from './components/dashboard/home/home.component';
import { NumericalDepositComponent } from './components/dashboard/numerical-deposit/numerical-deposit.component';
import { SearchComponent } from './components/dashboard/search/search.component';
import { DocumentComponent } from './components/dashboard/document/document.component';
import { hasRoleGuard } from './guards/auth/has-role.guard';
import { ModelComponent } from './components/dashboard/model/model.component';
import { CreateComponent } from './components/dashboard/model/create/create.component';
import { CustomfielsComponent } from './components/dashboard/model/customfiels/customfiels.component';
import { CourrierComponent } from './components/dashboard/courrier/courrier.component';
import { MyCourrierComponent } from './components/dashboard/courrier/my-courrier/my-courrier.component';
import { UserComponent } from './components/dashboard/user/user/user.component';
import { RoleComponent } from './components/dashboard/user/role/role.component';
import { CreateUserComponent } from './components/dashboard/user/create-user/create-user.component';




const routes: Routes = [{
    path: "", component: LoginComponent
},
{
    path: 'login', component: LoginComponent
},
{
    path: 'dashboard', component: DashbordComponent /* ,canActivate: [hasRoleGuard]  */, children: [
        {
            path: '', component: HomeComponent,
        },
        {
            path: 'fonds-numerique', component: NumericalDepositComponent
        },
        {
            path: 'recherche', component: SearchComponent
        },
        {
            path: 'documents', component: DocumentComponent
        }
        ,
        {
            path: 'dossiers', component: DocumentComponent
        }
        ,
        {
            path: 'modele-documents', component: ModelComponent
        }
        ,
        {
            path: 'creer-modele-document', component: CreateComponent
        }
        ,
        {
            path: 'creer-champs-personnalises', component: CustomfielsComponent
        },
        {
            path: 'ajouter-un-courrier', component: CourrierComponent
        },
        {
            path: 'mes-courriers', component: MyCourrierComponent
        },
        {
            path: 'utilisateurs', component: UserComponent
        },
        {
            path: 'utilisateurs/creer', component: CreateUserComponent
        },
        {
            path: 'permissions', component: RoleComponent
        }


    ]

}
];;

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
