import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageContextRelationComponent } from './manage-context-relation.component';

describe('ManageContextRelationComponent', () => {
  let component: ManageContextRelationComponent;
  let fixture: ComponentFixture<ManageContextRelationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageContextRelationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageContextRelationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
