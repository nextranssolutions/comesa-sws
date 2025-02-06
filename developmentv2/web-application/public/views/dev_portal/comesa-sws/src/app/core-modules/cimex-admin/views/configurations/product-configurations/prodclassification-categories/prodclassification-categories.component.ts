import { Component } from '@angular/core';

@Component({
  selector: 'app-prodclassification-categories',
  templateUrl: './prodclassification-categories.component.html',
  styleUrl: './prodclassification-categories.component.css'
})
export class ProdclassificationCategoriesComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'cf_prodclass_categories';
    this.parameter_name = "prodclass_categories";
  }
}
