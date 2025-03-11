import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ManagementReportsdashboardComponent } from './views/management-reportsdashboard/management-reportsdashboard.component';
import { ReportsAnalyticsLayoutComponent } from './views/layout/reports-analytics-layout/reports-analytics-layout.component';
import { ApplicationReportsSpreadsheetsComponent } from './views/application-reports-spreadsheets/application-reports-spreadsheets.component';
import { PermitApplicationsComponent } from './views/spreadsheets-and-frontoffice/permit-applications/permit-applications.component';
import { PermitProductDetailsComponent } from './views/spreadsheets-and-frontoffice/permit-product-details/permit-product-details.component';

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
            }
          ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsAnalyticsRoutingModule { }
