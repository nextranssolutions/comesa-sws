import { Component } from '@angular/core';

@Component({
  selector: 'app-product-hscode-analysis',
  templateUrl: './product-hscode-analysis.component.html',
  styleUrl: './product-hscode-analysis.component.css'
})
export class ProductHscodeAnalysisComponent {
  table_name:string;
  parameter_name:string;
  constructor(
  ) {
    this.table_name = 'tra_transactionpermit_hs_codes';
    this.parameter_name = "product_hscode_analysis";
  }
}
