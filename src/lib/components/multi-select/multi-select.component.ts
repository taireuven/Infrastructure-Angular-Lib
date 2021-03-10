import { Component, OnInit, Injector, forwardRef, ViewEncapsulation, Input, ChangeDetectionStrategy, Output, EventEmitter, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl } from '@angular/forms';
import { BaseAbstractControl } from '../base/base-abstract-control';
import { SelectGroup } from '../select/base/SelectGroup';
import { MatSelectChange } from '@angular/material';
import { BehaviorSubject, Observable } from 'rxjs';
import { scan } from 'rxjs/operators';

/**
 *<moh-multi-select> is a form control for selecting multiple values from a set of options.
 * ### Usage
 * ####HTML
 * 
   ```html
   <!-- basic multi-select  -->
      <moh-multi-select [options]="optionsList"
                        textKey="multiSelectLabel"
                        formControlName="multiSelect"></moh-multi-select>


   <!-- multi-select with objects list  -->

  <moh-multi-select [options]="optionsObjList"
                    textKey="multiSelectLabel"
                    formControlName="multiSelect"
                    displayField="text" valueField="id"></moh-multi-select>


 <!-- multi-select with group options  -->

  <moh-multi-select [groupsOptions]="groupsOptions"
                    textKey="multiSelectLabel"
                    formControlName="multiSelect"
                    displayField="text" valueField="id"></moh-multi-select>


   <!-- multi-select with some inputs  -->

  <moh-multi-select [options]="optionsList"
                    textKey="multiSelectLabel"
                    formControlName="multiSelect"
                    [MarkAsRequired]="true"
                    [isDisabled]="isDisabled"
                    [markAsInvalid]="(form.controls.multiSelect.touched ||
                    !!form['submitted'])&&!(form.controls.multiSelect.valid)"></moh-multi-select>
   ```
*
* #### TS
   ```typescript
   optionsList = ['option1', 'option2', 'option3'];

   optionsObjList = [{id:1, text:'option1'}, {id:2, text:'option2}', {id:3, text:'option3'}]

  groupsOptions: SelectGroup[] = [{
    title: 'קבוצה ראשונה',
    options: [
      { Id: 3, text: 'הצהרה' },
      { Id: 4, text: 'בקשה חדשה' }
    ]
  },
  {
    title: 'קבוצה שניה',
    disabsled:true,
    options: [
      { Id: 0, text: 'רישום יבואן' },
      { Id: 2, text: 'אישור מוקדם ליבוא מזון רגיש ' }
    ]
  }];
   ```

 * 
 * <example-url>../screenshots/components/v2/multi-select.png</example-url>
 * <example-url>../screenshots/components/v2/multi-select-open.png</example-url>
 * */
@Component({
  selector: 'moh-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss', '../../../styles/inputs.v2.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: forwardRef(() => MultiSelectComponent) },
    { provide: NG_VALIDATORS, multi: true, useExisting: forwardRef(() => MultiSelectComponent) }]
})
export class MultiSelectComponent extends BaseAbstractControl implements OnInit {

  _options: any[];
  get options(): any[] {
    return this._options;
  }
  /**
  * The list of options to be displayed in the select.
  */
  @Input() set options(value: any[]) {
    this._options = value;
    this.offset = 0;
    this.length = this._options ? this._options.length : 0;
    this.getNextBatch(true);
  }
  /**
  * The display field name of the option object.
  */
  @Input() displayField?: string = null;
  /**
  * The value field name of the option object.
  */
  @Input() valueField?: string;
  /**
  * A function returning the value to be displayed.
  */
  @Input() displayFn: any;

  _groupsOptions: SelectGroup[];
  get groupsOptions(): SelectGroup[] {
    return this._groupsOptions;
  }
  /**
  * The list of options` groups to be displayed in the select.
  */
  @Input() set groupsOptions(value: SelectGroup[]) {
    this._groupsOptions = value;
    this.offset = 0;
    this.length = this._groupsOptions ? this._groupsOptions.length : 0;
    this.getNextBatch(true);
  }
  /**
  * Change direction of select option: 'ltr' | 'rtl', by default get lang direction
  */
  @Input() optionsDirection: string = null;
  /**
  * Icon to shoe beside select.
  */
  @Input() iconName?: string = "";
  /**
   * Limitation of options displayed.
   */
  @Input() limit: number = 30;
  /**
   * Limitation of groups displayed (when use groupsOptions).
   */
  @Input() groupLimit: number = 5;

  /**
   * Function to compare the option values with the selected values. 
   * The first argument is a value from an option. The second is a value from the selection. 
   * A boolean should be returned.
   */
  @Input() compareWith: (o1: any, o2: any) => boolean = (o1: any, o2: any) => o1 === o2;
  /**
  * Event emitted when the select panel has been toggled.
  */
  @Output() openedChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  /**
  * Event emitted when the selected value has been changed by the user.
  */
  @Output() selectionChange: EventEmitter<MatSelectChange> = new EventEmitter<MatSelectChange>();

  offset = 0;
  optionsSubject = new BehaviorSubject<any[]>([]);
  options$: Observable<any[]> = this.optionsSubject.asObservable();
  length: number = 0;

  constructor(injector: Injector) {
    super(injector);
    this.baseAbstractControl = new FormControl();
  }

  ngOnInit() {
    super.ngOnInit();
  }

  getNextBatch(optionsChanged: boolean = false) {
    let result;
    let limit = this.groupsOptions ? this.groupLimit : this.limit;
    let options = this.groupsOptions || this.options || [];

    if (optionsChanged) {
      result = options.slice(this.offset, this.offset + limit);
    }
    else {
      result = [...this.optionsSubject.value, ...options.slice(this.offset, this.offset + limit)];
    }

    this.optionsSubject.next(result);
    this.offset += limit;
  }

  getDisplayValue(option) {
    if (option) {
      if (!this.displayField) {
        if (this.displayFn instanceof Function)
          return this.displayFn(option);
        return option;
      }
      return option[this.displayField];
    }
  }

  onOpenedChange(event: boolean) {
    this.openedChange.emit(event);
  }

  onSelectionChange(event: MatSelectChange) {
    this.selectionChange.emit(event);
  }

}
