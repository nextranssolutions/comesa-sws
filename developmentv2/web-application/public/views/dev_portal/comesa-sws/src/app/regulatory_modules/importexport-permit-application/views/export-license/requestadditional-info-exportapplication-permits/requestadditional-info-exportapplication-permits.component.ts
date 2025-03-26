import { Component } from '@angular/core';
import { SharedImpExpdashboardClass } from '../../shared-impexpdashboard/shared-impexpdashboardclass';


@Component({
  selector: 'app-requestadditional-info-exportapplication-permits',
 
  templateUrl: './requestadditional-info-exportapplication-permits.component.html',
  styleUrl: './requestadditional-info-exportapplication-permits.component.css'
})
export class RequestadditionalInfoExportapplicationPermitsComponent extends SharedImpExpdashboardClass {
  ngOnInit(): void {
    this.onLoadconfirmDataParam();
    this.nav_data = localStorage.getItem('nav_data');
    this.nav_data = JSON.parse(this.nav_data);
    let regulatory_subfunction_id = this.nav_data.regulatory_subfunction_id;
    let appworkflowstage_category_id = 4;
    let applicant_id = this.nav_data.applicant_id;

    this.reloadPermitApplicationsApplications(regulatory_subfunction_id, appworkflowstage_category_id);
  }
}
