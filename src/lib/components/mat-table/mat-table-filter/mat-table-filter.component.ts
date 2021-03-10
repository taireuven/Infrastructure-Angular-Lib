import { Component, OnInit, Input, Injector, ViewEncapsulation, Output, EventEmitter, forwardRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { LabelBase } from '../../base/label-base';
import { MohMatTableService } from '../moh-mat-table.service';
import { Observable } from 'rxjs';
import { BaseAbstractControl } from '../../base/base-abstract-control';

/**
 * The Mat table filter component is used to filter the mat table columns according to the user input.
 * To use this component you must use the moh mat table service and initialize the data in your ts code.  
 * 
 * There are 3 types of filters:
 *  1. textbox (default filter) - by typing 
 *  2. select - by selecting (multi select)
 *  3. datepicker - by selecting the date
 *
 * 
 * ### Usage 
 * 
  ```html
  
   <moh-mat-table-filter  [column]="'email'"> </moh-mat-table-filter> 
   <moh-mat-table-filter [type]="'select'" [column]="'name'" [options]="options"> </moh-mat-table-filter>
   <moh-mat-table-filter [type]="'datepicker'" [column]="'brithDate'"> </moh-mat-table-filter>
  ```
  
  ```typescript
   options: string[]=['Kurtis Weissnat  ','Mrs. Dennis Schulist'];
   this.mohMatTableService.initDataSource(this.dataSource, this.dataObjects);
  ```
*/
@Component({
  selector: 'moh-mat-table-filter',
  templateUrl: './mat-table-filter.component.html',
  styleUrls: ['./mat-table-filter.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => MatTableFilterComponent), multi: true, }]
})
export class MatTableFilterComponent extends BaseAbstractControl implements OnInit {

  private _column: string = '';
  private _type: string = 'textbox';
  private _options: any[];
  public selected: string = '';
  dataSource: MatTableDataSource<any>;
  //form: FormGroup;
  placeholderValue: Observable<string>;
  /**
   * column input (name of the column in mat table- indeed it is  the name of the propert in the array objects data of the table)
   */

  @Input()
  set column(column: string) {
    this._column = column;
  }
  get column(): string {
    return this._column;
  }

  /**
   * type input :textbox/ select/ datepicker/ toggle.
   * the filter type is textbox by default
   */

  @Input()
  set type(type: string) {
    this._type = type;
  }
  get type(): string {
    return this._type;
  }


  /**
   * options input 
   * In case that the filter is select.
   * The options will be shown in the select list.
   */
  @Input()
  set options(options: any[]) {
    this._options = options;
  }
  get options(): any[] {
    return this._options;
  }

  /**
   * In case that the filter is select, and the options is array of objects.
   * Indicate the property that used for the value of the select filter
   */
  @Input() valueField?: string;
  @Input() displayField?: string;
  /**
* The placeholder text  for the textbox.
*/
  @Input() placeholder: string;


  /**
 * The placeholder text key for the textbox.
 */
  @Input() placeholderKey: string;

  /**
 * The default value to filter by
 */
  @Input() defaultValue?: any = '';


  /**
  * In case that the filter is date picker, You can choose if
  * the input is disabled.
  */
  @Input() inputDisabled: boolean = false;

  @Input() filterPredicate?: (data: any, filter: object) => boolean;

  constructor(protected injector: Injector, private mohMatTableService: MohMatTableService, private fb: FormBuilder) {
    super(injector);
  }

  ngOnInit() {
    this.baseAbstractControl = new FormGroup({
      textbox: new FormControl(''),
      datepicker: new FormControl(''),
      select: new FormControl(''),
      toggle: new FormControl(''),
    });

    let formControl = this.baseAbstractControl.get(this.type);
    if (formControl) {
      formControl.valueChanges.subscribe(val => {
        this.applyFilter(val);
      });
      formControl.setValue(this.defaultValue);
    }

    this.placeholderValue = this.getLabelText(this.placeholderKey);

    super.ngOnInit();
  }

  writeValue(value: any): void {
    if (value === null) {
      Object.keys((<FormGroup>this.baseAbstractControl).controls).forEach((key) => {
        this.baseAbstractControl.get(key).setValue(null);
      });
    }
    else {
      super.writeValue(value);
    }
  }


  /**
   * When the value of the filter changed (by user) this function will be run
   * @param filterValue 
   * input that the user fills in the filter component  
   */
  applyFilter(filterValue: any) {
    this.mohMatTableService.updateKeyValue(this.column, filterValue);
    this.mohMatTableService.updateFilterPredicate();
    this.mohMatTableService.updateFilterValue();
  }
}
