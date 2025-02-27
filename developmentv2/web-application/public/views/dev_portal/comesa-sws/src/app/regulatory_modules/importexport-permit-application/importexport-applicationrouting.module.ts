import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ImportexportLayoutComponent } from './views/layout/importexport-layout/importexport-layout.component';
import { DraftImportlicensedashComponent } from './views/import-license/draft-importlicensedash/draft-importlicensedash.component';
import { InitiateImportappComponent } from './views/import-license/initiate-importapp/initiate-importapp.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';

const routes: Routes = [{
  path: '',
  component: ImportexportLayoutComponent,
  canActivate: [AuthGuard],
  children: [{
    path: '',
    component: DashboardComponent
  },{
    path: 'draft-importlicense-dashboard',
    component: DraftImportlicensedashComponent
  },{
    path: 'initiate-importapp',
    component: InitiateImportappComponent
  }

]
}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImportexportApplicationRoutingModule { }
