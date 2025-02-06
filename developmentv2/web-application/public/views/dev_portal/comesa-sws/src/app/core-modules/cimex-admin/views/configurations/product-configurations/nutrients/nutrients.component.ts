import { Component } from '@angular/core';

@Component({
  selector: 'app-nutrients',
  templateUrl: './nutrients.component.html',
  styleUrl: './nutrients.component.css'
})
export class NutrientsComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'par_nutrients';
    this.parameter_name = "nutrients";
  }
}
