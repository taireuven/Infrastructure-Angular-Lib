import { Component, forwardRef, ViewEncapsulation, Injector, OnDestroy } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';

import { MAT_DATE_FORMATS, DateAdapter, MAT_DATE_LOCALE } from '@angular/material';

import { DatepickerBase, MOH_FORMATS, MohDateAdapter } from '../base/datepicker.base';
import { Observable } from 'rxjs';
import { MohTranslateService, MohLangChangeEvent } from '../../../moh-angular-lib.module';

/**
* The datepicker allows users to enter a date either through text input, or by choosing a date from the calendar.
*
* ### Usage
* #### HTML
 ```html

  <!-- basic datepicker -->
  <moh-datepicker formControlName="datePickerField"></moh-datepicker>

  <!-- datepicker with inputs -->
  <moh-datepicker formControlName="datePickerField" [maxDate]="maxDate" [minDate]="minDate"
                  [validators]="datePickerValidators" [MarkAsRequired]="true" [isRequired]="true"
                [markAsInvalid]="!demoForm.controls.datePickerField.valid"></moh-datepicker>

 ```
*
* #### TS
 ```typescript

  datePickerValidators: ValidatorFn[] = [mohValidators.maxLength(8)];
  maxDate: Date = new Date(2018, 6, 6);
  minDate: Date = new Date(2018, 3, 1);
 ```
*
* <example-url>../screenshots/components/v2/datepicker-v2.png</example-url>
*/
@Component({
  selector: 'moh-datepicker',
  templateUrl: './datepicker.v2.component.html',
  styleUrls: ['./datepicker.v2.component.scss', '../../../../styles/inputs.v2.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: forwardRef(() => DatepickerV2Component) },
    { provide: NG_VALIDATORS, multi: true, useExisting: forwardRef(() => DatepickerV2Component) },
    { provide: MAT_DATE_LOCALE, useValue: 'he' },
    { provide: MAT_DATE_FORMATS, useValue: MOH_FORMATS },
    { provide: DateAdapter, useClass: MohDateAdapter, deps: [MAT_DATE_LOCALE] },
  ]
})
export class DatepickerV2Component extends DatepickerBase implements OnDestroy {


  constructor(injector: Injector, private adapter: DateAdapter<any>, private mohTranslateService: MohTranslateService) {

    super(injector);

    this.adapter.setLocale(this.mohTranslateService.currentLang);

    this.subscription = this.mohTranslateService.onLangChange.subscribe((event: MohLangChangeEvent) => {
      if (event.lang.code) {
        this.adapter.setLocale(event.lang.code);
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
