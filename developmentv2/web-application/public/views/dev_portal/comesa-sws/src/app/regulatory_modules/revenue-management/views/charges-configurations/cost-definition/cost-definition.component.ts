import { Component } from '@angular/core';

@Component({
  selector: 'app-cost-definition',
  templateUrl: './cost-definition.component.html',
  styleUrl: './cost-definition.component.css'
})
export class CostDefinitionComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'par_cost_elements';
    this.parameter_name = "cost_definition";
  }
  ngOnInit() {
    // other initializations

  }
}
