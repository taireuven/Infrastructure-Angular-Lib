import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateSelectV2Component } from './date-select.v2.component';

describe('DateSelect.V2Component', () => {
  let component: DateSelectV2Component;
  let fixture: ComponentFixture<DateSelectV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateSelectV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateSelectV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
