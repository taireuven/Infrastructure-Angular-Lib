import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { WorkflowService } from './workflow.service';
import { WizardStep } from './wizard-step';

/**
 * The service manage the wizard forms data.
 */
@Injectable()
export class WizardDataService {
   
  private wizardData: {
    [wizardId: string]: {
      [stepPath: string]: any //FormGroup Data
    }
  } = {};
  /**
  * @ignore
  */
  public activeStep: {
    [wizardId: string]: {
      stepPath: string,
      ref: WizardStep
    }
  } = {};

  constructor(private workflowService: WorkflowService) { }

  /**
  * Returns a value of FormControl that exists in the wizard by its name.
  */
  getData(key: string, wizardId?: string) {
    return this.getWizardDataById(wizardId)[key];
  }

  /**
  * Returns the validation state.
  */
  getValidationState(): { [stepPath: string]: boolean } {
    return this.workflowService.getValidationState();
  }

  /**
  * Returns specific step validity by the step path.
  */
  getStepValidity(step: string): boolean {
    //return this.getWizardStateById(wizardId)[step];
    return this.workflowService.isValidStep(step);
  } 

  /**
 * Load the wizard with initial state.
 * @param wizardData The data of the steps forms.
 * @param wizardId The wizard id, when using multiple wizards.
 */
  loadData(wizardData: { [stepPath: string]: any }, wizardId?: string) {//validationState: { [stepPath: string]: boolean } | null, 
    if (Object.keys(this.wizardData).length == 0) {
      this.wizardData = {
        "wizard": {}
      };
    }
    this.wizardData[wizardId || Object.keys(this.wizardData)[0]] = wizardData;

    //if (validationState) {
    //  this.workflowService.validateSteps(validationState);
    //}
  }

  /**
  * @ignore
  */
  setData(key: string, data: any, wizardId?: string, setValid: boolean = true, isValid: boolean = true) {
    if (Object.keys(this.wizardData).length == 0) {
      this.wizardData = {
        "wizard": {}
      };
    }
    this.wizardData[wizardId || Object.keys(this.wizardData)[0]][key] = data;

    if (setValid) {
      this.workflowService.validateStep(key, isValid);
    }
  }

  /**
   * Check to see if the wizard contains any data, even unsaved data from potentially invalid forms
   */
  isFormDirty(wizardId?: string): boolean {
    const activeStep = this.activeStep[wizardId || Object.keys(this.activeStep)[0]];
    const activeForm: FormGroup = activeStep.ref.stepFormGroup;
    // Check if the current form is dirty, or if we have any saved data from a different step.
    return activeForm.dirty || Object.getOwnPropertyNames(this.getFormData(wizardId)).length > 0
  }

  /**
   * Return all data the wizard contains, even unsaved data from potentially invalid forms.
   */
  getAllData(wizardId?: string) {
    const savedData = this.getFormData(wizardId);
    const activeStep = this.activeStep[wizardId || Object.keys(this.activeStep)[0]]

    if (activeStep) {
      const activeData = activeStep.ref.stepFormGroup.getRawValue();
      let allData = Object.assign({}, savedData);
      allData[activeStep.stepPath] = activeData;

      return allData;
    } else {
      return savedData;
    }
  }

  /**
   * Returns the wizard forms data.
   */
  getFormData(wizardId?: string) {
    return this.getWizardDataById(wizardId);
  }

  isFormValid() {
    // Return true if all forms had been validated successfully; otherwise, return false
    return this.workflowService.isAllStepsValid();
  }

  resetFormData(wizardId?: string) {
    // Reset the workflow
    this.workflowService.resetSteps();
    // Return the form data after all this.* members had been reset
    this.wizardData[wizardId || Object.keys(this.wizardData)[0]] = {};
    return this.getWizardDataById(wizardId);
  }

  private getWizardDataById(wizardId?: string): any {
    return this.wizardData[wizardId || Object.keys(this.wizardData)[0]] || {};
  }
}
