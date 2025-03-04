import { Component } from '@angular/core';

@Component({
  selector: 'app-hscode-institutions',
  templateUrl: './hscode-institutions.component.html',
  styleUrl: './hscode-institutions.component.css'
})
export class HscodeInstitutionsComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'tra_organisation_information';
    this.parameter_name = "organisation_details";
  }

  ngOnInit() {
    // other initializations

  }
}
