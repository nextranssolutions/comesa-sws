import { Component } from '@angular/core';

@Component({
  selector: 'app-hscodessubheading-defination',
  templateUrl: './hscodessubheading-defination.component.html',
  styleUrl: './hscodessubheading-defination.component.css'
})
export class HscodessubheadingDefinationComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'par_hscodessubheading_defination';
    this.parameter_name = "hscodes_subheading_defination";
  }
}
