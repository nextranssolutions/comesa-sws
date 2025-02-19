import { Component } from '@angular/core';

@Component({
  selector: 'app-regulatory-functions',

  templateUrl: './regulatory-functions.component.html',
  styleUrl: './regulatory-functions.component.css'
})
export class RegulatoryFunctionsComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'par_regulatory_functions';
    this.parameter_name = "regulatory_functions";
  }
  ngOnInit() {
    // other initializations

  }
}
