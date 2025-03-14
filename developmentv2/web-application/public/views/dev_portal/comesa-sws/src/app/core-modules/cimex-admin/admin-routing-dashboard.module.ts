import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { AppdashboardComponent } from 'src/app/core-modules/cimex-admin/views/appdashboard/appdashboard.component';
import { AppCitiesComponent } from 'src/app/core-modules/cimex-admin/views/configurations/app-cities/app-cities.component';
import { AppCountriesComponent } from 'src/app/core-modules/cimex-admin/views/configurations/app-countries/app-countries.component';
import { AppCurrenciesComponent } from 'src/app/core-modules/cimex-admin/views/configurations/app-currencies/app-currencies.component';
import { AppActiveUserAccounts } from 'src/app/core-modules/cimex-admin/views/user-management/app-activeuseraccounts/app-activeuseraccounts.component';
import { UserGroupsComponent } from 'src/app/core-modules/cimex-admin/views/system-administration/user-groups/user-groups.component';
import { UserAccessLevelsComponent } from 'src/app/core-modules/cimex-admin/views/system-administration/user-access-levels/user-access-levels.component';
import { AppUserTitle } from 'src/app/core-modules/cimex-admin/views/configurations/app-usertitle/app-usertitle.component';
import { AppUserIdentificationType } from 'src/app/core-modules/cimex-admin/views/configurations/app-useridentificationtype/app-useridentificationtype.component';
import { AppInstitution } from 'src/app/core-modules/cimex-admin/views/configurations/app-institution/app-institution.component';
import { AppInstitutionDepartments } from 'src/app/core-modules/cimex-admin/views/app-institutiondepartments/app-institutiondepartments.component';
import { AppGenericnamesComponent } from 'src/app/core-modules/cimex-admin/views/configurations/app-genericnames/app-genericnames.component';
import { AppAuditTrail } from 'src/app/core-modules/cimex-admin/views/app-misaudittrail/app-misaudittrail.component';
import { AppPartnerStates } from 'src/app/core-modules/cimex-admin/views/configurations/app-partnerstates/app-partnerstates.component';
import { SystemAdministratorsComponent } from 'src/app/core-modules/cimex-admin/views/user-management/admins/system-administrators/system-administrators.component';
import { NavigationsComponent } from 'src/app/core-modules/cimex-admin/views/workflow-management/navigation/navigations/navigations.component';
import { NavigationLevelsComponent } from 'src/app/core-modules/cimex-admin/views/workflow-management/navigation/navigation-levels/navigation-levels.component';
import { NavigationInterfacesComponent } from 'src/app/core-modules/cimex-admin/views/workflow-management/navigation/navigation-interfaces/navigation-interfaces.component';
import { NavigationTypesComponent } from 'src/app/core-modules/cimex-admin/views/workflow-management/navigation/navigation-types/navigation-types.component';
import { AppExchangeratesComponent } from 'src/app/core-modules/cimex-admin/views/configurations/app-exchangerates/app-exchangerates.component';
import { AppProcessworkflowstatusesComponent } from 'src/app/core-modules/cimex-admin/views/workflow-management/workflows/app-processworkflowstatuses/app-processworkflowstatuses.component';
import { AppSystemprocessesComponent } from 'src/app/core-modules/cimex-admin/views/workflow-management/workflows/app-systemprocesses/app-systemprocesses.component';
import { AppProcessworkflowtransitionsComponent } from 'src/app/core-modules/cimex-admin/views/workflow-management/workflows/app-processworkflowtransitions/app-processworkflowtransitions.component';
import { AppProcessworkflowsstagesComponent } from 'src/app/core-modules/cimex-admin/views/workflow-management/workflows/app-processworkflowsstages/app-processworkflowsstages.component';
import { AppProcessworkflowsComponent } from 'src/app/core-modules/cimex-admin/views/workflow-management/workflows/app-processworkflows/app-processworkflows.component';
import { AppstageStatusesComponent } from 'src/app/core-modules/cimex-admin/views/workflow-management/workflows/appstage-statuses/appstage-statuses.component';

