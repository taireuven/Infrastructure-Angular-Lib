import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class FormSubmitService {

  public formSubmitted: EventEmitter<string>;
  public errorValidationHandled: EventEmitter<string>;

  constructor() {
    this.formSubmitted = new EventEmitter();
    this.errorValidationHandled = new EventEmitter();

  }

  public submit(): void {
    this.formSubmitted.emit();
  }
  public handleErrorValidation(): void {
    this.errorValidationHandled.emit();
  }

}
