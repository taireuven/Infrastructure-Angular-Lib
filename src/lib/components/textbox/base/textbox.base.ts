import { Component, OnInit, Input, ElementRef, forwardRef, ViewEncapsulation, Injector, OnChanges, SimpleChanges, EventEmitter, Output,ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, NG_VALUE_ACCESSOR, Validator, NG_VALIDATORS } from '@angular/forms';
//import { BaseFormControl } from '../base/base-form-control';
import { BaseAbstractControl } from '../../base/base-abstract-control';
import { Observable } from 'rxjs';
import { MatInput } from '@angular/material';

export class TextboxBase extends BaseAbstractControl implements OnInit, OnChanges {

  /**
  * Placeholder text to display in the textbox.
  */
  @Input() placeholder: string = '';
  /**
  * Placeholder text key to display in the textbox.
  */
  @Input() placeholderKey: string = '';
  /**
  * Max length of the textbox value.
  */
  @Input() maxlength: number;
  /**
  * The type of the textbox input. ex: text.
  */
  @Input() type: string = 'text';
  /**
  * indicate if automatic focus will be on the input field
  */
  @Input() autoFocus: boolean = false;
  /** 
  * The value of the textbox input. ex: text.
  */
  @Input() value: any;
 /**
  * Event emitted when the value is changed.
  */
   @Output() valueChange = new EventEmitter<any>();

 
  /**
  * Event emitted when the textbox is blured.
  */
  @Output() blur: EventEmitter<any> = new EventEmitter();
  /**
  * Event emitted when the textbox is focused.
  */
  @Output() focus: EventEmitter<any> = new EventEmitter();
 /** 
  * Event emitted when the enter is pressed.
  */
  @Output() keyUpEnter: EventEmitter<any> = new EventEmitter();
  //@Input() isDisabled: boolean = false;
  @ViewChild ('input',{static:true}) input: ElementRef;
  placeholderValue: Observable<string>;

  constructor(injector: Injector) {
    super(injector);
    this.baseAbstractControl = new FormControl();
  }

  ngOnInit() {
    super.ngOnInit();
    this.placeholderValue = this.getLabelText(this.placeholderKey);
    if (this.autoFocus== null || this.autoFocus!==false){
     if (this.input)
      this.input.nativeElement.focus();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.isDisabled) {
      if (this.isDisabled) {
        this.baseAbstractControl.disable();
      } else {
        this.baseAbstractControl.enable();
      }
    }
  }

  onBlur() {
    this.onTouched();
    this.blur.emit(null);
  }

  onFocus() {
    this.focus.emit();
  }

  onModelChange(value: any) {
    this.valueChange.emit(value);
  }
  onKeyUpEnter(){
    this.keyUpEnter.emit();
  }
}
