import { Component } from '@angular/core';

@Component({
  selector: 'app-port-entry-type',
  templateUrl: './port-entry-type.component.html',
  styleUrl: './port-entry-type.component.css'
})
export class PortEntryTypeComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'par_port_type';
    this.parameter_name = "port_entry_type";
  }
}
