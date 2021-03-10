import { Component, OnInit, AfterViewChecked, Input, Output, EventEmitter, ElementRef, ViewEncapsulation, forwardRef, ViewChild, ChangeDetectorRef, AfterContentChecked, Injector, AfterViewInit } from '@angular/core';

import { NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { BaseFormControl } from '../../base/base-form-control';
import { BaseAbstractControl } from '../../base/base-abstract-control';
import { ToggleOption } from './ToggleOption';
import { MatButtonToggleGroup } from '@angular/material';

export class SlideToggleBase extends BaseAbstractControl implements OnInit, AfterViewInit {

  @ViewChild(MatButtonToggleGroup, { static: true }) matToggle: MatButtonToggleGroup;

  /**
  * The options of the slide toggle.
  */
  @Input() options: ToggleOption[];
  /**
  * The value of the slide toggle on initialization.
  */
  @Input() defaultSelectedValue: any;

  constructor(injector: Injector, private cdRef: ChangeDetectorRef) {
    super(injector);
    this.baseAbstractControl = new FormControl();
  }

  ngAfterViewInit() {
    if (this.defaultSelectedValue != null && this.defaultSelectedValue != undefined
        && (this.matToggle.value == null || this.matToggle.value == undefined)) {

      setTimeout(() => {
        this.baseAbstractControl.setValue(this.defaultSelectedValue, { emitEvent: false });
        //this.baseAbstractControl.updateValueAndValidity()
      }, 0);

      this.cdRef.detectChanges();
    }
  }
}

