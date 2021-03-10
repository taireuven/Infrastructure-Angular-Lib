import { Component, OnInit, forwardRef, ChangeDetectionStrategy, Injector, Input, EventEmitter, Output, ViewChild, ElementRef, ViewEncapsulation, OnChanges, SimpleChanges } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl, AbstractControl, ValidatorFn } from '@angular/forms';
import { BaseAbstractControl } from '../base/base-abstract-control';
import { Observable } from 'rxjs';
import { MatAutocompleteSelectedEvent, MatAutocompleteTrigger, MatAutocomplete } from '@angular/material';
import { SelectGroup } from '../select/base/SelectGroup';
import { MohValidationErrors } from '../error-message/base/mohValidationErrors';
import { isNullOrUndefined } from 'util';
import { startWith, map } from 'rxjs/operators';

export function isValidOption(autocomplete: AutocompleteComponent): ValidatorFn {
  return (control: AbstractControl): MohValidationErrors | null => {

    const value: any = control.value;

    if (isNullOrUndefined(value) || value === '' || autocomplete.getOptionByValue(value)) {
      return null
    }

    return {
      'invalidOption': { errorMessageKey: 'invalidOption' }
    };
  }
}
/**
 * The autocomplete is a normal text input enhanced by a panel of suggested options, based on mat-autocomplete
 * This component implement value-accessor.
 * This component filter the options list according to the input value,
 * The filter can be customized by the filter input.
 * 
 * ### Usage
  ```html

   <!-- basic autocomplete with simple options -->
   <moh-autocomplete formControlName="autocomplete" [options]="simpleOptions"
                     [showOtherOption]="true" otherOptionTextKey="otherKey" [otherOptionValue]="'999'"></moh-autocomplete>

   <!-- autocomplete with inputs -->
   <moh-autocomplete formControlName="autocomplete" [options]="objectOptions" [displayField]="'value'" [valueField]="'key'"
               forceSelect="false" placeholderKey="autocomplete" [minLength]="1" [MarkAsRequired]="true"
               [markAsInvalid]="!demoForm.controls.autocomplete.valid"></moh-autocomplete>

   <!-- autocomplete with tag -->
   <moh-autocomplete formControlName="autocomplete" [options]="objectOptions" [displayField]="'value'" [valueField]="'key'"
                [tagField]="'tag'"></moh-autocomplete>

   <!-- autocomplete with groups -->
            <moh-autocomplete [groupsOptions]="groupsList" displayField="text" textKey='autocompleteLabelKey'
                        [MarkAsRequired]=true formControlName="autoComplete" [isDisabled]="isDisabled"
                        [markAsInvalid]="(form.controls.autoComplete.touched || !!form['submitted'])&&!(form.controls.autoComplete.valid)"></moh-autocomplete>
  ```
*
* #### TS
 ```typescript

    simpleOptions: any[] = [1,2,3];

    objectSelectOptions: any[] = [
      { key: 1, value: "Red", tag="R" },
      { key: 2, value: "Green", tag="G"  },
      { key: 3, value: "Blue", tag="B"  }
    ];

    //for autocomplete with groups example
    groupsList: SelectGroup[] = [{
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
    }];
 ```
*
 * <example-url>../screenshots/components/v2/select-v2.png</example-url>
 * <example-url>../screenshots/components/v2/select-v2-open.png</example-url>
 * <example-url>../screenshots/components/autocomplete_tag.png</example-url>
*/
@Component({
  selector: 'moh-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: forwardRef(() => AutocompleteComponent) },
    { provide: NG_VALIDATORS, multi: true, useExisting: forwardRef(() => AutocompleteComponent) }]
})
export class AutocompleteComponent extends BaseAbstractControl implements OnInit, OnChanges {

  private _groupsOptions: SelectGroup[];

  /**
  * The list of options to be displayed in the select.
  */
  @Input() options: any[];
  /**
  * The display field name of the option object.
  */
  @Input() displayField?: string = null;
  /**
 * A function returning the value to be displayed.
 */
  @Input() displayFn: any;
  /**
  * The value field name of the option object.
  */
  @Input() valueField?: string;
  /**
  * The tag field name of the option object.
  */
  @Input() tagField?: string;
  /**
  * The list of options` groups to be displayed in the select.
  */
  @Input() set groupsOptions(groups: SelectGroup[]) {
    this._groupsOptions = groups;
    if (this._groupsOptions) {
      let options: any[] = [];
      groups.forEach(group => options = options.concat(group.options));
      this.options = options;
    }
  }
  get groupsOptions(): SelectGroup[] {
    return this._groupsOptions;
  }

