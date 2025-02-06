import { Component } from '@angular/core';

@Component({
  selector: 'app-intendedend-user',
  templateUrl: './intendedend-user.component.html',
  styleUrl: './intendedend-user.component.css'
})
export class IntendedendUserComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'par_intended_enduser';
    this.parameter_name = "intended_enduser";
  }
}
