import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsAnalyticsRoutingModule } from './reports-analytics-routing.module';
import { ManagementReportsdashboardComponent } from './views/management-reportsdashboard/management-reportsdashboard.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { DxButtonModule, DxProgressBarModule, DxLoadPanelModule, DxPopupModule, DxDataGridModule, DxActionSheetModule, DxFileUploaderModule, DxNumberBoxModule, DxCheckBoxModule, DxSelectBoxModule, DxTextAreaModule, DxContextMenuModule, DxMenuModule, DxTagBoxModule, DxDateBoxModule, DxTabPanelModule, DxFormModule, DxScrollViewModule, DxTextBoxModule, DxValidatorModule, DxToolbarModule, DxGalleryModule, DxHtmlEditorModule, DxDropDownBoxModule, DxRadioGroupModule, DxTreeListModule } from 'devextreme-angular';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { NgxCaptchaModule } from 'ngx-captcha';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input-gg';
import { ReportsAnalyticsHeaderComponent } from './views/layout/reports-analytics-header/reports-analytics-header.component';
import { ReportsAnalyticsLayoutComponent } from './views/layout/reports-analytics-layout/reports-analytics-layout.component';
import { ReportsAnalyticsNavigationComponent } from './views/layout/reports-analytics-navigation/reports-analytics-navigation.component';
import { SharedModuleModule } from 'src/app/shared-views/shared-module.module';
import { ApplicationReportsSpreadsheetsComponent } from './views/application-reports-spreadsheets/application-reports-spreadsheets.component';
import { PermitApplicationsComponent } from './views/spreadsheets-and-frontoffice/permit-applications/permit-applications.component';
import { PermitProductDetailsComponent } from './views/spreadsheets-and-frontoffice/permit-product-details/permit-product-details.component';
import { PermitsPerOrigincountryComponent } from './views/spreadsheets-and-frontoffice/permits-per-origincountry/permits-per-origincountry.component';
import { ProductHscodeAnalysisComponent } from './views/spreadsheets-and-frontoffice/product-hscode-analysis/product-hscode-analysis.component';
import { NgWizardConfig, NgWizardModule, THEME } from 'ng-wizard';
import { CimexAdminModule } from 'src/app/core-modules/cimex-admin/cimex-admin.module';
import { SafePipeModule } from 'src/app/safe-pipe/safe-pipe.module';
import { httpTranslateLoader } from '../revenue-management/revenue-management.module';

const ngWizardConfig: NgWizardConfig = {
  theme: THEME.default
};

@NgModule({
  declarations: [
    ManagementReportsdashboardComponent,
    ReportsAnalyticsHeaderComponent,
    ReportsAnalyticsLayoutComponent,
    ReportsAnalyticsNavigationComponent,
    ApplicationReportsSpreadsheetsComponent,
    PermitApplicationsComponent,
    PermitProductDetailsComponent,
    PermitsPerOrigincountryComponent,
    ProductHscodeAnalysisComponent,
  ],
  imports: [
    CommonModule,
    ReportsAnalyticsRoutingModule,NgHttpLoaderModule,DxButtonModule, DxProgressBarModule,
            FormsModule, SharedModuleModule, 
        SharedModuleModule,
        NgWizardModule.forRoot(ngWizardConfig),
        NgHttpLoaderModule, DxButtonModule, DxProgressBarModule,
        FormsModule,DxTreeListModule,
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
        SafePipeModule,
        CimexAdminModule      
  ],
  exports: [
    ReportsAnalyticsRoutingModule,
         FormsModule,
        ReactiveFormsModule,
      ]
})
export class ReportsAnalyticsModule { }