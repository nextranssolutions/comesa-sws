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
import { DraftExportlicensedashComponent } from './views/export-license/draft-exportlicensedash/draft-exportlicensedash.component';
import { InitiateExportappComponent } from './views/export-license/initiate-exportapp/initiate-exportapp.component';
import { PersonaluseproductsDashComponent } from './views/permit-personaluse-products/personaluseproducts-dash/personaluseproducts-dash.component';
import { InitiatePermitsforPersonaluseproductsComponent } from './views/permit-personaluse-products/initiate-permitsfor-personaluseproducts/initiate-permitsfor-personaluseproducts.component';

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
  }, {
    path: 'request-additional-info',
    component: RequestAdditionalInfoComponent
  }, {
    path: 'rejected-importapp',
    component: RejectedPermitsComponent
  }, {
    path: 'awaitingpayment-remittance',
    component: AwaitingPaymentRemittanceComponent
  }, {
    path: 'approved-permits',
    component: ApprovedPermitsComponent
  }, {
    path: 'draft-exportlicensedash',
    component: DraftExportlicensedashComponent
  }, {
    path: 'initiate-exportapp',
    component: InitiateExportappComponent
  },  {
    path: 'personaluseproducts-dash',
    component: PersonaluseproductsDashComponent
  }, {
    path: 'initiate-permitsfor-personaluseproducts',
    component: InitiatePermitsforPersonaluseproductsComponent
  }, 
  ]  
}] 

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImportexportRoutingModule { }
