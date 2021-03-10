import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectLanguageV2Component } from './select-language.v2.component';

describe('SelectLanguageV2Component', () => {
  let component: SelectLanguageV2Component;
  let fixture: ComponentFixture<SelectLanguageV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectLanguageV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectLanguageV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
