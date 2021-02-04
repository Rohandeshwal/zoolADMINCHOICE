import { NgModule } from '@angular/core';
import {Routes,RouterModule } from '@angular/router';
import { ManageModulesComponent } from './pages/manage-modules/manage-modules.component';
import { ManageModulesListingComponent } from './components/manage-modules-listing/manage-modules-listing.component';
import { AddManageModulesFormComponent } from './components/add-manage-modules-form/add-manage-modules-form.component';

const routes: Routes = [
    {
      path: "",
      component: ManageModulesComponent,
      children: [
        {
          path: "",
          redirectTo: "list",
          pathMatch: "full",
        },
        {
          path: "list",
          component: ManageModulesListingComponent,
        },
        {
          path: "add",
          component: AddManageModulesFormComponent,
        },
        {
          path: "edit/:moduleId",
          component: AddManageModulesFormComponent,
        },
      ],
    }];
    
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class ModuleRoutingModule {}