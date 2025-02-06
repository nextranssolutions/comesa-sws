import { Component } from '@angular/core';

@Component({
  selector: 'app-cost-subcategories',
  templateUrl: './cost-subcategories.component.html',
  styleUrl: './cost-subcategories.component.css'
})
export class CostSubcategoriesComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'par_cost_sub_categories';
    this.parameter_name = "cost_sub_categories";
  }
  ngOnInit() {
    // other initializations

  }
}
