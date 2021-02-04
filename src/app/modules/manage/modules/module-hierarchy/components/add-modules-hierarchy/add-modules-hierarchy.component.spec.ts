import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddModulesHierarchyComponent } from './add-modules-hierarchy.component';

describe('AddModulesHierarchyComponent', () => {
  let component: AddModulesHierarchyComponent;
  let fixture: ComponentFixture<AddModulesHierarchyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddModulesHierarchyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddModulesHierarchyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
