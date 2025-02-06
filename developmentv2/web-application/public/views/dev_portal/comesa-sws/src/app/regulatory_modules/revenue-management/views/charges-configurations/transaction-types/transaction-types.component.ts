import { Component } from '@angular/core';

@Component({
  selector: 'app-transaction-types',
  templateUrl: './transaction-types.component.html',
  styleUrl: './transaction-types.component.css'
})
export class TransactionTypesComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'par_transaction_type';
    this.parameter_name = "transaction_types";
  }
  ngOnInit() {
    // other initializations

  }
}
