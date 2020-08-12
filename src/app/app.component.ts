import { Component, ViewChild } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Finance Manager';
  connectedUser = 'Balaji KRISHNAN'
  showFilter = false;
  @ViewChild('drawer') drawer;

  hamClicked() {
    this.drawer.toggle();
  }

}
