import { Component } from '@angular/core';

@Component({
  selector: 'app-procedures-categories',
  templateUrl: './procedures-categories.component.html',
  styleUrl: './procedures-categories.component.css'
})
export class ProceduresCategoriesComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'par_procedures_categories';
    this.parameter_name = "procedure_categories";
  }
}
