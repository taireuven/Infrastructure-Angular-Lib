import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SplitPipe } from './split.pipe';
import { FileSizePipe } from './file-size.pipe';
import { FileDownloadDirective } from './file-download.directive';

/**
 * @ignore
 */
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SplitPipe,
    FileSizePipe,
    FileDownloadDirective
  ],
  exports: [
    SplitPipe,
    FileSizePipe,
    FileDownloadDirective
  ]
})
export class FileUploadBaseModule { }
