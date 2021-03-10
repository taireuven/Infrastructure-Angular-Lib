import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TelephoneV2Component } from './telephone.v2.component';

describe('Telephone.V2Component', () => {
  let component: TelephoneV2Component;
  let fixture: ComponentFixture<TelephoneV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TelephoneV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelephoneV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
