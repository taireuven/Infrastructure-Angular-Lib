import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoV2Component } from './info.v2.component';

describe('InfoV2Component', () => {
  let component: InfoV2Component;
  let fixture: ComponentFixture<InfoV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
