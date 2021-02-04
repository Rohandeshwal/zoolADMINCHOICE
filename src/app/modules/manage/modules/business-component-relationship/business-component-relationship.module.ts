import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageRelationshipComponent } from './pages/manage-relationship/manage-relationship.component';
import { AddRelationshipTableComponent } from './components/add-relationship-table/add-relationship-table.component';
import { AddRelationshipTableFormComponent } from './components/add-relationship-table-form/add-relationship-table-form.component';
import { ManageRelationshipListingComponent} from './components/manage-relationship-listing/manage-relationship-listing.component';

import { SharedModule } from 'src/app/shared/shared.module';
import { BusinessComponentRelationshipRoutingModule } from './business-component-relationship-routing.module';
import { EditRelationshipTableFormComponent } from './components/edit-relationship-table-form/edit-relationship-table-form.component';

@NgModule({
  declarations: [ManageRelationshipComponent,AddRelationshipTableComponent,AddRelationshipTableFormComponent,ManageRelationshipListingComponent, EditRelationshipTableFormComponent],
  imports: [
    CommonModule,SharedModule,BusinessComponentRelationshipRoutingModule
  ]
})
export class BusinessComponentRelationshipModule { }
