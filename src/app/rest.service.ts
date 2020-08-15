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
    return this.http.post<ChartDataModel>(this.basePath+'dashboard/expenseByMonthDay',{'from': null, 'to': null});
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
    return this.http.post<ChartDataModel>(this.basePath+'dashboard/expenseByYearMonth',{'from': null, 'to': null});
  }

  getExpensesByCategory(): Observable<ChartDataModel>  {
    return this.http.post<ChartDataModel>(this.basePath+'dashboard/expenseByCategories',{'from': null, 'to': null});
  }


  getIncomeCategories(): Observable<CategoryModel[]>{
    return of([]);
  }

  getTransactions(): Observable<ExpenseModel[]>{
    return of([]);
  }

}

