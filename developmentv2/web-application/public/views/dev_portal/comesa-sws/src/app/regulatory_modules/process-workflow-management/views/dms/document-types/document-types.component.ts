import { Component } from '@angular/core';

@Component({
  selector: 'app-document-types',

  templateUrl: './document-types.component.html',
  styleUrl: './document-types.component.css'
})
export class DocumentTypesComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'par_document_types';
    this.parameter_name = "Document Types";
  }
}
