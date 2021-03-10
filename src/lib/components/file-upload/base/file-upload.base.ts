import { Component, OnInit, Input, Output, EventEmitter, forwardRef, ElementRef, Inject, Injector, ViewEncapsulation, ChangeDetectorRef, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { FileUploader, FileItem, ParsedResponseHeaders, FileUploaderOptions } from 'ng2-file-upload';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, Validators, FormBuilder, FormGroup, FormArray, ValidatorFn } from '@angular/forms';
import { UploaderSettings } from './uploader-settings';
import { BaseAbstractControl } from '../../base/base-abstract-control';
import { UploadEntity, FileDetails } from './upload-entity';
import { MohValidationErrors } from '../../error-message/base/mohValidationErrors';
//import { FilterMassagesKeys } from './filter-massagess';
import { mohValidators } from '../../error-message/base/mohValidators';
import { FormSubmitService } from '../../../services/form-submit/form-submit.service';
import { ConfigService } from '../../../services/config/config.service';
import { Subscription, Observable } from 'rxjs';
import { EXTENSIONS } from './file-extesions';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs-compat/operator/map';
import { MohHttpClient } from '../../../moh-angular-lib.module';
import { FileService } from './file.service';

export function createQueueMinLimitValidator(minValue: number) {
  return function queueMinLimit(c: FormControl): MohValidationErrors | null {
    let mohValidationErrors: MohValidationErrors = {};
    mohValidationErrors["minFiles"] = { minValue: minValue, errorMessageKey: 'minFiles' };
    return (c.value.length < +minValue) ? mohValidationErrors : null;
  }
}

export class FileUploadBase extends BaseAbstractControl implements OnInit, OnDestroy {
  uploadEntity: UploadEntity = new UploadEntity();

