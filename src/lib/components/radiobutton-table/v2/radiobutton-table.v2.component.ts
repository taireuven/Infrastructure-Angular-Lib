import { Component, OnInit, ViewEncapsulation, forwardRef, Injector, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormControl, FormGroup, FormArray, FormBuilder, NG_VALIDATORS } from '@angular/forms';
import { BaseAbstractControl } from '../../base/base-abstract-control';
import { formControlInfo } from '../../../models/formControlInfo';
import { RadiobuttonTableBase } from '../base/radiobutton-table.base';
/**
 * A table of radio buttons.
 *
 * ### Usage
  ```html

   <!-- basic radiobutton-table -->
   <moh-radiobutton-table  [questions]="questions" [options]="answareOptions" textKey="keyOfUmbraco" formControlName="radiobuttonTable">
   </moh-radiobutton-table>

   <!-- radiobutton-table with some Inputs -->
   <moh-radiobutton-table  [questions]="questions" [options]="answareOptions" formControlName="radiobuttonTable"
   [MarkAsRequired]=true></moh-radiobutton-table>

  ```
 * <example-url>../screenshots/components/radioButtonTable.png</example-url>
 */
@Component({
  selector: 'moh-radiobutton-table',
  templateUrl: './radiobutton-table.v2.component.html',
  styleUrls: ['./radiobutton-table.v2.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadiobuttonTableV2Component), multi: true
    },
    { provide: NG_VALIDATORS, multi: true, useExisting: forwardRef(() => RadiobuttonTableV2Component) },
  ]
})
export class RadiobuttonTableV2Component extends RadiobuttonTableBase  {

  constructor(injector: Injector) {
    super(injector);
  }

}
