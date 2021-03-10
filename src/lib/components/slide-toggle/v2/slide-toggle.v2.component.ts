import { Component, ElementRef, ViewEncapsulation, forwardRef, Injector, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { SlideToggleBase } from '../base/slide-toggle.base';
/**
 * The slide-toggle component is a component to select an option from a list with a slide visibility.
 *
 * ### Usage
  ```html

   <!-- basic slide-toggle -->
   <moh-slide-toggle formControlName="toggle" [options]="slideToggleOptions"></moh-slide-toggle>

   <!-- disabled slide-toggle -->
   <moh-slide-toggle formControlName="toggle" [options]="slideToggleOptions" [isDisabled]="true"></moh-slide-toggle>

   <!-- slide-toggle with icons -->
   <moh-slide-toggle formControlName="toggle" [options]="optionsWithIcons"></moh-slide-toggle>

   <!-- slide-toggle with defaultSelectedValue -->
   <moh-slide-toggle formControlName="toggle" [options]="slideToggleOptions" [defaultSelectedValue]="2"></moh-slide-toggle>

  ```
*
* #### TS
 ```typescript

  slideToggleOptions: ToggleOption[] = [new ToggleOption('אדום', 1), new ToggleOption('לבן', 2), new ToggleOption('כחול', 3)];

  optionsWithIcons: ToggleOption[] = [new ToggleOption('אדום', 1, 'help'), new ToggleOption('לבן', 2, 'class'), new ToggleOption('כחול', 3, 'home')];

 ```
*
 * <example-url>../screenshots/components/v2/slide-toggle.png</example-url>
*/
@Component({
  selector: 'moh-slide-toggle',
  templateUrl: './slide-toggle.v2.component.html',
  styleUrls: ['./slide-toggle.v2.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SlideToggleV2Component), multi: true
    }]
})
export class SlideToggleV2Component extends SlideToggleBase {

  constructor(injector: Injector, cdr: ChangeDetectorRef) {
    super(injector, cdr);
  }
}
