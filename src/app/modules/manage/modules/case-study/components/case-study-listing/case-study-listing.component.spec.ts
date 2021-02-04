import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseStudyListingComponent } from './case-study-listing.component';

describe('CaseStudyListingComponent', () => {
  let component: CaseStudyListingComponent;
  let fixture: ComponentFixture<CaseStudyListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseStudyListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseStudyListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
