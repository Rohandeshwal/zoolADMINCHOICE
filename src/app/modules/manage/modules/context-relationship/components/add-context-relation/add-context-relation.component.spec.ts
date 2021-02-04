import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddContextRelationComponent } from './add-context-relation.component';

describe('AddContextRelationComponent', () => {
  let component: AddContextRelationComponent;
  let fixture: ComponentFixture<AddContextRelationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddContextRelationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddContextRelationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
