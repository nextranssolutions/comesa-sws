import { Component } from '@angular/core';

@Component({
  selector: 'app-renewable-statuses',
  templateUrl: './renewable-statuses.component.html',
  styleUrl: './renewable-statuses.component.css'
})
export class RenewableStatusesComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'par_renewable_statuses';
    this.parameter_name = "renewable_statuses";
  }
}