  /**
  * Change direction of select option: 'ltr' | 'rtl', by default get lang direction
  */
  @Input() optionsDirection: 'ltr' | 'rtl' | null = null;
  /**
  * Icon to show beside select.
  */
  @Input() iconName?: string = "";
  /**
   * Function that maps an option's control value to its display value in the trigger.
   */
  @Input() displayWith: ((value: any) => string) | null;
  /**
  * Placeholder text to display in the select.
  */
  @Input() placeholder: string = '';
  /**
  * Placeholder text key to display in the select.
  */
  @Input() placeholderKey: string = '';
  /**
   * Number of inserted characters to start filtering select options.
   */
  @Input() minLength: number = 2;
  /**
  * Whether expand the panel size when the text is too long.
  */
  @Input() isStaticPanelWidth: boolean = false;
  /**
  * Whether show other option.
  */
  @Input() showOtherOption: boolean = false;
  /**
  * The display text of the other option.
  */
  @Input() otherOptionText: string = '';
  /**
  * The key of the display text of the other option.
  */
  @Input() otherOptionTextKey: string = 'other';
  /**
  * The value of the other option.
  */
  @Input() otherOptionValue: any = -1;
  /**
  * Whether the select should force selecting an option from the list or enable inserting a value outside the list (in case of auto complete).
  */
  @Input() forceSelect: boolean = true;
  /**
   * Whether to highlight the matching characters for the search in the list of options.
   */
  @Input() highlightSearch: boolean = true;
  /**
  * Function that filter the options list.
  */
  @Input() filter: ((options: any[], searchText: string) => any[]) = this._filter;
  /**
  * Limitation of options displayed.
  */
  @Input() optionsLimit: number = 50;
  /**
  * Limitation of groups displayed, when use groupsOptions input.
  */
  @Input() groupsLimit: number = 10;
  /**
  * The custom class on the autocomplete, for giving it special CSS.
  */
  @Input() autocompleteClass: string = null;

  /**
  * Event that is emitted when the autocomplete panel is opened.
  */
  @Output() opened: EventEmitter<void> = new EventEmitter<void>();
  /**
  * Event that is emitted when the autocomplete panel is closed.
  */
  @Output() closed: EventEmitter<void> = new EventEmitter<void>();
  /**
  * Event that is emitted whenever an option from the list is selected.
  */
  @Output() optionSelected: EventEmitter<MatAutocompleteSelectedEvent> = new EventEmitter<MatAutocompleteSelectedEvent>();
  /**
  * Event emitted when the textbox is blured.
  */
  @Output() blur: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild('input', { static: true }) input: ElementRef;
  @ViewChild(MatAutocompleteTrigger, { static: true }) trigger: MatAutocompleteTrigger;
  @ViewChild(MatAutocomplete, { static: true }) matAutocomplete: MatAutocomplete;

  placeholderValue: Observable<String>;
  otherOptionTextValue: string;
  inputText: string = '';
  filteredOptions: Observable<any[]>;
  filteredGroups: Observable<SelectGroup[]>

  constructor(injector: Injector) {
    super(injector);
    this.baseAbstractControl = new FormControl();
  }

  ngOnInit() {
    this.placeholderValue = this.getLabelText(this.placeholderKey);

    let valueChanges$ = this.baseAbstractControl.valueChanges
      .pipe(
        startWith(''),
        map(value => {
          this.inputText = '';

          if (this.input && this.input.nativeElement) {
            if (!this.input.nativeElement.value && this.baseAbstractControl.value) {
              this.inputText = this.displayWithFn(this.baseAbstractControl.value);
            }
            else {
              this.inputText = this.input.nativeElement.value;
            }
          }

          return this.inputText;
        }));

    this.filteredOptions = valueChanges$
      .pipe(map((text: string) =>
        ((text && text.length >= this.minLength) ? this._filter(this.options, text) : (this.options || []))
          .slice(null, this.optionsLimit))
      );

    this.filteredGroups = valueChanges$
      .pipe(map((text: string) =>
        ((text && text.length >= this.minLength) ? this._filterGroup(text) : (this.groupsOptions || []))
          .slice(null, this.groupsLimit))
      );

    if (this.showOtherOption) {
      if (this.otherOptionText) {
        this.otherOptionTextValue = this.otherOptionText;
      }
      else {
        this.getLabelText(this.otherOptionTextKey).subscribe(val => this.otherOptionTextValue = val);
      }
    }

    if (this.forceSelect) {
      this.baseAbstractControl.setValidators([isValidOption(this)]);
    }

    super.ngOnInit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.isDisabled) {
      if (this.isDisabled) {
        this.baseAbstractControl.disable();
      } else {
        this.baseAbstractControl.enable();
      }
    }

