import { Component } from '@angular/core';

@Component({
  selector: 'app-mapping-status',
  templateUrl: './mapping-status.component.html',
  styleUrl: './mapping-status.component.css'
})
export class MappingStatusComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'par_mapping_status';
    this.parameter_name = "mapping_status";
  }
}
