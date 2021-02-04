import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCasestudyComponent } from './manage-casestudy.component';

describe('ManageCasestudyComponent', () => {
  let component: ManageCasestudyComponent;
  let fixture: ComponentFixture<ManageCasestudyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageCasestudyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCasestudyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
