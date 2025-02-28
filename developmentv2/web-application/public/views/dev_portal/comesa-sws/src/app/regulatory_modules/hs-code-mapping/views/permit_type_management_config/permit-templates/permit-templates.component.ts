import { Component } from '@angular/core';

@Component({
  selector: 'app-permit-templates',
  templateUrl: './permit-templates.component.html',
  styleUrl: './permit-templates.component.css'
})
export class PermitTemplatesComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'par_permit_templates';
    this.parameter_name = "permit_templates";
  }
}
