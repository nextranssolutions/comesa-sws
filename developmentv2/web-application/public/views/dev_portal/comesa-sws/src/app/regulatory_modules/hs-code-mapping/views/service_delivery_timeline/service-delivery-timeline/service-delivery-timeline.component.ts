import { Component } from '@angular/core';

@Component({
  selector: 'app-service-delivery-timeline',
  templateUrl: './service-delivery-timeline.component.html',
  styleUrl: './service-delivery-timeline.component.css'
})
export class ServiceDeliveryTimelineComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'par_service_deliverytimelines';
    this.parameter_name = "service_delivery_timelines";
  }
}
