import { Component } from '@angular/core';

@Component({
  selector: 'app-intendedend-use',
  templateUrl: './intendedend-use.component.html',
  styleUrl: './intendedend-use.component.css'
})
export class IntendedendUseComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'par_intendedend_use';
    this.parameter_name = "intendedend_use";
  }
}