  private _url: string = '';
  private _unsignedFilesUrl = "/api/FileUpload/Upload";
  private _signedFilesUrl = "/api/FileUpload/UploadSignedFile";
  /**
  * The settings object for the file upload.
  */
  //@Input() uploaderSettings: UploaderSettings;
  _uploaderSettings?: UploaderSettings = null;
  get uploaderSettings(): UploaderSettings {
    return this._uploaderSettings;
  }
  @Input() set uploaderSettings(value: UploaderSettings) {
    this._uploaderSettings = value;

    this.baseAbstractControl.get('myUploader').setValidators(this.setUploaderValidations());
    this.baseAbstractControl.get('myUploader').updateValueAndValidity();

    this.baseAbstractControl.get('inputDesc').setValidators(this.setDescriptionRequired());
    this.baseAbstractControl.get('inputDesc').updateValueAndValidity();

    this.uploader.options.allowedMimeType = this._uploaderSettings.allowMimeTypes != undefined ? this._uploaderSettings.allowMimeTypes : this._uploaderSettings.allowExtensions != undefined ? this._uploaderSettings.allowExtensions : ['image/png', 'image/gif', 'image/jpeg', 'image/tiff', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    this.tooltipTextValue = this.getLabelText('fileUploadToolip', { allowMimeTypes: this.uploader.options.allowedMimeType.toString(), formatBytesV: this.formatBytesV });
    this.initExtesionsArray();
  }
  /**
  * The text of the file upload button.
  */
  @Input() buttonText: string;
  /**
  * The text key of the file upload button.
  */
  @Input() buttonTextKey: string;
  /**
  * The description field label text.
  */
  @Input() fieldText: string;
  /**
  * The description field label text key.
  */
  @Input() fieldTextKey: string;
  /**
  * The text to display in the tooltip.
  */
  @Input() tooltipText: string;
  /**
  * The text key to display in the tooltip.
  */
  @Input() tooltipTextKey: string;
  /**
  * The text params to display in the tooltip.
  */
  @Input() tooltipTextParams: any;
  /**
  * Additional text to display under file upload component.
  */
  @Input() additionalInfoTextKey: string;
  /**
  * Additional text params to display under file upload component.
  */
  @Input() additionalInfoTextParams: any;

  /**
  * Event emmited on file description change.
  */
  @Output() fileDescChange: EventEmitter<string> = new EventEmitter<string>();
  /**
  * Event emmited on upload error.
  */
  @Output() errorItem: EventEmitter<ErrorInformation> = new EventEmitter<ErrorInformation>();
  /**
  * Event emmited on all loaded when uploading an entire queue, or on file loaded when uploading a single independent file.
  */
  @Output() complete: EventEmitter<any> = new EventEmitter<any>();

  hasDescription: boolean;
  errorInformation: ErrorInformation = new ErrorInformation();
  errorMsgKey: string = "";
  errorMsgParams: any;
  filterName: string = "";
  formatBytesV: string;
  isErrorHandled: boolean = false;
  fileDet: FileDetails;
  tooltipTextValue: Observable<string>;
  extesionsArray: string[] = [];
  acceptArray: string[] = [];
  isReady: boolean = false;

  params = { allowMimeTypes: 'allowMimeTypes text', formatBytesV: 'formatBytesV text' };

  public uploader: FileUploader = new FileUploader({});

  validateFn: Function;

  constructor(injector: Injector, private fileService: FileService, private configService: ConfigService, cdr: ChangeDetectorRef) {
    super(injector);
    this.baseAbstractControl = new FormGroup({
      inputDesc: new FormControl('', []),
      myUploader: new FormArray([], [])
    });
  }

  writeValue(value) {
    let fileItems: FileItem[] = [];

    if (value === null && this._baseAbstractControl.get('myUploader').value) {
      value = { inputDesc: null, myUploader: [] };
    }
    else if (value && value.myUploader === null) {
      value.myUploader = [];
    }

    if (value) {
      if (value.myUploader.length > 0 || this._baseAbstractControl.get('myUploader').value.length > 0) {
        const guids = this._baseAbstractControl.get('myUploader') as FormArray;
        guids.clear();

        value.myUploader.forEach(fileDetails => {
          guids.push(new FormControl());

          //add the files to the uploader queue for display it in the files list
          let fileItem = new FileItem(this.uploader, new File([""], fileDetails.fileName), {});
          fileItem.file.rawFile = fileDetails.fileGuid;
          fileItem.file.size = fileDetails.fileSize;
          fileItem.isSuccess = true;
          fileItem.isUploaded = true;
          fileItems.push(fileItem)
        });

        this.uploader.queue = fileItems;
        this.cdr.detectChanges();
      }

      this._baseAbstractControl.setValue(value);
    }
  }

  ngOnInit(): void {
    this._url = this.configService.baseConfiguration.fileUploadApiURL ? this.configService.baseConfiguration.fileUploadApiURL : this._uploaderSettings.isSigned ? this.configService.baseConfiguration.servicesApiURL + this._signedFilesUrl : this.configService.baseConfiguration.servicesApiURL + this._unsignedFilesUrl;
    this.initExtesionsArray();
    this.uploader = new FileUploader({
      url: this._url,
      headers: [{ name: 'Accept', value: 'application/json' }],
      autoUpload: true,
      //allowedMimeType: this._uploaderSettings.allowMimeTypes != undefined ? this._uploaderSettings.allowMimeTypes : ['image/png', 'image/gif', 'image/jpeg', 'image/tiff', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
      maxFileSize: this._uploaderSettings.maxFileSize != undefined ? this._uploaderSettings.maxFileSize : 50000000,
      queueLimit: this._uploaderSettings.isMultiple ? this._uploaderSettings.queueLimit : 1,
      method: "POST",
      filters: [{
        name: 'nameFilter',
        fn: (item: any): boolean => {
          var regex = RegExp(this._uploaderSettings.fileNamePattern);
          return regex.test(item.name)
        }
      }, {
        name: 'extension',
        fn: (item: any): boolean => {
          const fileExtension = item.name.slice(item.name.lastIndexOf('.') + 1).toLowerCase();
          console.log("fileExtension:", fileExtension);
          return this.extesionsArray.indexOf(fileExtension) > -1
          //return fileExtension === 'csv';
        }
      }]
    });

    this.formatBytesV = this.formatBytes(this._uploaderSettings.maxFileSize);
    this.hasDescription = this._uploaderSettings.hasDescription;
    this.uploader.onWhenAddingFileFailed = (item, filter) => {
      switch (filter.name) {
        case 'queueLimit':
          this._uploaderSettings.queueLimit = this._uploaderSettings.isMultiple ? this._uploaderSettings.queueLimit : 1
          this.errorMsgKey = 'fileQueueLimit';//String.Format(FilterMassages.queueLimit, this.uploaderSettings.queueLimit);
          this.errorMsgParams = { queueLimit: this._uploaderSettings.queueLimit };
          this.filterName = filter.name
          break;
        case 'fileSize':
          this.errorMsgKey = 'fileSize';//String.Format(FilterMassages.fileSize, this.formatBytesV);
          this.errorMsgParams = { formatBytesV: this.formatBytesV };
          this.filterName = filter.name
          break;
        case 'mimeType':
          this.errorMsgKey = 'allowedMimeTypes';
          //this.errorMsgParams = { mimeTypes: this.uploaderSettings.allowMimeTypes.join() };
          this.filterName = filter.name
          break;
        case 'nameFilter':
          this.errorMsgKey = 'allowedFileName';
          //this.errorMsgParams = { mimeTypes: this.uploaderSettings.allowMimeTypes.join() };
          this.filterName = filter.name
          break;
        case 'extension':
          this.errorMsgKey = 'allowedMimeTypes';
          this.filterName = filter.name
          break;
        default:
          this.errorMsgKey = 'errorOccourd';//FilterMassages.default;
          break;
      }

    };
    this.uploader.onErrorItem = (item, response, status, headers) => this.onErrorItem(item, response, status, headers);
    this.uploader.onSuccessItem = (item, response, status, headers) => this.onSuccessItem(item, response, status, headers);
    this.uploader.onCompleteAll = () => this.onCompleteAll();
    this.uploader.onAfterAddingFile = () => this.onAfterAddingFile();
    this.validateFn = (number) => createQueueMinLimitValidator(number);

    this.subscription = this.baseAbstractControl.get('myUploader').valueChanges.subscribe(val => {
      this.baseAbstractControl.get('myUploader').markAsTouched();
      this.onTouched();
    });

    this.baseAbstractControl.get('myUploader').setValidators(this.setUploaderValidations());
    this.baseAbstractControl.get('myUploader').updateValueAndValidity();

    this.baseAbstractControl.get('inputDesc').setValidators(this.setDescriptionRequired());
    this.baseAbstractControl.get('inputDesc').updateValueAndValidity();

    this.tooltipTextValue = this.getLabelText('fileUploadToolip', { allowMimeTypes: this._uploaderSettings.allowMimeTypes.toString(), formatBytesV: this.formatBytesV });

    super.ngOnInit();
  }

  initExtesionsArray() {
    this._uploaderSettings.allowMimeTypes = this._uploaderSettings.allowMimeTypes != undefined ? this._uploaderSettings.allowMimeTypes : ['image/png', 'image/gif', 'image/jpeg', 'image/tiff', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    this.acceptArray = this._uploaderSettings.allowMimeTypes;
    let extesionsArray = [];

    if (this._uploaderSettings.allowExtensions == undefined) {
      this.fileService.getExtensions().subscribe(extensions => {
        (this._uploaderSettings.allowMimeTypes).forEach(item => {
          if (extensions[item] != undefined) {
            extensions[item].forEach(ext => {
              if (ext != undefined)
                extesionsArray.push(ext);
            });
          }
          else { console.log("There is mime type that not supported") }
        });
        this.extesionsArray = extesionsArray;
        this.isReady = true;
        this.cdr.detectChanges();
      });
    }
    else {
      this.extesionsArray = this._uploaderSettings.allowExtensions;
      this.acceptArray = this.extesionsArray.map((ext: string) => "." + ext);
      this.isReady = true;
      this.cdr.detectChanges();
    }
  }
  //ngOnChanges(changes: SimpleChanges): void {
  //  if (changes._uploaderSettings) {
  //    this.baseAbstractControl.get('myUploader').setValidators(this.setUploaderValidations());
  //    this.baseAbstractControl.get('myUploader').updateValueAndValidity();

  //    this.baseAbstractControl.get('inputDesc').setValidators(this.setDescriptionRequired());
  //    this.baseAbstractControl.get('inputDesc').updateValueAndValidity();
  //  }
  //}

  setUploaderValidations() {
    if (this._uploaderSettings.isRequired) {
      return [mohValidators.required(), createQueueMinLimitValidator(this._uploaderSettings.queueMinLimit)];
    }
    else { return [createQueueMinLimitValidator(this._uploaderSettings.queueMinLimit)]; }
  }

  setDescriptionRequired() {
    if (this._uploaderSettings.isDescriptionRequired && this.baseAbstractControl.get('myUploader').value.length > 0) {
      let descRequiredMessage = this._uploaderSettings.descRequiredMessage || 'fileUploadDescRequired';
      if (this._uploaderSettings.descPattern)
        return [mohValidators.required(null, descRequiredMessage), mohValidators.pattern(this._uploaderSettings.descPattern)];
      else
        return [mohValidators.required(null, descRequiredMessage)];
    }
    else {
      if (this._uploaderSettings.descPattern)
        return [mohValidators.pattern(this._uploaderSettings.descPattern)];
    }
  }

  onAfterAddingFile() {
    this.validateFn = createQueueMinLimitValidator(this._uploaderSettings.queueMinLimit);
  }
  onSuccessItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
    let data = JSON.parse(response); //success server response
    item.file.rawFile = data;

    this.errorMsgKey = this.filterName == "fileSize" ? "" : this.errorMsgKey;
    //save all params to fileDetails obj
    this.fileDet = new FileDetails(data, item.file.name, item.file.size);
    //init files array
    (this.baseAbstractControl.get('myUploader') as FormArray).push(new FormControl(this.fileDet));
    this.baseAbstractControl.get('inputDesc').setValidators(this.setDescriptionRequired());
    this.baseAbstractControl.get('inputDesc').updateValueAndValidity();
    this.cdr.detectChanges();
  }

  onErrorItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
    this.errorInformation.fileName = item.file.name;
    this.errorInformation.response = response;
    this.errorInformation.status = status;
    this.errorItem.emit(this.errorInformation);
    this.cdr.detectChanges();
  }

  onCompleteAll(): any {
    this.complete.emit();
  }

  removeGuid(guid: string): void {
    this.validateFn = createQueueMinLimitValidator(this._uploaderSettings.queueMinLimit);
    if (this.baseAbstractControl.get('myUploader').value.findIndex(x => x.fileGuid === guid) != -1) {
      (this.baseAbstractControl.get('myUploader') as FormArray).removeAt(this.baseAbstractControl.get('myUploader').value.findIndex(x => x.fileGuid === guid));
      this.errorMsgKey = "";
      this.baseAbstractControl.get('inputDesc').setValidators(this.setDescriptionRequired());
      this.baseAbstractControl.get('inputDesc').updateValueAndValidity();
      this.cdr.detectChanges();
    }
  }

  private formatBytes(bytes: any, decimals?: any) {
    if (bytes == 0) return '0 Bytes';
    const k = 1024,
      dm = decimals || 2,
      sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
      i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
export class ErrorInformation {
  response: string;
  status: number;
  fileName: string;
}

