import { Component } from '@angular/core';

@Component({
  selector: 'app-provinces',
  templateUrl: './provinces.component.html',
  styleUrl: './provinces.component.css'
})
export class ProvincesComponent {
  table_name:string;
  parameter_name:string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'par_cities';
    this.parameter_name = "country's_cities_provinces";
  }

  ngOnInit() {
    // other initializations

  }
}
