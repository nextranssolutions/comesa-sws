import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProcessWorkflowMgtLayoutComponent } from './views/layout/process-workflow-mgt-layout/process-workflow-mgt-layout.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ProcessWorkflowsComponent } from './views/workflow-management/process-workflows/process-workflows.component';
import { SystemProcessesComponent } from './views/workflow-management/system-processes/system-processes.component';
import { WorkflowSetupComponent } from './views/workflow-management/workflow-setup/workflow-setup.component';
import { AppChecklistDefinationComponent } from './views/document-checklistsmng/checklist_management/app-checklist-defination/app-checklist-defination.component';
import { AppChecklistTypesComponent } from './views/document-checklistsmng/checklist_management/app-checklist-types/app-checklist-types.component';
import { AppPerformancescoringScalesComponent } from './views/document-checklistsmng/checklist_management/app-performancescoring-scales/app-performancescoring-scales.component';
import { ChecklistmanagementSetupComponent } from './views/document-checklistsmng/checklistmanagement-setup/checklistmanagement-setup.component';

import { EmailTemplatesComponent } from './views/document-checklistsmng/notification-mng/email-templates/email-templates.component';
import { NotificationManagementComponent } from './views/document-checklistsmng/notification-mng/notification-management/notification-management.component';
import { NotificationTypesComponent } from './views/document-checklistsmng/notification-mng/notification-types/notification-types.component';
import { AppOrganizationinformationComponent } from './views/app-organizationinformation/app-organizationinformation.component';
import { TraderAccountManagementComponent } from './views/trader-account-management/trader-account-management.component';
import { AppSignatoriesComponent } from './views/app-signatories/app-signatories.component';
import { InstitutionInformationComponent } from './views/institution-information/institution-information.component';
import { HscodesconfigSetupComponent } from './views/hscodes-configurations/hscodesconfig-setup/hscodesconfig-setup.component';
import { ProcessConfsetupComponent } from './views/process-configuration/process-confsetup/process-confsetup.component';
import { UserGroupsPermissionsComponent } from './views/user-groups-permissions/user-groups-permissions.component';
import { DmsConfigsetupComponent } from './views/dms/dms-configsetup/dms-configsetup.component';
import { DocumentTypesComponent } from './views/dms/document-types/document-types.component';

import { DocumentExtensionTypesComponent } from './views/dms/document-extension-types/document-extension-types.component';

import { PermitTermsconditionsComponent } from './views/manuals/permit-termsconditions/permit-termsconditions.component';

const routes: Routes = [{
  path: '',
    component: ProcessWorkflowMgtLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
      path: 'app-process-workflows',
      component: ProcessWorkflowsComponent
    },
    {
      path: 'app-system-processes',
      component: SystemProcessesComponent
    },
    {
      path: 'app-workflow-setup',
      component: WorkflowSetupComponent
    },
    {
      path: 'app-app-checklist-defination',
      component: AppChecklistDefinationComponent
    },
    {
      path: 'app-app-checklist-types',
      component: AppChecklistTypesComponent
    },
    {
      path: 'app-app-performancescoring-scales',
      component: AppPerformancescoringScalesComponent
    },
    {
      path: 'app-process-confsetup',
      component: ProcessConfsetupComponent
    },
    {
      path: 'app-user-groups-permissions',
      component: UserGroupsPermissionsComponent
    },
    {
      path: 'app-document-types',
      component: DocumentTypesComponent
    },
    
    {
      path: 'app-checklistmanagement-setup',
      component: ChecklistmanagementSetupComponent
    },
     
    {
      path: 'app-dms-configsetup',
      component: DmsConfigsetupComponent
    },
   
    
    {
      path: 'app-email-templates',
      component: EmailTemplatesComponent
    },
    {
      path: 'app-notification-management',
      component: NotificationManagementComponent
    },
    {
      path: 'app-notification-types',
      component: NotificationTypesComponent
    },
   
    {
      path: 'app-institution-information',
      component: InstitutionInformationComponent
    },
    {
      path: 'app-app-organizationinformation',
      component: AppOrganizationinformationComponent
    },
    {
      path: 'app-trader-account-management',
      component: TraderAccountManagementComponent
    },
    {
      path: 'app-signatories',
      component: AppSignatoriesComponent
    },
    {
      path: 'app-hscodesconfig-setup',
      component: HscodesconfigSetupComponent
    },{
      path: 'app-document-extension-types',
      component: DocumentExtensionTypesComponent
    }
    ,
    {
      path: 'app-permit-termsconditions',
      component: PermitTermsconditionsComponent
    }
  ]
}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcessWorkflowManagementRoutingModule { }
