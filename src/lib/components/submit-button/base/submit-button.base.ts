import { OnInit, Input, Injector, OnDestroy } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { FormSubmitService } from '../../../services/form-submit/form-submit.service';
import { ModalService } from '../../../services/modal/modal.service';
import { RecaptchaService } from '../../recaptcha/recaptcha.service';
import { ButtonBase } from '../../button/base/button.base';
import { Subscription } from 'rxjs';

export class SubmitButtonBase extends ButtonBase implements OnDestroy {

  /**
  * The formGroup for submitting.
  */
  @Input() control: AbstractControl;
  /**
  * Whether there is invisible Recaptcha on form.
  */
  @Input() validateInvisibleRecaptcha: boolean = false;

  private formSubmitService: FormSubmitService;
  private recapthcaService: RecaptchaService;
  private modal: ModalService;
  private subscription: Subscription;

  constructor(injector: Injector) {
    super(injector);
    this.formSubmitService = injector.get(FormSubmitService);
    this.recapthcaService = injector.get(RecaptchaService);
    this.modal = injector.get(ModalService);
  }

  ngOnInit() {
    if (this.validateInvisibleRecaptcha) {
      this.subscription = this.recapthcaService.afterRecapthchaValidation.subscribe(() => { this.recaptchaValidated() });
    }
  }

  submit(event: Event) {

    this.control['submitted'] = true;

    if (this.control.valid == true) {

      this.formSubmitService.submit();

      if (!this.validateInvisibleRecaptcha) {
        this.recaptchaValidated();

      }
    }
    else {
      this.modal.errorMsgWithTranslation("invalidFormMessage", "note", "gotIt")
        .then((result) => {
          this.formSubmitService.handleErrorValidation();
          setTimeout(function () {
            this.focusInvalidControl(document);
          }.bind(this), 3000);
        });
    }
  }

  recaptchaValidated() {
    this.onButtonClick.emit(event);
    this.recapthcaService.resetRecatchaControl();
  }

  focusInvalidControl(el) {

    var invalidElement = el.querySelector(".ng-invalid");
    if (invalidElement) {
      if (invalidElement.querySelector(".ng-invalid")) {
        return this.focusInvalidControl(invalidElement);
      }
      var inputs = invalidElement.getElementsByTagName('input');
      if (inputs && inputs[0]) {
        inputs[0].focus();
      }

      if (invalidElement.nodeName == "INPUT") {
        //file upload
        if (invalidElement.classList.contains("inputFile")) {
          var button = invalidElement.nextElementSibling.getElementsByTagName('button');
          if (button && button[0]) {
            button[0].focus();
          }
        }

        //for date picker
        else {
          invalidElement.focus();
        }
      }
    }
  }

  ngOnDestroy() {
    if (this.subscription)
      this.subscription.unsubscribe();
  }
}
