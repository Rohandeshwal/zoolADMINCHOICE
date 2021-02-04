import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContextRelationListComponent } from './context-relation-list.component';

describe('ContextRelationListComponent', () => {
  let component: ContextRelationListComponent;
  let fixture: ComponentFixture<ContextRelationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContextRelationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContextRelationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
