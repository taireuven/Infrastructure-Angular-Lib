import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';

import { FileUploadModule } from 'ng2-file-upload';
import { FileUploadComponent } from './file-upload.component';
import { UploaderSettings } from '../base/uploader-settings';
import { UploadEntity } from '../base/upload-entity';
import { TextboxModule } from '../../textbox/v1/textbox.module';
import { TooltipModule } from '../../tooltip/v1/tooltip.module';
import { ErrorMessageModule } from '../../error-message/v1/error-message.module';
import { LabelFieldModule } from '../../label-field/label-field.module';
import { ButtonModule } from '../../button/v1/button.module';
import { FileUploadBaseModule } from '../base/file-upload.base.module';
import { FileService } from '../base/file.service';

export * from '../base/uploader-settings';
export * from '../base/upload-entity';

@NgModule({
  imports: [
    SharedModule,
    TextboxModule,
    FileUploadModule,
    TooltipModule,
    ErrorMessageModule,
    LabelFieldModule,
    ButtonModule,
    FileUploadBaseModule
  ],
  declarations: [
    FileUploadComponent
  ],
  exports: [
    FileUploadComponent
  ],
  providers: [FileService],
})
export class FileUploaderModule { }
