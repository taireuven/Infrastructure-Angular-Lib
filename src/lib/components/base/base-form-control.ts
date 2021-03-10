import { FormControl, AbstractControl } from "@angular/forms";
import { Input, ElementRef, ViewChild, Injector } from "@angular/core";
import { BaseElement } from "./base-element";
import { BaseAbstractControl } from "./base-abstract-control";
import { Observable } from "rxjs";

export class BaseFormControl extends BaseAbstractControl {

  protected formControl: FormControl;

  constructor(injector: Injector) {

    super(injector);

    this.formControl = new FormControl();
    this.baseAbstractControl = <AbstractControl>this.formControl;

  }
}
