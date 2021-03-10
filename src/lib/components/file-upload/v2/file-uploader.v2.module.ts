import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';

import { FileUploadModule } from 'ng2-file-upload';
import { FileUploadV2Component } from './file-upload.v2.component';
import { UploaderSettings } from '../base/uploader-settings';
import { UploadEntity } from '../base/upload-entity';
import { TextboxV2Module } from '../../textbox/v2/textbox.v2.module';
import { TooltipV2Module } from '../../tooltip/v2/tooltip.v2.module';
import { LabelFieldModule } from '../../label-field/label-field.module';
import { ButtonV2Module } from '../../button/v2/button.v2.module';
import { ErrorMessageV2Module } from '../../error-message/v2/error-message.v2.module';
import { FileUploadBaseModule } from '../base/file-upload.base.module';
import { FileService } from '../base/file.service';

export * from '../base/uploader-settings';
export * from '../base/upload-entity';

@NgModule({
  imports: [
    SharedModule,
    TextboxV2Module,
    FileUploadModule,
    TooltipV2Module,
    ErrorMessageV2Module,
    LabelFieldModule,
    ButtonV2Module,
    FileUploadBaseModule
  ],
  declarations: [
    FileUploadV2Component
  ],
  exports: [
    FileUploadV2Component
  ],
  providers: [FileService],
})
export class FileUploaderV2Module { }
