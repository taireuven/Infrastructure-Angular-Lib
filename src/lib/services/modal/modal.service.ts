import { Injectable, Injector } from '@angular/core';
import swal from 'sweetalert2';
import { LabelBase } from '../../components/base/label-base';
import { combineLatest , Observable } from 'rxjs';

export { swal };
export enum MessageType {
  error = "error",
  success = "success",
  warning = "warning",
  info = "info",
  question = "question"
};
@Injectable()
export class ModalService extends LabelBase {
  constructor(injector: Injector) { super(injector) }

  public confirmMsg(message: string, title: string = "Warning", confirmButtonText: string = "OK", cancelButtonText: string = "Cancel", messageParams?: any, titleParams?: any, allowEscapeKey: boolean = true, allowOutsideClick: boolean = true, customClass?: string, reverseButtons?: boolean): Promise<any> {
    return this.showSwal(MessageType.warning, message, title, confirmButtonText, messageParams, titleParams, allowEscapeKey, allowOutsideClick, cancelButtonText, true, customClass, reverseButtons);
  }

  public confirmMsgWithTranslation(messageKey: string, titleKey: string = "warning", confirmButtonTextKey: string = "ok", cancelButtonTextKey: string = "cancel", messageParams?: any, titleParams?: any, allowEscapeKey: boolean = true, allowOutsideClick: boolean = true, customClass?: string, reverseButtons?: boolean): Promise<any> {
    return this.showSwalWithTranslation(MessageType.warning, messageKey, titleKey, confirmButtonTextKey, messageParams, titleParams, allowEscapeKey, allowOutsideClick, cancelButtonTextKey, true, customClass, reverseButtons);
  }

  public infoMsg(message: string, title: string = "Info", confirmButtonText: string = "OK", showCancelButton: boolean = false, cancelButtonText: string = "Cancel", messageParams?: any, titleParams?: any, allowEscapeKey: boolean = true, allowOutsideClick: boolean = true, customClass?: string, reverseButtons?: boolean): Promise<any> {
    return this.showSwal(MessageType.info, message, title, confirmButtonText, messageParams, titleParams, allowEscapeKey, allowOutsideClick, cancelButtonText, showCancelButton, customClass, reverseButtons);
  }

  public infoMsgWithTranslation(messageKey: string, titleKey: string = "info", confirmButtonTextKey: string = "ok", showCancelButton: boolean = false, cancelButtonTextKey: string = "cancel", messageParams?: any, titleParams?: any, allowEscapeKey: boolean = true, allowOutsideClick: boolean = true, customClass?: string, reverseButtons?: boolean): Promise<any> {
    return this.showSwalWithTranslation(MessageType.info, messageKey, titleKey, confirmButtonTextKey, messageParams, titleParams, allowEscapeKey, allowOutsideClick, cancelButtonTextKey, showCancelButton, customClass, reverseButtons);
  }

  public questionMsg(message: string, title: string = "Question", confirmButtonText: string = "OK", cancelButtonText: string = "Cancel", messageParams?: any, titleParams?: any, allowEscapeKey: boolean = true, allowOutsideClick: boolean = true, customClass?: string, reverseButtons?: boolean): Promise<any> {
    return this.showSwal(MessageType.question, message, title, confirmButtonText, messageParams, titleParams, allowEscapeKey, allowOutsideClick, cancelButtonText, true, customClass, reverseButtons);
  }

  public questionMsgWithTranslation(messageKey: string, titleKey: string = "question", confirmButtonTextKey: string = "ok", cancelButtonTextKey: string = "cancel", messageParams?: any, titleParams?: any, allowEscapeKey: boolean = true, allowOutsideClick: boolean = true, customClass?: string, reverseButtons?: boolean): Promise<any> {
    return this.showSwalWithTranslation(MessageType.question, messageKey, titleKey, confirmButtonTextKey, messageParams, titleParams, allowEscapeKey, allowOutsideClick, cancelButtonTextKey, true, customClass, reverseButtons);
  }

  public successMsg(message: string, title: string = "Success", confirmButtonText: string = "OK", showCancelButton: boolean = false, cancelButtonText: string = "Cancel", messageParams?: any, titleParams?: any, allowEscapeKey: boolean = true, allowOutsideClick: boolean = true, customClass?: string, reverseButtons?: boolean): Promise<any> {
    return this.showSwal(MessageType.success, message, title, confirmButtonText, messageParams, titleParams, allowEscapeKey, allowOutsideClick, cancelButtonText, showCancelButton, customClass, reverseButtons);
  }

  public successMsgWithTranslation(messageKey: string, titleKey: string = "success", confirmButtonTextKey: string = "ok", showCancelButton: boolean = false, cancelButtonTextKey: string = "cancel", messageParams?: any, titleParams?: any, allowEscapeKey: boolean = true, allowOutsideClick: boolean = true, customClass?: string, reverseButtons?: boolean): Promise<any> {
    return this.showSwalWithTranslation(MessageType.success, messageKey, titleKey, confirmButtonTextKey, messageParams, titleParams, allowEscapeKey, allowOutsideClick, cancelButtonTextKey, showCancelButton, customClass, reverseButtons);
  }

