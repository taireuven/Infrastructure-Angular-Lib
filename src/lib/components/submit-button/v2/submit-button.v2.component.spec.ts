import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitButtonV2Component } from './submit-button.v2.component';

describe('SubmitButtonV2Component', () => {
  let component: SubmitButtonV2Component;
  let fixture: ComponentFixture<SubmitButtonV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitButtonV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitButtonV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
