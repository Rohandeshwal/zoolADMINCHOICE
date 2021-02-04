import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { CollaboratorRoutingModule } from './collaborator-routing.module';
import { CollaboratorComponent } from './pages/collaborator/collaborator.component';
import { CollaboratorListingComponent } from './components/collaborator-listing/collaborator-listing.component';

@NgModule({
  declarations: [CollaboratorComponent,CollaboratorListingComponent,],
  imports: [
    CommonModule,SharedModule,CollaboratorRoutingModule
  ]
})
export class CollaboratorModule { }
