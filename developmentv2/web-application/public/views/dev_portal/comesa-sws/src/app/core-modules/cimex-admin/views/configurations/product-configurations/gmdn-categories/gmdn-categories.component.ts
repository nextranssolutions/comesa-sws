import { Component } from '@angular/core';

@Component({
  selector: 'app-gmdn-categories',
  templateUrl: './gmdn-categories.component.html',
  styleUrl: './gmdn-categories.component.css'
})
export class GmdnCategoriesComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'par_gmdn_categories';
    this.parameter_name = "gmdn_categories";
  }
}
