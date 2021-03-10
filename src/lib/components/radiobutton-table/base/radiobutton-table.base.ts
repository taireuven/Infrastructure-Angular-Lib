import { Component, OnInit, ViewEncapsulation, forwardRef, Injector, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormControl, FormGroup, FormArray, FormBuilder, NG_VALIDATORS } from '@angular/forms';
import { BaseAbstractControl } from '../../base/base-abstract-control';
import { formControlInfo } from '../../../models/formControlInfo';
import { Observable } from 'rxjs';

export class RadiobuttonTableBase extends BaseAbstractControl implements OnInit {

  /**
  * The options list - array of formControlInfo.
  */
 @Input() options: formControlInfo[];

  /**
  * The questions list- array of formControlInfo.
  */
 @Input() questions: formControlInfo[];

 constructor(injector: Injector) {   
   super(injector);
   this.baseAbstractControl = new FormGroup({});
  }

 

  ngOnInit() {
  
    this.questions.forEach(q => {

      (this.baseAbstractControl as FormGroup).addControl(q.code, new FormControl('', q.validation));

    });

   // console.log(this.baseAbstractControl);
   // this.baseAbstractControl.valueChanges.subscribe(v => { console.log(this.baseAbstractControl.value); });

  
    super.ngOnInit();
  }

  questionControl(controlName: string): FormControl { return (this.baseAbstractControl as FormGroup).get(controlName.toString()) as FormControl; }

}
