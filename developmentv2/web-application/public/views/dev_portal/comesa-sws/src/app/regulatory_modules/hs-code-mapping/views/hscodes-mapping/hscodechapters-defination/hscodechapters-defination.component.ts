import { Component } from '@angular/core';

@Component({
  selector: 'app-hscodechapters-defination',
  templateUrl: './hscodechapters-defination.component.html',
  styleUrl: './hscodechapters-defination.component.css'
})
export class HscodechaptersDefinationComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'par_hscodechapters_defination';
    this.parameter_name = "hscodes_chapters_defination";
  }
}
