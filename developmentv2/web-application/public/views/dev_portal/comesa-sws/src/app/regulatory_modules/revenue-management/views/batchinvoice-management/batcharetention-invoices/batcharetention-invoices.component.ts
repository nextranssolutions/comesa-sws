import { Component } from '@angular/core';

@Component({
  selector: 'app-batcharetention-invoices',
  templateUrl: './batcharetention-invoices.component.html',
  styleUrl: './batcharetention-invoices.component.css'
})
export class BatcharetentionInvoicesComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'par_batch_invoices_records';
    this.parameter_name = "batcharetention-invoices";
  }
  ngOnInit() {
    // other initializations

  }
}
