import { Component, Injector, ViewEncapsulation, ChangeDetectionStrategy, Input } from '@angular/core';
import { ButtonBase } from '../base/button.base';

/**
 * The button component
 *
 * ### Usage
  ```html
   <!-- basic button -->
   <moh-button [text]="'Button'"></moh-button>

   <!-- disabled button button -->
   <moh-button [text]="'Button'" [isDisabled]="true"></moh-button>

   <!-- button with icon -->
   <moh-button [text]="'Button'" [iconName]="'help'"></moh-button>

   <!-- button with event -->
   <moh-button [text]="'Button'" (onButtonClick)="buttonWasClicked()"></moh-button>
  ```
 * <example-url>../screenshots/components/v2/button.png</example-url>
*/

@Component({
  selector: 'moh-button',
  templateUrl: './button.v2.component.html',
  styleUrls: ['./button.v2.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonV2Component extends ButtonBase {

  /**
 * The style of the button.
 */
  @Input() buttonStyle: 'primary' | 'basic' = 'primary';
  /**
 * The type of the button (for the html attribute).
 */
  @Input() type: 'button' | 'submit' | 'reset' = 'button';

  constructor(injector: Injector) {
    super(injector);
  }
}
