import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { LabelFieldModule } from '../../label-field/label-field.module';
import { TextboxV2Module } from '../../textbox/v2/textbox.v2.module';
import { TelephoneV2Component } from '../v2/telephone.v2.component';
import { FormSubmitService } from '../../../services/form-submit/form-submit.service';
import { SelectV2Module } from '../../select/v2/select.v2.module';
import { ErrorMessageV2Module } from '../../error-message/v2/error-message.v2.module';
import { TelephoneService } from '../base/telephone.service';
import { DirectivesModule } from '../../../directives/directives.module';

export { Prefix, Telephone } from '../base/Telephone';

@NgModule({
  imports: [
    SharedModule,
    LabelFieldModule,
    TextboxV2Module,
    SelectV2Module,
    ErrorMessageV2Module,
    DirectivesModule
  ],
  declarations: [
    TelephoneV2Component
  ],
  exports: [
    TelephoneV2Component
  ],
  providers: [FormSubmitService, TelephoneService]
})
export class TelephoneV2Module { }