import { AppSystemlabelsmanagementComponent } from 'src/app/core-modules/cimex-admin/views/language-management/app-systemlabelsmanagement/app-systemlabelsmanagement.component';
import { AppSystemlanguagesComponent } from 'src/app/core-modules/cimex-admin/views/language-management/app-systemlanguages/app-systemlanguages.component';
import { AppTranslationmanagementComponent } from 'src/app/core-modules/cimex-admin/views/language-management/app-translationmanagement/app-translationmanagement.component';

import { UserAccounttypesComponent } from 'src/app/core-modules/cimex-admin/views/system-administration/user-accounttypes/user-accounttypes.component';
import { SystemDashbordtypesComponent } from 'src/app/core-modules/cimex-admin/views/system-administration/system-dashbordtypes/system-dashbordtypes.component';
import { InstitutionsTypesComponent } from 'src/app/core-modules/cimex-admin/views/system-administration/institutions-types/institutions-types.component';
import { InstitutionsDetailsComponent } from 'src/app/core-modules/cimex-admin/views/system-administration/institutions-details/institutions-details.component';
import { InstitutionsDepartmentsComponent } from 'src/app/core-modules/cimex-admin/views/system-administration/institutions-departments/institutions-departments.component';
import { UsermanagementDashboardComponent } from 'src/app/core-modules/cimex-admin/views/user-management/usermanagement-dashboard/usermanagement-dashboard.component';
import { PublicationDashboardComponent } from 'src/app/core-modules/cimex-admin/views/information-sharing/publication-dashboard/publication-dashboard.component';
import { KnowledgeCenterinfomanagementComponent } from 'src/app/core-modules/cimex-admin/views/information-sharing/knowledge-centerinfomanagement/knowledge-centerinfomanagement.component';
import { AppNationalitiesComponent } from 'src/app/core-modules/cimex-admin/views/configurations/app-nationalities/app-nationalities.component';
import { AppGenderComponent } from 'src/app/core-modules/cimex-admin/views/configurations/app-gender/app-gender.component';
import { AppPublicationTypesComponent } from 'src/app/core-modules/cimex-admin/views/configurations/app-publication-types/app-publication-types.component';
import { AppSubmissionmethodsComponent } from 'src/app/core-modules/cimex-admin/views/configurations/app-submissionmethods/app-submissionmethods.component';
import { DisclaimerStatementTypesComponent } from 'src/app/core-modules/cimex-admin/views/configurations/disclaimer-statement-types/disclaimer-statement-types.component';
import { AppApplicationtypesComponent } from 'src/app/core-modules/cimex-admin/views/configurations/app-applicationtypes/app-applicationtypes.component';
import { AppFirewallipsComponent } from 'src/app/core-modules/cimex-admin/views/configurations/app-firewallips/app-firewallips.component';
import { KnowledgecenterDashboardComponent } from 'src/app/core-modules/cimex-admin/views/information-sharing/knowledgecenter-dashboard/knowledgecenter-dashboard.component';
import { SubscriptionDashComponent } from 'src/app/core-modules/cimex-admin/views/system-administration/subscription-dash/subscription-dash.component';
import { AppMyprofileComponent } from 'src/app/core-modules/cimex-admin/views/user-management/app-myprofile/app-myprofile.component';
import { SystemsFunctionalitiesComponent } from 'src/app/core-modules/cimex-admin/views/system-administration/system-guidelines/systems-functionalities/systems-functionalities.component';
import { SystemguidelinesDetailComponent } from 'src/app/core-modules/cimex-admin/views/system-administration/system-guidelines/systemguidelines-detail/systemguidelines-detail.component';
import { SystemguidelinesDashComponent } from 'src/app/core-modules/cimex-admin/views/system-administration/system-guidelines/systemguidelines-dash/systemguidelines-dash.component';
import { AppWorkflowsubmissionactionsComponent } from 'src/app/core-modules/cimex-admin/views/workflow-management/workflows/app-workflowsubmissionactions/app-workflowsubmissionactions.component';
import { AppWorkflowstatusesactionsComponent } from 'src/app/core-modules/cimex-admin/views/workflow-management/workflows/app-workflowstatusesactions/app-workflowstatusesactions.component';
import { AppStatusesactionsComponent } from 'src/app/core-modules/cimex-admin/views/workflow-management/workflows/app-statusesactions/app-statusesactions.component';
import { SyslogsComponent } from 'src/app/core-modules/cimex-admin/views/syslogs/syslogs.component';
import { SystemmanualConfigurationComponent } from 'src/app/core-modules/cimex-admin/views/system-administration/system-guidelines/systemmanual-configuration/systemmanual-configuration.component';
import { MultilingualConfigurationsComponent } from 'src/app/core-modules/cimex-admin/views/multilingual-configurations/multilingual-configurations.component';
import { NavigationSetupComponent } from 'src/app/core-modules/cimex-admin/views/workflow-management/navigation/navigation-setup/navigation-setup.component';
import { UserSetupComponent } from 'src/app/core-modules/cimex-admin/views/system-administration/user-setup/user-setup.component';
import { AppSignatoriesComponent } from 'src/app/core-modules/cimex-admin/views/system-administration/app-signatories/app-signatories.component';
import { AppOrganizationinformationComponent } from 'src/app/core-modules/cimex-admin/views/system-administration/app-organizationinformation/app-organizationinformation.component';
import { AppWorkflowactiontypesComponent } from 'src/app/core-modules/cimex-admin/views/workflow-management/workflows/app-workflowactiontypes/app-workflowactiontypes.component';
import { AppWorkflowstatusesinterfacesComponent } from 'src/app/core-modules/cimex-admin/views/workflow-management/workflows/app-workflowstatusesinterfaces/app-workflowstatusesinterfaces.component';
import { UserDashboardComponent } from 'src/app/core-modules/cimex-admin/views/dashboard/user-dashboard/user-dashboard.component';
import { FinanceDashboardComponent } from 'src/app/core-modules/cimex-admin/views/dashboard/finance-dashboard/finance-dashboard.component';
import { ExternalDashboardComponent } from 'src/app/core-modules/cimex-admin/views/dashboard/external-dashboard/external-dashboard.component';
import { CertificateConditionComponent } from 'src/app/core-modules/cimex-admin/views/quality_auditmanagement/certificate-condition/certificate-condition.component';
import { ControlDocmasterlistComponent } from 'src/app/core-modules/cimex-admin/views/quality_auditmanagement/control-docmasterlist/control-docmasterlist.component';
import { ControlDocumentmanagementComponent } from 'src/app/core-modules/cimex-admin/views/quality_auditmanagement/control-documentmanagement/control-documentmanagement.component';
import { DocumentControlsetupComponent } from 'src/app/core-modules/cimex-admin/views/quality_auditmanagement/document-controlsetup/document-controlsetup.component';
import { RegistrationConditionComponent } from 'src/app/core-modules/cimex-admin/views/quality_auditmanagement/registration-condition/registration-condition.component';
import { RegistrationRegulationComponent } from 'src/app/core-modules/cimex-admin/views/quality_auditmanagement/registration-regulation/registration-regulation.component';
import { SopGuidlinesComponent } from 'src/app/core-modules/cimex-admin/views/quality_auditmanagement/sop-guidlines/sop-guidlines.component';
import { AppLayoutComponent } from 'src/app/core-modules/cimex-admin/views/system-layout/app-layout/app-layout.component';
import { AppFormsComponent } from './views/configurations/forms/app-forms-setup/app-forms.component';
import { FormTypesComponent } from './views/configurations/forms/form-types/form-types.component';
import { FormFieldsComponent } from './views/configurations/forms/form-fields/form-fields.component';
import { IntegrationManagementComponent } from './views/integration-management/integration-management.component';

import { GeneralApplicationFormComponent } from './views/configurations/forms/general-application-form/general-application-form.component';
import { DataEntryFormSetupComponent } from './views/configurations/forms/data-entry-form-setup/data-entry-form-setup.component';
import { SharedCtrldrugsconfigurationComponent } from './views/configurations/controlled-drugs-configurations/shared-ctrldrugsconfiguration/shared-ctrldrugsconfiguration.component';
import { TraderAccountManagementComponent } from './views/user-management/trader-account-management/trader-account-management.component';

import { ImportExportconfsetupComponent } from './views/configurations/import-exportconfigurations/import-exportconfsetup/import-exportconfsetup.component';
import { PermitReasonsComponent } from './views/configurations/import-exportconfigurations/permit-reasons/permit-reasons.component';
import { PermittypeCategoriesComponent } from './views/configurations/import-exportconfigurations/permittype-categories/permittype-categories.component';
import { PortentryExitComponent } from './views/configurations/import-exportconfigurations/portentry-exit/portentry-exit.component';
import { SharedImportexportconfigComponent } from './views/configurations/import-exportconfigurations/shared-importexportconfig/shared-importexportconfig.component';
import { ApiUsersComponent } from './views/user-management/api-users/api-users.component';
import { ExternalUsersComponent } from './views/user-management/external-users/external-users.component';
import { RefNumberformatsComponent } from './views/configurations/reference-numberconfigurations/ref-numberformats/ref-numberformats.component';
import { RefNumbertypesComponent } from './views/configurations/reference-numberconfigurations/ref-numbertypes/ref-numbertypes.component';
import { RefNumbervariablesComponent } from './views/configurations/reference-numberconfigurations/ref-numbervariables/ref-numbervariables.component';
import { RefSubmodulesComponent } from './views/configurations/reference-numberconfigurations/ref-submodules/ref-submodules.component';
import { RefnumberConfigsetupComponent } from './views/configurations/reference-numberconfigurations/refnumber-configsetup/refnumber-configsetup.component';
import { SharedRefnumberconfigurationsComponent } from './views/configurations/reference-numberconfigurations/shared-refnumberconfigurations/shared-refnumberconfigurations.component';
import { AgeanalysisDaysspanComponent } from './views/configurations/timeframe-configurations/ageanalysis-daysspan/ageanalysis-daysspan.component';
import { ApplicationProcessdefinationComponent } from './views/configurations/timeframe-configurations/application-processdefination/application-processdefination.component';
import { ProcessdatesSpandefinationComponent } from './views/configurations/timeframe-configurations/processdates-spandefination/processdates-spandefination.component';
import { RegistrationDuetimespanComponent } from './views/configurations/timeframe-configurations/registration-duetimespan/registration-duetimespan.component';
import { SharedTimeframeconfigurationsComponent } from './views/configurations/timeframe-configurations/shared-timeframeconfigurations/shared-timeframeconfigurations.component';
import { TimeframeConfigsetupComponent } from './views/configurations/timeframe-configurations/timeframe-configsetup/timeframe-configsetup.component';
import { LocationCountriesComponent } from './views/configurations/location-parameters/location-countries/location-countries.component';
import { CountryRegionsComponent } from './views/configurations/location-parameters/country-regions/country-regions.component';
import { DistrictcouncilDefinationComponent } from './views/configurations/location-parameters/districtcouncil-defination/districtcouncil-defination.component';
import { DistrictsComponent } from './views/configurations/location-parameters/districts/districts.component';
import { ProvincesComponent } from './views/configurations/location-parameters/provinces/provinces.component';
import { LocationParametersComponent } from './views/configurations/location-parameters/locationpar-configsetup/location-parameters.component';
import { ProcessConfigsetupComponent } from './views/configurations/process-configurations/process-configsetup/process-configsetup.component';
import { InstitutionsInformationComponent } from './views/system-administration/institutions-information/institutions-information.component';
import { RegulatoryFunctionGuidelinesComponent } from './views/system-administration/system-guidelines/regulatory-function-guidelines/regulatory-function-guidelines.component';
import { DmsRepositoryDefinitionComponent } from './views/document-checklistsmng/dms/dms-repository-definition/dms-repository-definition.component';
import { ApplicantWorkflowsetupComponent } from './views/system-administration/Applicant-workflow-Processes/applicant-workflowsetup/applicant-workflowsetup.component';
import { InvoiceTypeComponent } from './views/configurations/permit-application-parameters/invoice-type/invoice-type.component';
import { ModeOfTransportComponent } from './views/configurations/permit-application-parameters/mode-of-transport/mode-of-transport.component';
import { PermitStorageConditionsComponent } from './views/configurations/permit-application-parameters/permit-storage-conditions/permit-storage-conditions.component';
import { PermitappConfigsetupComponent } from './views/configurations/permit-application-parameters/permitapp-configsetup/permitapp-configsetup.component';
import { PortEntryExitComponent } from './views/configurations/permit-application-parameters/port-entry-exit/port-entry-exit.component';
import { PortEntryTypeComponent } from './views/configurations/permit-application-parameters/port-entry-type/port-entry-type.component';
import { SharedPermitapplicationComponent } from './views/configurations/permit-application-parameters/shared-permitapplication/shared-permitapplication.component';
import { TransactionCurrencyComponent } from './views/configurations/permit-application-parameters/transaction-currency/transaction-currency.component';
import { ImportexportProceduredetailsComponent } from './views/configurations/import-export-procedures/importexport-proceduredetails/importexport-proceduredetails.component';
import { ImportexportProceduresConfigsetupComponent } from './views/configurations/import-export-procedures/importexport-procedures-configsetup/importexport-procedures-configsetup.component';
import { ProceduresCategoriesComponent } from './views/configurations/import-export-procedures/procedures-categories/procedures-categories.component';
import { ProceduresSubcategoriesComponent } from './views/configurations/import-export-procedures/procedures-subcategories/procedures-subcategories.component';
import { SharedImportexportProceduresComponent } from './views/configurations/import-export-procedures/shared-importexport-procedures/shared-importexport-procedures.component';
import { StatusesActionsComponent } from './views/user-management/statuses-actions/statuses-actions.component';
import { AppWorkflowstatusesComponent } from './views/workflow-management/workflows/app-workflowstatuses/app-workflowstatuses.component';
import { RegulatoryprocessDocdefinationComponent } from './views/document-checklistsmng/dms/regulatoryprocess-docdefination/regulatoryprocess-docdefination.component';

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
  },
  {
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
  },
  {
    path: "app-institutions-information",
    component: InstitutionsInformationComponent
  },

  {
    path: "app-process-configsetup",
    component: ProcessConfigsetupComponent
  },

  {
    path: 'app-user-access-levels',
    component: UserAccessLevelsComponent
  },
  {
    path: 'app-general-application-form',
    component: GeneralApplicationFormComponent
  },
  {
    path: 'app-data-entry-form-setup',
    component: DataEntryFormSetupComponent
  },
  {
    path: ' app-registration-duetimespan',
    component: RegistrationDuetimespanComponent
  },
  {
    path: 'app-shared-timeframeconfigurations',
    component: SharedTimeframeconfigurationsComponent
  },
  {
    path: 'app-timeframe-configsetup',
    component: TimeframeConfigsetupComponent
  },
  {
    path: 'app-processdates-spandefination',
    component: ProcessdatesSpandefinationComponent
  },
  {
    path: 'app-application-processdefination',
    component: ApplicationProcessdefinationComponent
  },
  {
    path: 'app-ageanalysis-daysspan',
    component: AgeanalysisDaysspanComponent
  },
  {
    path: 'app-user-titles',
    component: AppUserTitle
  }, {
    path: 'app-user-identification-type',
    component: AppUserIdentificationType
  }, {
    path: 'app-institutions',
    component: AppInstitution
  },
  {
    path: 'app-institution-departments',
    component: AppInstitutionDepartments
  },
  {
    path: 'app-app-forms',
    component: AppFormsComponent
  },


  {
    path: 'app-institutions-types',
    component: InstitutionsTypesComponent
  }
    ,
  {
    path: 'app-institutions-details',
    component: InstitutionsDetailsComponent
  },
  {
    path: 'app-form-fields',
    component: FormFieldsComponent
  }
    ,
  {
    path: 'app-form-types',
    component: FormTypesComponent
  },

  {
    path: 'app-dms-repository-definition',
    component: DmsRepositoryDefinitionComponent
  },
  {
    path: 'app-shared-portal-navigations',
    component: NavigationInterfacesComponent,
  }, {
    path: 'regulatoryprocess-docdefination',
    component: RegulatoryprocessDocdefinationComponent
  }, {
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
    path: "app-translationmanagement",
    component: AppTranslationmanagementComponent
  },
  {
    path: "app-invoice-type",
    component: InvoiceTypeComponent
  },
  {
    path: "app-mode-of-transport",
    component: ModeOfTransportComponent
  },
  {
    path: "app-permit-storage-conditions",
    component: PermitStorageConditionsComponent
  },
  {
    path: "app-permitapp-configsetup",
    component: PermitappConfigsetupComponent
  },
  {
    path: "app-port-entry-exit",
    component: PortEntryExitComponent
  },
  {
    path: "app-port-entry-type",
    component: PortEntryTypeComponent
  },
  {
    path: "app-shared-permitapplication",
    component: SharedPermitapplicationComponent
  },

  {
    path: "app-transaction-currency",
    component: TransactionCurrencyComponent
  },
  {
    path: "app-systemlabels",
    component: AppSystemlabelsmanagementComponent
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
  }, {
    path: "disclaimer_statement_types",
    component: DisclaimerStatementTypesComponent
  },

  {
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
    path: 'app-location-countries',
    component: LocationCountriesComponent
  }, {
    path: 'app-country-regions',
    component: CountryRegionsComponent
  },

  {
    path: 'app-districts',
    component: DistrictsComponent
  },
  {
    path: 'app-provinces',
    component: ProvincesComponent
  }, {
    path: 'app-districtcouncil-defination',
    component: DistrictcouncilDefinationComponent
  }, {
    path: 'app-location-parameters',
    component: LocationParametersComponent
  },


  {
    path: 'app-app-workflowstatuses',
    component: AppWorkflowstatusesComponent
  },
  {
    path: 'app-sharedproduct-configurations',
    component: SharedproductConfigurationsComponent
  },
  {
    path: 'app-productconfigurations-setup',
    component: ProductconfigurationsSetupComponent
  },
  {
    path: 'app-storage-condition',
    component: StorageConditionComponent
  },
  {
    path: 'SiUnitsComponent',
    component: SiUnitsComponent
  },
  {
    path: 'app-routeof-administration',
    component: RouteofAdministrationComponent
  },

  {
    path: 'app-reasonfor-inclusion',
    component: ReasonforInclusionComponent
  },
  {
    path: 'app-productsub-categories',
    component: ProductsubCategoriesComponent
  },
  {
    path: 'app-productspecial-category',
    component: ProductspecialCategoryComponent
  },
  {
    path: 'app-productclass-categories',
    component: ProductclassCategoriesComponent
  },
  {
    path: 'app-product-forms',
    component: ProductFormsComponent
  },
  {
    path: 'app-prodclassification-rules',
    component: ProdclassificationRulesComponent
  },
  {
    path: 'app-prodclassification-categories',
    component: ProdclassificationCategoriesComponent
  },
  {
    path: 'app-nutrients',
    component: NutrientsComponent
  },
  {
    path: 'app-methodof-use',
    component: MethodofUseComponent
  },
  {
    path: 'app-master-ingredients',
    component: MasterIngredientsComponent
  },
  {
    path: 'app-intendedend-user',
    component: IntendedendUserComponent
  },
  {
    path: 'app-intendedend-use',
    component: IntendedendUseComponent
  },
  {
    path: 'app-ingredients-specifications',
    component: IngredientsSpecificationsComponent
  },
  {
    path: 'app-ingredients-category',
    component: IngredientsCategoryComponent
  },

  {
    path: 'app-ingredient-type',
    component: IngredientTypeComponent
  },
  {
    path: 'app-gmdn-codes',
    component: GmdnCodesComponent
  },
  {
    path: 'app-gmdn-categories',
    component: GmdnCategoriesComponent
  },
  {
    path: 'app-dosage-form',
    component: DosageFormComponent
  },
  {
    path: 'app-distribution-category',
    component: DistributionCategoryComponent
  },
  {
    path: 'app-device-types',
    component: DeviceTypesComponent
  },
  {
    path: 'app-common-name',
    component: CommonNameComponent
  },
  {
    path: 'app-classification-rules',
    component: ClassificationRulesComponent
  },
  {
    path: 'app-classification',
    component: ClassificationComponent
  },
  {
    path: 'app-atccodes-definations',
    component: AtccodesDefinationsComponent
  },
  {
    path: 'app-assessment-procedures',
    component: AssessmentProceduresComponent
  },
  
  {
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
    component: AppWorkflowactiontypesComponent
  },

  {
    path: 'app-ref-numberformats',
    component: RefNumberformatsComponent,
  },
  {
    path: 'app-regulatory-function-guidelines',
    component: RegulatoryFunctionGuidelinesComponent
  },
  {
    path: 'app-ref-numbertypes',
    component: RefNumbertypesComponent,
  },
  {
    path: 'app-ref-numbervariables',
    component: RefNumbervariablesComponent,
  }, {
    path: 'app-ref-submodules',
    component: RefSubmodulesComponent,
  }, {
    path: 'app-refnumber-configsetup',
    component: RefnumberConfigsetupComponent
  }, {
    path: 'app-shared-refnumberconfigurations',
    component: SharedRefnumberconfigurationsComponent,
  },
  {
    path: 'app-workflowstatusesinterfaces',
    component: AppWorkflowstatusesinterfacesComponent
  }
    , {
    path: 'app-user-dashboard',
    component: UserDashboardComponent
  }
    , {
    path: 'app-finance-dashboard',
    component: FinanceDashboardComponent
  }
    , {
    path: 'app-external-dashboard',
    component: ExternalDashboardComponent
  },
  {
    path: 'app-applicant-workflowsetup',
    component: ApplicantWorkflowsetupComponent
  },

  {
    path: 'app-shared-ctrldrugsconfiguration',
    component: SharedCtrldrugsconfigurationComponent
  },

  {
    path: 'app-import-exportconfsetup',
    component: ImportExportconfsetupComponent
  },
  {
    path: 'app-permit-reasons',
    component: PermitReasonsComponent
  },
  {
    path: 'app-permittype-categories',
    component: PermittypeCategoriesComponent
  },
  {
    path: 'app-portentry-exit',
    component: PortentryExitComponent
  },
  {
    path: 'app-shared-importexportconfig',
    component: SharedImportexportconfigComponent
  },

  {
    path: 'app-certificate-condition',
    component: CertificateConditionComponent
  },
  {
    path: 'app-control-docmasterlist',
    component: ControlDocmasterlistComponent
  },
  {
    path: 'app-control-documentmanagement',
    component: ControlDocumentmanagementComponent
  },
  {
    path: 'app-document-controlsetup',
    component: DocumentControlsetupComponent
  },
  {
    path: 'app-registration-condition',
    component: RegistrationConditionComponent
  },
  {
    path: 'app-registration-regulation',
    component: RegistrationRegulationComponent
  },
  {
    path: 'app-sop-guidlines',
    component: SopGuidlinesComponent
  },

  {
    path: 'app-integration-management',
    component: IntegrationManagementComponent
  },
  {
    path: 'trader-account-management',
    component: TraderAccountManagementComponent
  },
  {
    path: 'api-users',
    component: ApiUsersComponent
  },
  {
    path: 'external-users',
    component: ExternalUsersComponent
  },
  {
    path: 'app-importexport-proceduredetails',
    component: ImportexportProceduredetailsComponent

  },
  {
    path: 'app-importexport-procedures-configsetup',
    component: ImportexportProceduresConfigsetupComponent
  },
  {
    path: 'app-procedures-categories',
    component: ProceduresCategoriesComponent
  },
  {
    path: 'app-procedures-subcategories',
    component: ProceduresSubcategoriesComponent
  },
  {
    path: 'app-shared-importexport-procedures',
    component: SharedImportexportProceduresComponent
  },
  {
    path: 'app-statuses-actions',
    component: StatusesActionsComponent
  }]
}]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingDashboardModule { }
