import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditModuleModalComponent } from './edit-module-modal.component';

describe('EditModuleModalComponent', () => {
  let component: EditModuleModalComponent;
  let fixture: ComponentFixture<EditModuleModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditModuleModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditModuleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
