import { Component, ViewEncapsulation, Injector, Input, OnInit, SimpleChanges, OnChanges, Output, EventEmitter } from '@angular/core';

import { WizardRouteBase } from '../base/wizard-route.base';
import { WorkflowGuard } from '../base/workflow-guard.service';
import { WizardDataService } from '../base/wizardData.service';

/**
 * The wizard route component
 * ### Usage
  ```html

   <!-- basic wizard -->
   <moh-wizard-route [steps]="steps" (onSubmit)="submitWizard($event)"></moh-wizard-route>>

<!-- wizard with some inputs -->
   <moh-wizard-route [steps]="steps" (onSubmit)="submitWizard($event)" (onStepChanged)="stepChanged($event)" [resetOnSubmit]="resetOnSubmit"></moh-wizard-route>>

  ```
*
* #### TS
 ```typescript

  this.steps = [
    { title: 'פרטים אישיים', path: 'personal', icon: 'person' },
    { title: 'כתובת', path: 'address', icon: 'home' },
    { title: 'סיום', path: 'result', icon: 'send' }
  ];

  resetOnSubmit:false;

  submitWizard(formData) {
    console.log('submit wizard', formData);
    //if success submit form to server -
    this.resetOnSubmit = true;
  }

  stepChanged(stepComponent) {
    console.log('active step component', stepComponent);
  }

 ```
*
 * <example-url>../screenshots/components/v2/wizard-route.png</example-url>
*/
@Component({
  selector: 'moh-wizard-route',
  templateUrl: './wizard-route.v2.component.html',
  styleUrls: ['./wizard-route.v2.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class WizardRouteV2Component extends WizardRouteBase implements OnChanges {

  /**
   * Whether each tab of the header should use all available space.
   */
  @Input() fullWidthTabs?: boolean = false;
  /**
  * whether to display the navigations buttons (Next/Prev/Save) on top.
  */
  @Input() showTopButtons?: boolean = false;
  /**
   * whether to display the navigations buttons (Next/Prev/Save) on bottom.
   */
  @Input() showBottomButtons?: boolean = true;
  /**
   * whether to display the validation icons (green Check or red X) next to the header items.
   */
  @Input() showValidationIcons?: boolean = false;
  /**
   * Whether to cause the progress header to be sticky to the screen after being scrolled past.
   */
  @Input() stickyMode?: boolean = true;
  /**
   * Whether to display arrow icons between each step of the header items.
   */
  @Input() showArrowIcons?: boolean = true;
  /**
   * Display the header in a Tabs style. Overrides the following inputs:
   *
   * showArrowIcons = false;
   *
   * showValidationIcons = false;
   *
   * showTopButtons = false;
   *
   * showBottomButtons = false;
   *
   * nextIfValid = false;
   *
   * prevIfValid = false;
   *
   * confirmNext = false;
   *
   * allowSkip = true;
   */
  @Input() headerStyleTabs?: boolean = false;
  /**
  * whether to show additional button next to the 'next' button .
  */
  @Input() showActionButton?: boolean = false;
  /**
  * The text key of the action button.
  */
  @Input() actionButtonTextKey: string;
  /**
  * The text key of the submit button.
  */
  @Input() submitButtonTextKey: string = 'save';
  /**
  * Whether to make the action only when the current form is valid.
  */
  @Input() actionIfValid: boolean = false;

  /**
  * Event emitted when the action button is clicked.
  */
  @Output() onActionClick: EventEmitter<any> = new EventEmitter<any>();

  constructor(injector: Injector) { super(injector); }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    if (changes.headerStyleTabs && changes.headerStyleTabs.currentValue == true){
      this.activateHeaderStyleTabs(changes);
    }
  }

  action(){
    if (this.stepComponent.stepFormGroup.valid || !this.actionIfValid) {
      this.onActionClick.emit(this.stepComponent.stepFormGroup.getRawValue());
    }
    else {
      this.stepComponent.stepFormGroup['submitted'] = true;
      this.errorValidationOnSubmit();
    }
  }

  /**
   *  HeaderStyleTabs changes some @Input defaults, but we shouldn't override settings from developers.
   *  For more information, see @Input headerStyleTabs.
   */
  private activateHeaderStyleTabs(changes: SimpleChanges){
    this.showArrowIcons = changes.showArrowIcons ? changes.showArrowIcons.currentValue : false;
    this.showValidationIcons = changes.showValidationIcons ? changes.showValidationIcons.currentValue : false;
    this.showTopButtons = changes.showTopButtons ? changes.showTopButtons.currentValue : false;
    this.showBottomButtons = changes.showBottomButtons ? changes.showBottomButtons.currentValue : false;
    this.nextIfValid = changes.nextIfValid ? changes.nextIfValid.currentValue : false;
    this.prevIfValid = changes.prevIfValid ? changes.prevIfValid.currentValue : false;
    this.confirmNext = changes.confirmNext ? changes.confirmNext.currentValue : false;
    this.allowSkip = changes.allowSkip ? changes.allowSkip.currentValue : true;
  }
}
