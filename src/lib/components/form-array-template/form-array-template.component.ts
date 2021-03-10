import { Component, OnInit, Input, Injector, ContentChild, TemplateRef, ViewEncapsulation, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { AbstractControl, FormArray, FormGroup, FormControl } from '@angular/forms';
import { LabelBase } from '../base/label-base';
import { mohValidators } from '../error-message/base/mohValidators';
import { Observable } from 'rxjs';

/**
 * The component is designed to handle a form array. It allows adding and deleting items from the array.
 *
 * ### Usage
  ```html

   <!-- basic form array -->
   <moh-form-array-template [formArray]="form.controls.formArray" [abstractControl]="absControl">

   <!-- form array with inputs -->
   <moh-form-array-template [formArray]="form.controls.formArray" [abstractControl]="absControl"
                            [maxLength]="3" [enableRemove]="true" [enableFirstItemRemove]="true">
  ```
*
* #### TS
 ```typescript

    this.form = this.fb.group({
      formArray: new FormArray([this.getArrayItem()])
    });

    this.absControl = this.getArrayItem();

    getArrayItem(): AbstractControl {
      return new FormGroup({
        firstName: new FormControl('', [mohValidators.required()]),
        lastName: new FormControl('', [mohValidators.minLength(2)])
      })
    }
 ```
*
 * <example-url>../screenshots/components/v1/form-array.png</example-url>
*/

@Component({
  selector: 'moh-form-array-template',
  templateUrl: './form-array-template.component.html',
  styleUrls: ['./form-array-template.component.scss'],
  encapsulation: ViewEncapsulation.None,
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormArrayTemplateComponent extends LabelBase implements OnInit {

  /**
  * The array to manage
  */
  @Input() formArray: FormArray;
  /**
  * The structure of the controls that the array contains
  */
  @Input() abstractControl: AbstractControl;
  /**
  * The max length of the array
  */
  @Input() maxLength: number;
  /**
  * Whether to allow deletion from the array
  */
  @Input() enableRemove: boolean = true;
  /**
  * Whether to allow first item deletion from the array
  */
  @Input() enableFirstItemRemove = true;
  /**
  * Text key in umbraco to display on the add button
  */
  @Input() addButtonTextKey: string = 'add';
  /**
  * Event emmiter after a new control is pushed into the array
  */
  @Output() afterControlAdded: EventEmitter<any> = new EventEmitter<any>();

  removeTextValue: Observable<string>;
  addButtonTextValue: Observable<string>;

  @ContentChild('templateRef', { static: true }) templateRef: TemplateRef<any>;

  constructor(injector: Injector) {
    super(injector);
  }
  
  ngOnInit() {
  this.removeTextValue = this.getLabelText('remove');
  this.addButtonTextValue = this.getLabelText(this.addButtonTextKey);
   }

  addControl = (): void => {

    if (this.maxLength && this.formArray.length == this.maxLength) {
      return;
    }
    var control = this.copyAbstractControl(this.abstractControl);
    this.formArray.push(control);
    this.afterControlAdded.emit();
  };

  removeControl = (index: number): void => {
    this.formArray.removeAt(index);
  };

  shouldEnableRemove = (index: number): boolean => {

    if (this.enableRemove) {
      if (index!=0) {
        return true;
      }
      return this.enableFirstItemRemove;
    }
    return false;
  };

  copyAbstractControl = (control: AbstractControl): AbstractControl=> {

    let newControl: AbstractControl;

    if (control instanceof FormGroup) {
      const formGroup = new FormGroup({}, control.validator, control.asyncValidator);
      const controls = control.controls;

      Object.keys(controls).forEach(key => {
        formGroup.addControl(key, this.copyAbstractControl(controls[key]));
      })

      newControl = formGroup;
    }
    else if (control instanceof FormArray) {
      const formArray = new FormArray([], control.validator, control.asyncValidator);

      control.controls.forEach(formControl => formArray.push(this.copyAbstractControl(formControl)))

      newControl = formArray;
    }
    else if (control instanceof FormControl) {
      newControl = new FormControl(control.value, control.validator, control.asyncValidator);
    }
    else {
      throw 'Error: unexpected control value';
    }

    if (control.disabled) newControl.disable({ emitEvent: false });

    return newControl;
  }
}

