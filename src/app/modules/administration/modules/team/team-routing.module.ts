import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TeamComponent } from './pages/team/team.component';
import { TeamListingComponent } from './components/team-listing/team-listing.component';
import { AddTeamComponent } from './components/add-team/add-team.component';
import { EditTeamComponent } from './components/edit-team/edit-team.component';

const routes: Routes = [
  {
    path: "",
    component: TeamComponent,
    children: [
      {
        path: "",
        redirectTo: "list",
        pathMatch: "full",
      },
      {
        path: "list",
        component: TeamListingComponent,
      },
      {
        path: "add",
        component: AddTeamComponent,
      },
      {
        path: "edit",
        component: EditTeamComponent,
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeamRoutingModule {}
