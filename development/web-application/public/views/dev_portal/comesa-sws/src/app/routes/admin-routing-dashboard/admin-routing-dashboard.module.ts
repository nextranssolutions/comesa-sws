import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from 'src/app/views/admin-dashboard/system-layout/app-layout/app-layout.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { AppdashboardComponent } from 'src/app/views/admin-dashboard/appdashboard/appdashboard.component';
import { AppCitiesComponent } from 'src/app/views/admin-dashboard/configurations/app-cities/app-cities.component';
import { AppCountriesComponent } from 'src/app/views/admin-dashboard/configurations/app-countries/app-countries.component';
import { AppCurrenciesComponent } from 'src/app/views/admin-dashboard/configurations/app-currencies/app-currencies.component';
import { AppActiveUserAccounts } from 'src/app/views/admin-dashboard/user-management/app-activeuseraccounts/app-activeuseraccounts.component';
import { UserGroupsComponent } from 'src/app/views/admin-dashboard/system-administration/user-groups/user-groups.component';
import { UserAccessLevelsComponent } from 'src/app/views/admin-dashboard/system-administration/user-access-levels/user-access-levels.component';
import { AppUserTitle } from 'src/app/views/admin-dashboard/configurations/app-usertitle/app-usertitle.component';
import { AppUserIdentificationType } from 'src/app/views/admin-dashboard/configurations/app-useridentificationtype/app-useridentificationtype.component';
import { AppInstitution } from 'src/app/views/admin-dashboard/configurations/app-institution/app-institution.component';
import { AppInstitutionDepartments } from 'src/app/views/admin-dashboard/app-institutiondepartments/app-institutiondepartments.component';
import { AppGenericnamesComponent } from 'src/app/views/admin-dashboard/configurations/app-genericnames/app-genericnames.component';
import { AppAuditTrail } from 'src/app/views/admin-dashboard/app-misaudittrail/app-misaudittrail.component';
import { AppPartnerStates } from 'src/app/views/admin-dashboard/configurations/app-partnerstates/app-partnerstates.component';
import { SystemAdministratorsComponent } from 'src/app/views/admin-dashboard/user-management/admins/system-administrators/system-administrators.component';
import { NavigationsComponent } from 'src/app/views/admin-dashboard/workflow-management/navigation/navigations/navigations.component';
import { NavigationLevelsComponent } from 'src/app/views/admin-dashboard/workflow-management/navigation/navigation-levels/navigation-levels.component';
import { NavigationInterfacesComponent } from 'src/app/views/admin-dashboard/workflow-management/navigation/navigation-interfaces/navigation-interfaces.component';
import { NavigationTypesComponent } from 'src/app/views/admin-dashboard/workflow-management/navigation/navigation-types/navigation-types.component';
import { AppExchangeratesComponent } from 'src/app/views/admin-dashboard/configurations/app-exchangerates/app-exchangerates.component';
import { AppProcessworkflowstatusesComponent } from 'src/app/views/admin-dashboard/workflow-management/workflows/app-processworkflowstatuses/app-processworkflowstatuses.component';
import { AppSystemprocessesComponent } from 'src/app/views/admin-dashboard/workflow-management/workflows/app-systemprocesses/app-systemprocesses.component';
import { AppProcessworkflowtransitionsComponent } from 'src/app/views/admin-dashboard/workflow-management/workflows/app-processworkflowtransitions/app-processworkflowtransitions.component';
import { AppProcessworkflowsstagesComponent } from 'src/app/views/admin-dashboard/workflow-management/workflows/app-processworkflowsstages/app-processworkflowsstages.component';
import { AppProcessworkflowsComponent } from 'src/app/views/admin-dashboard/workflow-management/workflows/app-processworkflows/app-processworkflows.component';
import { AppstageStatusesComponent } from 'src/app/views/admin-dashboard/workflow-management/workflows/appstage-statuses/appstage-statuses.component';
import { AppChecklistDefinationComponent } from 'src/app/views/admin-dashboard/document-checklistsmng/checklist_management/app-checklist-defination/app-checklist-defination.component';
import { AppChecklistTypesComponent } from 'src/app/views/admin-dashboard/document-checklistsmng/checklist_management/app-checklist-types/app-checklist-types.component';
import { AppPerformancescoringScalesComponent } from 'src/app/views/admin-dashboard/document-checklistsmng/checklist_management/app-performancescoring-scales/app-performancescoring-scales.component';
import { AppDocumentRequirementsComponent } from 'src/app/views/admin-dashboard/document-checklistsmng/document_management/app-document-requirements/app-document-requirements.component';
import { AppDocumentTypesComponent } from 'src/app/views/admin-dashboard/document-checklistsmng/document_management/app-document-types/app-document-types.component';
import { AppSystemlabelsmanagementComponent } from 'src/app/views/admin-dashboard/language-management/app-systemlabelsmanagement/app-systemlabelsmanagement.component';
import { AppSystemlanguagesComponent } from 'src/app/views/admin-dashboard/language-management/app-systemlanguages/app-systemlanguages.component';
import { AppTranslationmanagementComponent } from 'src/app/views/admin-dashboard/language-management/app-translationmanagement/app-translationmanagement.component';
import { NotificationTypesComponent } from 'src/app/views/admin-dashboard/document-checklistsmng/notification-mng/notification-types/notification-types.component';
import { EmailTemplatesComponent } from 'src/app/views/admin-dashboard/document-checklistsmng/notification-mng/email-templates/email-templates.component';
import { UserAccounttypesComponent } from 'src/app/views/admin-dashboard/system-administration/user-accounttypes/user-accounttypes.component';
import { SystemDashbordtypesComponent } from 'src/app/views/admin-dashboard/system-administration/system-dashbordtypes/system-dashbordtypes.component';
import { InstitutionsTypesComponent } from 'src/app/views/admin-dashboard/system-administration/institutions-types/institutions-types.component';
import { InstitutionsDetailsComponent } from 'src/app/views/admin-dashboard/system-administration/institutions-details/institutions-details.component';
import { InstitutionsDepartmentsComponent } from 'src/app/views/admin-dashboard/system-administration/institutions-departments/institutions-departments.component';
import { UsermanagementDashboardComponent } from 'src/app/views/admin-dashboard/user-management/usermanagement-dashboard/usermanagement-dashboard.component';
import { PublicationDashboardComponent } from 'src/app/views/admin-dashboard/information-sharing/publication-dashboard/publication-dashboard.component';
import { KnowledgeCenterinfomanagementComponent } from 'src/app/views/admin-dashboard/information-sharing/knowledge-centerinfomanagement/knowledge-centerinfomanagement.component';
import { AppNationalitiesComponent } from 'src/app/views/admin-dashboard/configurations/app-nationalities/app-nationalities.component';
import { AppGenderComponent } from 'src/app/views/admin-dashboard/configurations/app-gender/app-gender.component';
import { AppPublicationTypesComponent } from 'src/app/views/admin-dashboard/configurations/app-publication-types/app-publication-types.component';
import { AppSubmissionmethodsComponent } from 'src/app/views/admin-dashboard/configurations/app-submissionmethods/app-submissionmethods.component';
import { DisclaimerStatementsComponent } from 'src/app/views/admin-dashboard/configurations/disclaimer-statements/disclaimer-statements.component';
import { DisclaimerStatementTypesComponent } from 'src/app/views/admin-dashboard/configurations/disclaimer-statement-types/disclaimer-statement-types.component';

