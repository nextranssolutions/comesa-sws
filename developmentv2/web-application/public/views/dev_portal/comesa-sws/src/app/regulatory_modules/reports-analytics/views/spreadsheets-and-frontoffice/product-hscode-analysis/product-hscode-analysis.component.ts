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
    this.table_name = 'par_nationalities';
    this.parameter_name = "product_hscode_analysis";
  }
}
