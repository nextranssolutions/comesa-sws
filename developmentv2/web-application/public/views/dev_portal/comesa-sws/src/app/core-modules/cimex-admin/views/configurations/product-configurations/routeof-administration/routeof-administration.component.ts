import { Component } from '@angular/core';

@Component({
  selector: 'app-routeof-administration',
  templateUrl: './routeof-administration.component.html',
  styleUrl: './routeof-administration.component.css'
})
export class RouteofAdministrationComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'par_route_of_administration';
    this.parameter_name = "route_of_administration";
  }
}
