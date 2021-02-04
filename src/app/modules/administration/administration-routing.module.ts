import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AdministrationMainComponent } from "./pages/administration-main/administration-main.component";

const routes: Routes = [
  {
    path: "",
    component: AdministrationMainComponent,
    children: [
      { path: "", redirectTo: "user", pathMatch: "full" },
      {
        path: "user",
        loadChildren: () =>
          import("./modules/user/user.module").then((m) => m.UserModule),
      },
      {
        path: "organization",
        loadChildren: () =>
          import("./modules/organization/organization.module").then(
            (m) => m.OrganizationModule
          ),
      },
      {
        path: "team",
        loadChildren: () =>
          import("./modules/team/team.module").then((m) => m.TeamModule),
      },
      {
        path: "collaborator",
        loadChildren: () =>
          import("./modules/collaborator/collaborator.module").then(
            (m) => m.CollaboratorModule
          ),
      },
      {
        path: "institution",
        loadChildren: () =>
          import("./modules/institution/institution.module").then(
            (m) => m.InstitutionModule
          ),
      },
      {
        path: "roles",
        loadChildren: () =>
          import("./modules/roles/roles.module").then((m) => m.RolesModule),
      },
      {
        path: "licence",
        loadChildren: () =>
          import("./modules/licence/licence.module").then(
            (m) => m.LicenceModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministrationRoutingModule {}
