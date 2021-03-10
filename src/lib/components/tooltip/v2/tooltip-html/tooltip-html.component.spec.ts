import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TooltipHtmlComponent } from './tooltip-html.component';

describe('TooltipHtmlComponent', () => {
  let component: TooltipHtmlComponent;
  let fixture: ComponentFixture<TooltipHtmlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TooltipHtmlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TooltipHtmlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
