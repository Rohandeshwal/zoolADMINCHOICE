import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddModuleModalComponent } from './add-module-modal.component';

describe('AddModuleModalComponent', () => {
  let component: AddModuleModalComponent;
  let fixture: ComponentFixture<AddModuleModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddModuleModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddModuleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
