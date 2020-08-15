import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { FormControl } from '@angular/forms';
import { ExpenseModel } from '../models/expense.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ExpenseDialogComponent } from '../dialogs/expense-dialog/expense-dialog.component';
import { CategoryModel } from '../models/category.model';
import { Asset as AssetModel } from '../models/asset.model';
import { ActivatedRoute } from '@angular/router';
import { UtilService } from 'src/common/util.service';
import { RestService } from '../rest.service';
import { GenericDialogComponent } from '../dialogs/generic-dialog/generic-dialog.component';
import { MatSort } from '@angular/material/sort';
import { merge, of } from 'rxjs';
import { catchError,map, startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])
  ]
})
export class ExpenseComponent implements OnInit {

  toppings = new FormControl();
  panelOpenState = true;
  categories: CategoryModel[] = [];
  assets: AssetModel[] = [];
  expenses: ExpenseModel[] = [];
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

  dataSource = [];
  ELEMENT_DATA = { data:[] };
  columnsToDisplay = ['asset','category','subCategory','amount','date','comment','actions'];
  //
  expandedElement: ExpenseModel | null;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private dialog: MatDialog,
    public util: UtilService,
    private service: RestService,
    private route: ActivatedRoute) {
      this.categories = route.snapshot.data['categories'];
      this.assets = route.snapshot.data['assets'];
      this.expenses= route.snapshot.data['expenses'];
      this.ELEMENT_DATA.data = this.expenses;
  }

  ngOnInit() {
      this.dataSource = this.ELEMENT_DATA.data
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page)
    .pipe(
        startWith({}),
        switchMap(() =>  this.service.listExpenses()),
        map(data =>  data ),
        catchError(() =>   of([]) )
    ).subscribe(data => this.dataSource = data);
  }



  openExpense(exp: ExpenseModel, event) {
    const dialogRef = this.dialog.open(ExpenseDialogComponent, {
      width: '100vw',
      height: '50vh',
      data: {
        model: exp,
        categories: this.categories,
        assets: this.assets
      }
    });
    dialogRef.afterClosed().subscribe(data => {
      console.log('afterClosed ', data);
      if (data && data.confirmed) {
        console.log('page size changed');
        this.paginator._changePageSize(this.paginator.pageSize);
      }
    });
    this.stopEvent(event);
  }

  deleteExpense(exp: ExpenseModel, event) {
    const ref = this.dialog.open(GenericDialogComponent, {
      data: {
        confirmationMessage: 'Delete this Expense ?',
        confirmText: 'DELETE',
        cancelText: 'CANCEL'
      }
    });
    ref.afterClosed().subscribe(
      data => {
        if (data && data.confirmed) {
          this.service.deleteExpense(exp.id).subscribe(
            data => this.paginator._changePageSize(this.paginator.pageSize),
            err => console.log(err)
          );
        }
      }
    )
    this.stopEvent(event);
  }

  stopEvent(event) {
    event.preventDefault();
    event.stopPropagation();
  }

}
