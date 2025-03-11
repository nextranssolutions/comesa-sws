
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'public' },
  { path: 'public', loadChildren: () => import('./core-modules/public/public.module').then(m => m.PublicModule) },
  { path: 'unified-dashboard', loadChildren: () => import('./core-modules/unifiedapp-module/unifiedapp-module.module').then(m => m.UnifiedappModuleModule) },
  { path: 'admin-cimex', loadChildren: () => import('./core-modules/cimex-admin/cimex-admin.module').then(m => m.CimexAdminModule) },
  { path: 'admin-cimex/app-dashboard', loadChildren: () => import('./core-modules/cimex-admin/cimex-admin.module').then(m => m.CimexAdminModule) },
  { path: 'importexport-control', loadChildren: () => import('./regulatory_modules/importexport-control/importexport-control.module').then(m => m.ImportexportControlModule) },
  { path: 'hscode-mapping', loadChildren: () => import('./regulatory_modules/hs-code-mapping/hscode-mapping.module').then(m => m.HscodeMappingModule) },
  { path: 'integration-notification-management', loadChildren: () => import('./regulatory_modules/integration-notification-management/integration-notification-management.module').then(m => m.IntegrationNotificationManagementModule) },
  { path: 'online-services', loadChildren: () => import('./regulatory_modules/online-services/online-services.module').then(m => m.OnlineServicesModule) },
  { path: 'process-workflow-management', loadChildren: () => import('./regulatory_modules/process-workflow-management/process-workflow-management.module').then(m => m.ProcessWorkflowManagementModule) },
  { path: 'revenue-management', loadChildren: () => import('./regulatory_modules/revenue-management/revenue-management.module').then(m => m.RevenueManagementModule) },
  { path: 'importexport-permit-application', loadChildren: () => import('./regulatory_modules/importexport-permit-application/importexport-application.module').then(m => m.ImportexportApplicationModule) },
  { path: 'reports-analytics', loadChildren: () => import('./regulatory_modules/reports-analytics/reports-analytics.module').then(m => m.ReportsAnalyticsModule)}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
