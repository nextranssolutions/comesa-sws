import { Component } from '@angular/core';

@Component({
  selector: 'app-hscode-institutions',
  templateUrl: './hscode-institutions.component.html',
  styleUrl: './hscode-institutions.component.css'
})
export class HscodeInstitutionsComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'par_institutions';
    this.parameter_name = "Institutions Details";
  }

  ngOnInit() {
    // other initializations

  }
}
