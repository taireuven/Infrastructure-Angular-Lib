import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RichTextEditorV2Component } from './rich-text-editor.v2.component';

describe('RichTextEditorV2Component', () => {
  let component: RichTextEditorV2Component;
  let fixture: ComponentFixture<RichTextEditorV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RichTextEditorV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RichTextEditorV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
