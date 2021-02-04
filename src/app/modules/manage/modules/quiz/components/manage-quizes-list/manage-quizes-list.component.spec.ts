import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageQuizesListComponent } from './manage-quizes-list.component';

describe('ManageQuizesListComponent', () => {
  let component: ManageQuizesListComponent;
  let fixture: ComponentFixture<ManageQuizesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageQuizesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageQuizesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
