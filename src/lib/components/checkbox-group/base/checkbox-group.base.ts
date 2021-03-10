import { OnInit, Input, Output, Injector } from '@angular/core';
import { FormControl } from '@angular/forms';

import { MatSelectionList } from '@angular/material'

import { BaseAbstractControl } from '../../base/base-abstract-control';

export class CheckboxGroupBase extends BaseAbstractControl {

  /**
  * The options list.
  */
  _options: any[];
  @Input() set options(value: any[]) {
    this._options = value;
    if (this._options && this.options.length > 0) {
      if (this.baseAbstractControl.value) {
        setTimeout(() => { this.baseAbstractControl.setValue(this.baseAbstractControl.value, { emitEvent: false }) });
      }
    }
  }
  get options(): any[] {
    return this._options;
  }

  /**
  * The display field name of the option object.
  */
  @Input() displayField?: string;
  /**
  * The value field name of the option object.
  */
  @Input() valueField?: string;

  constructor(injector: Injector) {
    super(injector);
    this.baseAbstractControl = new FormControl();
  }

  displayFn(value: any) {
    if (this.displayField) {
      return value[this.displayField];
    }
    else
      return value;
  }
}
