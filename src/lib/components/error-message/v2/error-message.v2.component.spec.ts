import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorMessageV2Component } from './error-message.v2.component';

describe('ErrorMessageV2Component', () => {
  let component: ErrorMessageV2Component;
  let fixture: ComponentFixture<ErrorMessageV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorMessageV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorMessageV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
