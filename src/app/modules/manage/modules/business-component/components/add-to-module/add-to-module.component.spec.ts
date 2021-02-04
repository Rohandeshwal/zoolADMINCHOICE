import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToModuleComponent } from './add-to-module.component';

describe('AddToModuleComponent', () => {
  let component: AddToModuleComponent;
  let fixture: ComponentFixture<AddToModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddToModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
