import { OnInit, Input, ViewChild, Injector, ElementRef, SimpleChanges, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, AbstractControl, ValidatorFn } from '@angular/forms';

import { MatInput, NativeDateAdapter, MAT_DATE_FORMATS, DateAdapter, MAT_DATE_LOCALE } from '@angular/material';
import * as momentImported from 'moment';
import 'moment/locale/en-au';
import 'moment/locale/he';

import { BaseAbstractControl } from '../../base/base-abstract-control';
import { mohValidators } from '../../error-message/base/mohValidators';
import { MohValidationErrors } from '../../error-message/base/mohValidationErrors';
import { Platform } from '@angular/cdk/platform';

/**
 * @ignore
 */
const moment = momentImported;

/**
 * @ignore
 */
const dateRejex = /^\d{1,2}\/\d{1,2}\/\d{4}$/;

/**
 * @ignore
 */
export const MOH_FORMATS = {
  parse: {
    dateInput: { month: 'short', year: 'numeric', day: 'numeric' }
  },
  display: {
    // dateInput: { month: 'short', year: 'numeric', day: 'numeric' },
    dateInput: 'input',
    monthYearLabel: { year: 'numeric', month: 'short' },
    dateAl1yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
    monthYearA11yLabel: { year: 'numeric', month: 'long' },
  }
};

/**
 * @ignore
 */
export class MohDateAdapter extends NativeDateAdapter {
  constructor(matDateLocale: string) {
    super(matDateLocale, new Platform());
  }
  format(date: Date, displayFormat: Object): string {
    if (displayFormat == "input") {
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      return this._to2digit(day) + '/' + this._to2digit(month) + '/' + year;
    }
    else {
      var formatedDate = moment(date).locale(this.locale).format('MMMM YYYY');
      return formatedDate;
    }
  }

  private _to2digit(n: number) {
    return ('00' + n).slice(-2);
  }
}

export class DatepickerBase extends BaseAbstractControl implements OnInit {

  /**
  * The date to open the calendar to initially.
  */
  @Input() startDate: Date;
  /**
  * The minimum valid date.
  */
  @Input() minDate: Date;
  /**
  * The maximum valid date.
  */
  @Input() maxDate: Date;
  /**
  * The placeholder text for the textbox.
  */
  @Input() placeholder: string;
  /**
  * The placeholder text key for the textbox.
  */
  @Input() placeholderKey: string;
  /**
  * Whether the input is disabled.
  */
  @Input() inputDisabled: boolean = false;
  /**
  * Whether the toggle icon is disabled.
  */
  @Input() popupDisabled: boolean = false;
  /**
  * Whether the field is required.
  */
  @Input() isRequired: boolean;
  /**
  * indicate if automatic focus will be on the input field
  */
  @Input() autoFocus: boolean = false;
  /** 
    /** 
  * The value of the textbox input. ex: text.
  */
  @Input() value: any;
  /** 
  * Error message text key when max date error accourd.
  */
  @Input() maxDateErrorMessageKey: string = null;
  /** 
  * Error message text key when min date error accourd.
  */
  @Input() minDateErrorMessageKey: string = null;
  ///**
  // * Event emitted when the value is changed.
  // */
  //@Output() valueChange = new EventEmitter<any>();
  /**
  * Event emitted when the textbox is focused.
  */
  @Output() focus: EventEmitter<any> = new EventEmitter();
  /**
  * Event emitted when the input is blured.
  */
  @Output() blur: EventEmitter<any> = new EventEmitter();
  /** 
   * Event emitted when the enter is pressed.
   */
  @Output() keyUpEnter: EventEmitter<any> = new EventEmitter();
  /** 
   * Event emitted when the datePicker is closed.
   */
  @Output() datepickerOpened: EventEmitter<any> = new EventEmitter();

  /** 
  * Event emitted when the datePicker is closed.
  */
  @Output() datepickerClosed: EventEmitter<any> = new EventEmitter();

  placeholderValue: Observable<string>;
  explain: Observable<string>;

