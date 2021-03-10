import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionTitleV2Component } from './section-title.v2.component';

describe('SectionTitleV2Component', () => {
  let component: SectionTitleV2Component;
  let fixture: ComponentFixture<SectionTitleV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionTitleV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionTitleV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
