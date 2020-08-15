import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import * as env from '../environments/environment';
import { Asset } from './models/asset.model';
import { CategoryModel } from './models/category.model';
import { ExpenseModel } from './models/expense.model';
import { ChartDataModel } from './models/chart-data.model';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  basePath = env.environment.url;

  constructor(private http: HttpClient) { }

  getAssets(): Observable<Asset[]> {
    return this.http.get<Asset[]>(this.basePath+'assets/');
  }

  saveAsset(asset: Asset): Observable<Asset> {
    return this.http.post<Asset>(this.basePath+'assets/', asset);
  }

  deleteAsset(id: number) {
    return this.http.post(this.basePath+'assets/'+id,null);
  }

  getExpenseCategories(): Observable<CategoryModel[]> {
    return this.http.get<CategoryModel[]>(this.basePath+'categories/');
  }

  saveCategory(cat: CategoryModel) {
    return this.http.post(this.basePath+'categories/', cat);
  }

  deleteCategory(id: number) {
    return this.http.post(this.basePath+'categories/'+id,null);
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

  listExpenses(): Observable<ExpenseModel[]> {
    return this.http.get<ExpenseModel[]>(this.basePath+'expenses');
  }

  saveExpense(exp: ExpenseModel) {
    return this.http.post(this.basePath+'expenses/',[exp]);
  }

  deleteExpense(expId: number) {
    return this.http.post(this.basePath+'expenses/delete/'+expId, null);
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
    return this.http.post<ChartDataModel>(this.basePath+'dashboard/expenseByCategories',{'from': null, 'to': null});
    // return of({
    //   title: 'Expenses by category',
    //   data: [
    //     {label: 'Groceries', value: 10000},
    //     {label: 'Rent', value: 50000},
    //     {label: 'Broadband', value: 2500},
    //     {label: 'Electricity', value: 3000},
    //     {label: 'Mobile', value: 4000},
    //     {label: 'Gas', value: 1500},
    //   ]
    // });
  }


  getIncomeCategories(): Observable<CategoryModel[]>{
    return of([]);
  }

  getTransactions(): Observable<ExpenseModel[]>{
    return of([]);
  }

}

