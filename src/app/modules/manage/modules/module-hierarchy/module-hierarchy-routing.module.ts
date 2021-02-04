import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ManageModulesHierarchyComponent } from "./pages/manage-modules-hierarchy/manage-modules-hierarchy.component";
import { CreateHierarchyComponent } from "./components/create-hierarchy/create-hierarchy.component";
import { ManageModulesHierarchyListingComponent } from "./components/manage-modules-hierarchy-listing/manage-modules-hierarchy-listing.component";
import { HierarchyComponent } from "./components/hierarchy/hierarchy.component";

const routes: Routes = [
  {
    path: "",
    component: ManageModulesHierarchyComponent,
    children: [
      {
        path: "",
        redirectTo: "list",
        pathMatch: "full",
      },

      {
        path: "add",
        component: CreateHierarchyComponent,
      },
      {
        path: "edit/:hierarchyId",
        component: CreateHierarchyComponent,
      },

      {
        path: "list",
        component: ManageModulesHierarchyListingComponent,
      },
      {
        path: "hierarchy",
        component: HierarchyComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModuleHierarchyRoutingModule { }
