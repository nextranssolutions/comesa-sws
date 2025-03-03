import { Component } from '@angular/core';

@Component({
  selector: 'app-workflow-stages',
  templateUrl: './workflow-stages.component.html',
  styleUrl: './workflow-stages.component.css'
})
export class WorkflowStagesComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'wf_workflow_stages';
    this.parameter_name = "workflow_stages";
  }
}
