import { Component, OnInit, ElementRef, Input, OnChanges, SimpleChanges, ViewEncapsulation, forwardRef, Renderer, Injector } from '@angular/core';
import { FormBuilder, FormGroup, NG_VALUE_ACCESSOR, AbstractControl, FormControl, ValidatorFn } from '@angular/forms';
import { BaseAbstractControl } from '../../base/base-abstract-control';
import * as momentImported from 'moment'; const moment = momentImported;

import { mohValidators } from '../../error-message/base/mohValidators';
import { FormSubmitService } from '../../../services/form-submit/form-submit.service';
import { of as observableOf, Observable, BehaviorSubject } from 'rxjs';

const dateRejex = /^\d{4}\-\d{1,2}\-\d{1,2}$/;

export class DateSelectBase extends BaseAbstractControl implements OnInit, OnChanges {
  /**
  * From which year to display in year select
  */
  @Input() fromYear: number;
  /**
  * Until what year to display in year select
  */
  @Input() toYear: number;
  /**
  * Whether to display day select or not
  */
  @Input() displayDay: boolean = true;
  /**
  * Whether to display month select or not
  */
  @Input() displayMonth: boolean = true;
  /**
  * Whether to display year select or not
  */
  @Input() displayYear: boolean = true;
  /**
  * Whether the year field is a select or a text input
  */
  @Input() isInputYear: boolean = false;
  /**
  * The minimum valid date in the following format: 'YYYY-MM-DD'
  */
  @Input() minDate: string;
  /**
  * The maximum valid date in the following format: 'YYYY-MM-DD'
  */
  @Input() maxDate: string;
  /**
  * Sorting direction of year select. Options: 'asc' / 'desc'
  */
  @Input() sort: "asc" | "desc" = "asc";

  yearListSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  yearsList: Observable<string[]> = this.yearListSubject.asObservable();
  monthesList: Observable<{ text, id }[]>;
  daysList: Observable<number[]>;
  lang: string;
  validationArray: any[] = [];

  constructor(injector: Injector) {
    super(injector);

    this.baseAbstractControl = new FormGroup({
      year: new FormControl(),
      month: new FormControl(),
      day: new FormControl()
    });

    //need to bring from config the currnet lang.
    this.lang = navigator.language;
    moment.locale(this.lang);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.fromYear || changes.toYear) {
      let years: string[] = [];
      for (var i = this.fromYear; i <= this.toYear; i++) {
        years.push(i.toString());
      }
      years.sort((n1, n2): number => {
        if (this.sort == "desc") {
          if (n1 > n2) {
            return -1;
          }
          if (n1 < n2) {
            return 1;
          }
        }
        else if (this.sort == "asc") {
          if (n1 > n2) {
            return 1;
          }
          if (n1 < n2) {
            return -1;
          }
        }
        return 0;
      });

      this.yearListSubject.next(years);
    }

    if (changes.displayDay && changes.displayDay.currentValue) {
      this.setDayList(31);
    }

    if (changes.maxDate || changes.minDate || changes.MarkAsRequired) {
      this.setValidators();
    }

    if (changes.displayDay || changes.displayMonth || changes.displayYear) {
      this.baseAbstractControl.updateValueAndValidity();
    }
  }

  ngOnInit() {

    this.setValidators();

    let months = [];

    (moment.months()).forEach((month, index) => {
      months.push({
        text: moment().month(month).format("M"),
        id: index + 1
      });
    })

    this.monthesList = observableOf(months);

    this.isInputYear = !this.isInputYear && this.yearsList ? false : true;

    super.ngOnInit();

    if (this.displayDay) {
      this.setDayList(31);
    }

    this.baseAbstractControl.valueChanges.subscribe(val => {
      if (this.displayDay && val.year && val.month) {
        this.setDayList(moment((val.year || val.year.text) + '-' + val.month.id, "YYYY-MM").daysInMonth());
      }
    });

  }

  setDayList(day: number) {
    let days = [];

    for (var i = 1; i <= day; i++) {
      days.push(i);
    }

    this.daysList = observableOf(days);
  }

  showErrors() {
    return ((this.baseAbstractControl.get('year').touched || !this.displayYear)
      && (this.baseAbstractControl.get('month').touched || !this.displayMonth)
      && (this.baseAbstractControl.get('day').touched || !this.displayDay))
      || this.formSubmitted;
  }

  dateValid(): ValidatorFn {
    return (control: AbstractControl) => {
      let year = control.get('year').value || '';
      let month = control.get('month').value ? control.get('month').value.id : '';
      let day = control.get('day').value || '';

      let date = `${this.displayYear ? year : '0001'}-${this.displayMonth ? month : '1'}-${this.displayDay ? day : '1'}`;

      if ((!day && !month && !year) || (dateRejex.test(date) && moment(date, 'YYYY-MM-DD').isValid())) {
        return null;
      }

      if (!day && this.displayDay) {
        return mohValidators.required(null, 'dayRequired')(control.get('day'));
      }
      else if (!month && this.displayMonth) {
        return mohValidators.required(null, 'monthRequired')(control.get('month'));
      }
      else if (!year && this.displayYear) {
        return mohValidators.required(null, 'yearRequired')(control.get('year'));
      }
      else {
        return {
          'isValidityDate': { errorMessageKey: 'validityDate' }
        };
      }
    };
  }

  dateRequired(): ValidatorFn {
    return (control: AbstractControl) => {
      let dateErrors;
      if (this.displayYear) {
        dateErrors = mohValidators.required()(control.get('year'));
        if (dateErrors) {
          return dateErrors;
        }
      }
      if (this.displayMonth) {
        dateErrors = mohValidators.required()(control.get('month'));
        if (dateErrors) {
          return dateErrors;
        }
      }
      if (this.displayDay) {
        dateErrors = mohValidators.required()(control.get('day'));
        if (dateErrors) {
          return dateErrors;
        }
      }

      return null;
    }
  }

  minDateValidator(minDate: string): ValidatorFn {
    return (control: AbstractControl) => {
      let year = control.get('year').value || null;
      let month = control.get('month').value ? control.get('month').value.id : null;
      let day = control.get('day').value || null;

      if (year == null && month == null && day == null) {
        return null;
      }

      return mohValidators.minDate((year + '-' + month + '-' + day), minDate)(control);
    }
  }

  maxDateValidator(maxDate: string): ValidatorFn {
    return (control: AbstractControl) => {
      let year = control.get('year').value || null;
      let month = control.get('month').value ? control.get('month').value.id : null;
      let day = control.get('day').value || null;

      if (year == null && month == null && day == null) {
        return null;
      }

      return mohValidators.maxDate((year + '-' + month + '-' + day), maxDate)(control);
    }
  }

  private setValidators() {
    this.validationArray = [];
    this.validationArray.push(this.dateValid());

    if (this.MarkAsRequired) {
      this.validationArray.push(this.dateRequired());
    }

    if (this.minDate && moment(this.minDate, 'YYYY-MM-DD').isValid()) {
      this.validationArray.push(this.minDateValidator(this.minDate));
    }

    if (this.maxDate && moment(this.maxDate, 'YYYY-MM-DD').isValid()) {
      this.validationArray.push(this.maxDateValidator(this.maxDate));
    }

    this.baseAbstractControl.setValidators(this.validationArray);
    this.baseAbstractControl.updateValueAndValidity();
  }
}

