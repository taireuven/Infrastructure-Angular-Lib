import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordV2Component } from './password.v2.component';

describe('PasswordV2Component', () => {
  let component: PasswordV2Component;
  let fixture: ComponentFixture<PasswordV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
