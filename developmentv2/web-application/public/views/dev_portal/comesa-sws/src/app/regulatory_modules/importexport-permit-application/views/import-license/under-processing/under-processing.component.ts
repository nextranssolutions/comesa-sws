import { Component } from '@angular/core';
import { SharedImpExpdashboardClass } from '../../shared-impexpdashboard/shared-impexpdashboardclass';

@Component({
  selector: 'app-under-processing',
 
  templateUrl: './under-processing.component.html',
  styleUrl: './under-processing.component.css'
})
export class UnderProcessingComponent extends SharedImpExpdashboardClass {
  ngOnInit(): void {
    this.onLoadconfirmDataParam();
    this.reloadPermitApplicationsApplications();
    
  }
}
