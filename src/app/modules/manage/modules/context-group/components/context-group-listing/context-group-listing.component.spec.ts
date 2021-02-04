import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContextGroupListingComponent } from './context-group-listing.component';

describe('ContextGroupListingComponent', () => {
  let component: ContextGroupListingComponent;
  let fixture: ComponentFixture<ContextGroupListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContextGroupListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContextGroupListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
