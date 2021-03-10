import { Component, OnInit, Injector, forwardRef, Output, EventEmitter, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { RichTextEditorBase } from '../base/rich-text-editor.base';
import { MohTranslateService } from '../../../moh-angular-lib.module';

@Component({
  selector: 'moh-rich-text-editor',
  templateUrl: './rich-text-editor.component.html',
  styleUrls: ['./rich-text-editor.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: forwardRef(() => RichTextEditorComponent) },
    { provide: NG_VALIDATORS, multi: true, useExisting: forwardRef(() => RichTextEditorComponent) }]

})
export class RichTextEditorComponent extends RichTextEditorBase {

  constructor(injector: Injector, mohTranslateService: MohTranslateService) {
    super(injector, mohTranslateService);
   }
}
