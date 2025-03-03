import { Component } from '@angular/core';

@Component({
  selector: 'app-checklist-definations',
  templateUrl: './checklist-definations.component.html',
  styleUrl: './checklist-definations.component.css'
})
export class ChecklistDefinationsComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'chk_checklist_definations';
    this.parameter_name = "checklist_definations";
  }
}