  public errorMsg(message: string, title: string = "Error", confirmButtonText: string = "OK", messageParams?: any, titleParams?: any, allowEscapeKey: boolean = true, allowOutsideClick: boolean = true, customClass?: string, reverseButtons?: boolean): Promise<any> {
    return this.showSwal(MessageType.error, message, title, confirmButtonText, messageParams, titleParams, allowEscapeKey, allowOutsideClick, '', false, customClass, reverseButtons);
  }

  public errorMsgWithTranslation(messageKey: string, titleKey: string = "error", confirmButtonTextKey: string = "ok", messageParams?: any, titleParams?: any, allowEscapeKey: boolean = true, allowOutsideClick: boolean = true, customClass?: string, reverseButtons?: boolean): Promise<any> {
    return this.showSwalWithTranslation(MessageType.error, messageKey, titleKey, confirmButtonTextKey, messageParams, titleParams, allowEscapeKey, allowOutsideClick, '', false, customClass, reverseButtons);
  }

  private showSwal(type: any, message: string, title: string, confirmButtonText: string,
    messageParams?: any, titleParams?: any, allowEscapeKey: boolean = true, allowOutsideClick: boolean = true,
    cancelButtonText?: string, showCancelButton: boolean = false, customClass?: string, reverseButtons?: boolean): Promise<any> {

    var promise: Promise<any>;

    return swal({
      title: title,
      html: `<div id="swal-message" role="alert" tabindex="0" onfocus="this.style.outline='transparent'">${message}</div>`,
      type: type,
      showCancelButton: showCancelButton,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: confirmButtonText,
      cancelButtonText: cancelButtonText,
      allowOutsideClick: allowOutsideClick,
      allowEscapeKey: allowEscapeKey,
      customClass: customClass,
      reverseButtons: reverseButtons,
      onOpen: () => {
        document.getElementById("swal-message").focus();
      }

    }).then((result) => {
      if (result.value) {
        promise = Promise.resolve(result.value);
      }
      else {
        promise = Promise.reject(result.dismiss);
      }
      return promise;
    }).catch(c => { swal.noop; return promise; });
  }

  private showSwalWithTranslation(type: any, messageKey: string, titleKey: string, confirmButtonTextKey: string,
    messageParams?: any, titleParams?: any, allowEscapeKey: boolean = true, allowOutsideClick: boolean = true,
    cancelButtonTextKey?: string, showCancelButton: boolean = false, customClass?: string, reverseButtons?: boolean): Promise<any> {

    var promise: Promise<any>;

    return swal({
      title: this.getInstantLabelText(titleKey, titleParams),
      html: `<div id="swal-message" role="alert" tabindex="0" onfocus="this.style.outline='transparent'">${this.getInstantLabelText(messageKey, messageParams)}</div>`,
      type: type,
      showCancelButton: showCancelButton,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: this.getInstantLabelText(confirmButtonTextKey),
      cancelButtonText: this.getInstantLabelText(cancelButtonTextKey),
      allowOutsideClick: allowOutsideClick,
      allowEscapeKey: allowEscapeKey,
      customClass: customClass,
      reverseButtons: reverseButtons,
      onOpen: () => {
        document.getElementById("swal-message").focus();
      }
    }).then((result) => {
      if (result.value) {
        promise = Promise.resolve(result.value);
      }
      else {
        promise = Promise.reject(result.dismiss);
      }
      return promise;
    }).catch(c => { swal.noop; return promise; });
  }
  /*ComplexMsg(title: string, html: string, type: MessageType, cancelButtonText: string, confirmButtonText: string, showCancelButton?: boolean, confirmButtonClass?: string, cancelButtonClass?: string, funcIfConfirm?: () => void, funcIfCancel?: () => void) {
    swal({
      title: title,
      html: html,
      type: MessageType[type],
      showCancelButton: showCancelButton != null ? showCancelButton : true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: confirmButtonText,
      cancelButtonText: cancelButtonText,
      confirmButtonClass: confirmButtonClass != "" ? confirmButtonClass : 'btn btn-success',
      cancelButtonClass: cancelButtonClass != "" ? cancelButtonClass : 'btn btn-danger',
      buttonsStyling: true,
      reverseButtons: true,
    }).then(function () {
      if (funcIfConfirm)
        funcIfConfirm();
      }).catch(function (reason) {
      if (funcIfCancel)
        funcIfCancel();
    });
  }*/
  NotificationMsg(type: MessageType, html: string, timer: number) {
    swal({
      type: MessageType[type],
      html: html,
      showConfirmButton: false,
      timer: timer
    }).catch(function () { });
  }
}

