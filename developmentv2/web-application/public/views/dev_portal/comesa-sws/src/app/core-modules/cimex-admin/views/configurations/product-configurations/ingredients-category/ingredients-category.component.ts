import { Component } from '@angular/core';

@Component({
  selector: 'app-ingredients-category',
  templateUrl: './ingredients-category.component.html',
  styleUrl: './ingredients-category.component.css'
})
export class IngredientsCategoryComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'par_ingredients_category';
    this.parameter_name = "ingredients_category";
  }
}
