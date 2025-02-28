import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { UnifiedappDashboardComponent } from 'src/app/core-modules/unifiedapp-module/views/unifiedapp-dashboard/unifiedapp-dashboard.component';
import { UnifiedappLayoutComponent } from 'src/app/core-modules/unifiedapp-module/views/unifiedapp-layout/unifiedapp-layout.component';
import { UnifieddashReportsanalyticsComponent } from './views/unifieddash-reportsanalytics/unifieddash-reportsanalytics.component';

const routes: Routes = [{
  path: '',
  component: UnifiedappLayoutComponent,
  canActivate: [AuthGuard],
  children: [{
    path: '',
    component: UnifiedappDashboardComponent
  },{
    path: 'unified-dashboard',
    component: UnifiedappDashboardComponent
  },{
    path: 'reports-analytics',
    component: UnifieddashReportsanalyticsComponent
  }]
}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnifiedappRoutingModule { }
