import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesListingComponent } from './roles-listing.component';

describe('RolesListingComponent', () => {
  let component: RolesListingComponent;
  let fixture: ComponentFixture<RolesListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RolesListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolesListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
