import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddContextGroupFormComponent } from './add-context-group-form.component';

describe('AddContextGroupFormComponent', () => {
  let component: AddContextGroupFormComponent;
  let fixture: ComponentFixture<AddContextGroupFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddContextGroupFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddContextGroupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
