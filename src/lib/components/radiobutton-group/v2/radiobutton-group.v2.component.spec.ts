import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadiobuttonGroupV2Component } from './radiobutton-group.v2.component';

describe('RadiobuttonGroupV2Component', () => {
  let component: RadiobuttonGroupV2Component;
  let fixture: ComponentFixture<RadiobuttonGroupV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RadiobuttonGroupV2Component]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadiobuttonGroupV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
