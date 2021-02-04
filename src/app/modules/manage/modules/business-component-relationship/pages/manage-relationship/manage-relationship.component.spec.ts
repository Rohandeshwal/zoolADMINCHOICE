import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRelationshipComponent } from './manage-relationship.component';

describe('ManageRelationshipComponent', () => {
  let component: ManageRelationshipComponent;
  let fixture: ComponentFixture<ManageRelationshipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageRelationshipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageRelationshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
