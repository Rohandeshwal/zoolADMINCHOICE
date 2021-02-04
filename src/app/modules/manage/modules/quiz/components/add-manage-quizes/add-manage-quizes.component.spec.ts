import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddManageQuizesComponent } from './add-manage-quizes.component';

describe('AddManageQuizesComponent', () => {
  let component: AddManageQuizesComponent;
  let fixture: ComponentFixture<AddManageQuizesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddManageQuizesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddManageQuizesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
