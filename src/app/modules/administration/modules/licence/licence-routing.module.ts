import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LicenceComponent } from './pages/licence/licence.component';
import { LicenceListComponent } from './components/licence-list/licence-list.component';
import { LicenceCreateComponent } from './components/licence-create/licence-create.component';
import { LicenceEditComponent } from './components/licence-edit/licence-edit.component';

const routes: Routes = [
  {
    path: "",
    component: LicenceComponent,
    children: [
      {
        path: "",
        redirectTo: "list",
        pathMatch: "full",
      },
      {
        path: "list",
        component: LicenceListComponent,
      },
      {
        path: "add",
        component: LicenceCreateComponent,
      },
      {
        path: "edit",
        component: LicenceEditComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LicenceRoutingModule {}
