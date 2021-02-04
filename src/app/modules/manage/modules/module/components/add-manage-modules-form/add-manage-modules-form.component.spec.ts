import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddManageModulesFormComponent } from './add-manage-modules-form.component';

describe('AddManageModulesFormComponent', () => {
  let component: AddManageModulesFormComponent;
  let fixture: ComponentFixture<AddManageModulesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddManageModulesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddManageModulesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
