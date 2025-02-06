import { Component } from '@angular/core';

@Component({
  selector: 'app-bill-posting',
  templateUrl: './bill-posting.component.html',
  styleUrl: './bill-posting.component.css'
})
export class BillPostingComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'par_bill-posting';
    this.parameter_name = "bill-posting";
  }
  ngOnInit() {
    // other initializations

  }
}
