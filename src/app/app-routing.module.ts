import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ExpenseComponent } from './expense/expense.component';
import { IncomeComponent } from './income/income.component';
import { AssetComponent } from './asset/asset.component';
import { ReportComponent } from './report/report.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }, { component: DashboardComponent, path: 'dashboard' },
  { component: ExpenseComponent, path: 'expense'},
  { component: IncomeComponent, path: 'income'},
  { component: AssetComponent, path: 'assets'},
  { component: ReportComponent, path: 'reports'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
