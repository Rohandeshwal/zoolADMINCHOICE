import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseStudyInfoComponent } from './case-study-info.component';

describe('CaseStudyInfoComponent', () => {
  let component: CaseStudyInfoComponent;
  let fixture: ComponentFixture<CaseStudyInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseStudyInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseStudyInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
