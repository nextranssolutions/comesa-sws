import { Component } from '@angular/core';

@Component({
  selector: 'app-licensing-fees',
  templateUrl: './licensing-fees.component.html',
  styleUrl: './licensing-fees.component.css'
})
export class LicensingFeesComponent {
  table_name: string;
  parameter_name: string;
  regulatory_function_id: number;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'txn_appmodules_feesconfigurations';
    this.parameter_name = "licensing-fees";
  }
  ngOnInit() {
    // other initializations
    this.regulatory_function_id = 2;

  }
}
