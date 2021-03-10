import { OnInit, Input, Output, Injector } from '@angular/core';
import { FormControl, FormGroup, AbstractControl, FormBuilder, ValidatorFn } from '@angular/forms';
import { mohValidators } from '../../error-message/base/mohValidators';
import { BaseAbstractControl } from '../../base/base-abstract-control';

export class RadiobuttonGroupBase extends BaseAbstractControl implements OnInit {

  isAnotherChecked: boolean = false;

  _options: any[];
  get options(): any[] {
    return this._options;
  }
  /**
  * The options list.
  */
  @Input() set options(value: any[]) {
    this._options = value;
    if (this.baseAbstractControl.value && this._options) {
      this.writeValue(this.baseAbstractControl.value);
    }
  }
  //@Input() options: any[];
  /**
  * The display field name of the option object.
  */
  @Input() displayField?: string;
  /**
  * The value field name of the option object.
  */
  @Input() valueField?: string;
  /**
  * The layout of the radiobuttons : 'row' | 'column', by default: 'column'
  */
  @Input() layout?: "row" | "column" = "column";
  /**
 * free text field validators array.
 */
  @Input() freeTextValidators?: ValidatorFn[] = [];
  /**
  * Whether to mark as required the free text field with red *.
  */
  @Input() freeTextMarkAsRequired?: boolean = false;

  /**
  * The object or value of another option that show textbox
  */
  @Input() freeTextOption?: any = null;

  constructor(injector: Injector) {
    super(injector);
    if (!this.freeTextOption)
      this.baseAbstractControl = new FormControl();
  }
  ngOnInit() {
    if (this.freeTextOption) {
      this.baseAbstractControl = new FormGroup({
        radioGroup: new FormControl('', []),
        freeText: new FormControl('', [])
      });
      this.baseAbstractControl.get('radioGroup').valueChanges.subscribe(value => {
        const freeTextControl = this.baseAbstractControl.get('freeText');
        if (value instanceof Object) {
          JSON.stringify(value) === JSON.stringify(this.freeTextOption) ? this.isAnotherChecked = true : this.isAnotherChecked = false;
        }
        else {
          value == this.freeTextOption ? this.isAnotherChecked = true : this.isAnotherChecked = false;
        }
        if (this.isAnotherChecked) {
          freeTextControl.setValidators(this.freeTextValidators);
        }
        else if (!this.isAnotherChecked) {
          freeTextControl.clearValidators();
          this.baseAbstractControl.get('freeText').setValue('');
        }
        freeTextControl.updateValueAndValidity();
      });
    }
    super.ngOnInit();
  }

  //for object value in radio
  public writeValue(value: any) {
    if (value !== undefined || (value === undefined && this._baseAbstractControl.value !== undefined)) {
      let radioGroupValue = this.freeTextOption && value ? value['radioGroup'] : value;
      if (radioGroupValue instanceof Object) {
        let selectedValue = (this.options || []).find(x => JSON.stringify(x) === JSON.stringify(radioGroupValue)) || radioGroupValue;
        if (selectedValue) {
          if (this.baseAbstractControl.get('radioGroup')) {
            this.baseAbstractControl.get('radioGroup').setValue(selectedValue);
            this.baseAbstractControl.get('freeText').setValue(value['freeText']);
          }
          else {
            this.baseAbstractControl.setValue(selectedValue);
          }
        }
      } else {
        if (value || !this.freeTextOption) {
          this._baseAbstractControl.patchValue(value);
        }
      }
    }
  }

  displayFn(value: any) {
    if (this.displayField) {
      return value[this.displayField];
    }
    else
      return value;
  }
}
