import { Component } from '@angular/core';

@Component({
  selector: 'app-fee-types',
  templateUrl: './fee-types.component.html',
  styleUrl: './fee-types.component.css'
})
export class FeeTypesComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'par_fee_types';
    this.parameter_name = "fee_types";
  }
  ngOnInit() {
    // other initializations

  }
}
