import { Component } from '@angular/core';

@Component({
  selector: 'app-mode-of-transport',
  templateUrl: './mode-of-transport.component.html',
  styleUrl: './mode-of-transport.component.css'
})
export class ModeOfTransportComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'par_mode_oftransport';
    this.parameter_name = "mode_of_transport";
  }
}
