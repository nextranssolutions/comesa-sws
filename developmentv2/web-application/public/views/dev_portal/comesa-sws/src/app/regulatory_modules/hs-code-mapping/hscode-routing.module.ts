import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HscodemappingLayoutComponent } from './views/layout/hscodemapping-layout/hscodemapping-layout.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { HscodesmappingConfigsetupComponent } from './views/hscodes-mapping/hscodesmapping-configsetup/hscodesmapping-configsetup.component';
import { HscodechaptersDefinationComponent } from './views/hscodes-mapping/hscodechapters-defination/hscodechapters-defination.component';
import { HscodesSectionsComponent } from './views/hscodes-mapping/hscodes-sections/hscodes-sections.component';
import { HscodesheadingDefinationsComponent } from './views/hscodes-mapping/hscodesheading-definations/hscodesheading-definations.component';
import { HscodesproductsRegistryComponent } from './views/hscodes-mapping/hscodesproducts-registry/hscodesproducts-registry.component';
import { HscodessubheadingDefinationComponent } from './views/hscodes-mapping/hscodessubheading-defination/hscodessubheading-defination.component';
import { HscodestariffDetailsComponent } from './views/hscodes-mapping/hscodestariff-details/hscodestariff-details.component';
import { SharedhscodesConfigurationsComponent } from './views/hscodes-mapping/sharedhscodes-configurations/sharedhscodes-configurations.component';
import { HscodeDashboardComponent } from './views/hscode-dashboard/hscode-dashboard.component';
import { HscodeInstitutionDepartmentsComponent } from './views/hscode-institutional-information/hscode-institution-departments/hscode-institution-departments.component';
import { HscodeInstitutionsComponent } from './views/hscode-institutional-information/hscode-institutions/hscode-institutions.component';
import { HscodeinstitutionsConfigsetupComponent } from './views/hscode-institutional-information/hscodeinstitutions-configsetup/hscodeinstitutions-configsetup.component';
import { SharedHscodeInstitutionsComponent } from './views/hscode-institutional-information/shared-hscode-institutions/shared-hscode-institutions.component';
import { PermittypeConfigurationsComponent } from './views/permittype-configurations/permittype-configurations.component';


const routes: Routes = [{
  path: 'app-hscodemapping-layout',
  component: HscodemappingLayoutComponent,
  canActivate: [AuthGuard],
  children: [{
    path: 'app-hscode-dashboard',
    component: HscodeDashboardComponent
  },
  {
    path: 'app-hscodesmapping-configsetup',
    component: HscodesmappingConfigsetupComponent
  }, {
    path: 'app-hscodechapters-defination',
    component: HscodechaptersDefinationComponent
  },
  {
    path: 'app-hscodes-sections',
    component: HscodesSectionsComponent
  },
  {
    path: 'app-hscodesheading-definations',
    component: HscodesheadingDefinationsComponent
  },
  {
    path: 'app-hscodesproducts-registry',
    component: HscodesproductsRegistryComponent
  },
  {
    path: 'app-hscodessubheading-defination',
    component: HscodessubheadingDefinationComponent
  },
  {
    path: 'app-hscodestariff-details',
    component: HscodestariffDetailsComponent
  },
  {
    path: 'app-sharedhscodes-configurations',
    component: SharedhscodesConfigurationsComponent
  },

  {
    path: 'app-hscode-institution-departments',
    component: HscodeInstitutionDepartmentsComponent
  },
  {
    path: 'app-hscode-institutions',
    component: HscodeInstitutionsComponent
  },
  {
    path: 'app-hscodeinstitutions-configsetup',
    component: HscodeinstitutionsConfigsetupComponent
  },
  {
    path: 'app-shared-hscode-institutions',
    component: SharedHscodeInstitutionsComponent
  },
  {
    path: 'app-permittype-configurations',
    component: PermittypeConfigurationsComponent
  },
]
}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class HscodeRoutingModule { }

