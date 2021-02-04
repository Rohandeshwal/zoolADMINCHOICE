import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateContextComponent } from './create-context.component';

describe('CreateContextComponent', () => {
  let component: CreateContextComponent;
  let fixture: ComponentFixture<CreateContextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateContextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateContextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
