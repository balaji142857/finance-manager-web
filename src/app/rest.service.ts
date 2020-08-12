import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import * as env from '../environments/environment';
import { Asset } from './models/asset.model';
import { CategoryModel } from './models/category.model';
import { TransactionModel } from './models/expense.model';
import { ChartDataModel } from './models/chart-data.model';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  basePath = env.environment.url;

  constructor(private http: HttpClient) { }

  getAssets(): Observable<Asset[]> {
    return of([
      {
        id: 2,
        name: 'ICICI Net Banking',
        usage: 500,
        comment: 'Net banking',
      }, {
        id: 3,
        name: 'Google pay',
        usage: 10000,
        comment: 'adsfasf',
      }, {
        id: 4,
        name: 'Phone pay',
        usage: 5000,
        comment: 'adsfasf',
      }, {
        id: 5,
        name: 'Amazon Pay',
        usage: 7500,
        comment: 'adsfasf',
      }, {
        id: 6,
        name: 'Axis Net Banking',
        usage: 2500,
        comment: 'adsfasf',
      }, {
        id: 7,
        name: 'Cash',
        usage: 100,
        comment: 'adsfasf',
      }
    ]);
  }

  saveAsset(asset: Asset) {
    return this.http.post<number>(this.basePath+'assets/', asset);
  }

  getExpenseCategories(): Observable<CategoryModel[]> {
    return of([{
      id: 1,
      value: 'Groceries',
      comment: 'string',
      subCategories:[{
        id: 1,
        value: 'Fruits',
      },{
        id: 1,
        value: 'Vegetables',
      },{
        id: 1,
        value: 'Beverages',
      }, {
        id: 1,
        value: 'Cookies',
      }]
    }]);
  }

  getDailyExpenses(): Observable<ChartDataModel> {
    return of(
      {
        title: 'Daily expenses',
        data: [
          {label: '8-Aug', value: 123},
          {label: '9-Aug', value: 500},
          {label: '10-Aug', value: 2500},
          {label: '11-Aug', value: 0},
          {label: '12-Aug', value: 600}
        ]
      }
    );
  }

  getMonthlyExpenses(): Observable<ChartDataModel> {
    return of(
      {
        title: 'Monthly expenses',
        data: [
          {label: 'Apr', value: 12000},
          {label: 'May', value: 15000},
          {label: 'Jun', value: 1000},
          {label: 'Jul', value: 8000},
          {label: 'Aug', value: 12500}
        ]
      }
    );
  }

  getExpensesByCategory(): Observable<ChartDataModel>  {
    return of({
      title: 'Expenses by category',
      data: [
        {label: 'Groceries', value: 10000},
        {label: 'Rent', value: 50000},
        {label: 'Broadband', value: 2500},
        {label: 'Electricity', value: 3000},
        {label: 'Mobile', value: 4000},
        {label: 'Gas', value: 1500},
      ]
    });
  }


  getIncomeCategories(): Observable<CategoryModel[]>{
    return of([]);
  }

  getTransactions(): Observable<TransactionModel[]>{
    return of([]);
  }

}

