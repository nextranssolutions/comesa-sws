import { Component } from '@angular/core';

@Component({
  selector: 'app-prodclassification-rules',
  templateUrl: './prodclassification-rules.component.html',
  styleUrl: './prodclassification-rules.component.css'
})
export class ProdclassificationRulesComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'par_product_classificationrules';
    this.parameter_name = "product_classification_rules";
  }
}
