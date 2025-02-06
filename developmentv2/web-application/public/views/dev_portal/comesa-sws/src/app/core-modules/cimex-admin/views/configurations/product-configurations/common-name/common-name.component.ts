import { Component } from '@angular/core';

@Component({
  selector: 'app-common-name',
  templateUrl: './common-name.component.html',
  styleUrl: './common-name.component.css'
})
export class CommonNameComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'par_common_names';
    this.parameter_name = "common_names";
  }
}
