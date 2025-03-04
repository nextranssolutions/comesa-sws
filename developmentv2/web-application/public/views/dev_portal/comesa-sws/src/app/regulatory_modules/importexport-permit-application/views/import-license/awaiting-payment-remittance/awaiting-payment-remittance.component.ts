import { Component } from '@angular/core';
import { SharedImpExpdashboardClass } from '../../shared-impexpdashboard/shared-impexpdashboardclass';

@Component({
  selector: 'app-awaiting-payment-remittance',
  
  templateUrl: './awaiting-payment-remittance.component.html',
  styleUrl: './awaiting-payment-remittance.component.css'
})
export class AwaitingPaymentRemittanceComponent extends SharedImpExpdashboardClass {
  ngOnInit(): void {
    this.onLoadProductTypes();
    this.onLoadconfirmDataParam();
    this.onLoadproducttypeDefinationData();
    this.onLoadimportExportPermitTypesData();
    this.reloadPermitApplicationsApplications();
    // this.onLoadImportApplciations();
  }
}
