import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from '../dashboard/pages/dashboard/dashboard.component';



const routes: Routes = [

    {path:'',component:DashboardComponent,children:[
    {
      path:'',redirectTo:'home',pathMatch:'full'
    },
    { path: "home", component: HomeComponent },
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
