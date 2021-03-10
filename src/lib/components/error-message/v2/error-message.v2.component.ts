import { Component, OnInit, Injector, KeyValueDiffers, ChangeDetectionStrategy } from '@angular/core';
import { ErrorMessageBase } from '../base/error-message.base';

@Component({
  selector: 'moh-error-message',
  template: `<div class="error-message" *ngIf="errorMessage !== null || errorMessageKey !== null"><span>{{errorMessage || (errorMessageValue | async)}}</span></div>`,
  styleUrls: ['./error-message.v2.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorMessageV2Component extends ErrorMessageBase {

  constructor(differs: KeyValueDiffers, injector: Injector) {
    super(differs, injector);
  }
}
