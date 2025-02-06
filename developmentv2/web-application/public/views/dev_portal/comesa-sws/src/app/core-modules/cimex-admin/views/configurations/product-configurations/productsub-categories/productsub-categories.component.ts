import { Component } from '@angular/core';

@Component({
  selector: 'app-productsub-categories',
  templateUrl: './productsub-categories.component.html',
  styleUrl: './productsub-categories.component.css'
})
export class ProductsubCategoriesComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'par_product_subcategories';
    this.parameter_name = "product_subcategories";
  }
}
