import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRelationshipTableFormComponent } from './add-relationship-table-form.component';

describe('AddRelationshipTableFormComponent', () => {
  let component: AddRelationshipTableFormComponent;
  let fixture: ComponentFixture<AddRelationshipTableFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRelationshipTableFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRelationshipTableFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
