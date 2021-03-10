import { Component, OnInit, ChangeDetectionStrategy, Injector } from '@angular/core';
import { SpinnerService, LoaderState } from '../spinner/spinner.service';
import { Subscription, Observable } from 'rxjs';
import { LabelBase } from '../base/label-base';

@Component({
  selector: 'moh-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainContentComponent extends LabelBase implements OnInit {

  /*isSpinnerVisible: boolean;
  private subscription: Subscription;*/
  loaderState$: Observable<LoaderState>;
  loaderStateTextValue: Observable<string>

  constructor(private spinnerService: SpinnerService, injector: Injector) {
    super(injector);
  }

  ngOnInit() {

    //this.subscription = this.spinnerService.loaderState
    //  .subscribe((state: LoaderState) => {
    //    this.isSpinnerVisible = state.show;
    //  });
    this.loaderState$ = this.spinnerService.loaderState;
    this.loaderStateTextValue = this.getLabelText("loaderStateText");

  }

  /*ngOnDestroy() {
    this.subscription.unsubscribe();
  }*/
}
