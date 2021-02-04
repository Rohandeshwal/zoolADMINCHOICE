import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageContextGroupComponent } from './manage-context-group.component';

describe('ManageContextGroupComponent', () => {
  let component: ManageContextGroupComponent;
  let fixture: ComponentFixture<ManageContextGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageContextGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageContextGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
