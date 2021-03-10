import { Component, OnInit, ViewEncapsulation, Injector, Input, forwardRef, ChangeDetectorRef } from '@angular/core';
import { formControlInfo } from '../../../models/formControlInfo';
import { BaseAbstractControl } from '../../base/base-abstract-control';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

export class RatingBase extends BaseAbstractControl implements OnInit {

  /**
  * The options list- type of formControlInfo.
  */
  @Input() options: formControlInfo[];

  /**
  * The option of no relevant.
  */
  @Input() notRelevantOption: formControlInfo;

  constructor(injector: Injector, cdr: ChangeDetectorRef) {
    super(injector);
    this.baseAbstractControl = new FormControl();
  }
}
