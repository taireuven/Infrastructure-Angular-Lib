import { Component, ViewEncapsulation, forwardRef, Injector, ChangeDetectorRef } from "@angular/core";
import { NG_VALUE_ACCESSOR, NG_VALIDATORS } from "@angular/forms";
import { SelectBase } from "../base/select.base";
/**
 * The select component is a form control for selecting a value from a set of options, simular to native select element.
 * The select supports a simple select, auto complete, cascading select and more.
 * ### Usage
 * ```html

   <!-- basic select with simple options -->
   <moh-select formControlName="select" [options]="simpleSelectOptions$"></moh-select>

   <!-- select with inputs -->
   <moh-select formControlName="select" [options]="objectSelectOptions$" [displayField]="'value'" [valueField]="'key'"
               isAutoComplete="true" forceSelect="false" placeholderKey="select" [minLength]="1" [MarkAsRequired]="true"></moh-select>

   <!-- cascading select -->
   <moh-select formControlName="parentSelect" [options]="parentSelectOptions$" [displayField]="'parentName'"></moh-select>

   <moh-select formControlName="childSelect" [options]="childSelectOptions$" [displayField]="'childName'"
               [parentSelect]="demoForm.controls.parentSelect" [parentSortField]="'parentId'"
               [childSortField]="'parent_id'" (onChildDataChange)="childDataChanged()"></moh-select>


  ```
*
* #### TS
* ```typescript

    simpleSelectOptions$: Observable<any[]> = Observable.of([1,2,3]);

    objectSelectOptions$: Observable<any[]> = Observable.of([
      { key: 1, value: "Red" },
      { key: 2, value: "Green" },
      { key: 3, value: "Blue" }
    ]);

    parentSelectOptions$: Observable<any[]> = Observable.of([
      { parentId: 1, parentName: "Parent A" },
      { parentId: 2, parentName: "Parent B" }
    ]);

    childSelectOptions$: Observable<any[]> = Observable.of([
      { childId: 1, parent_id: 1, childName: "Child A"},
      { childId: 2, parent_id: 1, childName: "Child B" },
      { childId: 3, parent_id: 2, childName: "Child C" },
      { childId: 3, parent_id: 2, childName: "Child D" }
    ]);

    childDataChanged = (): void => {
      alert("Child Data Changed");
    }
 ```
*
 * <example-url>../screenshots/components/v1/select.png</example-url>
 * <example-url>../screenshots/components/v1/auto-complete.png</example-url>
 * <example-url>../screenshots/components/v1/cascading-select.png</example-url>
*/
@Component({
  selector: 'moh-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: forwardRef(() => SelectComponent) },
    { provide: NG_VALIDATORS, multi: true, useExisting: forwardRef(() => SelectComponent) }]
})
export class SelectComponent extends SelectBase {

  constructor(injector: Injector, cdr: ChangeDetectorRef) {
    super(injector, cdr);
  }

  ngAfterViewInit() {
    this.trigger.panelClosingActions
      .subscribe(e => {
        if (!(e && e.source)) {// && this.trigger.panelOpen
          let option = this.getOptionByValue(this.baseAbstractControl.value);
          let value = this.getValueByText(this.baseAbstractControl.value);

          if (this.forceSelect && !option && !value) {
            this.matInput.placeholder = this.placeholderText;
            this.baseAbstractControl.setValue(null);

            this.baseAbstractControl.updateValueAndValidity();
            this.trigger.closePanel();
          }
          if (!option && value) {
            this.baseAbstractControl.setValue(value);
          }
          if (!this.baseAbstractControl.value) {
            this.matInput.placeholder = this.placeholderText;
          }
        }
      });

    this.cdr.detectChanges();

    /* if (this.defaultValue) {
       this.writeValue(this.defaultValue);
       //this.baseAbstractControl.updateValueAndValidity();

       this.cdr.detectChanges();
     }*/
  }


}
