import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessComponentRoutingModule } from './business-component-routing.module';

import { ManageBusinessComponent } from './pages/manage-business/manage-business.component';
import { AddBusinessFormComponent} from './components/add-business-form/add-business-form.component';
import { BusinessComponentListingComponent} from './components/business-component-listing/business-component-listing.component';
import { BusinessListingComponent} from './components/business-listing/business-listing.component'; 
import { SharedModule } from 'src/app/shared/shared.module';
import { AddToModuleComponent } from './components/add-to-module/add-to-module.component';

@NgModule({
  declarations: [ManageBusinessComponent,AddBusinessFormComponent,BusinessComponentListingComponent,BusinessListingComponent, AddToModuleComponent],
  imports: [
    CommonModule,SharedModule,BusinessComponentRoutingModule
  ]
})
export class BusinessComponentModule { }
