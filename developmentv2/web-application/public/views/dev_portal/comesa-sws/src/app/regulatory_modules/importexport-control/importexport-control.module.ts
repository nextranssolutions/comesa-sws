import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImportexportRoutingModule } from './importexport-routing.module';
import { ImportexportNavigationComponent } from './views/layout/importexport-navigation/importexport-navigation.component';
import { ImportexportLayoutComponent } from './views/layout/importexport-layout/importexport-layout.component';
import { ImportexportHeaderComponent } from './views/layout/importexport-header/importexport-header.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { DxButtonModule, DxProgressBarModule, DxLoadPanelModule, DxPopupModule, DxDataGridModule, DxActionSheetModule, DxFileUploaderModule, DxNumberBoxModule, DxCheckBoxModule, DxSelectBoxModule, DxTextAreaModule, DxContextMenuModule, DxMenuModule, DxTagBoxModule, DxDateBoxModule, DxTabPanelModule, DxFormModule, DxScrollViewModule, DxTextBoxModule, DxValidatorModule, DxToolbarModule, DxGalleryModule, DxHtmlEditorModule, DxDropDownBoxModule, DxRadioGroupModule } from 'devextreme-angular';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { NgxCaptchaModule } from 'ngx-captcha';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input-gg';
import { httpTranslateLoader } from 'src/app/core-modules/public/public.module';
import { DraftImportlicensedashComponent } from './views/import-license/draft-importlicensedash/draft-importlicensedash.component';
import { PermitproductdetailsComponent } from './views/impexpdata_entry/permitproductdetails/permitproductdetails.component';
import { InitiateImportappComponent } from './views/import-license/initiate-importapp/initiate-importapp.component';
import { PermitgeneraldetailsComponent } from './views/impexpdata_entry/permitgeneraldetails/permitgeneraldetails.component';
// import { SharedImpexpApplicationClass } from './views/shared-impexpapplicationclass/shared-impexpapplicationclass';
import { NgWizardConfig, NgWizardModule, THEME } from 'ng-wizard'
import { SafePipeModule } from '../../safe-pipe/safe-pipe.module';
import { SharedModuleModule } from '../../shared-views/shared-module.module';
import { ImportexportDashboardComponent } from './views/importexport-dashboard/importexport-dashboard.component';
import { ApplicantdetailsComponent } from './views/impexpdata_entry/applicantdetails/applicantdetails.component';
import { SharedapplicationdocumentuploadsComponent } from 'src/app/shared-views/sharedutilities/sharedapplicationdocumentuploads/sharedapplicationdocumentuploads.component';
import { UnderprocessingImportlicencedashComponent } from './views/import-license/underprocessing-importlicencedash/underprocessing-importlicencedash.component';
import { ApprovedPermitsComponent } from './views/import-license/approved-permits/approved-permits.component';
import { AwaitingPaymentRemittanceComponent } from './views/import-license/awaiting-payment-remittance/awaiting-payment-remittance.component';
import { RejectedPermitsComponent } from './views/import-license/rejected-permits/rejected-permits.component';
import { RequestAdditionalInfoComponent } from './views/import-license/request-additional-info/request-additional-info.component';
import { DraftExportlicensedashComponent } from './views/export-license/draft-exportlicensedash/draft-exportlicensedash.component';
import { InitiateExportappComponent } from './views/export-license/initiate-exportapp/initiate-exportapp.component';
import { PersonaluseproductsDashComponent } from './views/permit-personaluse-products/personaluseproducts-dash/personaluseproducts-dash.component';
import { InitiatePermitsforPersonaluseproductsComponent } from './views/permit-personaluse-products/initiate-permitsfor-personaluseproducts/initiate-permitsfor-personaluseproducts.component';
import { PreviewImportappComponent } from './views/import-license/preview-importapp/preview-importapp.component';
import { AwaitingreviewApprovalComponent } from './views/import-license/awaitingreview-approval/awaitingreview-approval.component';
import { AwaitingReviewApprovalComponent } from './views/export-license/awaiting-review-approval/awaiting-review-approval.component';
import { UnderScreeningComponent } from './views/export-license/under-screening/under-screening.component';
import { RequestforadditionalInfoComponent } from './views/export-license/requestforadditional-info/requestforadditional-info.component';
import { PUnderScreeningComponent } from './views/permit-personaluse-products/p-under-screening/p-under-screening.component';
import { PIssuedComponent } from './views/permit-personaluse-products/p-issued/p-issued.component';
import { PAwaitingReviewApprovalComponent } from './views/permit-personaluse-products/p-awaiting-review-approval/p-awaiting-review-approval.component';
import { AwaitingpermitReleaseExportComponent } from './views/export-license/awaitingpermit-release-export/awaitingpermit-release-export.component';
import { ReleasepermitExportComponent } from './views/export-license/releasepermit-export/releasepermit-export.component';
import { ReleasePermitImportComponent } from './views/import-license/release-permit-import/release-permit-import.component';
import { AwaitingpermitReleaseImportComponent } from './views/import-license/awaitingpermit-release-import/awaitingpermit-release-import.component';
import { BillingPaymentRemittanceImportComponent } from './views/import-license/billing-payment-remittance-import/billing-payment-remittance-import.component';

