import { Component } from '@angular/core';

@Component({
  selector: 'app-ingredient-type',
  templateUrl: './ingredient-type.component.html',
  styleUrl: './ingredient-type.component.css'
})
export class IngredientTypeComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'par_ingredients_types';
    this.parameter_name = "ingredients_types";
  }
}
