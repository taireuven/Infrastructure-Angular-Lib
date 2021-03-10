import { Input, Injector, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BaseAbstractControl } from '../../base/base-abstract-control';
import { Observable } from 'rxjs';

export class TextareaBase extends BaseAbstractControl implements OnInit, OnChanges {

  /**
 * Maximum characters to insert into textarea.
 */
  @Input() maxChars: number = 250;

  allowedCharactersTextValue: Observable<string>;
  allowedCharactersExplainTextValue: Observable<string>;

  constructor(injector: Injector) {
    super(injector);
    this.baseAbstractControl = new FormControl();
  }

  ngOnInit() {
    this.allowedCharactersTextValue = this.getLabelText('allowedCharacters');
    this.allowedCharactersExplainTextValue = this.getLabelText('allowedCharactersExplain', { maxChatcters: this.maxChars });
    super.ngOnInit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.isDisabled) {
      if (changes.isDisabled.currentValue) {
        this.baseAbstractControl.disable();
      }
      else {
        this.baseAbstractControl.enable()
      }
    }
  }
}
