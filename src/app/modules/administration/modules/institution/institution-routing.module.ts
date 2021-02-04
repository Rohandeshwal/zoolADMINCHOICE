import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { InstitutionComponent } from './pages/institution/institution.component';
import { InstitutionListingComponent } from './components/institution-listing/institution-listing.component';

const routes: Routes = [
  {
    path: "",
    component: InstitutionComponent,
    children: [
      {
        path: "",
        redirectTo: "list",
        pathMatch: "full",
      },
      {
        path: "list",
        component: InstitutionListingComponent,
      },
   
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstitutionRoutingModule {}
