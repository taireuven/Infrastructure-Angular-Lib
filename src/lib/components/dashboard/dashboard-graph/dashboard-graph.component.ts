import { Component, OnInit, Input, ViewChild, AfterViewInit, OnChanges, Output, EventEmitter, SimpleChanges, Injector } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label, BaseChartDirective } from 'ng2-charts';
import { MohTranslateService, MohLangChangeEvent } from '../../../services/translate/moh-translate.service';
import { DashboardGraphClickEvent, DashboardGraphData } from './dashboard-graph.model';
import { LabelBase } from '../../base/label-base';


/**
 * The Dashboard graph component
 *
 * ### Usage
  ```html

    <!-- basic card -->
  <div fxLayout="row wrap" fxLayout.lt-md="column" style="margin: 0 -15px;">
    <moh-dashboard-card fxFlex="33" [title]="'Description of graph'">
      <moh-dashboard-graph [chartData]="[{ data: [65, 59, 80, 81, 56, 55, 40], label: 'Profit' }]"></moh-dashboard-graph>
    </moh-dashboard-card>
  </div>

  <!--  card with inline options -->
  <div fxLayout="row wrap" fxLayout.lt-md="column" style="margin: 0 -15px;">
    <moh-dashboard-card fxFlex="33" [title]="'Description of graph'">
      <moh-dashboard-graph
      [chartOptions]="{
        aspectRatio: 5,
        maintainAspectRatio: true
      }"
      [minHeight]="500"
      [chartType]="'line'"
      [chartLabels]="['January', 'February', 'March', 'April', 'May', 'June', 'July']"
      [chartData]="  [
        { data: [65, 59, 80, 81, 56, 55, 40], label: 'Profit' },
        { data: [25, 19, 80, 40, 95, 5, 66], label: 'Cost' }
      ]"
      [chartLegend]="true"
      ></moh-dashboard-graph>
    </moh-dashboard-card>
  </div>

  <!-- card using typescript options -->
  <div fxLayout="row wrap" fxLayout.lt-md="column" style="margin: 0 -15px;">
    <moh-dashboard-card fxFlex="33" [title]="'Description of graph'">
      <moh-dashboard-graph
      [chartOptions]="this.options"
      [chartType]="'line'"
      [chartLabels]="this.labels"
      [chartData]="this.data"
      [chartLegend]="true"
      ></moh-dashboard-graph>
    </moh-dashboard-card>
  </div>
  ```
*
* #### TS
 ```typescript
  import { ChartDataSets, ChartOptions } from 'chart.js';
  import { Color, Label } from 'ng2-charts';
  data: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
  ];
  labels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  chartLegend = true;
  chartType = 'pie';
  options: ChartOptions = {
    aspectRatio: 2,
    maintainAspectRatio: true
  };
  chartColors: Color[] = [{
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
  }];
 ```
*/
@Component({
  selector: 'moh-dashboard-graph',
  templateUrl: './dashboard-graph.component.html',
  styleUrls: ['./dashboard-graph.component.scss']
})
export class DashboardGraphComponent extends LabelBase implements OnInit, AfterViewInit, OnChanges {
  @ViewChild(BaseChartDirective, {static:true}) chart: BaseChartDirective;
  constructor(injector: Injector, private mohTranslateService:MohTranslateService) {
    super(injector);
   }
  // public chartOptions: (ChartOptions & { annotation: any }) = {
  //   responsive: true,
  // };


