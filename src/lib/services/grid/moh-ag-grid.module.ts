import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { DateCellRendererComponent } from './cellRenderComponents/date-cell-render.component';
import { LinkCellRendererComponent } from './cellRenderComponents/link-cell-renderer.component';
import { MohAgGridService } from './moh-ag-grid.service';

export { DateCellRendererComponent } from './cellRenderComponents/date-cell-render.component';
export { LinkCellRendererComponent } from './cellRenderComponents/link-cell-renderer.component';
export { MohAgGridService } from './moh-ag-grid.service';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    DateCellRendererComponent,
    LinkCellRendererComponent
  ],
  providers: [
    MohAgGridService
  ],
  exports: [
    DateCellRendererComponent,
    LinkCellRendererComponent,
  ]
})
export class MohAgGridModule { }
