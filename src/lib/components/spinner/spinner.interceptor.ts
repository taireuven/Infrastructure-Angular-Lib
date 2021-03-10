import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpEvent, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError, tap, finalize } from 'rxjs/operators';
import { SpinnerService } from './spinner.service';


@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {

  pending: number = 0;

  constructor(private spinnerService: SpinnerService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let isFinshed = false;
    let showSpinner = (req.headers.get('show-spinner') == 'true');
    this.pending = showSpinner ? this.pending + 1 : this.pending;

    setTimeout(() => {
      if (!isFinshed && showSpinner) {
        this.spinnerService.show();
      }
    }, 300);

    if (req.headers.has('show-spinner')) {
      req = req.clone({ headers: req.headers.delete('show-spinner') });
    }

    return next.handle(req).pipe(
      tap((ev: HttpEvent<any>) => {

        if (ev instanceof HttpResponse) {
          isFinshed = true;
          this.hideSpinner(showSpinner);
        }
      }),
      catchError(response => {
        isFinshed = true;
        this.hideSpinner(showSpinner);
        return throwError(response);
      }),
      finalize(() => {
        if (!isFinshed) {
          this.hideSpinner(showSpinner);
        }
      })
    );
  }

  hideSpinner(showSpinner: boolean ) {
    this.pending = showSpinner ? this.pending - 1 : this.pending;
    if (this.pending == 0) {
      this.spinnerService.hide();
    }
  }
}
