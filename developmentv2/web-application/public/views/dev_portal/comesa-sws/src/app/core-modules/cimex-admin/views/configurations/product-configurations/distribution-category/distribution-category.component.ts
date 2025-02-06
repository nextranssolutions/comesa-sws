import { Component } from '@angular/core';

@Component({
  selector: 'app-distribution-category',
  templateUrl: './distribution-category.component.html',
  styleUrl: './distribution-category.component.css'
})
export class DistributionCategoryComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'par_distribution_categories';
    this.parameter_name = "distribution_categories";
  }
}
