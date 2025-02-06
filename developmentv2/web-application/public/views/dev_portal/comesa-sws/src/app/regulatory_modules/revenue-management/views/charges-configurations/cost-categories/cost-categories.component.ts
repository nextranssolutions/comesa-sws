import { Component } from '@angular/core';

@Component({
  selector: 'app-cost-categories',
  templateUrl: './cost-categories.component.html',
  styleUrl: './cost-categories.component.css'
})
export class CostCategoriesComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'par_cost_categories';
    this.parameter_name = "cost_categories";
  }
  ngOnInit() {
    // other initializations

  }
}
