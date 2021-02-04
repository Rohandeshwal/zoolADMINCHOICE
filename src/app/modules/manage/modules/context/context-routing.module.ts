import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ManageContextComponent } from './pages/manage-context/manage-context.component';
import { ContextListComponent } from './components/context-list/context-list.component';
import { CreateContextComponent } from './components/create-context/create-context.component';
import { EditContextComponent } from './components/edit-context/edit-context.component';


const routes: Routes = [
  {
    path: "",
    component: ManageContextComponent,
    children: [
      {
        path: "",
        redirectTo: "list",
        pathMatch: "full",
      },
      {
        path: "list",
        component: ContextListComponent,
      },
      {
        path: "add",
        component: CreateContextComponent,
      },
      {
        path: "edit/:id",
        component: EditContextComponent,
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContextRoutingModule { }
