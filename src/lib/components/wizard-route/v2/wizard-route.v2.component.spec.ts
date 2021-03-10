import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardRouteV2Component } from './wizard-route.v2.component';

describe('WizardRouteV2Component', () => {
  let component: WizardRouteV2Component;
  let fixture: ComponentFixture<WizardRouteV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WizardRouteV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WizardRouteV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
