import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HierarchyChildTemplateComponent } from './hierarchy-child-template.component';

describe('HierarchyChildTemplateComponent', () => {
  let component: HierarchyChildTemplateComponent;
  let fixture: ComponentFixture<HierarchyChildTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HierarchyChildTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HierarchyChildTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
