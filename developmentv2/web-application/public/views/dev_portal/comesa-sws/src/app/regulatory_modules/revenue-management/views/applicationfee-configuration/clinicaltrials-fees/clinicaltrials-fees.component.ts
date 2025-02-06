import { Component } from '@angular/core';

@Component({
  selector: 'app-clinicaltrials-fees',
  templateUrl: './clinicaltrials-fees.component.html',
  styleUrl: './clinicaltrials-fees.component.css'
})
export class ClinicaltrialsFeesComponent {

    table_name: string;
    parameter_name: string;
    regulatory_function_id:number;
    constructor(
      // private http: HttpClient,
    ) {
      this.table_name = 'txn_appmodules_feesconfigurations';
      this.parameter_name = "clinicaltrials-fees";
      this.regulatory_function_id = 7;
    }
    ngOnInit() {
      // other initializations
  
    }
}
