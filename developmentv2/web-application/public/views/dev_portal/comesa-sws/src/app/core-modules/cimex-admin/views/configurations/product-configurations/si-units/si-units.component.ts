import { Component } from '@angular/core';

@Component({
  selector: 'app-si-units',
  templateUrl: './si-units.component.html',
  styleUrl: './si-units.component.css'
})
export class SiUnitsComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'par_si_units';
    this.parameter_name = "si_units";
  }
}