const ngWizardConfig: NgWizardConfig = {
  theme: THEME.default
};


@NgModule({
  declarations: [ImportexportNavigationComponent,ImportexportDashboardComponent,
    ImportexportLayoutComponent, DraftImportlicensedashComponent,ApprovedPermitsComponent,AwaitingPaymentRemittanceComponent,
    RejectedPermitsComponent,RequestAdditionalInfoComponent,PersonaluseproductsDashComponent,InitiatePermitsforPersonaluseproductsComponent,
    PermitproductdetailsComponent, PermitgeneraldetailsComponent,ApplicantdetailsComponent,
    ImportexportHeaderComponent,InitiateImportappComponent,DraftExportlicensedashComponent,
    UnderprocessingImportlicencedashComponent,InitiateExportappComponent,PreviewImportappComponent,
    AwaitingreviewApprovalComponent,AwaitingReviewApprovalComponent,UnderScreeningComponent,
    RequestforadditionalInfoComponent,PUnderScreeningComponent,PIssuedComponent,PAwaitingReviewApprovalComponent,
    AwaitingpermitReleaseExportComponent,AwaitingpermitReleaseExportComponent,ReleasepermitExportComponent,
    BillingPaymentRemittanceImportComponent,AwaitingpermitReleaseImportComponent,ReleasePermitImportComponent
  ],
  imports: [
    CommonModule, ImportexportRoutingModule,
    SharedModuleModule,
    NgWizardModule.forRoot(ngWizardConfig),
    NgHttpLoaderModule, DxButtonModule, DxProgressBarModule,
    FormsModule,
    ReactiveFormsModule,
    NgxCaptchaModule, DxLoadPanelModule,
    DxPopupModule, DxDataGridModule, DxActionSheetModule, DxFileUploaderModule, DxNumberBoxModule, DxCheckBoxModule, DxSelectBoxModule, DxTextAreaModule, DxContextMenuModule, DxMenuModule, DxTagBoxModule,
    DxDateBoxModule, DxTabPanelModule, DxFormModule, DxScrollViewModule,
    DxTextBoxModule,
    DxDateBoxModule, DxDataGridModule,
    HttpClientModule, DxValidatorModule,
    NgxIntlTelInputModule, DxToolbarModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
    DxDataGridModule,
    DxPopupModule, DxGalleryModule,
    DxFileUploaderModule,
    DxActionSheetModule,
    DxFileUploaderModule, DxNumberBoxModule, DxCheckBoxModule, DxSelectBoxModule, DxTextAreaModule, DxContextMenuModule, DxMenuModule, DxScrollViewModule, DxTabPanelModule,
    DxHtmlEditorModule,
    DxDropDownBoxModule, DxTagBoxModule,
    DxRadioGroupModule,
    SafePipeModule
  ]
})
export class ImportexportControlModule { }
