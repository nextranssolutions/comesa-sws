import { Component } from '@angular/core';

@Component({
  selector: 'app-hscodes-sections',
  templateUrl: './hscodes-sections.component.html',
  styleUrl: './hscodes-sections.component.css'
})
export class HscodesSectionsComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'par_hscodessections';
    this.parameter_name = "hscodes_sections";
  }
}
