import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BusinessRelationGroupRoutingModule } from "./business-relation-group-routing.module";

import { SharedModule } from "src/app/shared/shared.module";
import { BusinessRelationGroupListingComponent } from "./components/business-relation-group-listing/business-relation-group-listing.component";
import { BusinessRelationGroupFormComponent } from "./components/business-relation-group-form/business-relation-group-form.component";
import { ManageBusinessRelationGroupComponent } from "./pages/manage-business-relation-group/manage-business-relation-group.component";

@NgModule({
  declarations: [
    BusinessRelationGroupListingComponent,
    BusinessRelationGroupFormComponent,
    ManageBusinessRelationGroupComponent,
  ],
  imports: [CommonModule, SharedModule, BusinessRelationGroupRoutingModule],
})
export class BusinessRelationGroupModule {}
