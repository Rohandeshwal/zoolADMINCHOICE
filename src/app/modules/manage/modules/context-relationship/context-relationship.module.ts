import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ManageContextRelationComponent } from "./pages/manage-context-relation/manage-context-relation.component";
import { ContextRelationListComponent } from "./components/context-relation-list/context-relation-list.component";
import { SharedModule } from "src/app/shared/shared.module";
import { ContextRelationshipRoutingModule } from "./context-relationship-routing.module";
import { UpdateContextRelationComponent } from "./components/update-context-relation/update-context-relation.component";
import { ContextRelationOverviewComponent } from "./components/context-relation-overview/context-relation-overview.component";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { AddContextRelationComponent } from './components/add-context-relation/add-context-relation.component';

@NgModule({
  declarations: [
    ManageContextRelationComponent,
    ContextRelationListComponent,
    UpdateContextRelationComponent,
    ContextRelationOverviewComponent,
    AddContextRelationComponent,
  ],
  imports: [CommonModule, SharedModule, ContextRelationshipRoutingModule],
  entryComponents:[ContextRelationOverviewComponent]
})
export class ContextRelationshipModule {}
