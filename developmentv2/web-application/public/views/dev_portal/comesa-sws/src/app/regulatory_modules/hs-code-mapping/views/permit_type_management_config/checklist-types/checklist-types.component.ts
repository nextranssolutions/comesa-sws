import { Component } from '@angular/core';

@Component({
  selector: 'app-checklist-types',
  templateUrl: './checklist-types.component.html',
  styleUrl: './checklist-types.component.css'
})
export class ChecklistTypesComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'chk_checklist_types';
    this.parameter_name = "checklist_types";
  }
}
