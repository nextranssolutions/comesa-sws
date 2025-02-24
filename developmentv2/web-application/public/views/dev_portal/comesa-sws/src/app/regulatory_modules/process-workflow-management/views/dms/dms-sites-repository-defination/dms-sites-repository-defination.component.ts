import { Component } from '@angular/core';

@Component({
  selector: 'app-dms-sites-repository-defination',

  templateUrl: './dms-sites-repository-defination.component.html',
  styleUrl: './dms-sites-repository-defination.component.css'
})
export class DmsSitesRepositoryDefinationComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'dms_sites_repository_defination';
    this.parameter_name = "dms_sites_repository_defination";
  }
}
