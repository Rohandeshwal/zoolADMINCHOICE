import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRolesFormComponent } from './edit-roles-form.component';

describe('EditRolesFormComponent', () => {
  let component: EditRolesFormComponent;
  let fixture: ComponentFixture<EditRolesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRolesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRolesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
