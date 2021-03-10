import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardRouteComponent } from './wizard-route.component';

describe('WizardRouteComponent', () => {
  let component: WizardRouteComponent;
  let fixture: ComponentFixture<WizardRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WizardRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WizardRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
