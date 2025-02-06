import { Component } from '@angular/core';

@Component({
  selector: 'app-gmppharmaceuticallicense-fees',
  templateUrl: './gmppharmaceuticallicense-fees.component.html',
  styleUrl: './gmppharmaceuticallicense-fees.component.css'
})
export class GmppharmaceuticallicenseFeesComponent {
  table_name: string;
  parameter_name: string;
  regulatory_function_id: number;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'txn_appmodules_feesconfigurations';
    this.parameter_name = "gmppharmaceuticallicense-fees";
    this.regulatory_function_id = 3;
  }
  ngOnInit() {
    // other initializations

  }
}
