import { Component, Injector } from '@angular/core';

import { SelectLanguageBase } from '../base/select-language.base';


/**
 * The component show select component contains the languages list from umbraco,
 *
 * when you change a language, the component changes the current language in the translate service.
 *
 * ### Usage
 * ```html
   <!-- basic select-language -->
   <moh-select-language></moh-select-language>

   <!-- select-language with custom @Inputs -->
   <moh-select-language currentLang="en" languagesListApps="appCode1,appCode2" labelTextKey="selectLanguage"></moh-select-language>
 * ```
 * <example-url>../screenshots/components/v1/select-language.png</example-url>
 */
@Component({
  selector: 'moh-select-language',
  templateUrl: './select-language.component.html',
  styleUrls: ['./select-language.component.scss']
})

export class SelectLanguageComponent extends SelectLanguageBase {
  constructor(injector: Injector) {
    super(injector);
  }
}
