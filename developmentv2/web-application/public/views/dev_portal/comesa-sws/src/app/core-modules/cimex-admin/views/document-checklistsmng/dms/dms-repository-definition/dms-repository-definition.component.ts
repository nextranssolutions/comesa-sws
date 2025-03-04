import { Component } from '@angular/core';

@Component({
  selector: 'app-dms-repository-definition',
  templateUrl: './dms-repository-definition.component.html',
  styleUrl: './dms-repository-definition.component.css'
})
export class DmsRepositoryDefinitionComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'dms_sites_repository_defination';
    this.parameter_name = "dms_sites_repository_defination";
  }
}