    if (changes.options && !isNullOrUndefined(this.baseAbstractControl.value)) {
      this.baseAbstractControl.setValue(this.baseAbstractControl.value, { emitEvent: false });
      this.baseAbstractControl.updateValueAndValidity();
    }
  }

  ngAfterViewInit() {
    this.trigger.panelClosingActions
      .subscribe(e => {
        if (!(e && e.source)) {
          let option = this.getOptionByValue(this.baseAbstractControl.value);

          if (isNullOrUndefined(option)) {
            let matchOptions = this.getOptionByText(this.baseAbstractControl.value);

            if (!isNullOrUndefined(matchOptions) && matchOptions.length == 1) {
              let matchOption = matchOptions[0];
              this.baseAbstractControl.setValue(this.valueField && matchOption != this.otherOptionValue ? matchOption[this.valueField] : matchOption);
            }

            //--- clear when type not exist text (Canceled, at UX requirement)
            //else if (this.forceSelect) {
            //  this.baseAbstractControl.setValue(null);
            //  this.baseAbstractControl.updateValueAndValidity();
            //  this.trigger.closePanel();
            //}
          }
        }
      });
  }

  displayWithFn(value) {
    if (!isNullOrUndefined(value)) {
      let search: any = value;

      if (this.showOtherOption && value === this.otherOptionValue) {
        return this.otherOptionTextValue;
      }
      else if (this.options && this.valueField) {
        let option = this.options.find(option => option[this.valueField] === value);
        if (!option && !this.forceSelect) {
          return search;
        }
        else {
          search = option;
        }
      }

      return this.getDisplayValue(search);
    }
  }

  getOptionByValue(value) {
    if (this.options && !isNullOrUndefined(value)) {
      if (this.showOtherOption && value === this.otherOptionValue) {
        return this.otherOptionTextValue;
      }
      else if (this.valueField) {
        return this.options.find(option => option[this.valueField] === value);
      }
      return this.options.find(option => JSON.stringify(option) === JSON.stringify(value));
    }
  }

  getOptionByText(text) {
    if (this.options && typeof text == 'string') {
      if (this.showOtherOption && text === this.otherOptionTextValue) {
        return [this.otherOptionValue];
      }
      if (this.displayField) {
        return this.options.filter(option => option[this.displayField] === text);
      }
      else if (this.displayFn) {
        return this.options.filter(option => this.displayFn(option) === text);
      }
      else {
        return this.options.filter(option => option === text);
      }
    }
  }

  getDisplayValue(option) {
    if (option) {
      if (!this.displayField) {
        if (this.displayFn instanceof Function)
          return this.displayFn(option);
        return option;
      }
      return option[this.displayField];
    }
  }

  onOpened() {
    this.opened.emit();
  }

  onClosed() {
    this.input.nativeElement.blur();
    this.closed.emit();
    this.onBlur();
  }

  onInputBlur() {
    //Emit component blur event on the input blur event just if the input blured and panel not was opened,
    //ex: blur input when no match options.
    if (!this.matAutocomplete.isOpen) {
      this.onBlur();
    }
  }

  private onBlur() {
    this.onTouched();
    this.blur.emit(null);
  }

  onOptionSelected(event: MatAutocompleteSelectedEvent) {
    this.optionSelected.emit(event);
  }

  private _filter(options: any[], searchText: string): string[] {
    const filterValue = searchText.toLowerCase();

    return options.filter(option => {
      let res: boolean = false;
      if (option instanceof Object) {
        if (this.displayField) {
          res = option[this.displayField].toLowerCase().includes(filterValue);
        }
        if (this.tagField && !res) {
          res = option[this.tagField].toLowerCase().includes(filterValue);
        }
        return res;
      }

      return option.toLowerCase().includes(filterValue);
    });
  }

  private _filterGroup(value: string): SelectGroup[] {
    return this.groupsOptions
      .map(group => ({ title: group.title, options: this._filter(group.options, value) }))
      .filter(group => group.options.length > 0);
  }
}
