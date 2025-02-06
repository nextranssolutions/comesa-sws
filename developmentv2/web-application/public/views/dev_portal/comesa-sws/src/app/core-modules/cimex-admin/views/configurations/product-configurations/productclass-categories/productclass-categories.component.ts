import { Component } from '@angular/core';

@Component({
  selector: 'app-productclass-categories',
  templateUrl: './productclass-categories.component.html',
  styleUrl: './productclass-categories.component.css'
})
export class ProductclassCategoriesComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'par_productspecial_categories';
    this.parameter_name = "product_special_categories";
  }
}
