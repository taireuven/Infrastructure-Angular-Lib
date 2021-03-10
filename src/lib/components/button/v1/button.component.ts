import { Component, Injector, ViewEncapsulation } from '@angular/core';
import { ButtonBase } from '../base/button.base';

/**
 * The button component
 *
 * ### Usage
 * ```html
   <!-- basic button -->
   <moh-button [text]="'Button'"></moh-button>

   <!-- disabled button button -->
   <moh-button [text]="'Button'" [isDisabled]="true"></moh-button>

   <!-- button with icon -->
   <moh-button [text]="'Button'" [iconName]="'help'"></moh-button>

   <!-- button with event -->
   <moh-button [text]="'Button'" (onButtonClick)="buttonWasClicked()"></moh-button>
 * ```
 * <example-url>../screenshots/components/v1/button.png</example-url>
*/

@Component({
  selector: 'moh-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ButtonComponent extends ButtonBase {

  constructor(injector: Injector) {
    super(injector);
  }
}
