import { Component, ViewChild } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'finance-manager';
  hamburgerClass = false;
  showFilter = false;
  @ViewChild('drawer') drawer;

  hamClicked() {
    this.hamburgerClass = !this.hamburgerClass
    this.drawer.toggle();
  }
  // Preparing the chart data


}
