import { Component } from '@angular/core';

@Component({
  selector: 'app-invoice-cancellation',
  templateUrl: './invoice-cancellation.component.html',
  styleUrl: './invoice-cancellation.component.css'
})
export class InvoiceCancellationComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'par_invoive_cancellation';
    this.parameter_name = "invoive_cancellation";
  }
  ngOnInit() {
    // other initializations

  }
}
