import { Component } from '@angular/core';

@Component({
  selector: 'app-reg-functions',

  templateUrl: './reg-functions.component.html',
  styleUrl: './reg-functions.component.css'
})
export class RegFunctionsComponent {
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
