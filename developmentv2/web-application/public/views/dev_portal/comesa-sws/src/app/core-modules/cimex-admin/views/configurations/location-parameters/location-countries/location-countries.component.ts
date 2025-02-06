import { Component } from '@angular/core';

@Component({
  selector: 'app-location-countries',
  templateUrl: './location-countries.component.html',
  styleUrl: './location-countries.component.css'
})
export class LocationCountriesComponent {
  table_name:string;
  parameter_name:string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'par_countries';
    this.parameter_name = "country_details";
  }

  ngOnInit() {
    // other initializations

  }
}
