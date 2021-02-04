import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRelationshipTableComponent } from './add-relationship-table.component';

describe('AddRelationshipTableComponent', () => {
  let component: AddRelationshipTableComponent;
  let fixture: ComponentFixture<AddRelationshipTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRelationshipTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRelationshipTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
