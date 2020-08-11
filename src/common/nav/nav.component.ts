import { Component, Input } from '@angular/core';
import { NavModel } from './nav.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  @Input() items: NavModel[] =[{
    label: 'Dashboard',
    route: 'dashboard'
  }, {
    label: 'Assets',
    route: 'assets'
  }, {
    label: 'Expense',
    route: 'expense'
  }, {
    label: 'Income',
    route: 'income'
  }, {
    label: 'Reports',
    route: 'reports'
  }];

  constructor() { }

}
