import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'public', loadChildren: () => import('./modules/public/public.module').then(m => m.PublicModule) },
  { path: 'manifest', loadChildren: () => import('./modules/manifest/manifest.module').then(m => m.ManifestModule) }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
  })
export class AppRoutingModule { }
  