import { Component } from '@angular/core';

@Component({
  selector: 'app-permit-template-types',
  templateUrl: './permit-template-types.component.html',
  styleUrl: './permit-template-types.component.css'
})
export class PermitTemplateTypesComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'par_permittemplate_types';
    this.parameter_name = "permittemplate_types";
  }
}
