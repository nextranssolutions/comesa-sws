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
import { DmsConfigsetupComponent } from './views/document-checklistsmng/document_management/dms-configsetup/dms-configsetup.component';
import { DmsSitesRepositoryDefinationComponent } from './views/document-checklistsmng/document_management/dms-sites-repository-defination/dms-sites-repository-defination.component';
import { DocumentExtensionTypesComponent } from './views/document-checklistsmng/document_management/document-extension-types/document-extension-types.component';
import { DocumentRequirementDefinationComponent } from './views/document-checklistsmng/document_management/document-requirement-defination/document-requirement-defination.component';
import { DocumentTypesComponent } from './views/document-checklistsmng/document_management/document-types/document-types.component';
import { NonstructuredDocDefinationComponent } from './views/document-checklistsmng/document_management/nonstructured-doc-defination/nonstructured-doc-defination.component';
import { SharedDmsComponent } from './views/document-checklistsmng/document_management/shared-dms/shared-dms.component';
import { EmailTemplatesComponent } from './views/document-checklistsmng/notification-mng/email-templates/email-templates.component';
import { NotificationManagementComponent } from './views/document-checklistsmng/notification-mng/notification-management/notification-management.component';
import { NotificationTypesComponent } from './views/document-checklistsmng/notification-mng/notification-types/notification-types.component';
import { AppOrganizationinformationComponent } from './views/app-organizationinformation/app-organizationinformation.component';
import { TraderAccountManagementComponent } from './views/trader-account-management/trader-account-management.component';
import { AppSignatoriesComponent } from './views/app-signatories/app-signatories.component';
import { InstitutionInformationComponent } from './views/institution-information/institution-information.component';
import { HscodesconfigSetupComponent } from './views/hscodes-configurations/hscodesconfig-setup/hscodesconfig-setup.component';

const routes: Routes = [{
  path: '',
    component: ProcessWorkflowMgtLayoutComponent,
    canActivate: [AuthGuard],
    children: [{
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
      path: 'app-checklistmanagement-setup',
      component: ChecklistmanagementSetupComponent
    },
    {
      path: 'dms-configsetup',
      component: DmsConfigsetupComponent
    },
    {
      path: 'app-dms-sites-repository-defination',
      component: DmsSitesRepositoryDefinationComponent
    },
    {
      path: 'app-document-extension-types',
      component: DocumentExtensionTypesComponent
    },
    {
      path: 'app-document-requirement-defination',
      component: DocumentRequirementDefinationComponent
    },
    {
      path: 'app-document-types',
      component: DocumentTypesComponent
    },
    {
      path: 'app-nonstructured-doc-defination',
      component: NonstructuredDocDefinationComponent
    },
    {
      path: 'app-shared-dms',
      component: SharedDmsComponent
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
    }
  
  ]
}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcessWorkflowManagementRoutingModule { }
