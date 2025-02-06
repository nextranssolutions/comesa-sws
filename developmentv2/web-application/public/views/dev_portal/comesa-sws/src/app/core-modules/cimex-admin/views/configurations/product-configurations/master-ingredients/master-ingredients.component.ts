import { Component } from '@angular/core';

@Component({
  selector: 'app-master-ingredients',
  templateUrl: './master-ingredients.component.html',
  styleUrl: './master-ingredients.component.css'
})
export class MasterIngredientsComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'par_master_ingredients';
    this.parameter_name = "master_ingredients";
  }
}
