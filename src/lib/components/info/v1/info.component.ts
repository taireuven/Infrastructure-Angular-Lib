import { Component, ViewEncapsulation, Injector } from '@angular/core';
import { InfoBase } from '../base/info.base';

/**
 * moh-info is a component that shows info message beside info icon.
 *
 * ### Usage
 * ```html

   <!-- info with text Inputs -->
   <moh-info text="info text for example"></moh-info>

   <!-- info with text key Inputs -->
   <moh-info textKey="demoFormInfo" [textParams]="{firstName:demoForm.controls.firstName.value}"></moh-info>

 * ```
 * <example-url>../screenshots/components/v1/info.png</example-url>
 */
@Component({
  selector: 'moh-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class InfoComponent extends InfoBase {
  constructor(injector: Injector) { super(injector) }
}
