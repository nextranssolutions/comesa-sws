import { Component } from '@angular/core';

@Component({
  selector: 'app-importexportpermit-fees',
  templateUrl: './importexportpermit-fees.component.html',
  styleUrl: './importexportpermit-fees.component.css'
})
export class ImportexportpermitFeesComponent {
  table_name: string;
  parameter_name: string;
  regulatory_function_id: number;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'txn_appmodules_feesconfigurations';
    this.parameter_name = "importexportpermit-fees";
    this.regulatory_function_id = 4;
  }
  ngOnInit() {
    // other initializations

  }
}
