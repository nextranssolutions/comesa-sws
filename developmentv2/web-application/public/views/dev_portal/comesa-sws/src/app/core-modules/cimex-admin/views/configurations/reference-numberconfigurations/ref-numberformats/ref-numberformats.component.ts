import { Component } from '@angular/core';

@Component({
  selector: 'app-ref-numberformats',
  templateUrl: './ref-numberformats.component.html',
  styleUrl: './ref-numberformats.component.css'
})
export class RefNumberformatsComponent {
   table_name: string;
   parameter_name: string;
   constructor(
     // private http: HttpClient,
   ) 
   {
     this.table_name = 'par_refnumbers_formats';
     this.parameter_name = "reference_formats";
   }
}