  /*
   * The chart.js data. See https://github.com/valor-software/ng2-charts#properties
   */
  @Input() chartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
  ];
  /*
   * The chart.js labels. See https://github.com/valor-software/ng2-charts#properties
   */
  @Input() chartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  /*
   * The chart.js options. See https://github.com/valor-software/ng2-charts#properties
   */
  @Input()
  set chartOptions(value: ChartOptions){
    if (!value){
      return;
    }
    let val = {...value};
    if (val.maintainAspectRatio === undefined ){
      val.maintainAspectRatio = false;
    }
    val.onClick = (event, elements) => {
      this.triggerClick(event, elements);
    };
    this._chartOptions = val;
  }
  get chartOptions(): ChartOptions{
    return this._chartOptions;
  }
   _chartOptions: ChartOptions = {
    maintainAspectRatio: false,
    onClick: (event, elements) => {
      this.triggerClick(event, elements);
    }
  };
  // @Input() chartColors: Color[] = [
  //   {
  //     borderColor: 'black',
  //     backgroundColor: 'rgba(255,0,0,0.3)',
  //   },
  // ];

  /**
   * Which colors to use. See  https://github.com/valor-software/ng2-charts#properties
   */
  @Input() chartColors?: Color[];
  /**
   * Whether to display the chart's legend. See  https://github.com/valor-software/ng2-charts#properties
   */
  @Input() chartLegend: boolean = true;
  /**
   * Type of chart.js chart. ChartType = 'line' | 'bar' | 'horizontalBar' | 'radar' | 'doughnut' | 'polarArea' | 'bubble' | 'pie' | 'scatter';
   */
  @Input() chartType: ChartType = 'line';
  /**
   * Additional chart.js plugins. to display the chart's legend. See  https://github.com/valor-software/ng2-charts#properties
   */
  @Input() chartPlugins = [];
  /**
   * The minimum height of the chart. Useful when you want a bigger chart.
   */
  @Input() minHeight: number = 350;
  /**
  * The event that triggers when a user clicks on the graph.
  */
  // @Output() chartClick: EventEmitter<{label:any, value: any, datasetIndex: number, index: number, event: MouseEvent, chart:Chart }> = new EventEmitter();
  @Output() chartClick: EventEmitter<DashboardGraphClickEvent> = new EventEmitter();
  /*
   * Instead of using chart.js's chartData, chartLabels, and chartOptions, it's possible to pass
   * just a DashboardGraphData[], and we'll build the chart for you.
   */
  @Input() dashboardGraphData?: DashboardGraphData[];

  ngOnInit() {
    if (this.dashboardGraphData){
      this.subscriptions.push(this.mohTranslateService.onLangChange.subscribe((event: MohLangChangeEvent) => {
        this.convertDashboardGraphDataToChartData(this.dashboardGraphData);
      }));
    }
  }
  ngOnChanges(changes:SimpleChanges){
    if (changes.dashboardGraphData){
      this.convertDashboardGraphDataToChartData(this.dashboardGraphData);
    }
  }
  ngAfterViewInit(){
  }
  /*
  * This function converts DashboardGraphData[]
  * into @Input chartLabels and @Input chartData
  */
  convertDashboardGraphDataToChartData(data: DashboardGraphData[]) {
    this.chartLabels = data.map((item) => {
      return this.getInstantLabelText(item.labelTextKey)
    });
    this.chartData = [{
      data: data.map(item => item.value),
      backgroundColor: data.map(item => item.color),
    }];
    //   urls :  data.map(item => item.url),
  }

  triggerClick(event: MouseEvent, element: Array<any>) {
    if (element.length < 1){
      this.chartClick.emit({
        label: undefined,
         value: undefined,
         index: undefined,
         datasetIndex: undefined,
         chart: undefined,
         event: event
      });
      return;
    }
    const chart: Chart = element[0]._chart;
    const realElement: any = chart.getElementAtEvent(event)[0];
    const index: number = realElement._index;
    const datasetIndex = realElement._datasetIndex;
    const label = chart.data.labels[index];
    const val = chart.data.datasets[datasetIndex].data[index];
    // const index: number = element[0]._index;
    // console.log('event',event);
    // console.log('element',element);
    // console.log('chart',chart);
    // console.log('index',index);
    // console.log('label',label);
    // console.log('val',val);
    this.chartClick.emit({
      label: label,
      value: val,
      index: index,
      datasetIndex: datasetIndex,
      chart: chart,
      event: event
    });
  }

}

