import { Component } from '@angular/core';

@Component({
  selector: 'app-permitapplication-timeline',
  templateUrl: './permitapplication-timeline.component.html',
  styleUrl: './permitapplication-timeline.component.css'
})
export class PermitapplicationTimelineComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'par_permitexpirytime_span';
    this.parameter_name = "permit_application_timelimes";
  }
}
