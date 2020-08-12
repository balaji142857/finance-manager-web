import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ExpenseComponent } from './expense/expense.component';
import { IncomeComponent } from './income/income.component';
import { AssetComponent } from './asset/asset.component';
import { ReportComponent } from './report/report.component';

import { AssetResolverService } from './services/asset-resolver.service';
import { ExpCatResolverService } from './services/exp-cat-resolver.service';
import { DailyExpenseResolverService } from './services/daily-expense-resolver.service';
import { MonthlyExpenseResolverService } from './services/monthly-expense-resolver.service';
import { CategoryExpenseResolverService } from './services/category-expense-resolver.service';



const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
    resolve: {
      'expCat': ExpCatResolverService
    }
  }, {
     component: DashboardComponent, path: 'dashboard',
      resolve: {
      'assets' : AssetResolverService,
      'dailyExpenes': DailyExpenseResolverService,
      'monthlyExpenes': MonthlyExpenseResolverService,
      'categoryExpenses': CategoryExpenseResolverService
    }},
  { component: ExpenseComponent, path: 'expense'},
  { component: AssetComponent, path: 'assets',
resolve: {
  'assets' : AssetResolverService
}},
  { component: ReportComponent, path: 'reports'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
