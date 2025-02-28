import { Component } from '@angular/core';

@Component({
  selector: 'app-invoice-type',
  templateUrl: './invoice-type.component.html',
  styleUrl: './invoice-type.component.css'
})
export class InvoiceTypeComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'par_invoice_types';
    this.parameter_name = "invoice_types";
  }
}
