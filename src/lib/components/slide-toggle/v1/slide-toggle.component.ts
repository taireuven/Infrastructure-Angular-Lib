import { Component, ElementRef, ViewEncapsulation, forwardRef, Injector, ChangeDetectorRef, ChangeDetectionStrategy, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { SlideToggleBase } from '../base/slide-toggle.base';

/**
 * The slide-toggle component is a component to select an option from a list with a slide visibility.
 *
 * ### Usage
 * ```html

   <!-- basic slide-toggle -->
   <moh-slide-toggle formControlName="toggle" [options]="slideToggleOptions"></moh-slide-toggle>

   <!-- disabled slide-toggle -->
   <moh-slide-toggle formControlName="toggle" [options]="slideToggleOptions" [disabled]="true"></moh-slide-toggle>

   <!-- slide-toggle with icons -->
   <moh-slide-toggle formControlName="toggle" [options]="optionsWithIcons"></moh-slide-toggle>

   <!-- slide-toggle with defaultSelectedValue -->
   <moh-slide-toggle formControlName="toggle" [options]="slideToggleOptions" [defaultSelectedValue]="2"></moh-slide-toggle>

  ```
*
* #### TS
* ```typescript

  slideToggleOptions: ToggleOption[] = [new ToggleOption('אדום', 1), new ToggleOption('לבן', 2), new ToggleOption('כחול', 3)];

  optionsWithIcons: ToggleOption[] = [new ToggleOption('אדום', 1, 'help'), new ToggleOption('לבן', 2, 'class'), new ToggleOption('כחול', 3, 'home')];

 ```
*
 * <example-url>../screenshots/components/v1/slide-toggle.png</example-url>
*/
@Component({
  selector: 'moh-slide-toggle',
  templateUrl: './slide-toggle.component.html',
  styleUrls: ['./slide-toggle.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SlideToggleComponent), multi: true
    }]
})
export class SlideToggleComponent extends SlideToggleBase {

  /**
  * Wheter the slide toggle is diabled or not.
  */
  @Input() set disabled(value: any) {
    this.setDisabledState(value);
  }

  get disabled() {
    return this.disabled;
  }

  buttonDisabled: boolean = false;

  setDisabledState?(isDisabled: boolean): void {
    this.matToggle.disabled = isDisabled;
    this.buttonDisabled = isDisabled
  }

  constructor(injector: Injector, cdr: ChangeDetectorRef) {
    super(injector, cdr);
  }
}
