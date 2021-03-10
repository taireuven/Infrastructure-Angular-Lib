import { Component, OnInit, Input, Injector, forwardRef } from '@angular/core';
import { MohMatTableService } from '../moh-mat-table.service';
import { Observable } from 'rxjs/Observable';

import { LabelBase } from '../../base/label-base';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseAbstractControl } from '../../base/base-abstract-control';

/**
 * The Mat table general search component is used to search data according to the user input.
 * To use this component you must use the moh mat table service and initialize the data in your ts code.  
 * 
 * ### Usage 
 * 
  ```html
  
  <moh-mat-table-general-search [placeholderKey]="'searchUs'"></moh-mat-table-general-search>
  ```
  
  ```typescript
   this.mohMatTableService.initDataSource(this.dataSource, this.dataObjects);
   ```
*/
@Component({
  selector: 'moh-mat-table-general-search',
  templateUrl: './mat-table-general-search.component.html',
  styleUrls: ['./mat-table-general-search.component.scss'],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => MatTableGeneralSearchComponent), multi: true, }]
})
export class MatTableGeneralSearchComponent extends BaseAbstractControl implements OnInit {
  placeholderValue: Observable<string>; 
  //generalSearch: FormControl;
  /*
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

  constructor(protected injector: Injector, private mohMatTableService: MohMatTableService) {
    super(injector);

    this.baseAbstractControl = new FormControl();
  }

  ngOnInit() {
    //this.generalSearch = new FormControl();
    this.placeholderValue = this.getLabelText(this.placeholderKey);

    this.baseAbstractControl.valueChanges.subscribe(val => this.applyFilter(val));
    if (this.defaultValue) {
      this.baseAbstractControl.setValue(this.defaultValue);
    }

    super.ngOnInit();
  }

  /**
 * When the value of the general search changed (by user) this function will be run
 * @param filterValue 
 * input that the user fills in the general search component  
 */
  applyFilter(filterValue: any) {
    this.mohMatTableService.updateKeyValue('general◬', filterValue);
    this.mohMatTableService.updateFilterPredicate();
    this.mohMatTableService.updateFilterValue();
  }

}
