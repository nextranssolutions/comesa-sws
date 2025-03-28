import { Component } from '@angular/core';

@Component({
  selector: 'app-permits-per-organisation',
  templateUrl: './permits-per-organisation.component.html',
  styleUrl: './permits-per-organisation.component.css'
})
export class PermitsPerOrganisationComponent {
  table_name:string;
  parameter_name:string;
  constructor(
  ) {
    this.table_name = 'tra_organisation_information';
    this.parameter_name = "permits_per_organisation";
  }
}
