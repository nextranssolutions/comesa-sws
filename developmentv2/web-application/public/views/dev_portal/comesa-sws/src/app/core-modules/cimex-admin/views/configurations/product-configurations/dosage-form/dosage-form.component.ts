import { Component } from '@angular/core';

@Component({
  selector: 'app-dosage-form',
  templateUrl: './dosage-form.component.html',
  styleUrl: './dosage-form.component.css'
})
export class DosageFormComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'par_dosage_forms';
    this.parameter_name = "dosage_forms";
  }
}
