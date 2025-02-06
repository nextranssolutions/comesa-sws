import { Component } from '@angular/core';

@Component({
  selector: 'app-disposalapplicationfee-configuration',
  templateUrl: './disposalapplicationfee-configuration.component.html',
  styleUrl: './disposalapplicationfee-configuration.component.css'
})
export class DisposalapplicationfeeConfigurationComponent {
  table_name: string;
  parameter_name: string;
  regulatory_function_id:number;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'txn_appmodules_feesconfigurations';
    this.parameter_name = "disposalapplicationfee-configuration";
    this.regulatory_function_id = 15;
  }
  ngOnInit() {
    // other initializations

  }
}
