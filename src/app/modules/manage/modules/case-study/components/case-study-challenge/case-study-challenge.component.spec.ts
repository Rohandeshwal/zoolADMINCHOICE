import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseStudyChallengeComponent } from './case-study-challenge.component';

describe('CaseStudyChallengeComponent', () => {
  let component: CaseStudyChallengeComponent;
  let fixture: ComponentFixture<CaseStudyChallengeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseStudyChallengeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseStudyChallengeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
