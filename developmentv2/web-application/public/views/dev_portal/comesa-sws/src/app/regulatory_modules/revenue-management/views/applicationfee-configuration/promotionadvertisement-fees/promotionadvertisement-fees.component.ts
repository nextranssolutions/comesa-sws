import { Component } from '@angular/core';

@Component({
  selector: 'app-promotionadvertisement-fees',
  templateUrl: './promotionadvertisement-fees.component.html',
  styleUrl: './promotionadvertisement-fees.component.css'
})
export class PromotionadvertisementFeesComponent {
  table_name: string;
  parameter_name: string;
  regulatory_function_id: number;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'txn_appmodules_feesconfigurations';
    this.parameter_name = "promotionadvertisement-fees";
    this.regulatory_function_id = 14;
  }
  ngOnInit() {
    // other initializations

  }
}
