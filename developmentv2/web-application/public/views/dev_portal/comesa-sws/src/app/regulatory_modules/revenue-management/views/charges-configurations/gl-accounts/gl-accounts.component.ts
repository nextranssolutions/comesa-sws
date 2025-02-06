import { Component } from '@angular/core';

@Component({
  selector: 'app-gl-accounts',
  templateUrl: './gl-accounts.component.html',
  styleUrl: './gl-accounts.component.css'
})
export class GlAccountsComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'par_gl_accounts';
    this.parameter_name = "gl_accounts";
  }
  ngOnInit() {
    // other initializations

  }
}
