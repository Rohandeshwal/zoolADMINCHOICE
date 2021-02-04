import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationsListingComponent } from './organizations-listing.component';

describe('OrganizationsListingComponent', () => {
  let component: OrganizationsListingComponent;
  let fixture: ComponentFixture<OrganizationsListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationsListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationsListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
