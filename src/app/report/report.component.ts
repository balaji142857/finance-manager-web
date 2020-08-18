import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { UtilService } from 'src/common/util.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  expenseFiles = [];

  constructor(private service: RestService,
    private util: UtilService) { }

  ngOnInit(): void {
  }

  import() {
    if (this.expenseFiles) {
      this.service.importExpenses(this.expenseFiles).subscribe(
        data => console.log(data),
        err => console.log(err)
      );
    }
  }

}
