import { Component } from '@angular/core';

@Component({
  selector: 'app-hscodemapping-option',
  templateUrl: './hscodemapping-option.component.html',
  styleUrl: './hscodemapping-option.component.css'
})
export class HscodemappingOptionComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'par_hscodemapping_option';
    this.parameter_name = "hscodemapping_option";
  }
}
