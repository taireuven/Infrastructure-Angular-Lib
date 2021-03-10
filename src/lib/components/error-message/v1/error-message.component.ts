import { Component, OnInit, Input, DoCheck, SimpleChange, KeyValueDiffers, Injector } from '@angular/core';
import { ValidationErrors, AbstractControl } from '@angular/forms';
import { mohValidators } from '../base/mohValidators';
import { LabelBase } from '../../base/label-base';
import { Observable } from 'rxjs';
import { ErrorMessageBase } from '../base/error-message.base';

@Component({
  selector: 'moh-error-message',
  template: `<div class="error-message" *ngIf="errorMessage !== null || errorMessageKey !== null"><span>{{errorMessage || (errorMessageValue | async)}}</span></div>`,
  styleUrls: ['./error-message.component.scss']
})
export class ErrorMessageComponent extends ErrorMessageBase {

  constructor(differs: KeyValueDiffers, injector: Injector) {
    super(differs, injector);
  }
}
