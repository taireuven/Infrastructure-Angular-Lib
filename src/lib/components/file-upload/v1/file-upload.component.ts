import { Component, ViewEncapsulation, forwardRef, Injector, ChangeDetectionStrategy, ChangeDetectorRef } from "@angular/core";
import { NG_VALUE_ACCESSOR, NG_VALIDATORS } from "@angular/forms";
import { FileUploadBase } from "../base/file-upload.base";
import { ConfigService } from "../../../moh-angular-lib.module";
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { FileService } from '../base/file.service';

/**
* moh-file-upload is a component for uploading files.
*
* ### Usage
* #### HTML
* ```html

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
* ```typescript

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
* <example-url>../screenshots/components/v1/file-upload.png</example-url>
*/
@Component({
  selector: 'moh-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => FileUploadComponent), multi: true },
              { provide: NG_VALIDATORS, useExisting: forwardRef(() => FileUploadComponent), multi: true }]
})
export class FileUploadComponent extends FileUploadBase {

  constructor(injector: Injector, configService: ConfigService, cdr: ChangeDetectorRef, fileService: FileService) {
    super(injector, fileService, configService, cdr);
    /*if (this.isDisabled) {
      this.baseAbstractControl.get('inputDesc').disabled;
    }*/
  }

  clickInput = (event): void => {

    this.errorMsgKey = "";
    this.errorMsgParams = "";
    var target = event.target || event.srcElement || event.currentTarget;
    target.parentElement.parentElement.parentElement.firstElementChild.click();
  };
}
