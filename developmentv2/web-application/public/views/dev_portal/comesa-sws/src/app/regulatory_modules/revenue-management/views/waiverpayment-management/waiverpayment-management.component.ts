import { Component } from '@angular/core';

@Component({
  selector: 'app-waiverpayment-management',
  templateUrl: './waiverpayment-management.component.html',
  styleUrl: './waiverpayment-management.component.css'
})
export class WaiverpaymentManagementComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'par_waiverpayment-management';
    this.parameter_name = "waiverpayment-management";
  }
  ngOnInit() {
    // other initializations

  }
}
