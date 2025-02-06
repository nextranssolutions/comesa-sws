import { Component } from '@angular/core';

@Component({
  selector: 'app-ref-numbertypes',
  templateUrl: './ref-numbertypes.component.html',
  styleUrl: './ref-numbertypes.component.css'
})
export class RefNumbertypesComponent {
   table_name: string;
   parameter_name: string;
   constructor(
    // private http: HttpClient,
   )
    {
     this.table_name = 'par_referencenumbers_types';
     this.parameter_name = "reference_type";
   }
}
