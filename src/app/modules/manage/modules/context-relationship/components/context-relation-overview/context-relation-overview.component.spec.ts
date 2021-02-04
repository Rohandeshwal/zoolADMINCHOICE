import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContextRelationOverviewComponent } from './context-relation-overview.component';

describe('ContextRelationOverviewComponent', () => {
  let component: ContextRelationOverviewComponent;
  let fixture: ComponentFixture<ContextRelationOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContextRelationOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContextRelationOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
