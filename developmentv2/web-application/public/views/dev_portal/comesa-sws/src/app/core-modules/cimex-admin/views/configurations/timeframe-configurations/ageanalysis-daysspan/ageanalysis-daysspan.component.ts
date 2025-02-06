import { Component } from '@angular/core';

@Component({
  selector: 'app-ageanalysis-daysspan',
  templateUrl: './ageanalysis-daysspan.component.html',
  styleUrl: './ageanalysis-daysspan.component.css'
})
export class AgeanalysisDaysspanComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'par_ageanalysisdays_span';
    this.parameter_name = "age_analysis_days_span";
  }
  ngOnInit() {
    // other initializations

  }
}
