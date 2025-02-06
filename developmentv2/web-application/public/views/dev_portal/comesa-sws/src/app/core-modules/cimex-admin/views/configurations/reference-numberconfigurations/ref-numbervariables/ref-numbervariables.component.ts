import { Component } from '@angular/core';

@Component({
  selector: 'app-ref-numbervariables',
  templateUrl: './ref-numbervariables.component.html',
  styleUrl: './ref-numbervariables.component.css'
})
export class RefNumbervariablesComponent {
   table_name: string;
   parameter_name: string;
   constructor(
    // private http: HttpClient,
    ) 
    {
       this.table_name = 'par_refnumbers_variables';
       this.parameter_name = "reference_variables";
   }
}
