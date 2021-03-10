import { Component, Injector } from '@angular/core';
import { FormCardBase } from '../base/form-card.base';
import { Observable } from 'rxjs';

/**
 * moh-form-card is a component to wrap content and display it as a card.
 *
 * ### Usage
 * ```html

   <!-- form-card -->
    <moh-form-card titleKey="Example">
       <moh-textbox></moh-textbox>
    </moh-form-card>

 * ```
 * <example-url>../screenshots/components/v1/form-card.png</example-url>
 */
@Component({
  selector: 'moh-form-card',
  templateUrl: './form-card.component.html',
  styleUrls: ['./form-card.component.scss']
})
export class FormCardComponent extends FormCardBase {
  titleTextValue: Observable<string>;

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
    this.titleTextValue = this.getLabelText(this.titleKey);
  }
}
