import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseStudyAssessmentRatingComponent } from './case-study-assessment-rating.component';

describe('CaseStudyAssessmentRatingComponent', () => {
  let component: CaseStudyAssessmentRatingComponent;
  let fixture: ComponentFixture<CaseStudyAssessmentRatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseStudyAssessmentRatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseStudyAssessmentRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
