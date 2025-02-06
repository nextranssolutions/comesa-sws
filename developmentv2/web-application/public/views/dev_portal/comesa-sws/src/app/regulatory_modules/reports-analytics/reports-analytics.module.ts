import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsAnalyticsRoutingModule } from './reports-analytics-routing.module';
import { ManagementReportsdashboardComponent } from './views/management-reportsdashboard/management-reportsdashboard.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { DxButtonModule, DxProgressBarModule, DxLoadPanelModule, DxPopupModule, DxDataGridModule, DxActionSheetModule, DxFileUploaderModule, DxNumberBoxModule, DxCheckBoxModule, DxSelectBoxModule, DxTextAreaModule, DxContextMenuModule, DxMenuModule, DxTagBoxModule, DxDateBoxModule, DxTabPanelModule, DxFormModule, DxScrollViewModule, DxTextBoxModule, DxValidatorModule, DxToolbarModule, DxGalleryModule, DxHtmlEditorModule, DxDropDownBoxModule, DxRadioGroupModule } from 'devextreme-angular';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { NgxCaptchaModule } from 'ngx-captcha';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input-gg';
import { ReportsAnalyticsHeaderComponent } from './views/layout/reports-analytics-header/reports-analytics-header.component';
import { ReportsAnalyticsLayoutComponent } from './views/layout/reports-analytics-layout/reports-analytics-layout.component';
import { ReportsAnalyticsNavigationComponent } from './views/layout/reports-analytics-navigation/reports-analytics-navigation.component';
import { SharedModuleModule } from 'src/app/shared-views/shared-module.module';
import { ApplicationReportsSpreadsheetsComponent } from './views/application-reports-spreadsheets/application-reports-spreadsheets.component';


@NgModule({
  declarations: [
    ManagementReportsdashboardComponent,
    ReportsAnalyticsHeaderComponent,
    ReportsAnalyticsLayoutComponent,
    ReportsAnalyticsNavigationComponent,
    ApplicationReportsSpreadsheetsComponent
  ],
  imports: [
    CommonModule,
    ReportsAnalyticsRoutingModule,NgHttpLoaderModule,DxButtonModule, DxProgressBarModule,
            FormsModule, SharedModuleModule,       
  ],
  exports: [
    ReportsAnalyticsRoutingModule,
         FormsModule,
        ReactiveFormsModule,
      ]
})
export class ReportsAnalyticsModule { }