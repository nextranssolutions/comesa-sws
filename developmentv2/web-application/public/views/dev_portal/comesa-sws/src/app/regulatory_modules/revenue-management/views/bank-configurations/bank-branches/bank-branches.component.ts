import { Component } from '@angular/core';

@Component({
  selector: 'app-bank-branches',
  templateUrl: './bank-branches.component.html',
  styleUrl: './bank-branches.component.css'
})
export class BankBranchesComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'par_bankbranches';
    this.parameter_name = "bank_branches";
  }
  ngOnInit() {
    // other initializations

  }
}
