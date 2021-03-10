import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { MainContentComponent } from './main-content.component';
import { AriaBusyModule } from '../aria-busy/aria-busy.module';

@NgModule({
  imports: [
    SharedModule,
    AriaBusyModule
  ],
  declarations: [MainContentComponent],
  exports:[MainContentComponent]
})
export class MainContentModule { }
