import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { LabelFieldModule } from '../../label-field/label-field.module';

import { RatingComponent } from './rating.component';
import { ErrorMessageModule } from '../../error-message/v1/error-message.module';
import { ButtonModule } from '../../button/v1/button.module';


@NgModule({
  imports: [
    SharedModule,
    LabelFieldModule,
    ErrorMessageModule,
    ButtonModule,
  ],
  declarations: [
    RatingComponent
  ],
  exports: [
    RatingComponent
  ]
})
export class RatingModule { }
