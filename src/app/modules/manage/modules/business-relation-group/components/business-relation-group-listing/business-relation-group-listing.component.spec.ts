import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessRelationGroupListingComponent } from './business-relation-group-listing.component';

describe('BusinessRelationGroupListingComponent', () => {
  let component: BusinessRelationGroupListingComponent;
  let fixture: ComponentFixture<BusinessRelationGroupListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessRelationGroupListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessRelationGroupListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
