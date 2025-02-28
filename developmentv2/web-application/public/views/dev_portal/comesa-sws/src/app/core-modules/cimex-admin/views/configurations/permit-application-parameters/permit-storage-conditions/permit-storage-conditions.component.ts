import { Component } from '@angular/core';

@Component({
  selector: 'app-permit-storage-conditions',
  templateUrl: './permit-storage-conditions.component.html',
  styleUrl: './permit-storage-conditions.component.css'
})
export class PermitStorageConditionsComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'par_storage_conditions';
    this.parameter_name = "storage_conditions";
  }
}
