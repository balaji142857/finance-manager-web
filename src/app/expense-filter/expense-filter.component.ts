import { Component, OnInit, ViewChild, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CategoryModel } from '../models/category.model';
import { Asset as AssetModel } from '../models/asset.model';
import { ExpenseFilterModel } from '../models/expense-filter.model';
import { FormControl, NgForm } from '@angular/forms';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-expense-filter',
  templateUrl: './expense-filter.component.html',
  styleUrls: ['./expense-filter.component.scss']
})
export class ExpenseFilterComponent implements AfterViewInit {



  @ViewChild('filterForm') filterForm: NgForm
  resultCount = 0;
  filterObj: ExpenseFilterModel =  {
    asset: null,
    category: null,
    subCategory: null,
    comment: null,
    fromDate: null,
    toDate: null,
    minAmount: null,
    maxAmount: null,
    txDetail: null
  }

  @Input() categories: CategoryModel[] = [];
  @Input() assets: AssetModel[] = [];
  @Input() filedsToDisable = {};
  @Output() apply = new EventEmitter();

  constructor(private service: RestService) { }



  ngAfterViewInit(): void {
    this.filterForm.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe( data =>  this.filterRecords());
  }

  resetFilter() {
    this.filterForm.resetForm();
  }

  applyFilter() {
    this.apply.emit(this.filterForm.value);
  }

  filterRecords() {
    this.service.filterExpense({
      options: { },
      data: this.filterForm.value
    }).subscribe(
      data => {
        console.log('got resposne for filter req',data)
        this.resultCount = (<any>data).overallCount
      },
      err => console.log(err)
    );
  }

}
