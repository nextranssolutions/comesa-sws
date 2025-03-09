import { Component } from '@angular/core';
import { SharedImpExpdashboardClass } from '../../shared-impexpdashboard/shared-impexpdashboardclass';


@Component({
  selector: 'app-rejected-permits',
 
  templateUrl: './rejected-permits.component.html',
  styleUrl: './rejected-permits.component.css'
})
export class RejectedPermitsComponent extends SharedImpExpdashboardClass {
  ngOnInit(): void {
    this.reloadPermitApplicationsApplications();
  }
}
