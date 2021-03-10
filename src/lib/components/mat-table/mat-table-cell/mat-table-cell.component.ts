import { Component, OnInit, Input, Output, EventEmitter, ViewChild, HostBinding, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { MatInput } from '@angular/material';
import { MohMatTableService } from '../moh-mat-table.service';
import { of } from 'rxjs';
import { SelectV2Component } from '../../select/v2/select.v2.component';
import { isNullOrUndefined } from 'util';

export enum CellType {
  textbox = 'textbox',
  number = 'number',
  datepicker = 'datepicker',
  select = 'select'
}

/**
 * The mat table cell component is used to design a cell that can be editted, responsive design when the screen is so small.
 * To use this component you must use the moh mat table service and initialize the data in your ts code.
 *
 * There are 3 types of edit components
 * 1. textbox (default)
 * 2. select
 * 3. datepicker
 *
 * you can determine if the cell will not be editable (by default it is editable and the type is textbox) by the input [editable] = "false"
 *
 *
 * ### Usage
 *
  ```html

   <moh-mat-table-cell [editable]="false" [(cellValue)]="row.name" [column]="'name'"> </moh-mat-table-cell>
   <moh-mat-table-cell [(cellValue)]="row.email" [column]="'email'"> </moh-mat-table-cell>
   <moh-mat-table-cell [type]="'datepicker'" [(cellValue)]="row.brithDate" [column]="'birthDate'"> </moh-mat-table-cell>
   <mat-cell *matCellDef="let row; let i=dataIndex">
   <moh-mat-table-cell [type]="'select'" [(cellValue)]="row.id" [column]="'id'"
      [options]="options$" [valueField]="'id'" [displayField]="'id'" >
   </moh-mat-table-cell>
  ```

  ```typescript
    options: any[]=[{'id':1,'name1':'Kurtis Weissnat  '},{'id':2,'name1':'Mrs. Dennis Schulist'}];
    options$:Observable<any[]>=of(this.options);
    this.mohMatTableService.initDataSource(this.dataSource, this.dataObjects);
  ```
*/
@Component({
  selector: 'moh-mat-table-cell',
  templateUrl: './mat-table-cell.component.html',
  styleUrls: ['./mat-table-cell.component.scss']
})
export class MatTableCellComponent implements OnInit, OnChanges {

  @ViewChild(MatInput, { static: false }) input: MatInput;
  @ViewChild(SelectV2Component, { static: false }) select: SelectV2Component;
  @HostBinding('class.editing') editMode: boolean = false;
  private _editable: boolean = true;
  private _column: string = '';
  private _type: CellType = CellType.textbox;
  private _options: any[];
  private _cellValue: any;

  cellType = CellType;
  placeholderValue: Observable<string>;
  form: FormGroup;
  datepickerOpenedFlag: boolean = false;
  options$: Observable<any>;
  displayValue: string = '';

  get formControl(): AbstractControl {
    return this.form.get(this.type);
  }

  /**
   * editable input (if the cell is editable. by default true)
   */
  @Input()
  set editable(editable: boolean) {
    this._editable = editable;
  }
  get editable(): boolean {
    return this._editable;
  }

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
   * type input :textbox/ number/ select/ datepicker - the type of the control in edit mode.
   * the  type is textbox by default
   */
  @Input()
  set type(type: CellType) {
    this._type = type;
  }
  get type(): CellType {
    return this._type;
  }

  /**
   * options input
   * In case that the edit control is select.
   * The options will be shown in the select list.
   */
  @Input()
  set options(options: any[]) {
    if (options) {
      this._options = options;
      this.options$ = of(options);
      //this.setSelectDisplayValue(this.cellValue);
    }
  }
  get options(): any[] {
    return this._options;
  }

  /**
  * The parent abstract control when using cascading select.
  */
  @Input() parentSelect: AbstractControl = null;
  /**
  * The parent sorting by field when using cascading select.
  */
  @Input() parentSortField: string = '';
  /**
  * The child sorting by field when using cascading select.
  */
  @Input() childSortField: string = '';

  /**
   * cellValue input , the value of the cell
   */
  @Input()
  set cellValue(cellValue: any) {
    this._cellValue = cellValue;
  }
  get cellValue(): any {
    return this._cellValue;
  }

  /**
   * In case that the edit control is select, and the options is array of objects.
   * Indicate the property that used for the value of the select control
   */
  @Input() valueField?: string;

  /**
   * In case that the edit control is select, and the options is array of objects.
   * Indicate the property that used for the display field of the select control
   */
  @Input() displayField?: string;
  /**
  * The placeholder text  for the control.
  */
  @Input() placeholder: string;

  /**
  * The placeholder text key for the control.
  */
  @Input() placeholderKey: string;

  /**
   * EventEmitter when the value of the cell is changed
   */
  @Output() cellValueChange = new EventEmitter<any>();

  constructor(private mohMatTableService: MohMatTableService, private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      textbox: [''],
      number: [''],
      datepicker: [''],
      select: [''],
    });
    this.setValue();
    //this.onValueChanges();

    //this.setSelectDisplayValue(this.cellValue);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes.options && changes.options.currentValue)
      || (changes.cellValue && this.options)) {
      this.setSelectDisplayValue(this.cellValue);
    }
  }

  /** set value in the controls */
  private setValue() {
    if (!isNullOrUndefined(this.cellValue)) {
      this.form.controls[this.type].setValue(this.cellValue);
    }
  }

  private setSelectDisplayValue(cellValue) {
    if (this.type == CellType.select) {
      if (isNullOrUndefined(cellValue)) this.displayValue = '';
      else if (!this.displayField) this.displayValue = cellValue;
      else if (!this.valueField && cellValue instanceof Object) this.displayValue = cellValue[this.displayField];
      else if (this.options) {
        let selectedOption = this.options.find((item) => item[this.valueField] == cellValue);
        if (selectedOption) {
          this.displayValue = selectedOption[this.displayField];
        }
      }
    }
  }

  /** the actions when the cell was clicked
   * the cell will be in edit mode if it is editable
   */
  onCellClick() {
    if (this.editable === true) {
      this.editMode = true;

      // for type=select : open panel and subscibe to panelClosingActions.
      // timeout verify that it will be occoured after After initializing the select viewChild.
      setTimeout(() => {
        if (this.select) {
          this.select.input.nativeElement.focus();
          this.select.trigger.openPanel();
          this.select.trigger.panelClosingActions.subscribe(e => {
            if (e && e.source) {
              if (JSON.stringify(e.source.value) !== JSON.stringify(this.form.controls.select.value)) {
                this.displayValue = e.source.viewValue;
                this.cellValueChange.emit(e.source.value);
              }
            }
            this.editMode = false;
          })
        }
      }, 0);

      //if (this.type === CellType.datepicker) {
      //  this.form.controls.datepicker.setValue(this.cellValue)
      //}
    }
  }

  /** the actions after the control was blurred
   *  the cell will not be in edit mode
   */
  onBlur() {
    //if (this.type === CellType.textbox || this.type === CellType.number) {//if (this.type !== 'datepicker') {//if (this.type !== 'datepicker') {
    this.editMode = false;
    this.cellValueChange.emit(this.form.controls[this.type].value);
    //}
    //else if (this.type == 'select' && this.editMode == true) {
    //  //this.editMode = false;
    //}
    //else {
    //  // timeout verify that it will be occoured after the form value changes subscription
    //  setTimeout(() => {
    //    if (this.datepickerOpenedFlag === false) {
    //      this.editMode = false;
    //      this.cellValueChange.emit(this.form.controls.datepicker.value);
    //    }
    //    else {
    //      this.datepickerOpenedFlag = false;
    //    }
    //  }, 100);
    //}
  }

  onDatepickerBlur() {
    // timeout verify that it will be occoured after the popup opened (when trigger clicked).
    setTimeout(() => {
      if (this.datepickerOpenedFlag === false) {
        this.editMode = false;
        this.cellValueChange.emit(this.form.controls.datepicker.value);
      }
      else {
        this.datepickerOpenedFlag = false;
      }
    }, 100);
  }

  onDatepickerOpened() {
    this.datepickerOpenedFlag = true;
  }

  onDatepickerClosed() {
    this.datepickerOpenedFlag = false;
    this.onBlur();
    // this.editMode=false;
  }

  /** subscription when the value of the cell has been changed */
  //onValueChanges(): void {
  //  if (this.type === 'select') {
  //    this.form.controls.select.valueChanges.distinctUntilChanged((x, y) => JSON.stringify(x) == JSON.stringify(y)).subscribe(val => {
  //      this.setDisplayValue(val);
  //      this.editMode = false;
  //      this.cellValueChange.emit(val);
  //    });
  //  }
  //}
}
