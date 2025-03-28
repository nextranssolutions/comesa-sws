import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ManagementReportsdashboardComponent } from './views/management-reportsdashboard/management-reportsdashboard.component';
import { ReportsAnalyticsLayoutComponent } from './views/layout/reports-analytics-layout/reports-analytics-layout.component';
import { ApplicationReportsSpreadsheetsComponent } from './views/application-reports-spreadsheets/application-reports-spreadsheets.component';
import { PermitApplicationsComponent } from './views/spreadsheets-and-frontoffice/permit-applications/permit-applications.component';
import { PermitProductDetailsComponent } from './views/spreadsheets-and-frontoffice/permit-product-details/permit-product-details.component';
import { InitiateImportappreportComponent } from './views/spreadsheets-and-frontoffice/initiate-importappreport/initiate-importappreport.component';
import { ApplicantPermitSpreadsheetComponent } from './views/spreadsheets-and-frontoffice/applicant-permit-spreadsheet/applicant-permit-spreadsheet.component';
import { ProductHscodeAnalysisComponent } from './views/spreadsheets-and-frontoffice/product-hscode-analysis/product-hscode-analysis.component';
import { PermitsPerOrigincountryComponent } from './views/spreadsheets-and-frontoffice/permits-per-origincountry/permits-per-origincountry.component';
import { PermitsPerOrganisationComponent } from './views/spreadsheets-and-frontoffice/permits-per-organisation/permits-per-organisation.component';

const routes: Routes = [{
  path: '',
        component: ReportsAnalyticsLayoutComponent,
        canActivate: [AuthGuard],
     
      children: [{
              path: 'app-management-reportsdashboard',
              component: ManagementReportsdashboardComponent
            },{
              path: 'app-application-reports-spreadsheets',
              component: ApplicationReportsSpreadsheetsComponent
            },
            {
              path: 'app-permit-applications',
              component: PermitApplicationsComponent
            },
            {
              path: 'app-permit-product-details',
              component: PermitProductDetailsComponent
            },
            {
              path: 'initiate-importapp',
              component: InitiateImportappreportComponent
            },
            {
              path: 'app-applicant-permit-spreadsheet',
              component: ApplicantPermitSpreadsheetComponent
            },
            {
              path: 'app-product-hscode-analysis',
              component: ProductHscodeAnalysisComponent
            },
            {
              path: 'app-permits-per-origincountry',
              component: PermitsPerOrigincountryComponent
            },
            {
              path: 'app-permits-per-organisation',
              component: PermitsPerOrganisationComponent
            },
          
          ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsAnalyticsRoutingModule { }
