import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from './core/components/error/error.component';


const routes: Routes = [
  {path:'',redirectTo:'auth',pathMatch:'full'},
  {path:'auth', loadChildren:() => import('./modules/auth/auth.module').then(m => m.AuthModule)},
  {path:'dashboard', loadChildren:() => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)},
  {path:'manage', loadChildren:() => import('./modules/manage/manage.module').then(m => m.ManageModule)},
  {path:'administration', loadChildren:() => import('./modules/administration/administration.module').then(m => m.AdministrationModule)},
  {path:'**',component:ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
