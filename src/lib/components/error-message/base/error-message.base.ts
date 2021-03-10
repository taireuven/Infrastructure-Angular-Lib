import { Component, OnInit, Input, DoCheck, SimpleChange, KeyValueDiffers, Injector, ChangeDetectorRef } from '@angular/core';
import { ValidationErrors, AbstractControl } from '@angular/forms';
import { mohValidators } from './mohValidators';
import { LabelBase } from '../../base/label-base';
import { of as observableOf, Observable } from 'rxjs';

const DOC_TYPE: string = 'errorMessages.';

export class ErrorMessageBase extends LabelBase implements OnInit {

  @Input() control: AbstractControl;

  differ: any;
  errorMessage: string;
  errorMessageKey: string;
  errorMessageParams: any;
  errorMessageValue: Observable<string>;
  cdr: ChangeDetectorRef;

  constructor(differs: KeyValueDiffers, injector: Injector) {
    super(injector);
    this.cdr = injector.get(ChangeDetectorRef);
    this.differ = differs.find({}).create();
  }

  ngOnInit() {

  }

  ngDoCheck() {
    if (this.control && this.differ.diff(this.control)) { // check for changes
      if (!this.control.errors) {
        this.errorMessage = '';
        this.errorMessageKey = '';
        this.errorMessageParams = {};
        this.errorMessageValue = observableOf('');
      }
      else {
        for (let propertyName in this.control.errors) {
          if (this.control.errors.hasOwnProperty(propertyName)) {
            this.errorMessageParams = this.control.errors[propertyName];
            this.errorMessage = this.errorMessageParams.errorMessage;
            this.errorMessageKey = this.errorMessageParams.errorMessageKey ? DOC_TYPE + this.errorMessageParams.errorMessageKey : '';// || propertyName;
            this.errorMessageValue = this.getLabelText(this.errorMessageKey, this.errorMessageParams);
            this.cdr.detectChanges();
            return;
          }
        }
      }
      this.cdr.detectChanges();
    }
  }
}
