import { ChartPoint, Chart } from 'chart.js';
import { Moment } from 'moment';

export class DashboardGraphClickEvent{
  label?: string | string[] | number | number[] | Date | Date[] | Moment | Moment[];
  value?: number | number[] | ChartPoint;
  index: number;
  datasetIndex: number;
  chart: Chart;
  event: MouseEvent;
}


export class DashboardGraphData{
  labelTextKey?: string;
  value: number;
  color?: string;
  url?: string;

  constructor(data?) {
    if (data != undefined) {
      Object.assign(this, data);
    }
  }
}
