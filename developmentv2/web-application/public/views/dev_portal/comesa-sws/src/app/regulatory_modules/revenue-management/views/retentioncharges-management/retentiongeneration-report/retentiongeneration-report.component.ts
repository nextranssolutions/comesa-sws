import { Component } from '@angular/core';

@Component({
  selector: 'app-retentiongeneration-report',
  templateUrl: './retentiongeneration-report.component.html',
  styleUrl: './retentiongeneration-report.component.css'
})
export class RetentiongenerationReportComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'par_retentiongeneration-report';
    this.parameter_name = "retentiongeneration-report";
  }
  ngOnInit() {
    // other initializations

  }
}
