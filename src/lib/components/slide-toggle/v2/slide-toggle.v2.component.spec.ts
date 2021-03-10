import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideToggleV2Component } from './slide-toggle.v2.component';

describe('SlideToggleV2Component', () => {
  let component: SlideToggleV2Component;
  let fixture: ComponentFixture<SlideToggleV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlideToggleV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideToggleV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
