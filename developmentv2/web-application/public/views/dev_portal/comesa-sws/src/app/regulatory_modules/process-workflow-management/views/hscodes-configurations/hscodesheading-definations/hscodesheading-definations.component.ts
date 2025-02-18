import { Component } from '@angular/core';

@Component({
  selector: 'app-hscodesheading-definations',
  templateUrl: './hscodesheading-definations.component.html',
  styleUrl: './hscodesheading-definations.component.css'
})
export class HscodesheadingDefinationsComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'par_hscodesheading_definations';
    this.parameter_name = "hscodes_heading_definations";
  }
}
