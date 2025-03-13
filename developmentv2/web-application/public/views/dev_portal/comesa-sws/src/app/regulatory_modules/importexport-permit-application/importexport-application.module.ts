import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { ImportexportapplicationRoutingModule } from './importexport-applicationrouting.module';
import { ApplicantDetailsComponent } from './views/impexpdata_entry/applicant-details/applicant-details.component';
import { ApprovedPermitsComponent } from './views/import-license/approved-permits/approved-permits.component';
import { AwaitingPaymentRemittanceComponent } from './views/import-license/awaiting-payment-remittance/awaiting-payment-remittance.component';
import { RequestForadditionalInformationComponent } from './views/import-license/request-foradditional-information/request-foradditional-information.component';
import { UnderProcessingComponent } from './views/import-license/under-processing/under-processing.component';
import { RejectedPermitsComponent } from './views/import-license/rejected-permits/rejected-permits.component';
import { SingleProductPermitComponent } from './views/import-license/single-product-permit/single-product-permit.component';
import { SinglePermitproductdetailsComponent } from './views/impexpdata_entry/single-permitproductdetails/single-permitproductdetails.component';
import { InitiateExportappComponent } from './views/export-license/initiate-exportapp/initiate-exportapp.component';
import { DraftExportlicencedashboardComponent } from './views/export-license/draft-exportlicencedashboard/draft-exportlicencedashboard.component';
import { SingleProductExportpermitComponent } from './views/export-license/single-product-exportpermit/single-product-exportpermit.component';


const ngWizardConfig: NgWizardConfig = {
  theme: THEME.default
};


@NgModule({
  declarations: [ImportexportNavigationComponent,
    ImportexportLayoutComponent, DraftImportlicensedashComponent,
    PermitproductdetailsComponent, PermitgeneraldetailsComponent,ApprovedPermitsComponent,SingleProductPermitComponent,
    AwaitingPaymentRemittanceComponent,RejectedPermitsComponent,RequestForadditionalInformationComponent,SinglePermitproductdetailsComponent,
    UnderProcessingComponent,InitiateExportappComponent,DraftExportlicencedashboardComponent,
    ApplicantDetailsComponent,SingleProductExportpermitComponent,
    ImportexportHeaderComponent,InitiateImportappComponent, DashboardComponent],
  imports: [
    CommonModule, ImportexportapplicationRoutingModule,
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
export class ImportexportApplicationModule { }