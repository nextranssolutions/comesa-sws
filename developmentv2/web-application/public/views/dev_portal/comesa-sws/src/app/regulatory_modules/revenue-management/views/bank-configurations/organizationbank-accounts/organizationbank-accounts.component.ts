import { Component } from '@angular/core';

@Component({
  selector: 'app-organizationbank-accounts',
  templateUrl: './organizationbank-accounts.component.html',
  styleUrl: './organizationbank-accounts.component.css'
})
export class OrganizationbankAccountsComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'par_organizations';
    this.parameter_name = "Organization Banks";
  }
  ngOnInit() {
    // other initializations

  }
}
