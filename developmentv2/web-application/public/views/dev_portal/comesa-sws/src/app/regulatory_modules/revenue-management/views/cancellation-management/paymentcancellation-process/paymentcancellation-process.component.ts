import { Component } from '@angular/core';

@Component({
  selector: 'app-paymentcancellation-process',
  templateUrl: './paymentcancellation-process.component.html',
  styleUrl: './paymentcancellation-process.component.css'
})
export class PaymentcancellationProcessComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'par_paymentcancellation_process';
    this.parameter_name = "paymentcancellation_process";
  }
  ngOnInit() {
    // other initializations

  }
}
