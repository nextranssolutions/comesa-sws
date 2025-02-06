import { Component } from '@angular/core';

@Component({
  selector: 'app-onlineapplicationsinvoicesgeneration-queries',
  templateUrl: './onlineapplicationsinvoicesgeneration-queries.component.html',
  styleUrl: './onlineapplicationsinvoicesgeneration-queries.component.css'
})
export class OnlineapplicationsinvoicesgenerationQueriesComponent {
  table_name: string;
    parameter_name: string;
    constructor(
      // private http: HttpClient,
    ) {
      this.table_name = 'wkf_applicationinvoicedata_queries';
      this.parameter_name = "applicationinvoicesgeneration-queries";
    }
    ngOnInit() {
      // other initializations
    }
}
