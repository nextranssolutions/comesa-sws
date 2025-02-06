import { Component } from '@angular/core';

@Component({
  selector: 'app-retentioncharges-payment',
  templateUrl: './retentioncharges-payment.component.html',
  styleUrl: './retentioncharges-payment.component.css'
})
export class RetentionchargesPaymentComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'par_retentioncharges-payment';
    this.parameter_name = "retentioncharges-payment";
  }
  ngOnInit() {
    // other initializations

  }
}
