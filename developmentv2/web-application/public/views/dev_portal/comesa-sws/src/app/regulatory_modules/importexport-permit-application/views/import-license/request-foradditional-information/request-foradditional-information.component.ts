import { Component } from '@angular/core';
import { SharedImpExpdashboardClass } from '../../shared-impexpdashboard/shared-impexpdashboardclass';

@Component({
  selector: 'app-request-foradditional-information',
  
  templateUrl: './request-foradditional-information.component.html',
  styleUrl: './request-foradditional-information.component.css'
})
export class RequestForadditionalInformationComponent extends SharedImpExpdashboardClass {
  ngOnInit(): void {
    this.onLoadProductTypes();
    this.onLoadconfirmDataParam();
    this.onLoadproducttypeDefinationData();
    this.onLoadimportExportPermitTypesData();
    this.reloadPermitApplicationsApplications();
    // this.onLoadImportApplciations();
  }
}
