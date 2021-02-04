import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { TeamRoutingModule } from './team-routing.module';
import { TeamComponent } from './pages/team/team.component';
import { AddTeamComponent } from './components/add-team/add-team.component';
import { EditTeamComponent } from './components/edit-team/edit-team.component';
import { EditTeamFormComponent } from './components/edit-team-form/edit-team-form.component';
import { TeamFormComponent } from './components/team-form/team-form.component';
import { TeamListingComponent } from './components/team-listing/team-listing.component';


@NgModule({
  declarations: [TeamComponent,AddTeamComponent,EditTeamComponent,EditTeamFormComponent,TeamFormComponent,TeamListingComponent],
  imports: [
    CommonModule,SharedModule,TeamRoutingModule
  ]
})
export class TeamModule { }
