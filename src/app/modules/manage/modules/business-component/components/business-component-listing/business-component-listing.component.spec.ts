import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessComponentListingComponent } from './business-component-listing.component';

describe('BusinessComponentListingComponent', () => {
  let component: BusinessComponentListingComponent;
  let fixture: ComponentFixture<BusinessComponentListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessComponentListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessComponentListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
