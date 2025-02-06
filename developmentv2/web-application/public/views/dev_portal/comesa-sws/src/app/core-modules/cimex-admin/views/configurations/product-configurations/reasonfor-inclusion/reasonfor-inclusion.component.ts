import { Component } from '@angular/core';

@Component({
  selector: 'app-reasonfor-inclusion',
  templateUrl: './reasonfor-inclusion.component.html',
  styleUrl: './reasonfor-inclusion.component.css'
})
export class ReasonforInclusionComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'par_inclusions_reasons';
    this.parameter_name = "inclusions_reasons";
  }
}
