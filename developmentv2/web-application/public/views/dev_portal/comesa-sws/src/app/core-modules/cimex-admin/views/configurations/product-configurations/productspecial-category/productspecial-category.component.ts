import { Component } from '@angular/core';

@Component({
  selector: 'app-productspecial-category',
  templateUrl: './productspecial-category.component.html',
  styleUrl: './productspecial-category.component.css'
})
export class ProductspecialCategoryComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'par_productspecial_categories';
    this.parameter_name = "product_special_categories";
  }
}
