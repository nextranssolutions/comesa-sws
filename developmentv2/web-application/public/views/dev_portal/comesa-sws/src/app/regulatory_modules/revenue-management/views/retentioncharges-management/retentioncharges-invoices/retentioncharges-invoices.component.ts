import { Component } from '@angular/core';

@Component({
  selector: 'app-retentioncharges-invoices',
  templateUrl: './retentioncharges-invoices.component.html',
  styleUrl: './retentioncharges-invoices.component.css'
})
export class RetentionchargesInvoicesComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'par_retentioncharges-invoices';
    this.parameter_name = "retentioncharges-invoices";
  }
  ngOnInit() {
    // other initializations

  }
}
