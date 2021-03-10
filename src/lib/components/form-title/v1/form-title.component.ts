import { Component, ViewEncapsulation, Injector } from '@angular/core';
import { FormTitleBase } from '../base/form-title.base';

/**
 * moh-form-title is a component that shows form header contains banner, titles and date.
 *
 * ### Usage
 * ```html

   <!-- form-title with text Inputs -->
   <moh-form-title titleUnderImage="Title under image example" imageUrl= "/assets/images/title_image.png" imageTextType= "light"
      mainImageText="Main image text example" subImageText= "Sub image text example"></moh-form-title>

   <!-- form-title with text key Inputs -->
   <moh-form-title titleUnderImage="titleUnderImageKey" imageUrl="/assets/images/title_image.png" imageTextType="light"
        mainImageTextKey="mainImageTextKey" subImageTextKey="subImageTextKey"></moh-form-title>

 * ```
 * <example-url>../screenshots/components/v1/form-title.png</example-url>
 */
@Component({
  selector: 'moh-form-title',
  templateUrl: './form-title.component.html',
  styleUrls: ['./form-title.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormTitleComponent extends FormTitleBase {
  constructor(injector: Injector) { super(injector); }
}
