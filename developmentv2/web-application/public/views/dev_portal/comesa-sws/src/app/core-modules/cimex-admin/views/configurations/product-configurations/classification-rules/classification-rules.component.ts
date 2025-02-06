import { Component } from '@angular/core';

@Component({
  selector: 'app-classification-rules',
  templateUrl: './classification-rules.component.html',
  styleUrl: './classification-rules.component.css'
})
export class ClassificationRulesComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'par_classification_rules';
    this.parameter_name = "classification_rules";
  }
}
