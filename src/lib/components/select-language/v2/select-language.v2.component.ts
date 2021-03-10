import { Component, Injector, ViewEncapsulation, Input } from '@angular/core';

import { SelectLanguageBase } from '../base/select-language.base';
import { Language } from '../../../models/language';


/**
 * The component show select component contains the languages list from umbraco,
 *
 * when you change a language, the component changes the current language in the translate service.
 *
 * ### Usage
  ```html
   <!-- basic select-language -->
   <moh-select-language></moh-select-language>

   <!-- select-language with custom @Inputs -->
   <moh-select-language currentLang="en" languagesListApps="appCode1,appCode2" labelTextKey="selectLanguage"></moh-select-language>
  ```
 * <example-url>../screenshots/components/v2/select-language.png</example-url>
 */
@Component({
  selector: 'moh-select-language',
  templateUrl: './select-language.v2.component.html',
  styleUrls: ['./select-language.v2.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class SelectLanguageV2Component extends SelectLanguageBase {
  /**
   * Function that maps an option's control value to its display value in the trigger.
   */
  @Input() displayWith: ((value: Language) => string) | null;

  constructor(injector: Injector) {
    super(injector);
  }
}
