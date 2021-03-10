import { Injectable, EventEmitter } from '@angular/core';
import { Step } from './step-entity';
import { WizardStep } from './wizard-step';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class WorkflowService {

  private workflow: Array<{ step: string, valid: boolean }> = [];
  allowSkip: boolean; // For workflow-guard
  changeStepSubject: BehaviorSubject<any> = new BehaviorSubject(null);

  init(steps: Step[]) {
    this.workflow = [];
    steps.forEach(step => {
      this.workflow.push({ step: step.path, valid: undefined })
    });
  }

  updateValidationSettings(allowSkip: boolean) {
    this.allowSkip = allowSkip;
  }

  validateStep(step: string, isValid: boolean) {
    (this.getStepByPath(step) || <any>{}).valid = isValid;
  }

  isValidStep(step: string) {
    return (this.getStepByPath(step) || <any>{}).valid;
  }

  isAllStepsValid() {
    let isValid = true;

    for (var i = 0; i < this.workflow.length && isValid; i++) {
      isValid = this.workflow[i].valid;
    }

    return isValid;
  }

  getValidationState(): { [stepPath: string]: boolean } {
    let validationState = {};
    this.workflow.forEach(step => validationState[step.step] = step.valid);
    return validationState;
  }

  validateSteps(validationState: { [stepPath: string]: boolean }) {
    this.workflow.forEach(step => {
      if (validationState.hasOwnProperty(step.step)) {
        step.valid = validationState[step.step];
      }
    });
  }

  resetSteps() {
    // Reset all the steps in the Workflow to be invalid
    this.workflow.forEach(element => {
      element.valid = undefined;
    });
  }

  isLastStep(path: string) {
    return this.workflow.length > 0 && path == this.workflow[this.workflow.length - 1].step;
  }

  isFirstStep(path: string) {
    return this.workflow.length > 0 && path == this.workflow[0].step;
  }

  getNextStep(path: string): string {
    if (this.isLastStep(path)) {
      return path;
    }

    let index = this.getIndexByPath(path);

    if (index > -1) {
      return this.workflow[index + 1].step;
    }

    return null;
  }

  getPrevStep(path: string): string {
    let index = this.getIndexByPath(path);

    if (index == 0) {
      return path;

    } else if (index > -1) {
      return this.workflow[index - 1].step;
    }

    return null;
  }

  getFirstInvalidStep(step: string): string {
    // If all the previous steps are validated, return blank
    // Otherwise, return the first invalid step
    var found = false;
    var valid = true;
    var redirectToStep = '';
    for (var i = 0; i < this.workflow.length && !found && valid; i++) {
      let item = this.workflow[i];
      if (item.step === step) {
        found = true;
        redirectToStep = '';
      }
      else {
        valid = item.valid;
        redirectToStep = item.step
      }
    }
    return redirectToStep;
  }

  private getStepByPath(path: string) {
    return this.workflow.filter(step => step.step == path)[0];
  }

  getIndexByPath(path: string) {
    return this.workflow.indexOf(this.getStepByPath(path));
  }

  getPathByIndex(index: number) {
    return this.workflow[index].step;
  }

  wizardStepChanged(step: Step) {
    this.changeStepSubject.next(step);
  }
}
