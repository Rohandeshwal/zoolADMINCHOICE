import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ManageContextRelationComponent } from './pages/manage-context-relation/manage-context-relation.component';
import { ContextRelationListComponent } from './components/context-relation-list/context-relation-list.component';
import { UpdateContextRelationComponent } from './components/update-context-relation/update-context-relation.component';
import { ContextRelationOverviewComponent } from './components/context-relation-overview/context-relation-overview.component';
import { AddContextRelationComponent } from './components/add-context-relation/add-context-relation.component';


const routes: Routes = [
 
  {
    path: "",
    component: ManageContextRelationComponent,
    children: [
      {
        path: "",
        redirectTo: "list",
        pathMatch: "full",
      },
      {
        path: "list",
        component: ContextRelationListComponent,
      },
     
      {
        path: "add",
        component: AddContextRelationComponent,
      },
      {
        path: "edit/:id",
        component: UpdateContextRelationComponent,
      },
      {
        path:"overview/:id",
        component:ContextRelationOverviewComponent
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContextRelationshipRoutingModule {}
