import { OnInit, ViewEncapsulation, forwardRef, Input, ElementRef, SimpleChanges, ViewChild, ChangeDetectorRef, OnChanges, Injector, EventEmitter, Output, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, AbstractControl } from '@angular/forms';
import { BaseAbstractControl } from '../../base/base-abstract-control';
import { Observable, Subject, BehaviorSubject, Subscription } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { FilterPipe } from './FilterPipe';
import { MatAutocompleteTrigger, MatAutocomplete, MatInput, MatAutocompleteSelectedEvent } from '@angular/material';
import { MohValidationErrors } from '../../error-message/base/mohValidationErrors';
import { isNullOrUndefined } from 'util';

export function isValidOption(c: AbstractControl, thisComponent: SelectBase) {
  return function isValidValue(c: FormControl): MohValidationErrors | null {
    let mohValidationErrors: MohValidationErrors = {};
    mohValidationErrors["invalidOption"] = { errorMessageKey: 'invalidOption' };
    let val = c ? c.value : null;
    if (val) {
      let option = thisComponent.getOptionByValue(val);
      let value = thisComponent.getValueByText(val);

      if (thisComponent.forceSelect && !option && !value
        && thisComponent.innerOptions && thisComponent.innerOptions.length > 0)
        return mohValidationErrors;
      return null;
    }
    return null;
  }
}


export class SelectBase extends BaseAbstractControl implements OnInit, OnChanges, OnDestroy {

  /**
  * An observable of the list of options to be displayed in the select.
  */
  @Input() options: Observable<any[]>;
  /**
  * The display field name of the option object.
  */
  @Input() displayField?: string = null;
  /**
  * The value field name of the option object.
  */
  @Input() valueField?: string;
  /**
  * Whether the select is an auto complete.
  */
  @Input() isAutoComplete: boolean = false;
  /**
  * Whether the select should force selecting an option from the list or enable inserting a value outside the list (in case of auto complete).
  */
  @Input() forceSelect: boolean = true;
  /**
  * Placeholder text to display in the select.
  */
  @Input() placeholder: string = '';
  /**
  * Placeholder text key to display in the select.
  */
  @Input() placeholderKey: string = '';
  /**
  * Default value of the select on initialization.
  */
  @Input() defaultValue: any;
  /**
  * Number of inserted characters to start filtering select options.
  */
  @Input() minLength?: number = 2;
  /**
  * A function returning the value to be displayed.
  */
  @Input() displayFn: any;
  /**
  * The parent abstract control when using cascading select.
  */
  @Input() parentSelect: AbstractControl = null;
  /**
  * The parent sorting by field when using cascading select.
  */
  @Input() parentSortField: string = '';
  /**
  * The child sorting by field when using cascading select.
  */
  @Input() childSortField: string = '';
  /**
  * indicate if automatic focus will be on the input field
  */
  @Input() autoFocus: boolean = false;

  /**
  * Event emitted when the child select data is changed.
  */
  @Output() onChildDataChange: EventEmitter<any> = new EventEmitter();
  /**
  *Event that is emitted whenever an option from the list is selected.
  */
  @Output() optionSelected: EventEmitter<MatAutocompleteSelectedEvent> = new EventEmitter();
  /**
  *Event that is emitted when the autocomplete panel is closed.
  */
  @Output() closed: EventEmitter<void> = new EventEmitter();
  /**
  *Event that is emitted when the autocomplete panel is opened.
  */
  @Output() opened: EventEmitter<void> = new EventEmitter();

  /**
  * Event emitted when the component is blured.
  */
  @Output() blur: EventEmitter<any> = new EventEmitter();
  // /**
  // * Event emitted when the textbox is focused.
  // */
  // @Output() focus: EventEmitter<any> = new EventEmitter();
  ///** 
  // * Event emitted when the enter is pressed.
  // */
  // @Output() keyUpEnter: EventEmitter<any> = new EventEmitter();


  innerOptions: any[];
  selectSubject: Subject<any[]> = new BehaviorSubject<any[]>([]);
  options$: Observable<any[]> = this.selectSubject.asObservable();
  placeholderText: string;
  placeholderValue: Observable<String>;
  mySubscriptions: Array<Subscription> = [];
  validateFn: Function;

  @ViewChild(MatAutocompleteTrigger, { static: true }) trigger: MatAutocompleteTrigger;
  @ViewChild(MatAutocomplete, { static: true }) matAutocomplete: MatAutocomplete;
  @ViewChild(MatInput, { static: true }) matInput: MatInput;
  @ViewChild('input', { static: true }) input: ElementRef;

  constructor(injector: Injector, protected cdRef: ChangeDetectorRef) {
    super(injector);
    this.baseAbstractControl = new FormControl(this.defaultValue, [isValidOption(this.baseAbstractControl, this)]);
  }

  ngOnInit() {

    this.placeholderValue = this.getLabelText(this.placeholderKey)
    //this.validateFn = (boolean) => isValidOption(boolean);
    super.ngOnInit();

    if (this.defaultValue) {
      //this.baseAbstractControl.setValue(this.defaultValue);
    }

    this.mySubscriptions.push(this.options.subscribe(options => {
      if (options) {
        this.innerOptions = options;
        if (this.parentSelect) {
          this.filterList(this.parentSelect.value);
        }
        else {
          this.selectSubject.next(this.innerOptions);
        }
      }
    }));

    this.options$.subscribe(options => {
      this.onChildDataChange.emit(options);
      if (this.baseAbstractControl.value) {
        let isValidValue = !this.forceSelect || !!this.getOptionByValue(this.baseAbstractControl.value);
        setTimeout(() => {
          this.baseAbstractControl.setValue(isValidValue ? this.baseAbstractControl.value : null, { emitEvent: false });
          this.baseAbstractControl.updateValueAndValidity({ emitEvent: false });
        });



      }
    }, error => {
      if (this.baseAbstractControl.value && this.forceSelect) {
        setTimeout(() => this.baseAbstractControl.setValue(null, { emitEvent: false }));
      }
    });

    //if (this.parentSelect) {
    //  this.updateByParent(this.parentSelect.value);
    //  this.parentSelect.valueChanges.subscribe(val => {
    //    this.updateByParent(val);
    //  });
    //}
  }

  private updateByParent(parentCurrentValue: any) {
    if (this.filterList(parentCurrentValue)) {

      const selectedValue = this.baseAbstractControl.value;

      if (!isNullOrUndefined(selectedValue)
        && selectedValue !== ""
        && this.forceSelect
        && (typeof (parentCurrentValue) != 'object' || selectedValue[this.childSortField] != parentCurrentValue[this.parentSortField])) {
        this.baseAbstractControl.setValue("");
      }
    }
    else if (isNullOrUndefined(parentCurrentValue) || parentCurrentValue === "") {
      this.baseAbstractControl.setValue("");
      this.selectSubject.next([]);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.parentSelect && this.childSortField && (
      changes.parentSelect && changes.parentSelect.currentValue
      || (changes.childSortField && changes.childSortField.currentValue)
      || changes.parentSortField && changes.parentSortField.currentValue)) {
      this.updateByParent(this.parentSelect.value);
      this.mySubscriptions.push(
        this.parentSelect.valueChanges
          .distinctUntilChanged((x, y) => JSON.stringify(x) == JSON.stringify(y))
          .subscribe(val => {
            this.updateByParent(val);
          }));
    }

    if (changes.isDisabled) {
      if (this.isDisabled) {
        this.baseAbstractControl.disable();
      } else {
        this.baseAbstractControl.enable();
      }
    }

  }

  //public ngDoCheck() {
  //  console.log('select change detection')
  //  this.cdr.detectChanges();
  //}

  ngAfterViewInit() {
    this.trigger.panelClosingActions
      .subscribe(e => {
        if (!(e && e.source)
          && !isNullOrUndefined(this.baseAbstractControl.value)
          && this.baseAbstractControl.value !== '') {// && this.trigger.panelOpen
          let option = this.getOptionByValue(this.baseAbstractControl.value);
          let value = this.getValueByText(this.baseAbstractControl.value);

          if (this.forceSelect && !option && !value) {
            //this.matInput.placeholder = this.placeholderText;
            this.baseAbstractControl.setValue(null);

            this.baseAbstractControl.updateValueAndValidity();
            this.trigger.closePanel();
          }
          if (!option && value) {
            this.baseAbstractControl.setValue(this.valueField ? value[this.valueField] : value);
          }
        }
      });
    if (this.autoFocus == undefined || this.autoFocus !== false) {
      if (this.input)
        this.input.nativeElement.focus();
    }
    this.cdRef.detectChanges();

    /* if (this.defaultValue) {
       this.writeValue(this.defaultValue);
       //this.baseAbstractControl.updateValueAndValidity();

       this.cdr.detectChanges();
     }*/

  }

  public writeValue(value) {
    if (!value || !this.forceSelect || !this.innerOptions || this.innerOptions.length == 0 || !!this.getOptionByValue(value)) {
      super.writeValue(value);
    }
  }

  getDisplayValue(option) {
    if (option != null && option != undefined) {
      if (!this.displayField) {
        if (this.displayFn instanceof Function)
          return this.displayFn(option);
        return option;
      }
      return option[this.displayField];
    }
  }

  displayWithFn(value) {
    if (value != undefined && value != null) {

      let search: any = value;

      if (this.innerOptions && this.valueField) {
        search = this.innerOptions.find(option => option[this.valueField] === value);
      }

      return this.getDisplayValue(search);
    }
  }

  removePlaceholder() {
    this.placeholderText = this.matInput.placeholder;
    this.matInput.placeholder = '';
  }

  private filterList(val) {
    if (!isNullOrUndefined(val) && val !== '') {
      let parentSortValue = val;
      if (this.parentSortField) {
        if (typeof (val) == 'object' && !isNullOrUndefined(val[this.parentSortField])) {
          parentSortValue = val[this.parentSortField];
        }
        else {
          return false;
        }
      }
      this.selectSubject.next((this.innerOptions || []).filter(x => x[this.childSortField] === parentSortValue));
      return true;
    }

    return false;
  }

  getOptionByValue(value) {
    if (this.innerOptions) {
      if (this.valueField) {
        return this.innerOptions.find(option => option[this.valueField] == value);
      }
      return this.innerOptions.find(option => JSON.stringify(option) === JSON.stringify(value));
    }
  }

  getValueByText(text) {
    if (this.innerOptions && typeof text == 'string') {
      if (this.displayField) {
        return this.innerOptions.find(option => option[this.displayField] == text);
      }
      if (this.displayFn) {
        return this.innerOptions.find(option => this.displayFn(option) == text);
      }
    }
  }

  ngOnDestroy() {
    this.mySubscriptions.forEach(s => s.unsubscribe());
  }

  onOptionSelected(event: MatAutocompleteSelectedEvent) {
    this.optionSelected.emit(event);
  }

  onClosed() {
    this.input.nativeElement.blur();
    this.closed.emit();
    //When the panel closed - the component loses focus:
    this.onBlur();
  }

  onOpened() {
    this.opened.emit();
  }

  onInputBlur() {
    //It is a blur of the input, and not always blur of the whole component,
    //Not emit an event of blur of the component - as long as the panel is open
    if (!this.matAutocomplete.isOpen) {
      //when component blured and panel not opened, ex: blur input when no match options.
      this.onBlur();
    }
  }

  private onBlur() {
    this.onTouched();
    this.blur.emit(null);
  }

  //onBlur() {
  //  this.onTouched();
  //  this.blur.emit(null);
  //}

  //onFocus() {
  //  this.focus.emit();
  //}

  //onKeyUpEnter(){
  //  this.keyUpEnter.emit();
  //}



}
