import { Component } from '@angular/core';

@Component({
  selector: 'app-controlleddrugslicense-fees',
  templateUrl: './controlleddrugslicense-fees.component.html',
  styleUrl: './controlleddrugslicense-fees.component.css'
})
export class ControlleddrugslicenseFeesComponent {
  table_name: string;
  parameter_name: string;
  regulatory_function_id:number;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'txn_appmodules_feesconfigurations';
    this.parameter_name = "controlleddrugslicense-fees";
    this.regulatory_function_id = 12;
  }
  ngOnInit() {
    // other initializations

  }
}
