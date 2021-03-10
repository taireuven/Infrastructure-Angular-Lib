import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { ErrorMessageV2Component } from './error-message.v2.component';

export * from '../base/mohValidators';
export * from '../base/mohValidationErrors';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [ErrorMessageV2Component],
  exports: [ErrorMessageV2Component]
})
export class ErrorMessageV2Module { }
