import { Component } from '@angular/core';

@Component({
  selector: 'app-storage-condition',
  templateUrl: './storage-condition.component.html',
  styleUrl: './storage-condition.component.css'
})
export class StorageConditionComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'par_storage_conditions';
    this.parameter_name = "storage_conditions";
  }
}
