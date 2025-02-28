import { Component } from '@angular/core';

@Component({
  selector: 'app-service-types',
  templateUrl: './service-types.component.html',
  styleUrl: './service-types.component.css'
})
export class ServiceTypesComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'par_service_type';
    this.parameter_name = "service_type";
  }
}
