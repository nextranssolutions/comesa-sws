import { Component } from '@angular/core';

@Component({
  selector: 'app-product-forms',
  templateUrl: './product-forms.component.html',
  styleUrl: './product-forms.component.css'
})
export class ProductFormsComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'par_product_forms';
    this.parameter_name = "product_forms";
  }
}
