import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageModulesComponent} from './pages/manage-modules/manage-modules.component';
import { ModuleRoutingModule } from './module-routing.module';
import { AddManageModulesFormComponent} from './components/add-manage-modules-form/add-manage-modules-form.component';
import {ManageModulesListingComponent} from './components/manage-modules-listing/manage-modules-listing.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ManageModulesComponent,AddManageModulesFormComponent,ManageModulesListingComponent],
  imports: [
    CommonModule,SharedModule,ModuleRoutingModule
  ]
})
export class ModuleModule { }
