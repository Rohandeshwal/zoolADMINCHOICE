import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageContextComponent } from './manage-context.component';

describe('ManageContextComponent', () => {
  let component: ManageContextComponent;
  let fixture: ComponentFixture<ManageContextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageContextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageContextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
