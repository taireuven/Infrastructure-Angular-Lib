import { Component, Injector, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormCardBase } from '../base/form-card.base';

/**
 * moh-form-card is a component to wrap content and display it as a card.
 *
 * ### Usage
  ```html

   <!-- form-card -->
    <moh-form-card titleKey="Example">
       <moh-textbox></moh-textbox>
    </moh-form-card>

  ```
 * <example-url>../screenshots/components/v2/form-card.png</example-url>
 */
@Component({
  selector: 'moh-form-card',
  templateUrl: './form-card.v2.component.html',
  styleUrls: ['./form-card.v2.component.scss'],
})
export class FormCardV2Component extends FormCardBase {
  /**
  * The icon to display on the section-title.
  */
  @Input() icnName: string;
  /**
  * The title of the section-title.
  */
  @Input() title: string;

  constructor(injector: Injector) {
    super(injector);
  }
}
