import { Component } from '@angular/core';

@Component({
  selector: 'app-gmdn-codes',
  templateUrl: './gmdn-codes.component.html',
  styleUrl: './gmdn-codes.component.css'
})
export class GmdnCodesComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'par_gmdn_codes';
    this.parameter_name = "gmdn_codes";
  }
}
