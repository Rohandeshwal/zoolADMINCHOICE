import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageCasestudyComponent } from './pages/manage-casestudy/manage-casestudy.component';
import {CaseStudyAssessmentRatingComponent } from './components/case-study-assessment-rating/case-study-assessment-rating.component';
import { CaseStudyChallengeComponent} from './components/case-study-challenge/case-study-challenge.component';
import { CaseStudyInfoComponent} from './components/case-study-info/case-study-info.component';
import { CaseStudyListingComponent} from './components/case-study-listing/case-study-listing.component';
import { ManageCaseStudiesComponent} from './components/manage-case-studies/manage-case-studies.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CaseStudyRoutingModule } from './case-study-routing.module';

@NgModule({
  declarations: [ManageCasestudyComponent,CaseStudyAssessmentRatingComponent,CaseStudyChallengeComponent,CaseStudyInfoComponent,CaseStudyListingComponent,ManageCaseStudiesComponent],
  imports: [
    CommonModule,SharedModule,CaseStudyRoutingModule
  ]
})
export class CaseStudyModule { }
