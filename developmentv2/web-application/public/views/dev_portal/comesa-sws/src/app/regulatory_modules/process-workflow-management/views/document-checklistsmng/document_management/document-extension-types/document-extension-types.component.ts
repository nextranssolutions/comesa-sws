import { Component } from '@angular/core';

@Component({
  selector: 'app-document-extension-types',
  templateUrl: './document-extension-types.component.html',
  styleUrl: './document-extension-types.component.css'
})
export class DocumentExtensionTypesComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'par_document_extension_types';
    this.parameter_name = "Document extension types";
  }
}
