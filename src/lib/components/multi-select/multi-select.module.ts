import { NgModule } from '@angular/core';
import { MultiSelectComponent } from './multi-select.component';
import { SharedModule } from '../../shared/shared.module';
import { MatSelectInfiniteScrollModule } from 'ng-mat-select-infinite-scroll';

@NgModule({
  declarations: [MultiSelectComponent],
  imports: [
    SharedModule,
    MatSelectInfiniteScrollModule
  ],
  exports:[MultiSelectComponent]
})
export class MultiSelectModule { }
