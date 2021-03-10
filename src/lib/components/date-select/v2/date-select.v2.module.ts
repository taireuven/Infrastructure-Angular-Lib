import { NgModule } from "@angular/core";
import { SharedModule } from "../../../shared/shared.module";
import { DateSelectV2Component } from "./date-select.v2.component";
import { LabelFieldModule } from "../../label-field/label-field.module";
import { SelectV2Module } from "../../select/v2/select.v2.module";
import { TextboxV2Module } from "../../textbox/v2/textbox.v2.module";
import { ErrorMessageV2Module } from '../../error-message/v2/error-message.v2.module';
import { DirectivesModule } from '../../../directives/directives.module';

export { DateSelect } from '../base/DateSelect';

@NgModule({
  imports: [
    SharedModule,
    LabelFieldModule,
    SelectV2Module,
    TextboxV2Module,
    ErrorMessageV2Module,
    DirectivesModule
  ],
  declarations: [
    DateSelectV2Component
  ],
  exports: [
    DateSelectV2Component
  ]
})
export class DateSelectV2Module { }
