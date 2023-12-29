import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './page/login/login.component';
import { DashbordComponent } from './page/dashbord/dashbord.component';

const routes: Routes = [    {
  path:"",component:LoginComponent
},
{
  path:'dashboard',component:DashbordComponent/* ,children:[
      {
          path:'',component:HomeComponent
      },
      {
          path:'fonds-numerique',component:NumericalDepositComponent
      },
      {
          path:'recherche',component:SearchComponent
      },
      {
          path:'documents',component:DocumentComponent
      }
      ,
      {
          path:'dossiers',component:DocumentComponent
      }
      
  ] */

}
];;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
