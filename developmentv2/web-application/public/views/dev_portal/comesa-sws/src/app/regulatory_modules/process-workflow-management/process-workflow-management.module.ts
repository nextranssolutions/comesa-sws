import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProcessWorkflowManagementRoutingModule } from './process-workflow-management-routing.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { DxButtonModule, DxProgressBarModule, DxLoadPanelModule, DxPopupModule, DxDataGridModule, DxActionSheetModule, DxFileUploaderModule, DxNumberBoxModule, DxCheckBoxModule, DxSelectBoxModule, DxTextAreaModule, DxContextMenuModule, DxMenuModule, DxTagBoxModule, DxDateBoxModule, DxTabPanelModule, DxFormModule, DxScrollViewModule, DxTextBoxModule, DxValidatorModule, DxToolbarModule, DxGalleryModule, DxHtmlEditorModule, DxDropDownBoxModule, DxRadioGroupModule, DxTreeListModule } from 'devextreme-angular';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { NgWizardConfig, THEME, NgWizardModule } from 'ng-wizard';
import { NgxCaptchaModule } from 'ngx-captcha';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input-gg';
import { SafePipeModule } from 'src/app/safe-pipe/safe-pipe.module';
import { SharedModuleModule } from 'src/app/shared-views/shared-module.module';
import { httpTranslateLoader } from '../revenue-management/revenue-management.module';
import { ProcessWorkflowMgtHeaderComponent } from './views/layout/process-workflow-mgt-header/process-workflow-mgt-header.component';
import { ProcessWorkflowMgtLayoutComponent } from './views/layout/process-workflow-mgt-layout/process-workflow-mgt-layout.component';
import { ProcessWorkflowMgtNavigationComponent } from './views/layout/process-workflow-mgt-navigation/process-workflow-mgt-navigation.component';
import { CimexAdminModule } from "../../core-modules/cimex-admin/cimex-admin.module";
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
import { SharedhscodesConfigurationsComponent } from './views/hscodes-configurations/sharedhscodes-configurations/sharedhscodes-configurations.component';
import { HscodechaptersDefinationComponent } from './views/hscodes-configurations/hscodechapters-defination/hscodechapters-defination.component';
import { HscodesSectionsComponent } from './views/hscodes-configurations/hscodes-sections/hscodes-sections.component';
import { HscodesconfigSetupComponent } from './views/hscodes-configurations/hscodesconfig-setup/hscodesconfig-setup.component';
import { HscodesheadingDefinationsComponent } from './views/hscodes-configurations/hscodesheading-definations/hscodesheading-definations.component';
import { HscodesproductsRegistryComponent } from './views/hscodes-configurations/hscodesproducts-registry/hscodesproducts-registry.component';
import { HscodessubheadingDefinationComponent } from './views/hscodes-configurations/hscodessubheading-defination/hscodessubheading-defination.component';
import { HscodestariffDetailsComponent } from './views/hscodes-configurations/hscodestariff-details/hscodestariff-details.component';
import { TraderAccountManagementComponent } from './views/trader-account-management/trader-account-management.component';
import { AppSignatoriesComponent } from './views/app-signatories/app-signatories.component';
import { SharedprocessConfigurationsComponent } from './views/sharedprocess-configurations/sharedprocess-configurations.component';
import { InstitutionInformationComponent } from './views/institution-information/institution-information.component';
import { SharedDocumentchecklistingComponent } from './views/document-checklistsmng/shared-documentchecklisting/shared-documentchecklisting.component';
import { AppInstitutionsComponent } from './views/app-institutions/app-institutions.component';
import { InstitutionDepartmentsComponent } from './views/institution-departments/institution-departments.component';
import { SharedProcessconfigurationComponent } from './views/process-configuration/shared-processconfiguration/shared-processconfiguration.component';
import { AppealTypesComponent } from './views/process-configuration/appeal-types/appeal-types.component';
import { ProcessConfsetupComponent } from './views/process-configuration/process-confsetup/process-confsetup.component';
import { RegulatedProductTypesComponent } from './views/process-configuration/regulated-product-types/regulated-product-types.component';
import { RegulatoryFunctionsComponent } from './views/process-configuration/regulatory-functions/regulatory-functions.component';
import { InterfacesComponent } from './views/workflow-management/interfaces/interfaces.component';
import { UserGroupsPermissionsComponent } from './views/user-groups-permissions/user-groups-permissions.component';
import { DmsConfigsetupComponent } from './views/dms/dms-configsetup/dms-configsetup.component';
import { DmsSitesRepositoryDefinationComponent } from './views/dms/dms-sites-repository-defination/dms-sites-repository-defination.component';
import { DocumentExtensionTypesComponent } from './views/dms/document-extension-types/document-extension-types.component';
import { DocumentRequirementDefinationComponent } from './views/dms/document-requirement-defination/document-requirement-defination.component';
import { DocumentTypesComponent } from './views/dms/document-types/document-types.component';
import { NonstructuredDocDefinationComponent } from './views/dms/nonstructured-doc-defination/nonstructured-doc-defination.component';
import { SharedDmsComponent } from './views/dms/shared-dms/shared-dms.component';
import { SopMasterlistComponent } from './views/dms/sop-masterlist/sop-masterlist.component';
import { PermitTermsconditionsComponent } from './views/manuals/permit-termsconditions/permit-termsconditions.component';



