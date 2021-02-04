import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRelationshipTableFormComponent } from './edit-relationship-table-form.component';

describe('EditRelationshipTableFormComponent', () => {
  let component: EditRelationshipTableFormComponent;
  let fixture: ComponentFixture<EditRelationshipTableFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRelationshipTableFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRelationshipTableFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
