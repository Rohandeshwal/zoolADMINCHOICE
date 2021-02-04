import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionListingComponent } from './institution-listing.component';

describe('InstitutionListingComponent', () => {
  let component: InstitutionListingComponent;
  let fixture: ComponentFixture<InstitutionListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitutionListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
