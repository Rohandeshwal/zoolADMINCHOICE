import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateContextRelationComponent } from './update-context-relation.component';

describe('UpdateContextRelationComponent', () => {
  let component: UpdateContextRelationComponent;
  let fixture: ComponentFixture<UpdateContextRelationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateContextRelationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateContextRelationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
