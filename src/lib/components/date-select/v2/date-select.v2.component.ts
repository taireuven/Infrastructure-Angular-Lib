import { Component, ViewEncapsulation, forwardRef, Injector, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { DateSelectBase } from '../base/date-select.base';

/**
 * The date select component includes 3 fields for day month and year.
 *
 * ### Usage
  ```html

   <!-- basic date-select -->
   <moh-date-select formControlName="dateSelect"></moh-date-select>

   <!-- date-select with inputs -->
   <moh-date-select formControlName="dateSelect" [fromYear]="'1880'" [toYear]="'2018'" [displayDay]="false"
                    [isInputYear]="true" [MarkAsRequired]="true" [sort]="'desc'"></moh-date-select>

 ```
 * <example-url>../screenshots/components/v2/date-select.png</example-url>
*/
@Component({
  selector: 'moh-date-select',
  templateUrl: './date-select.v2.component.html',
  styleUrls: ['./date-select.v2.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DateSelectV2Component), multi: true, },
              { provide: NG_VALIDATORS, multi: true, useExisting: forwardRef(() => DateSelectV2Component) }]
})
export class DateSelectV2Component extends DateSelectBase implements OnInit, OnChanges {
  fieldWidth: number;

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnChanges(changes: SimpleChanges) {
    super.ngOnChanges(changes);

    if (changes.displayDay || changes.displayMonth || changes.displayYear) {
      this.setFieldsWidth();
    }
  }

  ngOnInit() {
    super.ngOnInit();
    this.setFieldsWidth();
  }

  private setFieldsWidth() {
    let fieldsNumber = [this.displayDay, this.displayMonth, this.displayYear].filter(param => param).length;
    this.fieldWidth = fieldsNumber == 1 ? 100 : (100 / fieldsNumber) - 2;
  }
}
