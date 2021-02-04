import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCaseStudiesComponent } from './manage-case-studies.component';

describe('ManageCaseStudiesComponent', () => {
  let component: ManageCaseStudiesComponent;
  let fixture: ComponentFixture<ManageCaseStudiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageCaseStudiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCaseStudiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
