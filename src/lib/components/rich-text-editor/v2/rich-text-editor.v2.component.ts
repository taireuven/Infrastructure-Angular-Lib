import { Component, OnInit, Injector, forwardRef, ChangeDetectionStrategy } from '@angular/core';
import { RichTextEditorBase } from '../base/rich-text-editor.base';
import { MohTranslateService } from '../../../moh-angular-lib.module';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';

@Component({
  selector: 'moh-rich-text-editor',
  templateUrl: './rich-text-editor.v2.component.html',
  styleUrls: ['./rich-text-editor.v2.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: forwardRef(() => RichTextEditorV2Component) },
    { provide: NG_VALIDATORS, multi: true, useExisting: forwardRef(() => RichTextEditorV2Component) }]
})
export class RichTextEditorV2Component extends RichTextEditorBase {

  constructor(injector: Injector, mohTranslateService: MohTranslateService) {
    super(injector, mohTranslateService);
  }
}