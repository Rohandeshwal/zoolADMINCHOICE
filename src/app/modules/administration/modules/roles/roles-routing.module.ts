import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RolesComponent } from './pages/roles/roles.component';
import { RolesListingComponent } from './components/roles-listing/roles-listing.component';
import { AddRolesComponent } from './components/add-roles/add-roles.component';
import { EditRolesComponent } from './components/edit-roles/edit-roles.component';

const routes: Routes = [
  {
    path: "",
    component: RolesComponent,
    children: [
      {
        path: "",
        redirectTo: "list",
        pathMatch: "full",
      },
      {
        path: "list",
        component: RolesListingComponent,
      },
      {
        path: "add",
        component: AddRolesComponent,
      },
      {
        path: "edit",
        component: EditRolesComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RolesRoutingModule {}
