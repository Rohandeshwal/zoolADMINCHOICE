import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ManageBusinessRelationGroupComponent } from "./pages/manage-business-relation-group/manage-business-relation-group.component";
import { BusinessRelationGroupListingComponent } from "./components/business-relation-group-listing/business-relation-group-listing.component";

import { BusinessRelationGroupFormComponent } from "./components/business-relation-group-form/business-relation-group-form.component";

const routes: Routes = [
  {
    path: "",
    component: ManageBusinessRelationGroupComponent,
    children: [
      {
        path: "",
        redirectTo: "list",
        pathMatch: "full",
      },
      {
        path: "list",
        component: BusinessRelationGroupListingComponent,
      },
      {
        path: "add",
        component: BusinessRelationGroupFormComponent,
      },{
        path: "edit/:businessGroupId",
        component: BusinessRelationGroupFormComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusinessRelationGroupRoutingModule {}
