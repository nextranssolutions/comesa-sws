
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'public' },
  { path: 'public', loadChildren: () => import('./modules/public/public.module').then(m => m.PublicModule) },
  { path: 'unified-dashboard/unified-dashboard', loadChildren: () => import('./modules/ecressolution-admin/ecressolution-admin.module').then(m => m.EcressolutionAdminModule) },
  
  { path: 'admin-cimex', loadChildren: () => import('./modules/ecressolution-admin/ecressolution-admin.module').then(m => m.EcressolutionAdminModule) },
  { path: 'admin-cimex/app-dashboard', loadChildren: () => import('./modules/ecressolution-admin/ecressolution-admin.module').then(m => m.EcressolutionAdminModule) },

  // { path: 'admin-ecres', loadChildren: () => import('./modules/ecressolution-states/ecressolution-states.module').then(m => m.EcresSolutionStatesModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
