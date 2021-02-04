import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBusinessRelationGroupComponent } from './manage-business-relation-group.component';

describe('ManageBusinessRelationGroupComponent', () => {
  let component: ManageBusinessRelationGroupComponent;
  let fixture: ComponentFixture<ManageBusinessRelationGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageBusinessRelationGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageBusinessRelationGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
