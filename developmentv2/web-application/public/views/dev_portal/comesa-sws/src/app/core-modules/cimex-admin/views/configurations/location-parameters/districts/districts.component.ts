import { Component } from '@angular/core';

@Component({
  selector: 'app-districts',
  templateUrl: './districts.component.html',
  styleUrl: './districts.component.css'
})
export class DistrictsComponent {
  table_name:string;
  parameter_name:string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'par_districts';
    this.parameter_name = "districts";
  }

  ngOnInit() {
    // other initializations

  }
}
