import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextboxV2Component } from './textbox.v2.component';

describe('TextboxV2Component', () => {
  let component: TextboxV2Component;
  let fixture: ComponentFixture<TextboxV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextboxV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextboxV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
