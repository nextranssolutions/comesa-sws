import { Component } from '@angular/core';

@Component({
  selector: 'app-country-regions',
  templateUrl: './country-regions.component.html',
  styleUrl: './country-regions.component.css'
})
export class CountryRegionsComponent {
  table_name:string;
  parameter_name:string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'par_countriesregions';
    this.parameter_name = "country_regions";
  }

  ngOnInit() {
    // other initializations

  }
}
