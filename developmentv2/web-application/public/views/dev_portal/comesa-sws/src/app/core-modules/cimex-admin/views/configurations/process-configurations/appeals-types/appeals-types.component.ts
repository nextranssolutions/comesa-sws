import { Component } from '@angular/core';

@Component({
  selector: 'app-appeals-types',

  templateUrl: './appeals-types.component.html',
  styleUrl: './appeals-types.component.css'
})
export class AppealsTypesComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'par_appeal_types';
    this.parameter_name = "appeal_types";
  }
}
