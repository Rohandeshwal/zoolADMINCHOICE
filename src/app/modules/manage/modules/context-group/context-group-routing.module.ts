import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ManageContextGroupComponent } from "./pages/manage-context-group/manage-context-group.component";
import { ContextGroupListingComponent } from "./components/context-group-listing/context-group-listing.component";

import { AddContextGroupFormComponent } from "./components/add-context-group-form/add-context-group-form.component";

const routes: Routes = [
  {
    path: "",
    component: ManageContextGroupComponent,
    children: [
      {
        path: "",
        redirectTo: "list",
        pathMatch: "full",
      },
      {
        path: "list",
        component: ContextGroupListingComponent,
      },
      {
        path: "add",
        component: AddContextGroupFormComponent,
      },
      {
        path: "edit/:id",
        component: AddContextGroupFormComponent,
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContextGroupRoutingModule {}
