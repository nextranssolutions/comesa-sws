import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ImportexportLayoutComponent } from './views/layout/importexport-layout/importexport-layout.component';
import { DraftImportlicensedashComponent } from './views/import-license/draft-importlicensedash/draft-importlicensedash.component';
import { InitiateImportappComponent } from './views/import-license/initiate-importapp/initiate-importapp.component';
import { ImportexportDashboardComponent } from './views/importexport-dashboard/importexport-dashboard.component';
import { UnderprocessingImportlicencedashComponent } from './views/import-license/underprocessing-importlicencedash/underprocessing-importlicencedash.component';
import { ApprovedPermitsComponent } from './views/import-license/approved-permits/approved-permits.component';
import { AwaitingPaymentRemittanceComponent } from './views/import-license/awaiting-payment-remittance/awaiting-payment-remittance.component';
import { RejectedPermitsComponent } from './views/import-license/rejected-permits/rejected-permits.component';
import { RequestAdditionalInfoComponent } from './views/import-license/request-additional-info/request-additional-info.component';

const routes: Routes = [{
  path: '',
  component: ImportexportLayoutComponent,
  canActivate: [AuthGuard],
  children: [{
    path: '',
    component: ImportexportDashboardComponent
  }, {
    path: 'draft-importlicense-dashboard',
    component: DraftImportlicensedashComponent
  }, {
    path: 'initiate-importapp',
    component: InitiateImportappComponent
  }, {
    path: 'underprocessing-importapp',
    component: UnderprocessingImportlicencedashComponent
  },{
      path: 'request-additional-info',
      component: RequestAdditionalInfoComponent
    },{
      path: 'rejected-importapp',
      component: RejectedPermitsComponent
    },{
      path: 'awaitingpayment-remittance',
      component: AwaitingPaymentRemittanceComponent
    },{
      path: 'approved-permits',
      component: ApprovedPermitsComponent
    }
]
}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImportexportRoutingModule { }
