import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { RolesRoutingModule } from './roles-routing.module';
import { RolesComponent } from './pages/roles/roles.component';
import { AddRolesComponent } from './components/add-roles/add-roles.component';
import { EditRolesComponent } from './components/edit-roles/edit-roles.component';
import { RolesFormComponent } from './components/roles-form/roles-form.component';
import { RolesListingComponent } from './components/roles-listing/roles-listing.component';
import { EditRolesFormComponent } from './components/edit-roles-form/edit-roles-form.component';


@NgModule({
  declarations: [RolesComponent,AddRolesComponent,EditRolesComponent,EditRolesFormComponent,RolesFormComponent,RolesListingComponent],
  imports: [
    CommonModule,SharedModule,RolesRoutingModule
  ]
})
export class RolesModule { }
