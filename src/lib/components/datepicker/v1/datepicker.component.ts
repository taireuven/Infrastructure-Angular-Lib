import { Component, forwardRef, ViewEncapsulation, Injector } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';

import { MAT_DATE_FORMATS, DateAdapter, MAT_DATE_LOCALE } from '@angular/material';

import { DatepickerBase, MOH_FORMATS, MohDateAdapter } from '../base/datepicker.base';
// import { MohLangChangeEvent, MohTranslateService } from '../../../../moh-angular-lib.module';
import { MohLangChangeEvent, MohTranslateService } from '../../../services/translate/moh-translate.service';

/**
* The datepicker allows users to enter a date either through text input, or by choosing a date from the calendar.
*
* ### Usage
* #### HTML
* ```html

  <!-- basic datepicker -->
  <moh-datepicker formControlName="datePickerField"></moh-datepicker>

  <!-- datepicker with inputs -->
  <moh-datepicker formControlName="datePickerField" [maxDate]="maxDate" [minDate]="minDate" [validators]="datePickerValidators"
                [MarkAsRequired]="true" [isRequired]="true"></moh-datepicker>

* ```
*
* #### TS
* ```typescript

  datePickerValidators: ValidatorFn[] = [mohValidators.maxLength(8)];
  maxDate: Date = new Date(2018, 6, 6);
  minDate: Date = new Date(2018, 3, 1);
* ```
*
* <example-url>../screenshots/components/v1/datepicker.png</example-url>
*/
@Component({
  selector: 'moh-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: forwardRef(() => DatepickerComponent) },
    { provide: NG_VALIDATORS, multi: true, useExisting: forwardRef(() => DatepickerComponent) },
    { provide: MAT_DATE_LOCALE, useValue: 'he' },
    { provide: MAT_DATE_FORMATS, useValue: MOH_FORMATS },
    { provide: DateAdapter, useClass: MohDateAdapter, deps: [MAT_DATE_LOCALE] },
  ]
})

export class DatepickerComponent extends DatepickerBase {
  constructor(injector: Injector, private adapter: DateAdapter<any>, private mohTranslateService: MohTranslateService) {
    super(injector);

    this.adapter.setLocale(this.mohTranslateService.currentLang);

    this.mohTranslateService.onLangChange.subscribe((event: MohLangChangeEvent) => {
      if (event.lang.code) {
        this.adapter.setLocale(event.lang.code);
      }
    });
  }
}


