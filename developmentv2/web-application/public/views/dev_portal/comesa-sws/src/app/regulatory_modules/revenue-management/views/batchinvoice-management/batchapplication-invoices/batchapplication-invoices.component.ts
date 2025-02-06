import { Component } from '@angular/core';

@Component({
  selector: 'app-batchapplication-invoices',
  templateUrl: './batchapplication-invoices.component.html',
  styleUrl: './batchapplication-invoices.component.css'
})
export class BatchapplicationInvoicesComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'par_batch_invoiceapp_details';
    this.parameter_name = "batchapplication-invoices";
  }
  ngOnInit() {
    // other initializations

  }
}
