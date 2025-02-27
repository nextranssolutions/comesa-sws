import { Component } from '@angular/core';

@Component({
  selector: 'app-sop-masterlist',

  templateUrl: './sop-masterlist.component.html',
  styleUrl: './sop-masterlist.component.css'
})
export class SopMasterlistComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'par_sop_masterlist';
    this.parameter_name = "SOP master list";
  }
}
