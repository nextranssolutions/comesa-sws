import { Component } from '@angular/core';

@Component({
  selector: 'app-assessment-procedures',
  templateUrl: './assessment-procedures.component.html',
  styleUrl: './assessment-procedures.component.css'
})
export class AssessmentProceduresComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'par_assessment_procedures';
    this.parameter_name = "assessment_procedures";
  }
}
