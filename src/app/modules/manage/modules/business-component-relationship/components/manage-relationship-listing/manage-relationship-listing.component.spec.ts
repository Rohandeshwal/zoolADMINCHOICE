import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRelationshipListingComponent } from './manage-relationship-listing.component';

describe('ManageRelationshipListingComponent', () => {
  let component: ManageRelationshipListingComponent;
  let fixture: ComponentFixture<ManageRelationshipListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageRelationshipListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageRelationshipListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
