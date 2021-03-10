import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { WizardStep } from './wizard-step';
import { ModalService } from '../../../services/modal/modal.service';
import { WorkflowService } from './workflow.service';

/**
 * Angular Guard, implements CanDeactivated interface for step routing.
 */
@Injectable()
export class WizardDeactivateGuard implements CanDeactivate<WizardStep> {

  constructor(private modal: ModalService, private workflowService: WorkflowService) { }

  canDeactivate(component: WizardStep, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot) {

    //get the destination step path
    let splitNextUrl = nextState.url.split('/');
    let path = splitNextUrl[splitNextUrl.length - 1];

    if (component
      && component.stepFormGroup
      && component.stepFormGroup.dirty
      && !component.formSaved
      && !this.workflowService.getFirstInvalidStep(path)) {//&& this.workflowService.isValidStep(currentRoute.routeConfig.path)
      return this.modal.confirmMsgWithTranslation("discardChangesMessage", "discardChangesTitle", "yes", "no").then(result => { return true; }, error => { return false; });
    }
    return true;
  }
}


