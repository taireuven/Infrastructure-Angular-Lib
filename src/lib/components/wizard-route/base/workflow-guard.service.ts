import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanLoad, Route, ActivatedRoute
} from '@angular/router';

import { WorkflowService } from './workflow.service';

/**
 * Angular Guard, implements CanActivate interface for steps routing.
 */
@Injectable()
export class WorkflowGuard implements CanActivate {
  constructor(private router: Router, private workflowService: WorkflowService, private activatedRoute: ActivatedRoute) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let wizardPath: string = route.parent.routeConfig.path;
    let path: string = route.routeConfig.path;
    let currentPath: string = this.router.url.split(wizardPath + '/').pop();

    if (this.ignoreInvalidWorkflow(path, currentPath)){
      return true;
    } else {
      return this.verifyWorkFlow(path, wizardPath);
    }
  }

  verifyWorkFlow(path: string, wizardPath: string): boolean {
    //console.log("Entered '" + path + "' path.");

    // If any of the previous steps is invalid, go back to the first invalid step
    let firstPath = this.workflowService.getFirstInvalidStep(path);
    if (firstPath.length > 0) {
      //console.log("Redirected to '" + firstPath + "' path which it is the first invalid step.");
      let url = `./${firstPath}`;

      let activateRoute = this.getActivateRoute(wizardPath, this.activatedRoute);//this.activatedRoute.firstChild || this.activatedRoute
      this.router.navigate([url], { relativeTo: activateRoute, });
      return false;
    };

    return true;
  }

  ignoreInvalidWorkflow(newPath: string, currentPath: string): boolean{
    return this.workflowService.allowSkip;
  }

  getActivateRoute(path: string, activatedRoute: ActivatedRoute) {
    let currentActivatedRoute = activatedRoute;

    if (!(activatedRoute.routeConfig && activatedRoute.routeConfig.path == path)
      && activatedRoute.firstChild) {
      currentActivatedRoute = this.getActivateRoute(path, activatedRoute.firstChild);
    }

    return currentActivatedRoute;
  }
}


