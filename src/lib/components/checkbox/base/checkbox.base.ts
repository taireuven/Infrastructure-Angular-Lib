import { Component, OnInit, Input, ViewEncapsulation, forwardRef, ElementRef, Injector } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl } from '@angular/forms';
import { BaseAbstractControl } from '../../base/base-abstract-control';

export class CheckboxBase extends BaseAbstractControl {

    /**
   * The text to be displayed beside the checkbox.
   */
  @Input() text: string;

  constructor(injector: Injector) {
    super(injector);
    this.baseAbstractControl = new FormControl();
  }
}
