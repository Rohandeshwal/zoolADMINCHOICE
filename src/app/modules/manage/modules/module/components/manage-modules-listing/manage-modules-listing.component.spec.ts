import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageModulesListingComponent } from './manage-modules-listing.component';

describe('ManageObjListingComponent', () => {
  let component: ManageModulesListingComponent;
  let fixture: ComponentFixture<ManageModulesListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageModulesListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageModulesListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
