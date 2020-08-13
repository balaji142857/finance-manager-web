import { Component, OnInit, ViewChild } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { FormControl } from '@angular/forms';
import { ExpenseModel } from '../models/expense.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ExpenseDialogComponent } from '../dialogs/expense-dialog/expense-dialog.component';
import { CategoryModel } from '../models/category.model';
import { Asset as AssetModel } from '../models/asset.model';
import { ActivatedRoute } from '@angular/router';

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
export class ExpenseComponent {

  toppings = new FormControl();
  panelOpenState = true;
  categories: CategoryModel[] = [];
  assets: AssetModel[] = [];
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];


  dataSource = ELEMENT_DATA.data;
  columnsToDisplay = ['id', 'name', 'balance', 'comment'];
  expandedElement: ExpenseModel | null;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private dialog: MatDialog,
    private route: ActivatedRoute) {
      this.categories = route.snapshot.data['categories'];
      this.assets = route.snapshot.data['assets'];
    }

  openExpense(exp: ExpenseModel) {
    const dialogRef = this.dialog.open(ExpenseDialogComponent, {
      width: '100vw',
      height: '50vh',
      data: {
        model: exp,
        categories: this.categories,
        assets: this.assets
      }
    });
  }

}

const ELEMENT_DATA = {
  data: [
    {
      id: 2,
      name: 'ICICI Net Banking',
      balance: 99999,
      comment: 'Net banking',
    }, {
      id: 3,
      name: 'Google pay',
      balance: 100000,
      comment: 'adsfasf',
    },
  ]
};
