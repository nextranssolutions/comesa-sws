import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ImportexportLayoutComponent } from './views/layout/importexport-layout/importexport-layout.component';
import { DraftImportlicensedashComponent } from './views/import-license/draft-importlicensedash/draft-importlicensedash.component';
import { InitiateImportappComponent } from './views/import-license/initiate-importapp/initiate-importapp.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { UnderProcessingComponent } from './views/import-license/under-processing/under-processing.component';
import { RequestForadditionalInformationComponent } from './views/import-license/request-foradditional-information/request-foradditional-information.component';
import { ApprovedPermitsComponent } from './views/import-license/approved-permits/approved-permits.component';
import { AwaitingPaymentRemittanceComponent } from './views/import-license/awaiting-payment-remittance/awaiting-payment-remittance.component';
import { RejectedPermitsComponent } from './views/import-license/rejected-permits/rejected-permits.component';
import { SingleProductPermitComponent } from './views/import-license/single-product-permit/single-product-permit.component';
import { DraftExportlicencedashboardComponent } from './views/export-license/draft-exportlicencedashboard/draft-exportlicencedashboard.component';
import { InitiateExportappComponent } from './views/export-license/initiate-exportapp/initiate-exportapp.component';
import { SingleProductExportpermitComponent } from './views/export-license/single-product-exportpermit/single-product-exportpermit.component';
import { DraftPersonalproductsLicencedashboardComponent } from './views/personal-useproducts-license/draft-personalproducts-licencedashboard/draft-personalproducts-licencedashboard.component';
import { LetterofapprovalPersonalproductsComponent } from './views/personal-useproducts-license/letterofapproval-personalproducts/letterofapproval-personalproducts.component';
import { RejectedpermitsPersonalproductsComponent } from './views/personal-useproducts-license/rejectedpermits-personalproducts/rejectedpermits-personalproducts.component';
import { InitiatePersonalproductsPermitComponent } from './views/personal-useproducts-license/initiate-personalproducts-permit/initiate-personalproducts-permit.component';
import { SinglePersonaluseproductsPermitApplicationComponent } from './views/personal-useproducts-license/single-personaluseproducts-permit-application/single-personaluseproducts-permit-application.component';

const routes: Routes = [{
  path: '',
  component: ImportexportLayoutComponent,
  canActivate: [AuthGuard],
  children: [{
    path: '',
    component: DashboardComponent
  },{
    path: 'draft-importlicense-dashboard',
    component: DraftImportlicensedashComponent
  },{
    path: 'draft-personalproductslicense-dashboard',
    component: DraftPersonalproductsLicencedashboardComponent
  },{
    path: 'single-personalproductslicense-application',
    component: SinglePersonaluseproductsPermitApplicationComponent
  }
  
  ,{
    path: 'letterofapproval-personalproductslicense',
    component: LetterofapprovalPersonalproductsComponent
  },{
    path: 'rejectedpermits-personalproductslicense',
    component: RejectedpermitsPersonalproductsComponent
  },{
    path: 'draft-exportlicense-dashboard',
    component: DraftExportlicencedashboardComponent
  },{
    path: 'initiate-permitsfor-personaluseproducts',
    component: InitiatePersonalproductsPermitComponent
  },{
    path: 'initiate-exportapp',
    component: InitiateExportappComponent
  },{
    path: 'initiate-importapp',
    component: InitiateImportappComponent
  },{
    path: 'underprocessing-importapp',
    component: UnderProcessingComponent
  },{
    path: 'request-additional-info',
    component: RequestForadditionalInformationComponent
  },{
    path: 'rejected-importapp',
    component: RejectedPermitsComponent
  },{
    path: 'awaitingpayment-remittance',
    component: AwaitingPaymentRemittanceComponent
  },{
    path: 'approved-permits',
    component: ApprovedPermitsComponent
  },{
    path: 'single-productapplication-permits',
    component: SingleProductPermitComponent
  },{
    path: 'single-export-productapplication-permits',
    component: SingleProductExportpermitComponent
  }
  
]
}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImportexportapplicationRoutingModule { }
