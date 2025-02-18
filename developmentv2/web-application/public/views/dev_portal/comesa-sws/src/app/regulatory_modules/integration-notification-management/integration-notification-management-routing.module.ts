import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { IntegrationNtfMgtLayoutComponent } from './views/layout/integration-ntf-mgt-layout/integration-ntf-mgt-layout.component';
import { IntegrationNtfManagementDashboardComponent } from './views/integration-ntf-management-dashboard/integration-ntf-management-dashboard.component';

const routes: Routes = [{
  path: '',
  component: IntegrationNtfMgtLayoutComponent,
  canActivate: [AuthGuard],
  children: [{
    path: 'app-integration-ntf-management-dashboard',
    component: IntegrationNtfManagementDashboardComponent

  }]
}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IntegrationNotificationManagementRoutingModule { }
