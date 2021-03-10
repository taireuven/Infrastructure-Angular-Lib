import { Component, ViewEncapsulation, forwardRef, Injector, ChangeDetectionStrategy, ChangeDetectorRef, Input } from "@angular/core";
import { NG_VALUE_ACCESSOR, NG_VALIDATORS } from "@angular/forms";
import { FileUploadBase } from "../base/file-upload.base";
import { ConfigService } from "../../../moh-angular-lib.module";
import { HttpClient } from '@angular/common/http';
import { FileService } from '../base/file.service';

/**
* moh-file-upload is a component for uploading files.
*
* ### Usage
* #### HTML
 ```html

  <!-- basic file upload -->
  <moh-file-upload formControlName="uploader" [uploaderSettings]="settings" [buttonText]="'בחר קובץ'"></moh-file-upload>

  <!-- file upload with inputs -->
  <moh-file-upload formControlName="uploader" [uploaderSettings]="settings" [buttonText]="'בחר קובץ'"
                   [fieldText]="'תיאור הקובץ'" [tooltipText]="'ניתן להעלות קבצים מסוג ...'"
                   [additionalInfoTextKey]="'ניתן להעלות 3 קבצים'" (errorItem)="onError()" (complete)="complete()">
  </moh-file-upload>

```
*
* #### TS
 ```typescript

    this.settings = new UploaderSettings();
    this.settings.allowMimeTypes = ['image/png', 'image/gif', 'image/jpeg'];
    this.settings.maxFileSize = 1 * 1024 * 1024;
    this.settings.queueLimit = 5;
    this.settings.queueMinLimit = 1;
    this.settings.isMultiple = true;
    this.settings.hasDescription = false;
    this.settings.isDescriptionRequired = false;
    this.settings.isRequired = true;

```
*
* <example-url>../screenshots/components/v2/file-upload.png</example-url>
*/
@Component({
  selector: 'moh-file-upload',
  templateUrl: './file-upload.v2.component.html',
  styleUrls: ['./file-upload.v2.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => FileUploadV2Component), multi: true },
  { provide: NG_VALIDATORS, useExisting: forwardRef(() => FileUploadV2Component), multi: true }]
})
export class FileUploadV2Component extends FileUploadBase {

  /**
   * Placeholder text key to display in the textbox.
   */
  @Input() placeholderKey: string = '';

  constructor(injector: Injector, configService: ConfigService, cdr: ChangeDetectorRef, fileService:FileService) {
    super(injector, fileService, configService, cdr);
  }

  clickInput = (event): void => {

    this.errorMsgKey = "";
    this.errorMsgParams = "";

    var target = event.target || event.srcElement || event.currentTarget;
    target.parentElement.parentElement.parentElement.firstElementChild.click();
  };
}
