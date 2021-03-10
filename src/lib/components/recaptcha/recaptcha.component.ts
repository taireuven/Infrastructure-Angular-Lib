import { Component, forwardRef, OnInit, Injector, ElementRef, ViewChild, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from "@angular/core";
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl, ValidatorFn, AbstractControl } from "@angular/forms";
import { BaseAbstractControl } from "../base/base-abstract-control";
import { MohHttpClient, FormSubmitService } from "../../moh-angular-lib.module";
import { RecaptchaService } from "./recaptcha.service";
import { ReCaptchaComponent } from "angular2-recaptcha";
import { MohValidationErrors } from "../error-message/base/mohValidationErrors";
import { mohValidators } from "../error-message/base/mohValidators";
import { Subscription } from "rxjs";

@Component({
  selector: 'moh-recaptcha',
  templateUrl: './recaptcha.component.html',
  styleUrls: ['./recaptcha.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => RecaptchaComponent), multi: true },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => RecaptchaComponent), multi: true }
  ]
})
export class RecaptchaComponent extends BaseAbstractControl implements OnInit, OnDestroy {

  @Input() visible: boolean;
  @ViewChild(ReCaptchaComponent, { static: false }) captcha: ReCaptchaComponent;
  mySubscriptions: Array<Subscription> = [];

  constructor(injector: Injector, private http: MohHttpClient, el: ElementRef, private formSubmitService: FormSubmitService, private recaptchaService: RecaptchaService,
    private cdRef: ChangeDetectorRef) {

    super(injector);
    this.baseAbstractControl = new FormControl();
  }

  ngOnInit() {

    this.mySubscriptions.push(this.formSubmitService.formSubmitted.subscribe(item => {
      this.onFormSubmitted(item);
      //this.cdRef.detectChanges();
    }));
    this.mySubscriptions.push(this.recaptchaService.resetRecatcha.subscribe(() => {
      this.resetRecaptcha();
      //this.cdRef.detectChanges();
    }));
    super.ngOnInit();
  }
  
  handleCorrectCaptcha(response: string) {

    this.writeValue({ response: response, isVisible: this.visible });
    this.recaptchaService.recaptchaValidated();
  }

  onFormSubmitted(value: string) {

    if (!this.visible) {
      this.captcha.execute();
    }
  }

  resetRecaptcha() {
    this.captcha.reset();
  }
  ngOnDestroy() {
    this.mySubscriptions.forEach(s => s.unsubscribe());
  }
}
