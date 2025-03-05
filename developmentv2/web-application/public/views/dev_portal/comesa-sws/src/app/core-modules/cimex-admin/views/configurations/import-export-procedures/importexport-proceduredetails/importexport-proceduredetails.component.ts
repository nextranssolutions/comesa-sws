import { Component } from '@angular/core';

@Component({
  selector: 'app-importexport-proceduredetails',
  templateUrl: './importexport-proceduredetails.component.html',
  styleUrl: './importexport-proceduredetails.component.css'
})
export class ImportexportProceduredetailsComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'tra_importexport_proceduredetails';
    this.parameter_name = "procedure_details";
  }
}
