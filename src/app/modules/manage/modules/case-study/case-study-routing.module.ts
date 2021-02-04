import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ManageCasestudyComponent } from './pages/manage-casestudy/manage-casestudy.component';
import { CaseStudyListingComponent } from './components/case-study-listing/case-study-listing.component';
import { ManageCaseStudiesComponent } from './components/manage-case-studies/manage-case-studies.component';

const routes: Routes = [
  {
    path: "",
    component: ManageCasestudyComponent,
    children: [
      {
        path: "",
        redirectTo: "list",
        pathMatch: "full",
      },
      {
        path: "list",
        component: CaseStudyListingComponent,
      },
      {
        path: "add",
        component: ManageCaseStudiesComponent,
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CaseStudyRoutingModule {}
