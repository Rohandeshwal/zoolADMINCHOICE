import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageModulesHierarchyListingComponent } from './manage-modules-hierarchy-listing.component';

describe('ManageModulesHierarchyListingComponent', () => {
  let component: ManageModulesHierarchyListingComponent;
  let fixture: ComponentFixture<ManageModulesHierarchyListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageModulesHierarchyListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageModulesHierarchyListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
