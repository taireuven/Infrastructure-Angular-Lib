import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCardV2Component } from './form-card.v2.component';

describe('FormCardV2Component', () => {
  let component: FormCardV2Component;
  let fixture: ComponentFixture<FormCardV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormCardV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCardV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
