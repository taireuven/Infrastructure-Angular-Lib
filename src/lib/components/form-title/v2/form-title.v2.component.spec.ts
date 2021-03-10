import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTitleV2Component } from './form-title.v2.component';

describe('FormTitleV2Component', () => {
  let component: FormTitleV2Component;
  let fixture: ComponentFixture<FormTitleV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormTitleV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTitleV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
