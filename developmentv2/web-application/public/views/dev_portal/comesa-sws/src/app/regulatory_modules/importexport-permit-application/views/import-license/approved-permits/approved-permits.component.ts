import { Component } from '@angular/core';
import { SharedImpExpdashboardClass } from '../../shared-impexpdashboard/shared-impexpdashboardclass';

@Component({
  selector: 'app-approved-permits',
  
  templateUrl: './approved-permits.component.html',
  styleUrl: './approved-permits.component.css'
})
export class ApprovedPermitsComponent extends SharedImpExpdashboardClass {
  ngOnInit(): void {
    this.onLoadProductTypes();
    this.onLoadconfirmDataParam();
    this.onLoadproducttypeDefinationData();
    this.onLoadimportExportPermitTypesData();
    this.reloadPermitApplicationsApplications();
    // this.onLoadImportApplciations();
  }
}
