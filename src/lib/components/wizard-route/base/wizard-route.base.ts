import { OnInit, Input, ElementRef, EventEmitter, Output, OnChanges, SimpleChanges, Injector } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { WizardDataService } from './wizardData.service';
import { WorkflowService } from './workflow.service';
import { WizardStep } from './wizard-step';
import { Step } from './step-entity';
import { ModalService, swal } from '../../../services/modal/modal.service';
import { FormSubmitService } from '../../../services/form-submit/form-submit.service';
import { LabelBase } from '../../base/label-base';

export class WizardRouteBase extends LabelBase implements OnInit, OnChanges {

  /**
  * array of steps details for build the wizard steps.
  */
  @Input() steps: Step[];
  /**
  * Whether to make the transition to the next step only when the current form is valid.
  */
  @Input() nextIfValid: boolean = true;
  /**
  * Whether to make the transition to the previous step only when the current form is valid.
  */
  @Input() prevIfValid: boolean = false;
  /**
  * Whether to Submit(Save) only when the current form is valid.
  */
  @Input() doSubmitIfValid: boolean = true;
  /**
  * Whether to show previous step button.
  */
  @Input() allowPrev: boolean = true;
  /**
  * Whether to reset all the wizard steps forms after wizard submission.
  */
  @Input() resetOnSubmit: boolean = true;
  /**
  * The text of the previous step button.
  */
  @Input() prevButtonText: string;
  /**
  * The text key of the previous step button, in case no value was sent to 'prevButtonText'.
  */
  @Input() prevButtonTextKey: string = 'prevStep';
  /**
    * The icon of the previous step button
   */
  @Input() prevButtonIcon: string;
  /**
  * The text of the next step button.
  */
  @Input() nextButtonText: string;
  /**
  * The text key of the next step button, in case no value was sent to 'nextButtonText'.
  */
  @Input() nextButtonTextKey: string = 'nextStep';
  /**
   * The icon of the next step button.
   */
  @Input() nextButtonIcon: string;
  /**
  * whether to show confirm message and additionals buttons after click on next button.
  */
  @Input() confirmNext: boolean = false;
  /*
  * Allows user to skip items, and not force him to complete all of them, or complete them in order.
  */
  @Input() allowSkip: boolean = false;
  /**
  * The Id of the wizard - for use multiple wizards.
  */
  @Input() wizardId?: string;
  /**
  * The validation state of the wizard steps.
  */
  @Input() validationState?: { [stepPath: string]: boolean }

  /**
  * Event emitted when the submit button (placed in the last step) is clicked.
  */
  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();

  /**
  * Event emitted when the next step button is clicked.
  */
  @Output() onNext: EventEmitter<any> = new EventEmitter<any>();

  /**
  * Event emitted when the previous step button is clicked.
  */
  @Output() onPrev: EventEmitter<any> = new EventEmitter<any>();

  /**
  * Event emitted when step changed.
  */
  @Output() onStepChanged: EventEmitter<any> = new EventEmitter<any>();

  /**
  * Whether there is invisible Recaptcha on wizard.
  */
  @Input() validateInvisibleRecaptcha: boolean = false;

  stepComponent: WizardStep;
  stepPath: string;
  wizardMainAriaLabelValue: Observable<string>;
  confirmed: boolean = false;

  private formSubmitService: FormSubmitService;
  private wizardDataService: WizardDataService;
  private workflowService: WorkflowService;
  private router: Router;
  private route: ActivatedRoute;
  private modal: ModalService;

  constructor(injector: Injector) {
    super(injector);
    this.formSubmitService = injector.get(FormSubmitService);
    this.wizardDataService = injector.get(WizardDataService);
    this.workflowService = injector.get(WorkflowService);
    this.router = injector.get(Router);
    this.route = injector.get(ActivatedRoute);
    this.modal = injector.get(ModalService);
  }

  ngOnInit() {
    //this.workflowService.init(this.steps);
    this.wizardMainAriaLabelValue = this.getLabelText('wizardMainAriaLabel');
    this.workflowService.updateValidationSettings(this.allowSkip);

    this.stepChange();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.steps && changes.steps.currentValue != changes.steps.previousValue) {
      this.steps.forEach(x => {
        x['titleValue'] = this.getLabelText(x.titleKey);
      });

      this.workflowService.init(this.steps);
      this.stepChange();
    }

    if (changes.steps && changes.validationState && changes.validationState.currentValue != changes.validationState.previousValue) {
      this.workflowService.validateSteps(this.validationState);
    }

