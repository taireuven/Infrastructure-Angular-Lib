import { Component, ViewEncapsulation, forwardRef, Injector } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DateSelectBase } from '../base/date-select.base';

/**
 * The date select component includes 3 fields for day month and year.
 *
 * ### Usage
 * ```html

   <!-- basic date-select -->
   <moh-date-select formControlName="dateSelect"></moh-date-select>

   <!-- date-select with inputs -->
   <moh-date-select formControlName="dateSelect" [fromYear]="'1880'" [toYear]="'2018'" [displayDay]="false"
                    [isInputYear]="true" [MarkAsRequired]="true" [sort]="'desc'"></moh-date-select>

 ```
 * <example-url>../screenshots/components/v1/date-select.png</example-url>
*/
@Component({
  selector: 'moh-date-select',
  templateUrl: './date-select.component.html',
  styleUrls: ['./date-select.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DateSelectComponent), multi: true, }]
})
export class DateSelectComponent extends DateSelectBase {

  constructor(injector: Injector) {
    super(injector);
  }
}

