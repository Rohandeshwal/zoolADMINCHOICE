import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { OrganizationsListingComponent } from './components/organizations-listing/organizations-listing.component';
import { OrganizationComponent } from './pages/organization/organization.component';

const routes: Routes = [
  {
    path: "",
    component: OrganizationComponent,
    children: [
      {
        path: "",
        redirectTo: "list",
        pathMatch: "full",
      },
      {
        path: "list",
        component: OrganizationsListingComponent,
      },
     
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganizationRoutingModule {}
