import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageQuizComponent} from './pages/manage-quiz/manage-quiz.component';
import { AddManageQuizesComponent} from './components/add-manage-quizes/add-manage-quizes.component';
import { ManageQuizesComponent} from './components/manage-quizes/manage-quizes.component';
import { ManageQuizesListComponent} from './components/manage-quizes-list/manage-quizes-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { QuizRoutingModule } from './quiz-routing.module';

@NgModule({
  declarations: [ManageQuizComponent,AddManageQuizesComponent,ManageQuizesComponent,ManageQuizesListComponent],
  imports: [
    CommonModule,SharedModule,QuizRoutingModule
  ]
})
export class QuizModule { }
