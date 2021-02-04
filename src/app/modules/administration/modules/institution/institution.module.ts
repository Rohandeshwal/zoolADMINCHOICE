import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { InstitutionRoutingModule } from './institution-routing.module';
import { InstitutionComponent } from './pages/institution/institution.component';
import { InstitutionListingComponent } from './components/institution-listing/institution-listing.component';



@NgModule({
  declarations: [InstitutionComponent,InstitutionListingComponent],
  imports: [
    CommonModule,SharedModule,InstitutionRoutingModule
  ]
})
export class InstitutionModule { }
