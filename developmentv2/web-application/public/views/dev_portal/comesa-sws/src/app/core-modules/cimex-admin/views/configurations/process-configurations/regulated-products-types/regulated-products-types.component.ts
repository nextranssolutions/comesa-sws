import { Component } from '@angular/core';

@Component({
  selector: 'app-regulated-products-types',

  templateUrl: './regulated-products-types.component.html',
  styleUrl: './regulated-products-types.component.css'
})
export class RegulatedProductsTypesComponent {
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
