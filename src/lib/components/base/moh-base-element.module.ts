import { NgModule } from '@angular/core';
import { NgModelComponent } from "./ng-model-base";
import { BaseFormControl } from "./base-form-control";
import { BaseAbstractControl } from "./base-abstract-control";
import { BaseElement } from "./base-element";
import { LabelBase } from "./label-base";

export * from "./ng-model-base";
export * from "./base-form-control";
export * from "./base-abstract-control";
export * from "./base-element";
export * from "./label-base";

@NgModule({})
export class MohBaseElementModule { }
