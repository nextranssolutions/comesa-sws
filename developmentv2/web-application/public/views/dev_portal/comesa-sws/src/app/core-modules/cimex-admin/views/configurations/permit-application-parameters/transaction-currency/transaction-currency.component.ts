import { Component } from '@angular/core';

@Component({
  selector: 'app-transaction-currency',
  templateUrl: './transaction-currency.component.html',
  styleUrl: './transaction-currency.component.css'
})
export class TransactionCurrencyComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'par_currencies';
    this.parameter_name = "currencies";
  }
}