import { DmsDocrequirementsAppstatusComponent } from 'src/app/views/admin-dashboard/document-checklistsmng/document_management/dms-docrequirements-appstatus/dms-docrequirements-appstatus.component';
import { AppApplicationtypesComponent } from 'src/app/views/admin-dashboard/configurations/app-applicationtypes/app-applicationtypes.component';
import { AppFirewallipsComponent } from 'src/app/views/admin-dashboard/configurations/app-firewallips/app-firewallips.component';
import { EcredResourcedashboardComponent } from 'src/app/views/admin-dashboard/information-sharing/ecred-resourcedashboard/ecred-resourcedashboard.component';
import { KnowledgecenterDashboardComponent } from 'src/app/views/admin-dashboard/information-sharing/knowledgecenter-dashboard/knowledgecenter-dashboard.component';
import { SubscriptionDashComponent } from 'src/app/views/admin-dashboard/system-administration/subscription-dash/subscription-dash.component';
import { AppMyprofileComponent } from 'src/app/views/admin-dashboard/user-management/app-myprofile/app-myprofile.component';
import { SystemsFunctionalitiesComponent } from 'src/app/views/admin-dashboard/system-administration/system-guidelines/systems-functionalities/systems-functionalities.component';
import { SystemguidelinesDetailComponent } from 'src/app/views/admin-dashboard/system-administration/system-guidelines/systemguidelines-detail/systemguidelines-detail.component';
import { SystemguidelinesDashComponent } from 'src/app/views/admin-dashboard/system-administration/system-guidelines/systemguidelines-dash/systemguidelines-dash.component';
import { AppWorkflowsubmissionactionsComponent } from 'src/app/views/admin-dashboard/workflow-management/workflows/app-workflowsubmissionactions/app-workflowsubmissionactions.component';
import { AppWorkflowstatusesactionsComponent } from 'src/app/views/admin-dashboard/workflow-management/workflows/app-workflowstatusesactions/app-workflowstatusesactions.component';
import { AppStatusesactionsComponent } from 'src/app/views/admin-dashboard/workflow-management/workflows/app-statusesactions/app-statusesactions.component';
import { SyslogsComponent } from 'src/app/views/admin-dashboard/syslogs/syslogs.component';
import { LocationParametersComponent } from 'src/app/views/admin-dashboard/configurations/location-parameters/location-parameters.component';
import { SystemmanualConfigurationComponent } from 'src/app/views/admin-dashboard/system-administration/system-guidelines/systemmanual-configuration/systemmanual-configuration.component';
import { MultilingualConfigurationsComponent } from 'src/app/views/admin-dashboard/multilingual-configurations/multilingual-configurations.component';
import { NavigationSetupComponent } from 'src/app/views/admin-dashboard/workflow-management/navigation/navigation-setup/navigation-setup.component';
import { WorkflowsSetupComponent } from 'src/app/views/admin-dashboard/workflow-management/workflows/workflows-setup/workflows-setup.component';
import { NotificationManagementComponent } from 'src/app/views/admin-dashboard/document-checklistsmng/notification-mng/notification-management/notification-management.component';
import { ProductConfigurationComponent } from 'src/app/views/admin-dashboard/configurations/product-configuration/product-configuration.component';
import { DocumentchecklistSetupComponent } from 'src/app/views/admin-dashboard/document-checklistsmng/documentchecklist-setup/documentchecklist-setup.component';
import { InstitutionsInformationComponent } from 'src/app/views/admin-dashboard/system-administration/institutions-information/institutions-information.component';

import { NotSlidesInformationsComponent } from 'src/app/views/admin-dashboard/system-administration/not-slides-informations/not-slides-informations.component';
import { ChecklistmanagementSetupComponent } from 'src/app/views/admin-dashboard/document-checklistsmng/checklistmanagement-setup/checklistmanagement-setup.component';
import { UserSetupComponent } from 'src/app/views/admin-dashboard/system-administration/user-setup/user-setup.component';


import { AppSignatoriesComponent } from 'src/app/views/admin-dashboard/system-administration/app-signatories/app-signatories.component';
import { AppOrganizationinformationComponent } from 'src/app/views/admin-dashboard/system-administration/app-organizationinformation/app-organizationinformation.component';
import { AppWorkflowactiontypesComponent } from 'src/app/views/admin-dashboard/workflow-management/workflows/app-workflowactiontypes/app-workflowactiontypes.component';
import { AppWorkflowstatusesinterfacesComponent } from 'src/app/views/admin-dashboard/workflow-management/workflows/app-workflowstatusesinterfaces/app-workflowstatusesinterfaces.component';

//./admin-ecres/app-dashboard
const routes: Routes = [{
  path: '',
  component: AppLayoutComponent,
  canActivate: [AuthGuard],
  children: [{
    path: '',
    component: AppdashboardComponent
  }, {
    path: 'index',
    component: AppdashboardComponent
  }, {
    path: 'app-dashboard',
    component: AppdashboardComponent
  }, {
    path: 'app-countries-cities-provinces',
    component: AppCitiesComponent
  }, {
    path: 'app-countries',
    component: AppCountriesComponent
  }, {
    path: 'app-active-user-accounts',
    component: AppActiveUserAccounts
  }, {
    path: 'app-user-groups',
    component: UserGroupsComponent
  }, {
    path: 'app-currencies',
    component: AppCurrenciesComponent
  }, {
    path: 'app-currenciesexchange-rates',
    component: AppExchangeratesComponent
  }, {
    path: 'app-navigation-items',
    component: NavigationsComponent
  }, {
    path: 'app-navigation-types',
    component: NavigationTypesComponent
  }, {
    path: 'app-navigation-levels',
    component: NavigationLevelsComponent
  }, {
    path: "app-systeminterfaces",
    component: NavigationInterfacesComponent

  }, {
    path: 'app-user-access-levels',
    component: UserAccessLevelsComponent
  }, {
    path: 'app-user-titles',
    component: AppUserTitle
  }, {
    path: 'app-user-identification-type',
    component: AppUserIdentificationType
  }, {
    path: 'app-institutions',
    component: AppInstitution
  }, {
    path: 'app-institution-departments',
    component: AppInstitutionDepartments
  },
  //
  {
    path: 'app-institutions-types',
    component: InstitutionsTypesComponent
  }
    ,
  {
    path: 'app-institutions-details',
    component: InstitutionsDetailsComponent
  }
    ,
  {
    path: 'app-institutions-departments',
    component: InstitutionsDepartmentsComponent
  }, {
    path: 'app-product-genericnames',
    component: AppGenericnamesComponent
  }, {
    path: "app-mis-audit-trail",
    component: AppAuditTrail
  }, {
    path: "app-partner-states",
    component: AppPartnerStates
  }, {
    path: "app-signatories",
    component: AppSignatoriesComponent
  }, {
    path: "app-organisationinformation",
    component: AppOrganizationinformationComponent
  }, {
    path: "app-systemadministrators",
    component: SystemAdministratorsComponent
  }, {
    path: "app-processworkflowstatuses",
    component: AppProcessworkflowstatusesComponent
  }, {
    path: "app-applicationstatuses",
    component: AppProcessworkflowstatusesComponent
  }, {
    path: "app-stagesstatuses",
    component: AppstageStatusesComponent
  },
  {
    path: "app-systemprocesses",
    component: AppSystemprocessesComponent
  }, {
    path: "app-processworkflowtransitions",
    component: AppProcessworkflowtransitionsComponent
  }, {
    path: "app-processworkflowsstages",
    component: AppProcessworkflowsstagesComponent
  }, {
    path: "app-processworkflows",
    component: AppProcessworkflowsComponent
  }, {
    path: "app-performancescoring",
    component: AppPerformancescoringScalesComponent
  }, {
    path: "app-checklisttypes",
    component: AppChecklistTypesComponent
  }, {
    path: "app-checklistdefination",
    component: AppChecklistDefinationComponent
  }, {
    path: "app-documentrequirements",
    component: AppDocumentRequirementsComponent
  }, {
    path: "app-documenttypes",
    component: AppDocumentTypesComponent
  }, {
    path: "app-translationmanagement",
    component: AppTranslationmanagementComponent
  }, {
    path: "app-systemlanguages",
    component: AppSystemlanguagesComponent
  }, {
    path: "app-systemlabels",
    component: AppSystemlabelsmanagementComponent
  }, {
    path: "app-email-templates",
    component: EmailTemplatesComponent
  }, {
    path: "app-notification-types",
    component: NotificationTypesComponent
  }, {
    path: "app-useraccount-types",
    component: UserAccounttypesComponent
  }, {
    path: "app-systemdashboard-types",
    component: SystemDashbordtypesComponent
  }, {
    path: "app-usermanagement-dashboard",
    component: UsermanagementDashboardComponent
  }, {
    path: "app-ecredresource-dashboard",
    component: EcredResourcedashboardComponent
  }, {
    path: "app-knowledge-centerinfo",
    component: KnowledgeCenterinfomanagementComponent
  }, {
    path: "app-knowledgecenter-dashboard",
    component: KnowledgecenterDashboardComponent
  }, {
    path: "app-publication-dashboard",
    component: PublicationDashboardComponent
  }, {
    path: "app-nationalities",
    component: AppNationalitiesComponent
  },
  {
    path: "app-gender",
    component: AppGenderComponent

  }, 
  {
    path: "app-publication-types",
    component: AppPublicationTypesComponent
  },
  
  {
    path: "app-submissionmethods",
    component: AppSubmissionmethodsComponent
  },  {
    path: "disclaimer_statement_types",
    component: DisclaimerStatementTypesComponent
  }, {
    path: "disclaimer_statement",
    component: DisclaimerStatementsComponent
  }, 
   {
    path: "dms-docrequirements-appstatus",
    component: DmsDocrequirementsAppstatusComponent
  }, {
    path: 'app-applicationtypes',
    component: AppApplicationtypesComponent
  }, {
    path: "app-firewallips",
    component: AppFirewallipsComponent
  }, {
    path: "app-subscription-dashboard",
    component: SubscriptionDashComponent

  }, {
    path: 'app-myprofile',
    component: AppMyprofileComponent
  }, {
    path: 'app-systems-functionalities',
    component: SystemsFunctionalitiesComponent
  }, {
    path: 'app-systemguidelines-detail',
    component: SystemguidelinesDetailComponent
  }, {
    path: 'app-systemguidelines-dash',
    component: SystemguidelinesDashComponent
  }, {
    path: 'app-workflowsubmissionactions',
    component: AppWorkflowsubmissionactionsComponent
  }, {
    path: 'app-workflowstatusesactions',
    component: AppWorkflowstatusesactionsComponent
  }, {
    path: 'app-statusesactions',
    component: AppStatusesactionsComponent
  }, {
    path: 'app-userLogs',
    component: SyslogsComponent
  }, {
    path: 'app-locationparameter',
    component: LocationParametersComponent
  }, {
    path: 'systemmanual-configuration',
    component: SystemmanualConfigurationComponent
  }, {
    path: 'app-usersetup',
    component: UserSetupComponent
  }, {
    path: 'app-multilingualconfig',
    component: MultilingualConfigurationsComponent
  }, {
    path: 'app-navigation-setup',
    component: NavigationSetupComponent
  }, {
    path: 'app-workflows-setup',
    component: WorkflowsSetupComponent
  }, {
    path: 'app-workflows-setup',
    component: AppWorkflowactiontypesComponent
  }, {
    path: 'app-notification-management',
    component: NotificationManagementComponent
  }, {
    path: 'app-productconfiguration',
    component: ProductConfigurationComponent
  }, {
    path: 'app-documentchecklist-setup',
    component: DocumentchecklistSetupComponent
  },  {
    path: 'app-institutions-information',
    component: InstitutionsInformationComponent
  },  {

    path: 'not-slides-informations',
    component: NotSlidesInformationsComponent

  }, 
    {
    path: 'app-checklistmanagement-setup',
    component: ChecklistmanagementSetupComponent
  }, {
    path: 'app-workflowstatusesinterfaces',
    component: AppWorkflowstatusesinterfacesComponent
  }]
}]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingDashboardModule { }
