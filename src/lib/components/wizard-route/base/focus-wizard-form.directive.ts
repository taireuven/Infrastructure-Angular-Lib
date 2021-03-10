import { Directive, OnInit, Injector } from '@angular/core';
import { WorkflowService } from './workflow.service';
import { Step } from './step-entity';
import { MohTranslateService } from '../../../services/translate/moh-translate.service';
import { LabelBase } from '../../base/label-base';

@Directive({
  selector: '[mohFocusWizardForm]'
})
export class FocusWizardFormDirective extends LabelBase implements OnInit {

  constructor(private workflowService: WorkflowService, injector: Injector) {
    super(injector);
  }


  ngOnInit(): void { 

    this.workflowService.changeStepSubject.subscribe((step: Step) => {

      if (step) {

        var forms = document.getElementsByTagName("form");
        var wizard = document.getElementsByTagName("moh-wizard-route")[0] as HTMLElement;

        if (forms && forms.length > 0) {
          var form = forms[0];
          form.setAttribute("tabindex", "0");
          form.style.outline = "transparent";
          form.focus();

          this.setAriaLabel(form, step);
          if (window.scrollY < window.innerHeight / 2) {
            // Scroll to top of page after setting focus, if we don't need to scroll very far. (1/2th of the screen.)
            window.scrollTo(0, 0);
          } else {
            // Scroll to beginning of wizard, -250px for extra space for the header.
            window.scrollTo(0, wizard.offsetTop - 250);
          }
        } else {
          window.scrollTo(0, 0);
        }

      }
    });
  }

  setAriaLabel = (form, step: Step) => {

    if (step.title) {
      form.setAttribute('aria-label', step.title);
    }
    else {
      this.getLabelText(step.titleKey).subscribe((title) => {
        form.setAttribute('aria-label', title);
      });
    }
  };
}
