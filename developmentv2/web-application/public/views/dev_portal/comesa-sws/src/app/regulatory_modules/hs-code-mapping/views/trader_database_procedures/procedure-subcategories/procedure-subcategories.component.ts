import { Component } from '@angular/core';

@Component({
  selector: 'app-procedure-subcategories',
  templateUrl: './procedure-subcategories.component.html',
  styleUrl: './procedure-subcategories.component.css'
})
export class ProcedureSubcategoriesComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'par_procedures_subcategories';
    this.parameter_name = "procedures_subcategories";
  }
}
