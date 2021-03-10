import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, Input, ViewEncapsulation, forwardRef, Injector, ChangeDetectorRef, Output, EventEmitter, HostListener } from '@angular/core';
import { Subscription, Observable, from } from 'rxjs';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { DateTime } from 'luxon';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl } from '@angular/forms';
import { BaseAbstractControl } from '../base/base-abstract-control';
import { log } from 'util';
import * as momentImported from 'moment';
import { window } from 'rxjs/operators';
const moment = momentImported;
/**
 * <moh-timeselect> is an input to select time
 *
 * ### Usage
  ```html
   <!-- basic timeselect -->
   <moh-timeselect></moh-timeselect>

  <!--timeselect with extended options -->
  <moh-timeselect labelText="הזן שעה"
                [isDisabled]="isDisabled"
                [format]="24"
                [MarkAsRequired]=true
                [defaultTime]="'1:00 PM'"
                (timeChanged)="timeChanged($event)">
  </moh-timeselect>

  ```
 * <example-url>../screenshots/components/timeselect.png</example-url>
 */
@Component({
  selector: 'moh-timeselect',
  templateUrl: 'timeselect.component.html',
  styleUrls: ['timeselect.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: forwardRef(() => TimeselectComponent) },
    { provide: NG_VALIDATORS, multi: true, useExisting: forwardRef(() => TimeselectComponent) }]

})

export class TimeselectComponent extends BaseAbstractControl implements OnInit {

  /**
  * Format of hours - 24 or 12 
  */
  @Input() format: number;
  /**
  * Enable/Disable value editing 
  */
  @Input() disabled: boolean;
  /**
  * Min time 
  */
  @Input() min: string | DateTime;
  /**
  * Max time 
  */
  @Input() max: string | DateTime;
  /**
  * Default time 
  */
  @Input() defaultTime: string;
  /**
 * Event emitted when the value is changed.
 */
  @Output() timeChanged = new EventEmitter<string>();

  /*@Input()*/ gapMinutes: number = 1;

  beforeChangeTime: Date=null;

  constructor(injector: Injector, private cdRef: ChangeDetectorRef) {
    super(injector);
    this.baseAbstractControl = new FormControl();
  }
  
  ngOnInit() {
    super.ngOnInit();
  }

  onTimeChanged(time) {
    this.timeChanged.emit(time);
      //if (this.gapMinutes != null && this.gapMinutes > 1) {
      //  this.changeMinutesByGap(time);
      //}
   
  }
  changeMinutesByGap(time: string) {
    let hour: number = parseInt(time.substring(0, 2));
    let minutes: number = parseInt(time.substring(3, 5))

    let date = new Date()
    date.setHours(hour);
    date.setMinutes(minutes);
    
    if ((this.beforeChangeTime != null && this.beforeChangeTime.getHours() == hour) ||
      this.beforeChangeTime == null && (hour == 12 || hour == 0)) { 

      if (minutes - (this.gapMinutes - 1) < 0 ||
        (this.beforeChangeTime == null && minutes - this.gapMinutes < 0) ||
        (this.beforeChangeTime != null && this.beforeChangeTime.getMinutes() != 0 && this.beforeChangeTime.getMinutes() < minutes))
        date = moment(date).add(this.gapMinutes - 1, 'm').hour(hour).toDate();
      else
        date = moment(date).subtract(this.gapMinutes - 1, 'm').hour(hour).toDate();
      
      this.baseAbstractControl.setValue(hour.toString() + ":" + date.getMinutes().toString());
    }
    this.beforeChangeTime = date;

  }
}
