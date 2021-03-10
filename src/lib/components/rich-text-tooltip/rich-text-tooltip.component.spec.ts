import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RichTextTooltipComponent } from './rich-text-tooltip.component';

describe('RichTextTooltipComponent', () => {
  let component: RichTextTooltipComponent;
  let fixture: ComponentFixture<RichTextTooltipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RichTextTooltipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RichTextTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
