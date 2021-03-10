import { Component, ViewEncapsulation, Injector} from '@angular/core';
import { HeaderBase } from '../base/header.base';

/**
 * The header component
 *
 * ### Usage
 * ```html
   <!-- basic header -->
   <moh-header></moh-header>

   <!-- header without selectLanguage component -->
   <moh-header showSelectLanguage="false"></moh-header>

   <!-- header with selectLanguage component and custom @Inputs -->
   <moh-header currentLang="en" languagesListApps="appCode1,appCode2" labelTextKey="selectLanguage"></moh-header>
 * ```
 * <example-url>../screenshots/components/v1/header.png</example-url>
 * <example-url>../screenshots/components/v1/header-with-select.png</example-url>
*/
@Component({
  selector: 'moh-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent extends HeaderBase{
  constructor(injector: Injector) { super(injector); }
}
