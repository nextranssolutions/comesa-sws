import { Component } from '@angular/core';

@Component({
  selector: 'app-atccodes-definations',
  templateUrl: './atccodes-definations.component.html',
  styleUrl: './atccodes-definations.component.css'
})
export class AtccodesDefinationsComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'par_atc_codes';
    this.parameter_name = "atc_codes";
  }
}
