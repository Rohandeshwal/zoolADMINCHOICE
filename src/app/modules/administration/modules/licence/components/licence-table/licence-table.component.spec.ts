import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenceTableComponent } from './licence-table.component';

describe('LicenceTableComponent', () => {
  let component: LicenceTableComponent;
  let fixture: ComponentFixture<LicenceTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicenceTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicenceTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
