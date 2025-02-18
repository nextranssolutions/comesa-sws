import { Component } from '@angular/core';

@Component({
  selector: 'app-app-institutions',

  templateUrl: './app-institutions.component.html',
  styleUrl: './app-institutions.component.css'
})
export class AppInstitutionsComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'par_institutions';
    this.parameter_name = "Institutions Details";
  }

  ngOnInit() {
    // other initializations

  }
}
