import { Component, ViewEncapsulation, Injector, ChangeDetectionStrategy } from '@angular/core';
import { InfoBase } from '../base/info.base';

/**
 * moh-info is a component that shows info message beside info icon.
 *
 * ### Usage
  ```html

   <!-- info with text Inputs -->
   <moh-info text="info text for example"></moh-info>

   <!-- info with text key Inputs -->
   <moh-info textKey="demoFormInfo" [textParams]="{firstName:demoForm.controls.firstName.value}"></moh-info>

  ```
 * <example-url>../screenshots/components/v2/info.png</example-url>
 */
@Component({
  selector: 'moh-info',
  templateUrl: './info.v2.component.html',
  styleUrls: ['./info.v2.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoV2Component extends InfoBase {
  constructor(injector: Injector) { super(injector) }
}

