import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChartsModule } from 'ng2-charts';
import { BusySpinnerModule } from 'busy-spinner';
import { MaterialModule } from 'src/common/material/material.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ExpenseComponent } from './expense/expense.component';
import { IncomeComponent } from './income/income.component';
import { AssetComponent } from './asset/asset.component';
import { ReportComponent } from './report/report.component';
import { NavModule } from 'src/common/nav/nav.module';

// Pass the fusioncharts library and chart modules
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ExpenseComponent,
    IncomeComponent,
    AssetComponent,
    ReportComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    BusySpinnerModule,
    MaterialModule,
    ChartsModule,
    NavModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
