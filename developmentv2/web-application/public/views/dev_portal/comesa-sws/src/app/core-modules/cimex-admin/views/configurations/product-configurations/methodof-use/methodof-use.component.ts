import { Component } from '@angular/core';

@Component({
  selector: 'app-methodof-use',
  templateUrl: './methodof-use.component.html',
  styleUrl: './methodof-use.component.css'
})
export class MethodofUseComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'par_methodof_use';
    this.parameter_name = "method_of_use";
  }
}
