import { Component } from '@angular/core';

@Component({
  selector: 'app-permit-termsconditions',
  templateUrl: './permit-termsconditions.component.html',
  styleUrl: './permit-termsconditions.component.css'
})
export class PermitTermsconditionsComponent {
  table_name:string;
  parameter_name:string;
  resetcolumns:string;
  constructor(
    
  ) {
    // this.resetcolumns = 'is_super_admin,institution_type_id,resetcolumns,account_type_id,routerLink,has_partnerstate_defination';
    
    this.table_name = 'tra_permits_termsconditions';
    this.parameter_name = "permit_termsconditions_details";
  }

  ngOnInit() {
   
  }
}
