import { Component } from '@angular/core';

@Component({
  selector: 'app-permits-per-origincountry',
  templateUrl: './permits-per-origincountry.component.html',
  styleUrl: './permits-per-origincountry.component.css'
})
export class PermitsPerOrigincountryComponent {
  table_name:string;
  parameter_name:string;
  constructor(
  ) {
    this.table_name = 'tra_permits_per_country';
    this.parameter_name = "permits_per_country_of_origin";
  }
}
