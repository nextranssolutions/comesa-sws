import { Component } from '@angular/core';

@Component({
  selector: 'app-institution-departments',

  templateUrl: './institution-departments.component.html',
  styleUrl: './institution-departments.component.css'
})
export class InstitutionDepartmentsComponent {
  table_name:string;
  parameter_name:string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'par_institutions_department';
    this.parameter_name = "institution_departments";
  }

  ngOnInit() {
    // other initializations

  }
}
