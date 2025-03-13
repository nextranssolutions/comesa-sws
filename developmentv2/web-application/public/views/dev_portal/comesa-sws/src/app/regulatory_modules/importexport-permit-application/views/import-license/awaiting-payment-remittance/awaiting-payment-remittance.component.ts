import { Component } from '@angular/core';
import { SharedImpExpdashboardClass } from '../../shared-impexpdashboard/shared-impexpdashboardclass';

@Component({
  selector: 'app-awaiting-payment-remittance',
  
  templateUrl: './awaiting-payment-remittance.component.html',
  styleUrl: './awaiting-payment-remittance.component.css'
})
export class AwaitingPaymentRemittanceComponent extends SharedImpExpdashboardClass {
  ngOnInit(): void {
    this.nav_data = localStorage.getItem('nav_data');
    this.nav_data = JSON.parse(this.nav_data);
    let regulatory_subfunction_id = this.nav_data.regulatory_subfunction_id;
    let appworkflowstage_category_id = this.nav_data.appworkflowstage_category_id;
    this.reloadPermitApplicationsApplications(regulatory_subfunction_id, appworkflowstage_category_id);
    
  }
}
