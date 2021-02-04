import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/shared/shared.module";
import { ContextGroupRoutingModule } from "./context-group-routing.module";

import { AddContextGroupFormComponent } from "./components/add-context-group-form/add-context-group-form.component";
import { ContextGroupListingComponent } from "./components/context-group-listing/context-group-listing.component";
import { ManageContextGroupComponent } from "./pages/manage-context-group/manage-context-group.component";

@NgModule({
  declarations: [
    AddContextGroupFormComponent,
    ContextGroupListingComponent,
    ManageContextGroupComponent,
  ],
  imports: [CommonModule, SharedModule, ContextGroupRoutingModule],
})
export class ContextGroupModule {}
