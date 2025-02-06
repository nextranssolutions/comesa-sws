import { Component } from '@angular/core';

@Component({
  selector: 'app-device-types',
  templateUrl: './device-types.component.html',
  styleUrl: './device-types.component.css'
})
export class DeviceTypesComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'par_device_types';
    this.parameter_name = "device_types";
  }
}
