import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CollaboratorComponent } from './pages/collaborator/collaborator.component';
import { CollaboratorListingComponent } from './components/collaborator-listing/collaborator-listing.component';

const routes: Routes = [
  {
    path: "",
    component: CollaboratorComponent,
    children: [
      {
        path: "",
        redirectTo: "list",
        pathMatch: "full",
      },
      {
        path: "list",
        component: CollaboratorListingComponent,
      },
    
      
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CollaboratorRoutingModule {}
