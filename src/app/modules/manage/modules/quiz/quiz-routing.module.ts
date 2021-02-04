import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ManageQuizComponent } from './pages/manage-quiz/manage-quiz.component';
import { ManageQuizesComponent } from './components/manage-quizes/manage-quizes.component';
import { AddManageQuizesComponent } from './components/add-manage-quizes/add-manage-quizes.component';

const routes: Routes = [
  {
    path: "",
    component: ManageQuizComponent,
    children: [
      {
        path: "",
        redirectTo: "list",
        pathMatch: "full",
      },
      {
        path: "list",
        component: ManageQuizesComponent,
      },
      {
        path: "add",
        component: AddManageQuizesComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuizRoutingModule {}
