import { Component } from '@angular/core';

@Component({
  selector: 'app-document-requirement-defination',

  templateUrl: './document-requirement-defination.component.html',
  styleUrl: './document-requirement-defination.component.css'
})
export class DocumentRequirementDefinationComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'tra_documentrequirements_defination';
    this.parameter_name = "Document Requirement Defination";
  }
}
