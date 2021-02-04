import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ManageMainComponent } from "./pages/manage-main/manage-main.component";

// Routing
const routes: Routes = [
  {
    path: "",
    component: ManageMainComponent,
    children: [
      { path: "", redirectTo: "module", pathMatch: "full" },
      {
        path: "module",
        loadChildren: () =>
          import("./modules/module/module.module").then((m) => m.ModuleModule),
      },
      {
        path: "module-hierarchy",
        loadChildren: () =>
          import("./modules/module-hierarchy/module-hierarchy.module").then(
            (m) => m.ModuleHierarchyModule
          ),
      },

      {
        path: "business-component",
        loadChildren: () =>
          import("./modules/business-component/business-component.module").then(
            (m) => m.BusinessComponentModule
          ),
      },
      {
        path: "business-component-relationship",
        loadChildren: () =>
          import(
            "./modules/business-component-relationship/business-component-relationship.module"
          ).then((m) => m.BusinessComponentRelationshipModule),
      },
      {
        path: "case-study",
        loadChildren: () =>
          import("./modules/case-study/case-study.module").then(
            (m) => m.CaseStudyModule
          ),
      },
      {
        path: "quiz",
        loadChildren: () =>
          import("./modules/quiz/quiz.module").then((m) => m.QuizModule),
      },
      {
        path: "context",
        loadChildren: () =>
          import("./modules/context/context.module").then((m) => m.ContextModule),
      },
      {
        path: "context-relationship",
        loadChildren: () =>
          import(
            "./modules/context-relationship/context-relationship.module"
          ).then((m) => m.ContextRelationshipModule),
      },
      {
        path: "context-group",
        loadChildren: () =>
          import("./modules/context-group/context-group.module").then(
            (m) => m.ContextGroupModule
          ),
      },
      {
        path: "business-relations-group",
        loadChildren: () =>
          import(
            "./modules/business-relation-group/business-relation-group.module"
          ).then((m) => m.BusinessRelationGroupModule),
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageRoutingModule {}
