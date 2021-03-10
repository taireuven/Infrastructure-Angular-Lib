import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { LabelFieldModule } from '../../label-field/label-field.module';
import { TextboxModule } from '../../textbox/v1/textbox.module';
import { TelephoneComponent } from '../v1/telephone.component';
import { FormSubmitService } from '../../../services/form-submit/form-submit.service';
import { SelectModule } from '../../select/v1/select.module';
import { ErrorMessageModule } from '../../error-message/v1/error-message.module';
import { TelephoneService } from '../base/telephone.service';
import { DirectivesModule } from '../../../directives/directives.module';

export { Prefix, Telephone } from '../base/Telephone';

@NgModule({
  imports: [
    SharedModule,
    LabelFieldModule,
    TextboxModule,
    SelectModule,
    ErrorMessageModule,
    DirectivesModule
  ],
  declarations: [
    TelephoneComponent
  ],
  exports: [
    TelephoneComponent
  ],
  providers: [FormSubmitService, TelephoneService]
})
export class TelephoneModule { }
