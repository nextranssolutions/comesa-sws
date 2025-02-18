import { Component } from '@angular/core';

@Component({
  selector: 'app-hscodestariff-details',
  templateUrl: './hscodestariff-details.component.html',
  styleUrl: './hscodestariff-details.component.css'
})
export class HscodestariffDetailsComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'par_hscodestariff_details';
    this.parameter_name = "hscodes_tariff_details";
  }
}