    if (changes.allowSkip) {
      this.workflowService.updateValidationSettings(this.allowSkip);
    }
  }


  get hasNextStep(): boolean {
    return !this.workflowService.isLastStep(this.stepPath);
  }

  get hasPrevStep(): boolean {
    return this.stepComponent && this.stepComponent.allowPrev && this.allowPrev && !this.workflowService.isFirstStep(this.stepPath);
  }

  isValidStep(path: string): boolean {
    return this.workflowService.isValidStep(path);
  }
  getIndexOfActiveStep(): number {
    return this.workflowService.getIndexByPath(this.stepPath)
  }
  isBeforActiveStep(path: string): boolean {
    return (this.workflowService.getIndexByPath(path) + 1) == this.workflowService.getIndexByPath(this.stepPath);
  }

  onActivate(componentRef: WizardStep) {
    this.stepComponent = componentRef;
    this.stepPath = (this.route.firstChild || this.route).snapshot.url[0].path;

    this.wizardDataService.activeStep[this.wizardId || "wizard"] = {
      ref: this.stepComponent,
      stepPath: this.stepPath
    };
    let stepData = this.wizardDataService.getData(this.stepPath, this.wizardId);
    if (stepData) {
      this.stepComponent.stepFormGroup.patchValue(stepData);
    }
    this.onStepChanged.emit(this.stepComponent);

    this.stepChange();
  }

  confirm() {
    this.confirmed = false;
  }

  goToStep(stepPath: string) {
    const newIndex = this.workflowService.getIndexByPath(stepPath);
    const oldIndex = this.getIndexOfActiveStep();
    if (newIndex > oldIndex) {
      this.goToNext(newIndex);
    } else if (newIndex < oldIndex) {
      this.goToPrevious(newIndex);
    } else {
      return; //One of these paths is fake, or they're equal.
    }
  }

  goToNext(index?: number) {
    let stepPath: string;
    // If user provides a step index, we verify that index is after the active step.
    if (index !== undefined && index > this.getIndexOfActiveStep()) {
      stepPath = this.workflowService.getPathByIndex(index);
    } else {
      stepPath = this.workflowService.getNextStep(this.stepPath);
    }

    if (!this.confirmNext || this.confirmed) {
      this.stepComponent.stepFormGroup['submitted'] = true;

      if (this.save(this.nextIfValid)) {
        this.stepComponent.canNext().subscribe(result => {
          if (result) {
            this.onNext.emit(this.wizardDataService.getData(this.stepPath, this.wizardId));
            this.router.navigate([`./${stepPath}`], { relativeTo: this.route });
          }
        });
      }
      else {
        this.errorValidationOnSubmit();
      }
    }

    if (this.confirmNext) {
      this.confirmed = !this.confirmed;
    }
  }

  goToPrevious(index?: number) {
    let stepPath: string;
    // If user provides a step index, we verify that index is before the active step.
    if (index !== undefined && index < this.getIndexOfActiveStep()) {
      stepPath = this.workflowService.getPathByIndex(index);
    }
    else {
      stepPath = this.workflowService.getPrevStep(this.stepPath);
    }

    this.stepComponent.stepFormGroup['submitted'] = true;

    if (this.save(this.prevIfValid)) {
      this.stepComponent.canPrev().subscribe(result => {
        if (result) {
          this.onPrev.emit(this.wizardDataService.getData(this.stepPath, this.wizardId));
          this.router.navigate([`./${stepPath}`], { relativeTo: this.route });
        }
      });
    }
    else {
      this.errorValidationOnSubmit();
    }
  }

  isStepDisabled(path: string) {
    let step = this.steps.find((x) => { return x.path === path });

    let firstPath = this.workflowService.getFirstInvalidStep(path);
    if (firstPath.length > 0 || step.disabled) {
      return true;
    };
    return false;
  }

  isFormValid() {
    let isValid = this.stepComponent.stepFormGroup.valid;

    for (var i = 0; i < this.steps.length && isValid; i++) {
      if (this.steps[i].path != this.stepPath) {
        isValid = this.workflowService.isValidStep(this.steps[i].path)
      }
    }

    return isValid;
  }

  submit() {
    if (this.save(this.doSubmitIfValid)) {

      this.onSubmit.emit(this.wizardDataService.getFormData(this.wizardId));

      if (this.resetOnSubmit) {
        this.stepComponent.stepFormGroup.reset();
        this.wizardDataService.resetFormData(this.wizardId);
      }
    }
  }

  private save(saveOnlyIfValid: boolean): boolean {

    this.workflowService.validateStep(this.stepPath, this.stepComponent.stepFormGroup.valid);

    if (!this.stepComponent.stepFormGroup.valid && saveOnlyIfValid) {
      return false;
    }

    this.wizardDataService.setData(this.stepPath, this.stepComponent.stepFormGroup.getRawValue(), this.wizardId, false);
    this.stepComponent.formSaved = true;
    return true;
  }

  protected errorValidationOnSubmit() {
    this.modal.errorMsgWithTranslation("invalidFormMessage", "note", "gotIt")
      .then((result) => {
        this.formSubmitService.handleErrorValidation();
      });
  }

  private stepChange = (): void => {

    if (this.steps) {
      var step = this.steps.filter(s => s.path == this.stepPath)[0];
      this.workflowService.wizardStepChanged(step);
    }
  };
}
