import { Component } from '@angular/core';

@Component({
  selector: 'app-applicationinvoicesgeneration-queries',
  templateUrl: './applicationinvoicesgeneration-queries.component.html',
  styleUrl: './applicationinvoicesgeneration-queries.component.css'
})
export class ApplicationinvoicesgenerationQueriesComponent {
  table_name: string;
    parameter_name: string;
    constructor(
      // private http: HttpClient,
    ) {
      this.table_name = 'tra_applicationinvoicedata_queries';
      this.parameter_name = "applicationinvoicesgeneration-queries";
    }
    ngOnInit() {
      // other initializations
    }
}
