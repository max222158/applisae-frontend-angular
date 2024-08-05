import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './page/login/login.component';
import { DashbordComponent } from './page/dashbord/dashbord.component';
import { HomeComponent } from './components/dashboard/home/home.component';
import { NumericalDepositComponent } from './components/dashboard/numerical-deposit/numerical-deposit.component';
import { SearchComponent } from './components/dashboard/search/search.component';
import { DocumentComponent } from './components/dashboard/document/document.component';
import { ModelComponent } from './components/dashboard/model/model.component';
import { CreateComponent } from './components/dashboard/model/create/create.component';
import { CustomfielsComponent } from './components/dashboard/model/customfiels/customfiels.component';
import { CourrierComponent } from './components/dashboard/courrier/courrier.component';
import { MyCourrierComponent } from './components/dashboard/courrier/my-courrier/my-courrier.component';
import { UserComponent } from './components/dashboard/user/user/user.component';
import { RoleComponent } from './components/dashboard/user/role/role.component';
import { CreateUserComponent } from './components/dashboard/user/create-user/create-user.component';
import { AuthGard } from './guards/auth/auth.guard';
import { CreateworkFlowComponent } from './components/dashboard/workflow/for-courrier/create/create.component';
import { ListWorkflowComponent } from './components/dashboard/workflow/for-courrier/list/list.component';
import { CourrierDetailsComponent } from './components/dashboard/courrier/courrier-details/courrier-details.component';
import { CreateCourrierComponent } from './components/dashboard/courrier/create-courrier/create-courrier.component';
import { DetailsFileComponent } from './components/dashboard/numerical-deposit/details-file/details-file.component';
import { GroupComponent } from './components/dashboard/user/group/group.component';
import { CreateGroupComponent } from './components/dashboard/user/group/create/create.component';
import { EditComponent } from './components/dashboard/user/group/edit/edit.component';
import { HomeUserComponent } from './components/dashboard/home-user/home-user.component';
import { CreateWorkflowDocumentComponent } from './components/dashboard/workflow/for-document/create-workflow-document/create-workflow-document.component';
import { DetailsWorkflowComponent } from './components/dashboard/workflow/for-document/details-workflow/details-workflow.component';
import { MyTaskComponent } from './components/dashboard/workflow/for-document/tasks/my-task/my-task.component';
import { DetailsTaskComponent } from './components/dashboard/workflow/for-document/tasks/details-task/details-task.component';
import { HistoryComponent } from './components/dashboard/history/history.component';
import { AutomatingComponent } from './components/dashboard/automating/automating.component';
import { FolderPermissionsComponent } from './components/dashboard/permissions/folder-permissions/folder-permissions/folder-permissions.component';
import { MyGroupsComponent } from './components/dashboard/my-groups/my-groups.component';
import { DetailsMyGroupComponent } from './components/dashboard/my-groups/details-my-group/details-my-group.component';
import { StatisticComponent } from './components/dashboard/statistic/statistic.component';



const routes: Routes = [{
    path: "", component: LoginComponent
},
{
    path: 'login', component: LoginComponent
},
{
    path: 'utilisateur', component: DashbordComponent  ,canActivate: [AuthGard] , children: [
        {
            path: '', component: HomeUserComponent,
        },
        {
            path: 'fonds-numerique/dossier/:id', component: NumericalDepositComponent
        },
        {
            path: 'mes-taches', component: MyTaskComponent
        },
        {
            path: 'mes-taches/:filter', component: MyTaskComponent
        },
        {
            path: 'mes-taches/details/:id/tache/:task', component: DetailsTaskComponent
        },
        {
            path: 'recherche1', component: SearchComponent
        },

        {
            path: 'mes-groupes', component: MyGroupsComponent
        },
        {
            path: 'mes-groupes/groupe/:id', component: DetailsMyGroupComponent
        },
        {
            path: 'ajouter-un-courrier', component: CreateCourrierComponent
        },
        {
            path: 'courriers', component: CourrierComponent , children: [
        
                {
                    path: 'mes-courriers', component: MyCourrierComponent,
                
                },
                {
        
                    path: 'details-courrier/:id', component: CourrierDetailsComponent
                },
            ]
        },


        {
            path: 'document/creer-un-workflow', component: CreateWorkflowDocumentComponent
        }
        ,
        {
            path: 'document/creer-un-workflow/details/:workflow', component: DetailsWorkflowComponent
        }
        ,

        {
            path: 'fonds-numeriques', children: [
        
              
                    { path: 'index/:id',  component: NumericalDepositComponent},

                    { path: 'details-document/:id', component: DetailsFileComponent},
                    {path: 'permissions/dossier/:folder', component: FolderPermissionsComponent,}
                
            ]
        }

    ]

},
{
    path: 'tableau-de-bord', component: DashbordComponent  ,canActivate: [AuthGard] , children: [
        {
            path: '', component: HomeComponent,
        },
        {
            path: 'fonds-numerique/dossier/:id', component: NumericalDepositComponent
        },
        {
            path: 'recherche/mot-cle/:key', component: SearchComponent
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
            path: 'ajouter-un-courrier', component: CreateCourrierComponent
        },
        {
            path: 'courriers', component: CourrierComponent , children: [
        
                {
                    path: 'mes-courriers', component: MyCourrierComponent,
                
                },
                {
        
                    path: 'details-courrier/:id', component: CourrierDetailsComponent
                },
            ]
        },{
            path: 'historique', component: HistoryComponent
        },
        {
            path: 'mes-groupes', component: MyGroupsComponent
        }
        ,
        {
            path: 'automatisation', component: AutomatingComponent
        },

        {
            path: 'statistiques', component: StatisticComponent
        },
        {
            path: 'utilisateurs', component: UserComponent
        },
        {
            path: 'utilisateurs/creer', component: CreateUserComponent
        },
        {
            path: 'utilisateurs/groupes', component: GroupComponent
        },
        {
            path: 'utilisateurs/groupes/create', component: CreateGroupComponent
        },
        {
            path: 'utilisateurs/groupe/id/:id', component: EditComponent
        },
        {
            path: 'permissions', component: RoleComponent
        }

        ,
        {
            path: 'permissions1', component: RoleComponent
        }
        ,
        {
            path: 'creer-un-workflow', component: CreateworkFlowComponent
        }
        ,
        {
            path: 'document/creer-un-workflow', component: CreateWorkflowDocumentComponent
        }
        ,
        {
            path: 'document/creer-un-workflow/details/:workflow', component: DetailsWorkflowComponent
        }
        ,
        {
            path: 'liste-des-workflows', component: ListWorkflowComponent
        }
        ,
        {
            path: 'fonds-numeriques', children: [
        
              
                    { path: 'index/:id',  component: NumericalDepositComponent},

                    { path: 'details-document/:id', component: DetailsFileComponent},

                    {path: 'permissions/dossier/:folder', component: FolderPermissionsComponent,}
                
            ]
        }

    ]

}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
