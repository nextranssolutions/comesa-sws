import { Component } from '@angular/core';

@Component({
  selector: 'app-hscode-institution-departments',
  templateUrl: './hscode-institution-departments.component.html',
  styleUrl: './hscode-institution-departments.component.css'
})
export class HscodeInstitutionDepartmentsComponent {
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
