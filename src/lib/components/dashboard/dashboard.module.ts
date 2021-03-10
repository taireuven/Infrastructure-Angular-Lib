import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { DashboardCardComponent } from './dashboard-card/dashboard-card.component';
// import { HighchartsChartModule } from 'highcharts-angular';
import { DashboardGraphComponent } from './dashboard-graph/dashboard-graph.component';
import { ChartsModule } from 'ng2-charts';
import { DashboardCardSummaryComponent } from './dashboard-card-summary/dashboard-card-summary.component';

@NgModule({
  declarations: [DashboardCardComponent, DashboardGraphComponent, DashboardCardSummaryComponent],
  imports: [
    SharedModule,
    ChartsModule
    // HighchartsChartModule
  ],
  // declarations: [
  //   InfoV2Component
  // ],
  exports: [
    DashboardCardComponent,
    DashboardGraphComponent,
    DashboardCardSummaryComponent
  ]
})
export class DashboardModule { }
export { DashboardGraphClickEvent, DashboardGraphData } from './dashboard-graph/dashboard-graph.model';
