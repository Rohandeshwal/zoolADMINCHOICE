import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ManageRelationshipComponent } from "./pages/manage-relationship/manage-relationship.component";
import { ManageRelationshipListingComponent } from "./components/manage-relationship-listing/manage-relationship-listing.component";
import { AddRelationshipTableComponent } from "./components/add-relationship-table/add-relationship-table.component";
import { EditRelationshipTableFormComponent } from "./components/edit-relationship-table-form/edit-relationship-table-form.component";

const routes: Routes = [
  {
    path: "",
    component: ManageRelationshipComponent,
    children: [
      {
        path: "",
        redirectTo: "list",
        pathMatch: "full",
      },
      {
        path: "list",
        component: ManageRelationshipListingComponent,
      },
      {
        path: "add",
        component: AddRelationshipTableComponent,
      },
      {
        path: "edit/:businessRelationId",
        component: EditRelationshipTableFormComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusinessComponentRelationshipRoutingModule {}
