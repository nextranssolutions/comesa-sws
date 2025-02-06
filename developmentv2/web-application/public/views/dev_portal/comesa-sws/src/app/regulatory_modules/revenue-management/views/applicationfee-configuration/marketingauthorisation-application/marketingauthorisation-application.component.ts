import { Component } from '@angular/core';

@Component({
  selector: 'app-marketingauthorisation-application',
  templateUrl: './marketingauthorisation-application.component.html',
  styleUrl: './marketingauthorisation-application.component.css'
})
export class MarketingauthorisationApplicationComponent {
  table_name: string;
  parameter_name: string;
  regulatory_function_id: number;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'txn_appmodules_feesconfigurations';
    this.parameter_name = "marketingauthorisation-application";
    this.regulatory_function_id = 1;
  }
  ngOnInit() {
    // other initializations

  }
}
