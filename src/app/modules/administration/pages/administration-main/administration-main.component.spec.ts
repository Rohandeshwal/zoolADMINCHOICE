import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrationMainComponent } from './administration-main.component';

describe('AdministrationMainComponent', () => {
  let component: AdministrationMainComponent;
  let fixture: ComponentFixture<AdministrationMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrationMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrationMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
