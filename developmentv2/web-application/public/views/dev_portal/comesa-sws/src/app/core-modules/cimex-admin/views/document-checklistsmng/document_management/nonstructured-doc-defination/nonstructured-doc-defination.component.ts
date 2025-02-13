import { Component } from '@angular/core';

@Component({
  selector: 'app-nonstructured-doc-defination',
  templateUrl: './nonstructured-doc-defination.component.html',
  styleUrl: './nonstructured-doc-defination.component.css'
})
export class NonstructuredDocDefinationComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'tra_nonstructured_docdefination';
    this.parameter_name = "nonstructured_document_defination";
  }
}