const ngWizardConfig: NgWizardConfig = {
  theme: THEME.default
};


@NgModule({
  declarations: [ProcessWorkflowMgtHeaderComponent, ProcessWorkflowMgtLayoutComponent, ProcessWorkflowMgtNavigationComponent,
    ProcessWorkflowsComponent, SystemProcessesComponent, WorkflowSetupComponent, AppChecklistDefinationComponent, 
    AppChecklistTypesComponent, AppPerformancescoringScalesComponent, ChecklistmanagementSetupComponent,
    EmailTemplatesComponent, NotificationManagementComponent, NotificationTypesComponent, AppInstitutionsComponent,
     AppOrganizationinformationComponent, SharedhscodesConfigurationsComponent, HscodechaptersDefinationComponent, HscodesSectionsComponent,
    HscodesconfigSetupComponent, HscodesheadingDefinationsComponent, HscodesproductsRegistryComponent, HscodessubheadingDefinationComponent, HscodestariffDetailsComponent,
    TraderAccountManagementComponent, AppSignatoriesComponent, SharedprocessConfigurationsComponent,InstitutionInformationComponent,SharedDocumentchecklistingComponent,
    InstitutionDepartmentsComponent, SharedProcessconfigurationComponent,AppealTypesComponent,ProcessConfsetupComponent,RegulatedProductTypesComponent,RegulatoryFunctionsComponent,
    InterfacesComponent,UserGroupsPermissionsComponent,DmsConfigsetupComponent,DmsSitesRepositoryDefinationComponent,DocumentExtensionTypesComponent,DocumentRequirementDefinationComponent,
    DocumentTypesComponent,PermitTermsconditionsComponent,NonstructuredDocDefinationComponent,SharedDmsComponent,SopMasterlistComponent

  ],
  imports: [
    CommonModule, ProcessWorkflowManagementRoutingModule,
    SharedModuleModule,
    NgWizardModule.forRoot(ngWizardConfig),
    NgHttpLoaderModule, DxButtonModule, DxProgressBarModule,
    FormsModule,DxTreeListModule,
    ReactiveFormsModule,
    NgxCaptchaModule, DxLoadPanelModule,
    DxPopupModule, DxDataGridModule, DxActionSheetModule, DxFileUploaderModule, DxNumberBoxModule, DxCheckBoxModule, DxSelectBoxModule, DxTextAreaModule, DxContextMenuModule, DxMenuModule, DxTagBoxModule,
    DxDateBoxModule, DxTabPanelModule, DxFormModule, DxScrollViewModule,
    DxTextBoxModule,
    DxDateBoxModule, DxDataGridModule,
    HttpClientModule, DxValidatorModule,
    NgxIntlTelInputModule, DxToolbarModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
    DxDataGridModule,
    DxPopupModule, DxGalleryModule,
    DxFileUploaderModule,
    DxActionSheetModule,
    DxFileUploaderModule, DxNumberBoxModule, DxCheckBoxModule, DxSelectBoxModule, DxTextAreaModule, DxContextMenuModule, DxMenuModule, DxScrollViewModule, DxTabPanelModule,
    DxHtmlEditorModule,
    DxDropDownBoxModule, DxTagBoxModule,
    DxRadioGroupModule,
    SafePipeModule,
    CimexAdminModule
  ]
})
export class ProcessWorkflowManagementModule { }
