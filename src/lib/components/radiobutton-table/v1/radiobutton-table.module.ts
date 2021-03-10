import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { LabelFieldModule } from '../../label-field/label-field.module';

import { RadiobuttonTableComponent } from './radiobutton-table.component';
import { RadiobuttonGroupModule} from './../../radiobutton-group/v1/radiobutton-group.module';
import { ErrorMessageModule } from '../../error-message/v1/error-message.module';

@NgModule({
  imports: [
    SharedModule,
    LabelFieldModule,
    RadiobuttonGroupModule,
    ErrorMessageModule,
  ],
  declarations: [
    RadiobuttonTableComponent
  ],
  exports: [
    RadiobuttonTableComponent
  ]
})
export class RadiobuttonTableModule { }
