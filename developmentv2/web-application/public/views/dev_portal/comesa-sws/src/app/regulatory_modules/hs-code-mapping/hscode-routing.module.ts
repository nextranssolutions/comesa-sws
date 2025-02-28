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
import { ChecklistDefinationsComponent } from './views/permit_type_management_config/checklist-definations/checklist-definations.component';
import { ChecklistTypesComponent } from './views/permit_type_management_config/checklist-types/checklist-types.component';
import { HscodeSeloptionComponent } from './views/permit_type_management_config/hscode-seloption/hscode-seloption.component';
import { HscodemappingOptionComponent } from './views/permit_type_management_config/hscodemapping-option/hscodemapping-option.component';
import { MappingStatusComponent } from './views/permit_type_management_config/mapping-status/mapping-status.component';
import { PermitStatusesComponent } from './views/permit_type_management_config/permit-statuses/permit-statuses.component';
import { PermitTemplatesComponent } from './views/permit_type_management_config/permit-templates/permit-templates.component';
import { PermitTypeManagementConfigsetupComponent } from './views/permit_type_management_config/permit-type-management-configsetup/permit-type-management-configsetup.component';
import { PermitTemplateTypesComponent } from './views/permit_type_management_config/permit-template-types/permit-template-types.component';
import { QuotaLimitationstypeComponent } from './views/permit_type_management_config/quota-limitationstype/quota-limitationstype.component';
import { RenewableStatusesComponent } from './views/permit_type_management_config/renewable-statuses/renewable-statuses.component';
import { SharedPermitTypeManagementConfigComponent } from './views/permit_type_management_config/shared-permit-type-management-config/shared-permit-type-management-config.component';
import { WorkflowStagesComponent } from './views/permit_type_management_config/workflow-stages/workflow-stages.component';


const routes: Routes = [{
  path: '',
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
  {
    path: 'app-checklist-definations',
    component: ChecklistDefinationsComponent
  },
  {
    path: 'app-checklist-types',
    component: ChecklistTypesComponent
  },
  {
    path: 'app-hscode-seloption',
    component: HscodeSeloptionComponent
  },
  {
    path: 'app-hscodemapping-option',
    component: HscodemappingOptionComponent
  },
  {
    path: 'app-mapping-status',
    component: MappingStatusComponent
  },
  {
    path: 'app-permit-statuses',
    component: PermitStatusesComponent
  },
  {
    path: 'app-permit-template-types',
    component: PermitTemplateTypesComponent
  },
  {
    path: 'app-permit-templates',
    component: PermitTemplatesComponent,
  },
  {
    path: 'app-permit-type-management-configsetup',
    component: PermitTypeManagementConfigsetupComponent
  },
  {
    path: 'app-quota-limitationstype',
    component: QuotaLimitationstypeComponent
  },
  {
    path: 'app-renewable-statuses',
    component: RenewableStatusesComponent
  },
  {
    path: 'app-shared-permit-type-management-config',
    component: SharedPermitTypeManagementConfigComponent
  },
  {
    path: 'app-workflow-stages',
    component: WorkflowStagesComponent
  },
]
}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class HscodeRoutingModule { }

