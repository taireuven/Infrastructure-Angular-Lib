import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RichTextMessageComponent } from './rich-text-message.component';

describe('RichTextMessageComponent', () => {
  let component: RichTextMessageComponent;
  let fixture: ComponentFixture<RichTextMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RichTextMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RichTextMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
