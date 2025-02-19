import { Component } from '@angular/core';

@Component({
  selector: 'app-regulated-product-types',

  templateUrl: './regulated-product-types.component.html',
  styleUrl: './regulated-product-types.component.css'
})
export class RegulatedProductTypesComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'par_regulated_productstypes';
    this.parameter_name = "regulated_products_types";
  }
  ngOnInit() {
    // other initializations

  }
}
