import { Component } from '@angular/core';

@Component({
  selector: 'app-processdates-spandefination',
  templateUrl: './processdates-spandefination.component.html',
  styleUrl: './processdates-spandefination.component.css'
})
export class ProcessdatesSpandefinationComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'par_processdatespan_defination';
    this.parameter_name = "process_date_span_defination";
  }
  ngOnInit() {
    // other initializations

  }
}
