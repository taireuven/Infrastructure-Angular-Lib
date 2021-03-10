import { BaseElement } from "./base-element";
import { FormGroup } from "@angular/forms";
import { ElementRef, OnInit, OnChanges, Injector } from "@angular/core";
import { ControlValueAccessor, ValidationErrors, AbstractControl, Validator, FormControl } from "@angular/forms";
import { FormSubmitService } from "../../services/form-submit/form-submit.service";




export class BaseAbstractControl extends BaseElement implements ControlValueAccessor, Validator, OnInit {

  protected _baseAbstractControl: AbstractControl;

  get baseAbstractControl(): AbstractControl {
    return this._baseAbstractControl;
  }

  set baseAbstractControl(value: AbstractControl) {
    if (this._baseAbstractControl !== value) {
      this._baseAbstractControl = value;
    }
  }

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this._baseAbstractControl.valueChanges.subscribe(val => {
      this.changed.forEach(f => f(val));
      // console.log("base component subscribe" + this);
    });
    super.ngOnInit();
  }

  //---- Control Value Accesor implementation
  protected propagateChange = (_: any) => { };
  protected changed = new Array<(value: any) => void>();
  protected touched = new Array<() => void>();

  writeValue(value) {

    if (!this.baseAbstractControl['controls']) {
      if (value !== undefined || (value === undefined && this._baseAbstractControl.value !== undefined)) {
        this._baseAbstractControl.patchValue(value);
      }
    }
    else {
      if (value) {
        this._baseAbstractControl.patchValue(value);
      }
    }
  }

  registerOnChange(fn: (value: any) => void) {
    //console.log("registerOnValidatorChange");
    this.changed.push(fn);
    this.propagateChange = fn;

  }
  registerOnTouched(fn: any): void {
    this.touched.push(fn);
  }

  setDisabledState?(isDisabled: boolean): void {
    //this._renderer.setElementAttribute(this.element.nativeElement, 'disabled', 'true');

    this.isDisabled = isDisabled;
    if (isDisabled) {
      this._baseAbstractControl.disable();
    } else {
      this._baseAbstractControl.enable();
    }
  }

  //Set touched on blur
  onTouched() {
    this.touched.forEach(f => f());
  }

  //----- Validator implementation

  registerOnValidatorChange(fn: () => void): void {
    //console.log("registerOnValidatorChange");
    this.changed.push(fn);
  }

  validate(control: any) {
    /*console.log("base abstract-control validation:" + this.baseAbstractControl.valid);
    console.log("base abstract-control errors:", this.reduceErrors());*/

    return this.baseAbstractControl.valid ? null : this.reduceErrors();
  }

  reduceErrors() {
    if (this.baseAbstractControl['controls']) {

      let errors: any;

      errors = Object.keys((<FormGroup>this.baseAbstractControl).controls).reduce((errors: any, name: string) => {
        if (this.baseAbstractControl.get(name).errors) {
          errors[name] = this.baseAbstractControl.get(name).errors;
        }
        return errors;
      }, {});

      if (<FormGroup>this.baseAbstractControl.errors)
        errors = {
          ...errors,
          ...(<FormGroup>this.baseAbstractControl.errors)
        }


      return errors;
    }

    else {
      return this.baseAbstractControl.errors;
    }
  }

}
