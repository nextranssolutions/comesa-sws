import { Component } from '@angular/core';

@Component({
  selector: 'app-procedure-categories',
  templateUrl: './procedure-categories.component.html',
  styleUrl: './procedure-categories.component.css'
})
export class ProcedureCategoriesComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'par_procedures_categories';
    this.parameter_name = "procedures_categories";
  }
}
