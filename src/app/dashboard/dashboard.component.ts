import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType  } from 'chart.js';
import { Color, Label, MultiDataSet} from 'ng2-charts';
import { ActivatedRoute } from '@angular/router';
import { Asset } from '../models/asset.model';
import { ChartConfigModel } from '../models/chart-config.model';
import { ChartDataModel, ChartData } from '../models/chart-data.model';
import { RestService } from '../rest.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {


  assetChartData: ChartDataModel;
  dailyExpenseData: ChartDataModel;
  monthlyExpenseData: ChartDataModel;
  categoryExpenseData: ChartDataModel;
  from: string;
  to: string;

  barChartConfig: ChartConfigModel = {
    chartType: 'bar',
    responsive: true,
    showLegends: true
  }
  doughnutChartConfig: ChartConfigModel = {
    chartType: 'doughnut',
    responsive: true,
    showLegends: true
  }
  lineChartConfig: ChartConfigModel = {
    chartType: 'line',
    responsive: true,
    showLegends: true
  }
  polarChartConfig: ChartConfigModel = {
    chartType: 'polarArea',
    responsive: true,
    showLegends: true
  }
  constructor(private route: ActivatedRoute,
      private service: RestService) {
    this.assetChartData = this.translate(this.route.snapshot.data['assets'], 'Asset Usage');
    this.dailyExpenseData = this.route.snapshot.data['dailyExpenes'];
    this.monthlyExpenseData = this.route.snapshot.data['monthlyExpenes'];
    this.categoryExpenseData = this.route.snapshot.data['categoryExpenses'];
  }

  reloadChartData() {
    this.service.getDailyExpenses(this.from, this.to).subscribe(
      data =>  this.dailyExpenseData = data,
      err => console.error(err)
    );
    this.service.getMonthlyExpenses(this.from, this.to).subscribe(
      data => this.monthlyExpenseData = data,
      err => console.error(err)
    );
    this.service.getExpensesByCategory(this.from, this.to).subscribe(
      data => this.categoryExpenseData = data,
      err => console.error(err)
    );

  }

  dateRangeChanged() {
    console.log('date range changed');
    this.reloadChartData();
    console.log('date range change completed')
  }

  translate(data: Asset[], title: string): ChartDataModel {
    if (!data || !data.length) {
      return { data: [], title: title };
    }
    const chartData: ChartData[] = [];
    data.forEach(asset => {
      chartData.push({
        id: asset.id,
        label: asset.name,
        value: asset.usage
      });
    });
    return { data: chartData, title: title };
    }

}
