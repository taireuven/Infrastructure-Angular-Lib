import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { SpinnerComponent } from './spinner.component';
import { SpinnerService } from './spinner.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SpinnerInterceptor } from './spinner.interceptor';

export * from './spinner.service';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [SpinnerComponent],
  providers: [
    SpinnerService,
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true }
  ],
  exports: [SpinnerComponent],
})
export class SpinnerModule { }
