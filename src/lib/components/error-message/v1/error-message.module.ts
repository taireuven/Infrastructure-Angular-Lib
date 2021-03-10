import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { mohValidators } from '../base/mohValidators';
import { ErrorMessageComponent } from './error-message.component';

export * from '../base/mohValidators';
export * from '../base/mohValidationErrors';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [ErrorMessageComponent],
  exports:[ErrorMessageComponent]
})
export class ErrorMessageModule { }
