import { Directive, OnInit, OnDestroy } from '@angular/core';
import { FormSubmitService } from '../services/form-submit/form-submit.service';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[mohFocusFirstInvalidControl]'
})
export class FocusFirstInvalidControlDirective implements OnInit {

  private subscription: Subscription;
  constructor(private formSubmitService: FormSubmitService) { }

  ngOnInit(): void {

    this.subscription = this.formSubmitService.errorValidationHandled.subscribe(() => {

      //this.focusInvalidControl(document);
    });
  }

  focusInvalidControl(el) {

    var invalidElement = el.querySelector(".ng-invalid");
    if (invalidElement.querySelector(".ng-invalid")) {
      return this.focusInvalidControl(invalidElement);
    }
    var inputs = invalidElement.getElementsByTagName('input');
    if (inputs && inputs[0]) {
      inputs[0].focus();
    }

    if (invalidElement.nodeName == "INPUT") {
      //file upload
      if (invalidElement.classList.contains("inputFile")) {
        var button = invalidElement.nextElementSibling.getElementsByTagName('button');
        if (button && button[0]) {
          button[0].focus();
        }
      }

      //for date picker
      else {
        invalidElement.focus();
      }
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
