import { Component } from '@angular/core';

@Component({
  selector: 'app-application-processdefination',
  templateUrl: './application-processdefination.component.html',
  styleUrl: './application-processdefination.component.css'
})
export class ApplicationProcessdefinationComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'par_appprocess_definations';
    this.parameter_name = "application_process_definations";
  }
  ngOnInit() {
    // other initializations

  }
}
