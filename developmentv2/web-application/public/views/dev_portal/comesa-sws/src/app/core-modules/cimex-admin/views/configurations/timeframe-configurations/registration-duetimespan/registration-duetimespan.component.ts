import { Component } from '@angular/core';

@Component({
  selector: 'app-registration-duetimespan',
  templateUrl: './registration-duetimespan.component.html',
  styleUrl: './registration-duetimespan.component.css'
})
export class RegistrationDuetimespanComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'par_registration_expirytime_span';
    this.parameter_name = "registration_expirytime_span";
  }
  ngOnInit() {
    // other initializations

  }
}
