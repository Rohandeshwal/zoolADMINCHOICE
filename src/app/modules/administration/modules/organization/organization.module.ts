import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { OrganizationRoutingModule } from './organization-routing.module';
import { OrganizationComponent } from './pages/organization/organization.component';

import { OrganizationsListingComponent } from './components/organizations-listing/organizations-listing.component';



@NgModule({
  declarations: [OrganizationComponent,OrganizationsListingComponent],
  imports: [
    CommonModule,SharedModule,OrganizationRoutingModule
  ]
})
export class OrganizationModule { }
