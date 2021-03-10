import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Subscription , Observable } from 'rxjs';
import { SpinnerService, LoaderState} from './spinner.service';

/**
 * <mat-spinner> is a circular indicators of progress and activity.
 * It is displayed during the request on pending status, for request that contain header: show-spinner=true.
 * see {@link MohHttpClient} methods for send custom requests.
 *
 * ### Usage
  ```html
   <!-- basic spinner -->
   <moh-spinner></moh-spinner>

  ```
 * <example-url>../screenshots/components/spinner.png</example-url>
 */
@Component({
  selector: 'moh-spinner',
  templateUrl: 'spinner.component.html',
  styleUrls: ['spinner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpinnerComponent implements OnInit {

  loaderState$: Observable<LoaderState>;

  constructor(public spinnerService: SpinnerService) {
    this.loaderState$ = this.spinnerService.loaderState;
  }

  ngOnInit() { }
}
