
import { NgModule } from '@angular/core';
import { FilterSlideToggleModule} from '../slide-toggle/filter-slide-toggle/filter-slide-toggle.module';
import { SharedModule } from '../../shared/shared.module';
import {TextboxV2Module} from '../textbox/v2/textbox.v2.module';
import {SelectV2Module} from '../select/v2/select.v2.module';
import {DatepickerV2Module} from '../datepicker/v2/datepicker.v2.module';
import {
  MatTableModule, MatPaginatorModule,MatSortModule
} from '@angular/material';
import {ButtonV2Module} from '../button/v2/button.v2.module';
import { DirectivesModule } from '../../directives/directives.module';

import {MatTableFilterComponent} from './mat-table-filter/mat-table-filter.component';
import {MatTablePaginatorComponent} from './mat-table-paginator/mat-table-paginator.component'
import {MatTableImportComponent} from './mat-table-import/mat-table-import.component';
import {MatTableGroupRowComponent} from './mat-table-group-row/mat-table-group-row.component';
import {MohMatTableService} from './moh-mat-table.service';
import { MatTableExporterComponent } from './mat-table-exporter/mat-table-exporter.component';
import { MatTableGeneralSearchComponent } from './mat-table-general-search/mat-table-general-search.component';
import {MatTableCellComponent} from './mat-table-cell/mat-table-cell.component';
import { MatTableMobileAccordionComponent } from './mat-table-mobile-accordion/mat-table-mobile-accordion.component';
import { MatTableHasAccordionDirective } from './mat-table-mobile-accordion/is-accordion.directive';



@NgModule({
  declarations: [
    MatTableFilterComponent,
    MatTablePaginatorComponent,
    MatTableImportComponent,
    MatTableGroupRowComponent,
    MatTableExporterComponent,
    MatTableGeneralSearchComponent,
    MatTableCellComponent,
    MatTableMobileAccordionComponent,
    MatTableHasAccordionDirective

  ],
  imports: [
    SharedModule,
    TextboxV2Module,
    DatepickerV2Module,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    ButtonV2Module,
    SelectV2Module,
    FilterSlideToggleModule,
    DirectivesModule
  ],
  exports: [
    MatTableFilterComponent,
    MatTablePaginatorComponent,
    MatTableImportComponent,
    MatTableGroupRowComponent,
    MatTableExporterComponent,
    MatTableGeneralSearchComponent,
    MatTableCellComponent,
    MatTableMobileAccordionComponent,
    MatTableHasAccordionDirective
  ],
  providers:[
    MohMatTableService
   
  ]
})
export class MohMatTableModule { }
