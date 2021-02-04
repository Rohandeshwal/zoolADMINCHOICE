import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageModulesHierarchyComponent } from './manage-modules-hierarchy.component';

describe('ManageObjectHierarchyComponent', () => {
  let component: ManageModulesHierarchyComponent;
  let fixture: ComponentFixture<ManageModulesHierarchyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageModulesHierarchyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageModulesHierarchyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
