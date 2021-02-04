import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ManageBusinessComponent } from './pages/manage-business/manage-business.component';
import { BusinessListingComponent } from './components/business-listing/business-listing.component';
import { AddToModuleComponent } from './components/add-to-module/add-to-module.component';
import { AddBusinessFormComponent } from './components/add-business-form/add-business-form.component';

const routes: Routes = [
  {
    path: "",
    component: ManageBusinessComponent,
    children: [
      {
        path: "",
        redirectTo: "list",
        pathMatch: "full",
      },
      {
        path: "list",
        component: BusinessListingComponent,
      },
      {
        path: "add",
        component: AddBusinessFormComponent,
      },
      {
        path: "addToModules",
        component: AddToModuleComponent,
      }, {
        path: "edit/:businessComponentId",
        component: AddBusinessFormComponent,
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusinessComponentRoutingModule { }
