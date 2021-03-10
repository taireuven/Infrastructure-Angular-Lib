//the base component from this webSite:
//https://github.com/clbond/form-example

import { Input, ElementRef, ViewChild } from "@angular/core";
import { NgModel } from "@angular/forms";
import { Observable } from "rxjs";
import { ValueAccessorBase } from "./value-accessor";

export class NgModelComponent extends ValueAccessorBase<NgModel> {
  @ViewChild(NgModel, { static: true }) model: NgModel;

  constructor(private element: ElementRef) {
    super();
  }
}

