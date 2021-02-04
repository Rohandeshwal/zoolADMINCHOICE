import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBusinessComponent } from './manage-business.component';

describe('ManageBusinessComponent', () => {
  let component: ManageBusinessComponent;
  let fixture: ComponentFixture<ManageBusinessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageBusinessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
