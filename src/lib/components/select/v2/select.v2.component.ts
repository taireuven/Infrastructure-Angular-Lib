import { Component, OnInit, ViewEncapsulation, forwardRef, ChangeDetectorRef, Injector, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { SelectBase } from '../base/select.base';
import { of as observableOf, Observable } from 'rxjs';
import { SelectGroup } from '../base/SelectGroup';
import { isNullOrUndefined } from 'util';
/**
 * The select component is a form control for selecting a value from a set of options, simular to native select element.
 * The select supports a simple select, auto complete, cascading select and more.
 * ### Usage
  ```html

   <!-- basic select with simple options -->
   <moh-select formControlName="select" [options]="simpleSelectOptions$"></moh-select>

   <!-- select with inputs -->
   <moh-select formControlName="select" [options]="objectSelectOptions$" [displayField]="'value'" [valueField]="'key'"
               isAutoComplete="true" forceSelect="false" placeholderKey="select" [minLength]="1" [MarkAsRequired]="true"
               [markAsInvalid]="!demoForm.controls.select.valid"></moh-select>

   <!-- cascading select -->
   <moh-select formControlName="parentSelect" [options]="parentSelectOptions$" [displayField]="'parentName'"></moh-select>

   <moh-select formControlName="childSelect" [options]="childSelectOptions$" [displayField]="'childName'"
               [parentSelect]="demoForm.controls.parentSelect" [parentSortField]="'parentId'"
               [childSortField]="'parent_id'" (onChildDataChange)="childDataChanged()"></moh-select>

   <!-- select with groups -->
            <moh-select [groupsOptions$]="groupsList$" displayField="text" labelText=" תיבת השלמה אוטומטית בתצוגת קבוצות"
                        isAutoComplete="true" [MarkAsRequired]=true formControlName="autoComplete" [isDisabled]="isDisabled"
                        [markAsInvalid]="(form.controls.autoComplete.touched || !!form['submitted'])&&!(form.controls.autoComplete.valid)"></moh-select>
  ```
*
* #### TS
 ```typescript

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

    //for select with groups example
    groupsList$: Observable<SelectGroup[]> = Observable.of([{
      title: 'קבוצה ראשונה',
      options: [
        { Id: 3, text: 'הצהרה' },
        { Id: 4, text: 'בקשה חדשה' }
      ]
    },
    {
      title: 'קבוצה שניה',
      options: [
        { Id: 1, text: 'רישום יבואן' },
        { Id: 2, text: 'אישור מוקדם ליבוא מזון רגיש ' }
      ]
    }]);
 ```
*
 * <example-url>../screenshots/components/v2/select-v2.png</example-url>
 * <example-url>../screenshots/components/v2/select-v2-open.png</example-url>
*/
@Component({
  selector: 'moh-select',
  templateUrl: './select.v2.component.html',
  styleUrls: ['./select.v2.component.scss', '../../../../styles/inputs.v2.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: forwardRef(() => SelectV2Component) },
    { provide: NG_VALIDATORS, multi: true, useExisting: forwardRef(() => SelectV2Component) }]
})
export class SelectV2Component extends SelectBase implements OnInit {

  private _startHintLabelKey: string;
  private _endHintLabelKey: string;
  private _showHint: boolean;

  /**
  * Css class name for the select panel.
  */
  //@Input() panelClass: string = "";
  /**
  * Icon to shoe beside select.
  */
  @Input() iconName?: string = "";
  /**
  * An observable of the list of options` groups to be displayed in the select.
  */
  @Input() groupsOptions$: Observable<SelectGroup[]>;
  /**
  * Change direction of select option: 'ltr' | 'rtl', by default get lang direction
  */
  @Input() optionsDirection?: 'ltr' | 'rtl' = null;
  /**
   * The custom class on the autocomplete, for giving it special CSS.
   */
  @Input() autocompleteClass: string = null;
  /**
   * Function that maps an option's control value to its display value in the trigger.
   */
  @Input() displayWith: ((value: any) => string) | null;
  /**
  * Additional descriptive text that appears below the select element - start-aligned.
  */
  @Input() startHintLabel: string = '';
  /**
  * Key of additional descriptive text that appears below the select element - start-aligned.
  */
  @Input() set startHintLabelKey(value: string) {
    this._startHintLabelKey = value;
    this.startHintLabelValue = this.getLabelText(value);
  }
  /**
  * Additional descriptive text that appears below the select element - end-aligned.
  */
  @Input() endHintLabel: string = '';
  /**
  * Key of additional descriptive text that appears below the select element - end-aligned.
  */
  @Input() set endHintLabelKey(value: string) {
    this._endHintLabelKey = value;
    this.endHintLabelValue = this.getLabelText(value);
  }
  /**
  * Wheter to show the hint label, default: the value of !markAsInvalid Input.
  */
  @Input() set showHint(value: boolean) {
    this._showHint = value;
  }

  startHintLabelValue: Observable<String>;
  endHintLabelValue: Observable<String>;

  get startHintLabelKey(): string {
    return this._startHintLabelKey;
  }
  get endHintLabelKey(): string {
    return this._endHintLabelKey;
  }
  get showHint(): boolean {
    if (isNullOrUndefined(this._showHint)){
      return !this.markAsInvalid;
    }
    return this._showHint;
  }

  constructor(injector: Injector, cdr: ChangeDetectorRef) {
    super(injector, cdr);
  }

  ngOnInit() {
    if (this.groupsOptions$) {
      this.groupsOptions$.subscribe(groups => {
        if (groups) {
          let options: any[] = [];
          groups.forEach(group => options = options.concat(group.options));
          this.options = observableOf(options);
        }
      });
    }

    super.ngOnInit();
  }
}

