import { Component, OnInit, ViewChild } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { FormControl } from '@angular/forms';
import { ExpenseModel } from '../models/expense.model';
import { MatPaginator } from '@angular/material/paginator';

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
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];


  dataSource = ELEMENT_DATA.data;
  columnsToDisplay = ['id', 'name', 'balance', 'comment'];
  expandedElement: ExpenseModel | null;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor() { }

  openExpense(exp: ExpenseModel) {

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
