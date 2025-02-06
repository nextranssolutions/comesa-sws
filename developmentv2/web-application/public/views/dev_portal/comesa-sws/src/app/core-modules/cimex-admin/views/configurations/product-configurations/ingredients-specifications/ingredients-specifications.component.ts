import { Component } from '@angular/core';

@Component({
  selector: 'app-ingredients-specifications',
  templateUrl: './ingredients-specifications.component.html',
  styleUrl: './ingredients-specifications.component.css'
})
export class IngredientsSpecificationsComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'par_ingredients_specifications';
    this.parameter_name = "ingredients_specifications";
  }
}
