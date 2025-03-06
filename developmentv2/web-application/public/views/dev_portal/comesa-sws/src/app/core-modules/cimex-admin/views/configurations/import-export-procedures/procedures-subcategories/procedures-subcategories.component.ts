import { Component } from '@angular/core';

@Component({
  selector: 'app-procedures-subcategories',
  templateUrl: './procedures-subcategories.component.html',
  styleUrl: './procedures-subcategories.component.css'
})
export class ProceduresSubcategoriesComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'par_procedures_subcategories';
    this.parameter_name = "procedure_subcategories";
  }
}
