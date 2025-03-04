import { Component } from '@angular/core';

@Component({
  selector: 'app-quota-limitationstype',
  templateUrl: './quota-limitationstype.component.html',
  styleUrl: './quota-limitationstype.component.css'
})
export class QuotaLimitationstypeComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'par_quota_limitationstype';
    this.parameter_name = "quota_limitationstype";
  }
}
