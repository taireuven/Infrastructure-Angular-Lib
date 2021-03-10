import {of as observableOf,  Observable ,  Subscription } from 'rxjs';
import { ValueAccessorBase } from "./value-accessor";
import { Input, ElementRef, Injector, OnInit, ChangeDetectorRef, OnDestroy } from "@angular/core";
import { FormSubmitService } from "../../services/form-submit/form-submit.service";
import { LabelBase } from '../base/label-base';

export class BaseElement extends LabelBase implements OnInit, OnDestroy {

  formSubmitted: boolean = false;

  @Input() MarkAsRequired: boolean;
  @Input() isDisabled: boolean = false;

  //label:
  @Input() labelText: string;
  @Input() labelAbove: boolean = true;
  @Input() ariaLabelKey: string;

  @Input() formControlName: string;

  @Input() useDefaultKey: boolean = true;

  /**
  * Wheter to mark the control as invalid or not.
  */
  @Input() markAsInvalid: boolean = false;

  @Input()
  get tabIndex(): number {
    return this.isDisabled ? -1 : 0;
  }


  identifer: string;
  nativeElement: ElementRef;
  cdr: ChangeDetectorRef;
  protected subscription: Subscription;

  constructor(injector: Injector) {
    super(injector);

    let element: ElementRef = injector.get(ElementRef);
    let formSubmitService: FormSubmitService = injector.get(FormSubmitService);
    this.cdr = injector.get(ChangeDetectorRef);

    this.identifer = element.nativeElement.getAttribute('id');
    this.nativeElement = element.nativeElement;

    this.subscription = formSubmitService.errorValidationHandled.subscribe(item => {
      this.onErrorValidation(item);
    });
  }

  ngOnInit(): void {
    this.textKey = !this.textKey && this.useDefaultKey ? this.formControlName : this.textKey;
  }



  onErrorValidation(value: string) {
    this.formSubmitted = true;
    this.cdr.markForCheck();
  }

  get ariaLabel(): Observable<string> {

    if (this.ariaLabelKey) {
      return this.getLabelText(this.ariaLabelKey);
    }
    if (this.labelText) {
      return observableOf(this.labelText);
    }
    return this.textValue;
  };

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