  private _validators: ValidatorFn[];
  get validators(): ValidatorFn[] {
    return this._validators;
  }

  /**
  * Validators array of the control.
  */
  @Input('validators')
  set validators(value: ValidatorFn[]) {
    this._validators = value;
    this.setBasicValidations();
  }

  @ViewChild(MatInput, { static: true }) matInput: MatInput;
  @ViewChild('dateInput', { static: true }) dateInput: ElementRef;

  cdr: ChangeDetectorRef;

  constructor(injector: Injector) {
    super(injector);
    this.cdr = injector.get(ChangeDetectorRef);
    this.baseAbstractControl = new FormControl();
  }

  ngOnInit() {
    super.ngOnInit();
    this.placeholderValue = this.getLabelText(this.placeholderKey);
    this.explain = this.getLabelText("accessibilityExplain");

    if (this.validators == undefined) {
      this.setBasicValidations();
    }

    if (this.isDisabled || this.inputDisabled) {
      this.baseAbstractControl.disable();
    }
    if (this.autoFocus == null || this.autoFocus !== false) {
      if (this.dateInput)
        this.dateInput.nativeElement.focus();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.maxDate || changes.minDate || changes.isRequired) {
      this.setBasicValidations();
    }
    this.cdr.detectChanges();
  }

  dateChanged(event) {
    if (!this.dateValid(this.baseAbstractControl) && this.dateInput.nativeElement.value) {
      this.baseAbstractControl.setValue(moment(this.dateInput.nativeElement.value, 'DD/MM/YYYY').toDate())
    }
  }

  dateValid(control: AbstractControl): MohValidationErrors | null {
    let value = this.dateInput.nativeElement.value;

    if (!value || (dateRejex.test(value) && moment(value, 'DD/MM/YYYY').isValid())) return null;

    return {
      'validDate': { errorMessageKey: 'validityDate' }
    };
  }

  maxDateValidator(control: AbstractControl): MohValidationErrors | null {
    let value = moment(this.dateInput.nativeElement.value, 'DD/MM/YYYY');
    if (!value || moment.min([value, moment(this.maxDate)]) == value) return null;

    return {
      'maxDate': { errorMessageKey: this.maxDateErrorMessageKey ? this.maxDateErrorMessageKey : 'maxDate' }
    };
  }

  minDateValidator(control: AbstractControl): MohValidationErrors | null {
    let value = moment(this.dateInput.nativeElement.value, 'DD/MM/YYYY');
    if (!value || moment.max([value, moment(this.minDate)]) == value) return null;

    return {
      'minDate': { errorMessageKey: this.minDateErrorMessageKey ? this.minDateErrorMessageKey : 'minDate' }
    };
  }

  dateRequired(control: AbstractControl): MohValidationErrors | null {
    if (this.dateInput.nativeElement.value || control.value) return null;

    return {

      'required': { errorMessageKey: 'required' }
    };
  }

  private setBasicValidations() {
    let newValidators: ValidatorFn[] = [...(this.validators || [])];

    newValidators.push(this.dateValid.bind(this));

    if (this.isRequired) {
      newValidators.push(this.dateRequired.bind(this))
    }

    if (this.maxDate) {
      newValidators.push(this.maxDateValidator.bind(this))
    }

    if (this.minDate) {
      newValidators.push(this.minDateValidator.bind(this))
    }
    this.baseAbstractControl.setValidators(newValidators);
    this.baseAbstractControl.updateValueAndValidity();
  }

  onBlur() {
    this.onTouched();
    this.blur.emit(null);
  }

  onFocus() {
    this.focus.emit();
  }

  onKeyUpEnter() {
    this.keyUpEnter.emit();
  }

  //onModelChange(value: any) {
  //  //date validation
  //  if (this.baseAbstractControl.invalid || value == null) {
  //    return;
  //  }
  //  else {
  //    this.valueChange.emit(value);
  //  }
  //}
  onDatepickerOpened() {
    this.datepickerOpened.emit();
  }
  onDatepickerClosed() {
    this.datepickerClosed.emit();
  }
}


