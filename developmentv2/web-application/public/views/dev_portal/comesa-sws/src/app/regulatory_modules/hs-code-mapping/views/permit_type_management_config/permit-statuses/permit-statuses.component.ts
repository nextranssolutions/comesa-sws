import { Component } from '@angular/core';

@Component({
  selector: 'app-permit-statuses',
  templateUrl: './permit-statuses.component.html',
  styleUrl: './permit-statuses.component.css'
})
export class PermitStatusesComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'par_permit_statuses';
    this.parameter_name = "permit_statuses";
  }
}
