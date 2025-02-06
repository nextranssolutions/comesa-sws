import { Component } from '@angular/core';

@Component({
  selector: 'app-ref-submodules',
  templateUrl: './ref-submodules.component.html',
  styleUrl: './ref-submodules.component.css'
})
export class RefSubmodulesComponent {
   table_name: string;
   parameter_name: string;
   constructor(
     // private http: HttpClient,
   ) 
   {
     this.table_name = 'txn_submodule_referenceformats';
     this.parameter_name = "submodule_reference";
  }
}
