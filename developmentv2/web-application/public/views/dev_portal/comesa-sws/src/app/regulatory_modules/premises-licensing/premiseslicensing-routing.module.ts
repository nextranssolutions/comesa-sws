import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { LicenserenDashboardComponent } from './views/licenseren-dashboard/licenseren-dashboard.component';
import { PremiseslicensingLayoutComponent } from './views/layout/premiseslicensing-layout/premiseslicensing-layout.component';
import { DraftNewpremisesapplicationComponent } from './views/newprem-appdashboard/draft-newpremisesapplication/draft-newpremisesapplication.component';
import { InitiateNewpremiseApplicationComponent } from './views/newprem-appdashboard/initiate-newpremise-application/initiate-newpremise-application.component';


const routes: Routes = [{
  path: '',
  component: PremiseslicensingLayoutComponent,
  canActivate: [AuthGuard],
  children: [{
    path: 'app-licenseren-dashboard',
    component: LicenserenDashboardComponent
  }, {
    path: 'draftnew_premisesregiatration',
    component: DraftNewpremisesapplicationComponent
  }, {
    path: 'initiate-newpremise-application',
    component: InitiateNewpremiseApplicationComponent
  }]
}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PremiseslicensingRoutingModule { }


