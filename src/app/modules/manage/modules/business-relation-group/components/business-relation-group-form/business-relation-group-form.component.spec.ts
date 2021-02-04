import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessRelationGroupFormComponent } from './business-relation-group-form.component';

describe('BusinessRelationGroupFormComponent', () => {
  let component: BusinessRelationGroupFormComponent;
  let fixture: ComponentFixture<BusinessRelationGroupFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessRelationGroupFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessRelationGroupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
