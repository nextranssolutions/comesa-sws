import { Component } from '@angular/core';

@Component({
  selector: 'app-hscode-seloption',
  templateUrl: './hscode-seloption.component.html',
  styleUrl: './hscode-seloption.component.css'
})
export class HscodeSeloptionComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'par_hscode_seloption';
    this.parameter_name = "hscode_seloption";
  }
}
