
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { DxValidatorModule, DxDropDownButtonModule, DxTreeListModule, DxLoadPanelModule, DxToolbarModule, DxActionSheetModule, DxFileUploaderModule, DxDataGridModule, DxPopupModule, DxButtonModule, DxDateBoxModule, DxTextBoxModule, DxSelectBoxModule, DxTextAreaModule, DxContextMenuModule, DxMenuModule, DxCheckBoxModule, DxNumberBoxModule, DxTagBoxModule, DxTabPanelModule, DxFormModule, DxScrollViewModule, DxHtmlEditorModule, DxDropDownBoxModule, DxRadioGroupModule, DxProgressBarModule, DxChartModule, DxBulletModule, DxDataGridComponent, DxDiagramModule, DxDiagramComponent, DxCalendarModule, DxTabsModule, DxSwitchModule, DxResponsiveBoxModule, DxDrawerModule } from 'devextreme-angular';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DxoExportModule } from 'devextreme-angular/ui/nested';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input-gg';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppdashboardComponent } from './views/appdashboard/appdashboard.component';
import { AppfooterComponent } from './views/system-layout/appfooter/appfooter.component';
import { AppheaderComponent } from './views/system-layout/appheader/appheader.component';
import { AppLayoutComponent } from './views/system-layout/app-layout/app-layout.component';
import { AppmenuComponent } from './views/system-layout/appmenu/appmenu.component';
import { AppMyprofileComponent } from './views/user-management/app-myprofile/app-myprofile.component';
import { UserAccessLevelsComponent } from './views/system-administration/user-access-levels/user-access-levels.component';
import { UserGroupsComponent } from './views/system-administration/user-groups/user-groups.component';
import { SharedconfigurationsComponent } from './views/configurations/sharedconfigurations/sharedconfigurations.component';
import { AppCitiesComponent } from './views/configurations/app-cities/app-cities.component';
import { AppCountriesComponent } from './views/configurations/app-countries/app-countries.component';
import { AppUserTitle } from './views/configurations/app-usertitle/app-usertitle.component';
import { AppUserIdentificationType } from './views/configurations/app-useridentificationtype/app-useridentificationtype.component';
import { AppInstitution } from './views/configurations/app-institution/app-institution.component';
import { AppInstitutionDepartments } from './views/app-institutiondepartments/app-institutiondepartments.component';
import { AppActiveUserAccounts } from './views/user-management/app-activeuseraccounts/app-activeuseraccounts.component';
import { RecursiveMenuDirective } from './views/system-layout/appmenu/recursive-menu.directive';
import { AppCurrenciesComponent } from './views/configurations/app-currencies/app-currencies.component';
import { AppAuditTrail } from './views/app-misaudittrail/app-misaudittrail.component';
import { AppPartnerStates } from './views/configurations/app-partnerstates/app-partnerstates.component';
import { AppNotificationsComponent } from './views/app-notifications/app-notifications.component';
import { AppDashboardsectionsComponent } from './views/app-dashboardsections/app-dashboardsections.component';
import { SystemAdministratorsComponent } from './views/user-management/admins/system-administrators/system-administrators.component';
import { ReportsanalyticsdashboardComponent } from './views/dashboard/reportsanalytics/reportsanalyticsdashboard/reportsanalyticsdashboard.component';
import { AppNmrasinfoComponent } from './views/app-nmrasinfo/app-nmrasinfo.component';
import { SharedNavigationsComponent } from './views/workflow-management/navigation/shared-navigations/shared-navigations.component';
import { NavigationsComponent } from './views/workflow-management/navigation/navigations/navigations.component';
import { NavigationLevelsComponent } from './views/workflow-management/navigation/navigation-levels/navigation-levels.component';
import { NavigationTypesComponent } from './views/workflow-management/navigation/navigation-types/navigation-types.component';
import { NavigationInterfacesComponent } from './views/workflow-management/navigation/navigation-interfaces/navigation-interfaces.component';
import { AppExchangeratesComponent } from './views/configurations/app-exchangerates/app-exchangerates.component';
import { AppProcessworkflowstatusesComponent } from './views/workflow-management/workflows/app-processworkflowstatuses/app-processworkflowstatuses.component';
import { AppSystemprocessesComponent } from './views/workflow-management/workflows/app-systemprocesses/app-systemprocesses.component';
import { AppProcessworkflowtransitionsComponent } from './views/workflow-management/workflows/app-processworkflowtransitions/app-processworkflowtransitions.component';
import { AppProcessworkflowsstagesComponent } from './views/workflow-management/workflows/app-processworkflowsstages/app-processworkflowsstages.component';
import { AppProcessworkflowsComponent } from './views/workflow-management/workflows/app-processworkflows/app-processworkflows.component';
import { AppSharedworkflowComponent } from './views/workflow-management/workflows/app-sharedworkflow/app-sharedworkflow.component';
import { SharedusermanagementComponent } from './views/user-management/sharedusermanagement/sharedusermanagement.component';
import { SharedSysAdministrationComponent } from './views/system-administration/shared-sys-administration/shared-sys-administration.component';
import { AppstageStatusesComponent } from './views/workflow-management/workflows/appstage-statuses/appstage-statuses.component';

import { AppTranslationmanagementComponent } from './views/language-management/app-translationmanagement/app-translationmanagement.component';
import { AppSystemlanguagesComponent } from './views/language-management/app-systemlanguages/app-systemlanguages.component';
import { AppSystemlabelsmanagementComponent } from './views/language-management/app-systemlabelsmanagement/app-systemlabelsmanagement.component';

import { UserAccounttypesComponent } from './views/system-administration/user-accounttypes/user-accounttypes.component';
import { SystemDashbordtypesComponent } from './views/system-administration/system-dashbordtypes/system-dashbordtypes.component';
import { InstitutionsDepartmentsComponent } from './views/system-administration/institutions-departments/institutions-departments.component';
import { InstitutionsDetailsComponent } from './views/system-administration/institutions-details/institutions-details.component';
import { InstitutionsTypesComponent } from './views/system-administration/institutions-types/institutions-types.component';
import { UsermanagementDashboardComponent } from './views/user-management/usermanagement-dashboard/usermanagement-dashboard.component';
import { ShareusermanagementClassComponent } from './views/user-management/shareusermanagement-class/shareusermanagement-class.component';
import { ApplicationDocumentuploadsComponent } from './views/utilities/application-documentuploads/application-documentuploads.component';
import { ApplicationWorkflowsubmissionsComponent } from './views/utilities/application-workflowsubmissions/application-workflowsubmissions.component';
import { PublicationDashboardComponent } from './views/information-sharing/publication-dashboard/publication-dashboard.component';
import { EcredResourcesmanagementComponent } from './views/information-sharing/ecred-resourcesmanagement/ecred-resourcesmanagement.component';
import { AppNationalitiesComponent } from './views/configurations/app-nationalities/app-nationalities.component';
import { AppGenderComponent } from './views/configurations/app-gender/app-gender.component';
import { AppPublicationTypesComponent } from './views/configurations/app-publication-types/app-publication-types.component';
import { AppSubmissionmethodsComponent } from './views/configurations/app-submissionmethods/app-submissionmethods.component';
import { DisclaimerStatementTypesComponent } from './views/configurations/disclaimer-statement-types/disclaimer-statement-types.component';
import { DisclaimerStatementsComponent } from './views/configurations/disclaimer-statements/disclaimer-statements.component';
import { TruncateWordsadminPipe } from 'src/app/core-services/TruncateWordsadminPipe';
import { AppProcesssubmissionComponent } from './views/utilities/app-processsubmission/app-processsubmission.component';
import { AppDosageformsComponent } from './views/configurations/app-dosageforms/app-dosageforms.component';
import { AppApplicationtypesComponent } from './views/configurations/app-applicationtypes/app-applicationtypes.component';
import { AppFirewallipsComponent } from './views/configurations/app-firewallips/app-firewallips.component';
import { EcredResourcedashboardComponent } from './views/information-sharing/ecred-resourcedashboard/ecred-resourcedashboard.component';
import { KnowledgecenterDashboardComponent } from './views/information-sharing/knowledgecenter-dashboard/knowledgecenter-dashboard.component';
import { SystemsFunctionalitiesComponent } from './views/system-administration/system-guidelines/systems-functionalities/systems-functionalities.component';
import { SystemguidelinesDetailComponent } from './views/system-administration/system-guidelines/systemguidelines-detail/systemguidelines-detail.component';
import { SystemguidelinesDashComponent } from './views/system-administration/system-guidelines/systemguidelines-dash/systemguidelines-dash.component';
import { AppWorkflowsubmissionactionsComponent } from './views/workflow-management/workflows/app-workflowsubmissionactions/app-workflowsubmissionactions.component';
import { AppWorkflowstatusesactionsComponent } from './views/workflow-management/workflows/app-workflowstatusesactions/app-workflowstatusesactions.component';
import { AppStatusesactionsComponent } from './views/workflow-management/workflows/app-statusesactions/app-statusesactions.component';
import { AdminsystemguudelinesDetailsComponent } from 'src/app/shared-views/utilitiescomponents/adminsystemguudelines-details/adminsystemguudelines-details.component';
import { SyserrorLogsComponent } from './views/user-logs/syserror-logs/syserror-logs.component';
import { UserloginLogsComponent } from './views/user-logs/userlogin-logs/userlogin-logs.component';
import { UserpwdresetrequestLogsComponent } from './views/user-logs/userpwdresetrequest-logs/userpwdresetrequest-logs.component';
import { UserpwdchangerequestLogsComponent } from './views/user-logs/userpwdchangerequest-logs/userpwdchangerequest-logs.component';
import { UsermaliciousaccessComponent } from './views/user-logs/usermaliciousaccess/usermaliciousaccess.component';
import { SyslogsUsersaccessComponent } from './views/user-logs/syslogs-usersaccess/syslogs-usersaccess.component';
import { SyslogsComponent } from './views/syslogs/syslogs.component';
import { UserloginoutLogsComponent } from './views/user-login-logs/userloginout-logs/userloginout-logs.component';
import { UserfaildloginsLogsComponent } from './views/user-login-logs/userfaildlogins-logs/userfaildlogins-logs.component';
import { SystemmanualConfigurationComponent } from './views/system-administration/system-guidelines/systemmanual-configuration/systemmanual-configuration.component';
import { SigninSignupGuidelinesComponent } from './views/system-administration/system-guidelines/signin-signup-guidelines/signin-signup-guidelines.component';
import { TermsconditionsDetailsComponent } from './views/system-administration/system-guidelines/termsconditions-details/termsconditions-details.component';
import { GuidelinesoptionsComponent } from './views/system-administration/system-guidelines/guidelinesoptions/guidelinesoptions.component';
import { MultilingualConfigurationsComponent } from './views/multilingual-configurations/multilingual-configurations.component';
import { NavigationSetupComponent } from './views/workflow-management/navigation/navigation-setup/navigation-setup.component';
import { ExpertprofileSetupComponent } from './views/configurations/expertprofile-setup/expertprofile-setup.component';
import { InstitutionsInformationComponent } from './views/system-administration/institutions-information/institutions-information.component';
import { UserSetupComponent } from './views/system-administration/user-setup/user-setup.component';
import { AppOrganizationinformationComponent } from './views/system-administration/app-organizationinformation/app-organizationinformation.component';
import { AppSignatoriesComponent } from './views/system-administration/app-signatories/app-signatories.component';
import { AppWorkflowactiontypesComponent } from './views/workflow-management/workflows/app-workflowactiontypes/app-workflowactiontypes.component';
import { AppWorkflowstatusesinterfacesComponent } from './views/workflow-management/workflows/app-workflowstatusesinterfaces/app-workflowstatusesinterfaces.component';
import { KnowledgeCenterinfomanagementComponent } from './views/information-sharing/knowledge-centerinfomanagement/knowledge-centerinfomanagement.component';
import { AppGenericnamesComponent } from './views/configurations/app-genericnames/app-genericnames.component';
import { UserDashboardComponent } from './views/dashboard/user-dashboard/user-dashboard.component';
import { FinanceDashboardComponent } from './views/dashboard/finance-dashboard/finance-dashboard.component';
import { ExternalDashboardComponent } from './views/dashboard/external-dashboard/external-dashboard.component';
import { SharedPortalNavigationsComponent } from './views/workflow-management/portal-navigations/shared-portal-navigations/shared-portal-navigations.component';
import { PortalNavigationComponent } from './views/workflow-management/portal-navigations/portal-navigations/portal-navigations.component';
import { PortalNavigationTypesComponent } from './views/workflow-management/portal-navigations/portal-navigation-types/portal-navigation-types.component';
import { PortalNavigationSetupComponent } from './views/workflow-management/portal-navigations/portal-navigation-setup/portal-navigation-setup.component';
import { PortalNavigationLevelsComponent } from './views/workflow-management/portal-navigations/portal-navigation-levels/portal-navigation-levels.component';
import { PortalNavigationInterfacesComponent } from './views/workflow-management/portal-navigations/portal-navigation-interfaces/portal-navigation-interfaces.component';
import { CertificateConditionComponent } from './views/quality_auditmanagement/certificate-condition/certificate-condition.component';
import { ControlDocmasterlistComponent } from './views/quality_auditmanagement/control-docmasterlist/control-docmasterlist.component';
import { ControlDocumentmanagementComponent } from './views/quality_auditmanagement/control-documentmanagement/control-documentmanagement.component';
import { DocumentControlsetupComponent } from './views/quality_auditmanagement/document-controlsetup/document-controlsetup.component';
import { RegistrationConditionComponent } from './views/quality_auditmanagement/registration-condition/registration-condition.component';
import { RegistrationRegulationComponent } from './views/quality_auditmanagement/registration-regulation/registration-regulation.component';
import { PortalTermsComponent } from './views/workflow-management/portal-modules/portal-terms/portal-terms.component';
import { PortalProcessesComponent } from './views/workflow-management/portal-modules/portal-processes/portal-processes.component';
import { PortalProcessguidelinesComponent } from './views/workflow-management/portal-modules/portal-processguidelines/portal-processguidelines.component';
import { PortalStatusactionsComponent } from './views/workflow-management/portal-modules/portal-statusactions/portal-statusactions.component';
import { PortalServicesComponent } from './views/workflow-management/portal-modules/portal-services/portal-services.component';
import { PortalProcesstransitionComponent } from './views/workflow-management/portal-modules/portal-processtransition/portal-processtransition.component';
import { PortalDocdefinationComponent } from './views/workflow-management/portal-modules/portal-docdefination/portal-docdefination.component';
import { AppFormsComponent } from './views/configurations/forms/app-forms-setup/app-forms.component';
import { DynamicFormComponent } from './views/configurations/forms/dynamic-form/dynamic-form.component';
import { FormFieldsComponent } from './views/configurations/forms/form-fields/form-fields.component';
import { FormTypesComponent } from './views/configurations/forms/form-types/form-types.component';
import { AdminRoutingDashboardModule } from './admin-routing-dashboard.module';
import { IntegrationManagementComponent } from './views/integration-management/integration-management.component';

import { GeneralApplicationFormComponent } from './views/configurations/forms/general-application-form/general-application-form.component';
import { DataEntryFormSetupComponent } from './views/configurations/forms/data-entry-form-setup/data-entry-form-setup.component';
import { AnnualCeilconfComponent } from './views/configurations/controlled-drugs-configurations/annual-ceilingconfiguration/annual-ceilconf.component';
import { CtrlDrugsbasesaltsComponent } from './views/configurations/controlled-drugs-configurations/ctrl-drugsbasesalts/ctrl-drugsbasesalts.component';
import { CtrlDrugsconvfactComponent } from './views/configurations/controlled-drugs-configurations/ctrl-drugsconvfact/ctrl-drugsconvfact.component';
import { CtrlDrugssaltsComponent } from './views/configurations/controlled-drugs-configurations/ctrl-drugssalts/ctrl-drugssalts.component';
import { CtrlDrugssubstancesComponent } from './views/configurations/controlled-drugs-configurations/ctrl-drugssubstances/ctrl-drugssubstances.component';
import { CtrlDrugstypeComponent } from './views/configurations/controlled-drugs-configurations/ctrl-drugstype/ctrl-drugstype.component';
import { ControlleddrugsConfsetupComponent } from './views/configurations/controlled-drugs-configurations/controlleddrugs-confsetup/controlleddrugs-confsetup.component';
import { SharedCtrldrugsconfigurationComponent } from './views/configurations/controlled-drugs-configurations/shared-ctrldrugsconfiguration/shared-ctrldrugsconfiguration.component';
import { TraderAccountManagementComponent } from './views/user-management/trader-account-management/trader-account-management.component';

import { ImportExportconfsetupComponent } from './views/configurations/import-exportconfigurations/import-exportconfsetup/import-exportconfsetup.component';
import { PermitReasonsComponent } from './views/configurations/import-exportconfigurations/permit-reasons/permit-reasons.component';
import { PermittypeCategoriesComponent } from './views/configurations/import-exportconfigurations/permittype-categories/permittype-categories.component';
import { PortentryExitComponent } from './views/configurations/import-exportconfigurations/portentry-exit/portentry-exit.component';
import { SharedImportexportconfigComponent } from './views/configurations/import-exportconfigurations/shared-importexportconfig/shared-importexportconfig.component';
import { AssessmentProcedureComponent } from './views/configurations/gmp-configurations/assessment-procedure/assessment-procedure.component';
import { GmpConfigsetupComponent } from './views/configurations/gmp-configurations/gmp-configsetup/gmp-configsetup.component';
import { GmpProductcategoryComponent } from './views/configurations/gmp-configurations/gmp-productcategory/gmp-productcategory.component';
import { GmpProductlineComponent } from './views/configurations/gmp-configurations/gmp-productline/gmp-productline.component';
import { SharedGmpconfigurationsComponent } from './views/configurations/gmp-configurations/shared-gmpconfigurations/shared-gmpconfigurations.component';
import { AdvertisementTypesComponent } from './views/configurations/promotional_advertisements_configurations/advertisement-types/advertisement-types.component';
import { PromotionMaterialsComponent } from './views/configurations/promotional_advertisements_configurations/promotion-materials/promotion-materials.component';
import { PromotionalAdvertconfigsetupComponent } from './views/configurations/promotional_advertisements_configurations/promotional-advertconfigsetup/promotional-advertconfigsetup.component';
import { SharedPromotionAdvertConfigurationsComponent } from './views/configurations/promotional_advertisements_configurations/shared-promotion-advert-configurations/shared-promotion-advert-configurations.component';
import { BusinessCategoriesComponent } from './views/configurations/premises-configurations/business-categories/business-categories.component';
import { BusinessScalesComponent } from './views/configurations/premises-configurations/business-scales/business-scales.component';
import { BusinessTypeCategoryComponent } from './views/configurations/premises-configurations/business-type-category/business-type-category.component';
import { BusinessTypeDetailsComponent } from './views/configurations/premises-configurations/business-type-details/business-type-details.component';
import { BusinessTypesComponent } from './views/configurations/premises-configurations/business-types/business-types.component';
import { PersonnelInstitutionsComponent } from './views/configurations/premises-configurations/personnel-institutions/personnel-institutions.component';
import { PersonnelPositionComponent } from './views/configurations/premises-configurations/personnel-position/personnel-position.component';
import { PersonnelQualificationsComponent } from './views/configurations/premises-configurations/personnel-qualifications/personnel-qualifications.component';
import { PersonnelstudyFieldComponent } from './views/configurations/premises-configurations/personnelstudy-field/personnelstudy-field.component';
import { PremiseConfigsetupComponent } from './views/configurations/premises-configurations/premise-configsetup/premise-configsetup.component';
import { PremiseTypeComponent } from './views/configurations/premises-configurations/premise-type/premise-type.component';
import { PremiseinspectRecommendationComponent } from './views/configurations/premises-configurations/premiseinspect-recommendation/premiseinspect-recommendation.component';
import { SharedPremisesconfigurationsComponent } from './views/configurations/premises-configurations/shared-premisesconfigurations/shared-premisesconfigurations.component';
import { PmsConfigsetupComponent } from './views/configurations/pms-configurations/pms-configsetup/pms-configsetup.component';
import { PmsScreeningdecisionsComponent } from './views/configurations/pms-configurations/pms-screeningdecisions/pms-screeningdecisions.component';
import { PmsanalysisDecisionComponent } from './views/configurations/pms-configurations/pmsanalysis-decision/pmsanalysis-decision.component';
import { PmsapprovalDecisionComponent } from './views/configurations/pms-configurations/pmsapproval-decision/pmsapproval-decision.component';
import { PmsevaluationDecisionsComponent } from './views/configurations/pms-configurations/pmsevaluation-decisions/pmsevaluation-decisions.component';
import { PmssamplingStagesComponent } from './views/configurations/pms-configurations/pmssampling-stages/pmssampling-stages.component';
import { PmstcmeetingDecisionComponent } from './views/configurations/pms-configurations/pmstcmeeting-decision/pmstcmeeting-decision.component';
import { SampleApplicationtypesComponent } from './views/configurations/pms-configurations/sample-applicationtypes/sample-applicationtypes.component';
import { SamplingReasonComponent } from './views/configurations/pms-configurations/sampling-reason/sampling-reason.component';
import { SharedPmsconfigurationsComponent } from './views/configurations/pms-configurations/shared-pmsconfigurations/shared-pmsconfigurations.component';
import { PortalworkflowsComponent } from './views/workflow-management/portal-workflows/portalworkflows/portalworkflows.component';
import { PortalWorkflowsetupComponent } from './views/workflow-management/portal-workflows/portal-workflowsetup/portal-workflowsetup.component';
import { PortalInterfacesComponent } from './views/workflow-management/portal-workflows/portal-interfaces/portal-interfaces.component';
import { AgeGroupsComponent } from './views/configurations/clinical-trialconfigurations/age-groups/age-groups.component';
import { ClinicalTrialpersonnelComponent } from './views/configurations/clinical-trialconfigurations/clinical-trialpersonnel/clinical-trialpersonnel.component';
import { ClinicalallocationSequenceComponent } from './views/configurations/clinical-trialconfigurations/clinicalallocation-sequence/clinicalallocation-sequence.component';
import { ClinicaldiseaseConditionsComponent } from './views/configurations/clinical-trialconfigurations/clinicaldisease-conditions/clinicaldisease-conditions.component';
import { ClinicalinterventAllocationComponent } from './views/configurations/clinical-trialconfigurations/clinicalintervent-allocation/clinicalintervent-allocation.component';
import { ClinicalinterventTypesComponent } from './views/configurations/clinical-trialconfigurations/clinicalintervent-types/clinicalintervent-types.component';
import { ClinicalinterventionAssignmentComponent } from './views/configurations/clinical-trialconfigurations/clinicalintervention-assignment/clinicalintervention-assignment.component';
import { ClinicalmaskingBindingComponent } from './views/configurations/clinical-trialconfigurations/clinicalmasking-binding/clinicalmasking-binding.component';
import { ClinicalmaskingUsedComponent } from './views/configurations/clinical-trialconfigurations/clinicalmasking-used/clinicalmasking-used.component';
import { ClinicalnatureControlsComponent } from './views/configurations/clinical-trialconfigurations/clinicalnature-controls/clinicalnature-controls.component';
import { ClinicaloutcomesTypesComponent } from './views/configurations/clinical-trialconfigurations/clinicaloutcomes-types/clinicaloutcomes-types.component';
import { ClinicalrecruitStatusesComponent } from './views/configurations/clinical-trialconfigurations/clinicalrecruit-statuses/clinicalrecruit-statuses.component';
import { ClinicalreportTypesComponent } from './views/configurations/clinical-trialconfigurations/clinicalreport-types/clinicalreport-types.component';
import { ClinicalsequenceGenerationComponent } from './views/configurations/clinical-trialconfigurations/clinicalsequence-generation/clinicalsequence-generation.component';
import { ClinicalstudyPhaseComponent } from './views/configurations/clinical-trialconfigurations/clinicalstudy-phase/clinicalstudy-phase.component';
import { ClinicalstudyPurposesComponent } from './views/configurations/clinical-trialconfigurations/clinicalstudy-purposes/clinicalstudy-purposes.component';
import { ClinicalstudyStatusComponent } from './views/configurations/clinical-trialconfigurations/clinicalstudy-status/clinicalstudy-status.component';
import { ClinicaltrialDesignsComponent } from './views/configurations/clinical-trialconfigurations/clinicaltrial-designs/clinicaltrial-designs.component';
import { FundingsourceTypesComponent } from './views/configurations/clinical-trialconfigurations/fundingsource-types/fundingsource-types.component';
import { SponsorLevelsComponent } from './views/configurations/clinical-trialconfigurations/sponsor-levels/sponsor-levels.component';
import { SponsorsNatureComponent } from './views/configurations/clinical-trialconfigurations/sponsors-nature/sponsors-nature.component';
import { StudySitesComponent } from './views/configurations/clinical-trialconfigurations/study-sites/study-sites.component';
import { ClinicaltrialConfigsetupComponent } from './views/configurations/clinical-trialconfigurations/clinicaltrial-configsetup/clinicaltrial-configsetup.component';
import { SharedclinicalTrialconfigurationsComponent } from './views/configurations/clinical-trialconfigurations/sharedclinical-trialconfigurations/sharedclinical-trialconfigurations.component';
import { ApiUsersComponent } from './views/user-management/api-users/api-users.component';
import { ExternalUsersComponent } from './views/user-management/external-users/external-users.component';
import { RefNumberformatsComponent } from './views/configurations/reference-numberconfigurations/ref-numberformats/ref-numberformats.component';
import { RefNumbertypesComponent } from './views/configurations/reference-numberconfigurations/ref-numbertypes/ref-numbertypes.component';
import { RefNumbervariablesComponent } from './views/configurations/reference-numberconfigurations/ref-numbervariables/ref-numbervariables.component';
import { RefSubmodulesComponent } from './views/configurations/reference-numberconfigurations/ref-submodules/ref-submodules.component';
import { SharedRefnumberconfigurationsComponent } from './views/configurations/reference-numberconfigurations/shared-refnumberconfigurations/shared-refnumberconfigurations.component';
import { RefnumberConfigsetupComponent } from './views/configurations/reference-numberconfigurations/refnumber-configsetup/refnumber-configsetup.component';
import { AgeanalysisDaysspanComponent } from './views/configurations/timeframe-configurations/ageanalysis-daysspan/ageanalysis-daysspan.component';
import { ApplicationProcessdefinationComponent } from './views/configurations/timeframe-configurations/application-processdefination/application-processdefination.component';
import { ProcessdatesSpandefinationComponent } from './views/configurations/timeframe-configurations/processdates-spandefination/processdates-spandefination.component';
import { RegistrationDuetimespanComponent } from './views/configurations/timeframe-configurations/registration-duetimespan/registration-duetimespan.component';
import { SharedTimeframeconfigurationsComponent } from './views/configurations/timeframe-configurations/shared-timeframeconfigurations/shared-timeframeconfigurations.component';
import { TimeframeConfigsetupComponent } from './views/configurations/timeframe-configurations/timeframe-configsetup/timeframe-configsetup.component';
import { CountryRegionsComponent } from './views/configurations/location-parameters/country-regions/country-regions.component';
import { DistrictcouncilDefinationComponent } from './views/configurations/location-parameters/districtcouncil-defination/districtcouncil-defination.component';
import { DistrictsComponent } from './views/configurations/location-parameters/districts/districts.component';
import { ProvincesComponent } from './views/configurations/location-parameters/provinces/provinces.component';
import { LocationCountriesComponent } from './views/configurations/location-parameters/location-countries/location-countries.component';
import { LocationParametersComponent } from './views/configurations/location-parameters/locationpar-configsetup/location-parameters.component';
import { AssessmentProceduresComponent } from './views/configurations/product-configurations/assessment-procedures/assessment-procedures.component';
import { AtccodesDefinationsComponent } from './views/configurations/product-configurations/atccodes-definations/atccodes-definations.component';
import { ClassificationRulesComponent } from './views/configurations/product-configurations/classification-rules/classification-rules.component';
import { ClassificationComponent } from './views/configurations/product-configurations/classification/classification.component';
import { CommonNameComponent } from './views/configurations/product-configurations/common-name/common-name.component';
import { DeviceTypesComponent } from './views/configurations/product-configurations/device-types/device-types.component';
import { DistributionCategoryComponent } from './views/configurations/product-configurations/distribution-category/distribution-category.component';
import { DosageFormComponent } from './views/configurations/product-configurations/dosage-form/dosage-form.component';
import { GmdnCategoriesComponent } from './views/configurations/product-configurations/gmdn-categories/gmdn-categories.component';
import { IngredientTypeComponent } from './views/configurations/product-configurations/ingredient-type/ingredient-type.component';
import { IngredientsCategoryComponent } from './views/configurations/product-configurations/ingredients-category/ingredients-category.component';
import { IngredientsSpecificationsComponent } from './views/configurations/product-configurations/ingredients-specifications/ingredients-specifications.component';
import { IntendedendUseComponent } from './views/configurations/product-configurations/intendedend-use/intendedend-use.component';
import { IntendedendUserComponent } from './views/configurations/product-configurations/intendedend-user/intendedend-user.component';
import { MasterIngredientsComponent } from './views/configurations/product-configurations/master-ingredients/master-ingredients.component';
import { MethodofUseComponent } from './views/configurations/product-configurations/methodof-use/methodof-use.component';
import { NutrientsComponent } from './views/configurations/product-configurations/nutrients/nutrients.component';
import { ProdclassificationCategoriesComponent } from './views/configurations/product-configurations/prodclassification-categories/prodclassification-categories.component';
import { ProdclassificationRulesComponent } from './views/configurations/product-configurations/prodclassification-rules/prodclassification-rules.component';
import { ProductFormsComponent } from './views/configurations/product-configurations/product-forms/product-forms.component';
import { ProductclassCategoriesComponent } from './views/configurations/product-configurations/productclass-categories/productclass-categories.component';
import { ProductconfigurationsSetupComponent } from './views/configurations/product-configurations/productconfigurations-setup/productconfigurations-setup.component';
import { ProductspecialCategoryComponent } from './views/configurations/product-configurations/productspecial-category/productspecial-category.component';
import { ProductsubCategoriesComponent } from './views/configurations/product-configurations/productsub-categories/productsub-categories.component';
import { ReasonforInclusionComponent } from './views/configurations/product-configurations/reasonfor-inclusion/reasonfor-inclusion.component';
import { RouteofAdministrationComponent } from './views/configurations/product-configurations/routeof-administration/routeof-administration.component';
import { SharedproductConfigurationsComponent } from './views/configurations/product-configurations/sharedproduct-configurations/sharedproduct-configurations.component';
import { SiUnitsComponent } from './views/configurations/product-configurations/si-units/si-units.component';
import { StorageConditionComponent } from './views/configurations/product-configurations/storage-condition/storage-condition.component';
import { GmdnCodesComponent } from './views/configurations/product-configurations/gmdn-codes/gmdn-codes.component';
import { AdvertisementChannelComponent } from './views/configurations/promotional_advertisements_configurations/advertisement-channel/advertisement-channel.component';
import { PrommaterialBookcataloguesComponent } from './views/configurations/promotional_advertisements_configurations/prommaterial-bookcatalogues/prommaterial-bookcatalogues.component';
import { PromotionadvertChannelsComponent } from './views/configurations/promotional_advertisements_configurations/promotionadvert-channels/promotionadvert-channels.component';
import { PromotionmaterialCategoriesComponent } from './views/configurations/promotional_advertisements_configurations/promotionmaterial-categories/promotionmaterial-categories.component';
import { SharedDocumentchecklistmngComponent } from './views/document-checklistsmng/shared-documentchecklistmng/shared-documentchecklistmng.component';
import { SectionsComponent } from './views/configurations/forms/sections/sections.component';
import { SharedProcessconfigsComponent } from './views/configurations/process-configurations/shared-processconfigs/shared-processconfigs.component';
import { RegulatedProductsTypesComponent } from './views/configurations/process-configurations/regulated-products-types/regulated-products-types.component';
import { RegFunctionsComponent } from './views/configurations/process-configurations/reg-functions/reg-functions.component';
import { AppealsTypesComponent } from './views/configurations/process-configurations/appeals-types/appeals-types.component';
import { ProcessConfigsetupComponent } from './views/configurations/process-configurations/process-configsetup/process-configsetup.component';
import { AppSectionsComponent } from './views/configurations/forms/application-section/app-sections.component';
import { RegulatoryFunctionGuidelinesComponent } from './views/system-administration/system-guidelines/regulatory-function-guidelines/regulatory-function-guidelines.component';
import { SharedDocumentManagementSysComponent } from './views/document-checklistsmng/dms/shared-document-management-sys/shared-document-management-sys.component';
import { DmsRepositoryDefinitionComponent } from './views/document-checklistsmng/dms/dms-repository-definition/dms-repository-definition.component';
import { ApplicantWorkflowInterfacesComponent } from './views/system-administration/Applicant-workflow-Processes/applicant-workflow-interfaces/applicant-workflow-interfaces.component';
import { ApplicantWorkflowsComponent } from './views/system-administration/Applicant-workflow-Processes/applicant-workflows/applicant-workflows.component';
import { ApplicantWorkflowsetupComponent } from './views/system-administration/Applicant-workflow-Processes/applicant-workflowsetup/applicant-workflowsetup.component';
import { ApplicantSystemprocessesComponent } from './views/system-administration/Applicant-workflow-Processes/applicant-systemprocesses/applicant-systemprocesses.component';
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
import { GeneralSystemFormsComponent } from './views/configurations/forms/general-system-forms/general-system-forms.component';
import { PermitTermsconditionsComponent } from './views/system-administration/system-guidelines/permit-termsconditions/permit-termsconditions.component';
import { AppWorkflowstatusesComponent } from './views/workflow-management/workflows/app-workflowstatuses/app-workflowstatuses.component';

@NgModule({
  declarations: [AppdashboardComponent,
    AppfooterComponent, AppNationalitiesComponent,
    AppheaderComponent, TruncateWordsadminPipe,
    AppLayoutComponent,
    AppmenuComponent,
    AppMyprofileComponent,
    UserAccessLevelsComponent, AppWorkflowstatusesinterfacesComponent,
    UserGroupsComponent, AppWorkflowactiontypesComponent,
    SharedusermanagementComponent,
    AppCitiesComponent,
    AppCountriesComponent,
    RegFunctionsComponent,
    AppealsTypesComponent,
    SharedDocumentManagementSysComponent,
    ProcessConfigsetupComponent,
    AppUserTitle, DisclaimerStatementTypesComponent, DisclaimerStatementsComponent,
    AppUserIdentificationType,
    AppInstitution,
    PortalworkflowsComponent,
    ApiUsersComponent,
    RegulatedProductsTypesComponent,
    AppInstitutionDepartments,
    SharedconfigurationsComponent,
    DataEntryFormSetupComponent,
    AppActiveUserAccounts,
    RecursiveMenuDirective,
    AppSectionsComponent,
    AppGenericnamesComponent,
    ControlDocumentmanagementComponent,
    AppCurrenciesComponent,
    AppAuditTrail,
    RegulatoryFunctionGuidelinesComponent,
    SharedProcessconfigsComponent,
    GeneralApplicationFormComponent,
    SharedPortalNavigationsComponent,
    PortalNavigationComponent,
    PortalNavigationTypesComponent,
    PortalNavigationSetupComponent,
    PortalNavigationLevelsComponent,
    PortalNavigationInterfacesComponent,
    PortalTermsComponent,
    TraderAccountManagementComponent,
    PortalWorkflowsetupComponent,
    SectionsComponent,
    PortalInterfacesComponent,
    AnnualCeilconfComponent,
    CtrlDrugsbasesaltsComponent,
    CtrlDrugsconvfactComponent,
    CtrlDrugssaltsComponent,
    CtrlDrugssubstancesComponent,
    CtrlDrugstypeComponent,
    SharedCtrldrugsconfigurationComponent,
    DmsRepositoryDefinitionComponent,
    ImportExportconfsetupComponent,
    PermitReasonsComponent,
    PermittypeCategoriesComponent,
    PortentryExitComponent,
    SharedImportexportconfigComponent,
    AssessmentProcedureComponent,
    GmpConfigsetupComponent,
    GmpProductcategoryComponent,
    GmpProductlineComponent,
    SharedGmpconfigurationsComponent,
    ExternalUsersComponent,
    AdvertisementTypesComponent,
    PromotionMaterialsComponent,
    PromotionalAdvertconfigsetupComponent,
    SharedPromotionAdvertConfigurationsComponent,
    ApplicantWorkflowInterfacesComponent,
    ApplicantWorkflowsComponent,
    ApplicantWorkflowsetupComponent,
    ApplicantSystemprocessesComponent,
    PermitTermsconditionsComponent,
    AppWorkflowstatusesComponent,
   


    RefNumbertypesComponent,
    RefNumbervariablesComponent,
    RefSubmodulesComponent,
    RefNumberformatsComponent,
    SharedRefnumberconfigurationsComponent,

    BusinessCategoriesComponent,
    BusinessScalesComponent,
    BusinessTypeCategoryComponent,
    BusinessTypeDetailsComponent,
    BusinessTypesComponent,
    PersonnelInstitutionsComponent,
    PersonnelPositionComponent,
    PersonnelQualificationsComponent,
    PersonnelstudyFieldComponent,
    PremiseConfigsetupComponent,
    PremiseTypeComponent,
    PremiseinspectRecommendationComponent,
    SharedPremisesconfigurationsComponent,
    PmsConfigsetupComponent,
    PmsScreeningdecisionsComponent,
    PmsanalysisDecisionComponent,
    PmsapprovalDecisionComponent,
    PmsevaluationDecisionsComponent,
    PmssamplingStagesComponent,
    PmstcmeetingDecisionComponent,
    SampleApplicationtypesComponent,
    SamplingReasonComponent,
    SharedPmsconfigurationsComponent,

    AgeanalysisDaysspanComponent,
    ApplicationProcessdefinationComponent,
    ProcessdatesSpandefinationComponent,
    RegistrationDuetimespanComponent,
    SharedTimeframeconfigurationsComponent,
    TimeframeConfigsetupComponent,

    LocationCountriesComponent,
    CountryRegionsComponent,
    ProvincesComponent,
    DistrictsComponent,
    DistrictcouncilDefinationComponent,
    LocationParametersComponent,



    StudySitesComponent,
    SponsorsNatureComponent,
    SponsorLevelsComponent,
    FundingsourceTypesComponent,
    ClinicaltrialDesignsComponent,
    ClinicalstudyStatusComponent,
    ClinicalstudyPurposesComponent,
    ClinicalstudyPhaseComponent,
    ClinicalsequenceGenerationComponent,
    ClinicalreportTypesComponent,
    ClinicalrecruitStatusesComponent,
    ClinicaloutcomesTypesComponent,
    ClinicalnatureControlsComponent,
    ClinicalmaskingUsedComponent,
    ClinicalmaskingBindingComponent,
    ClinicalinterventionAssignmentComponent,
    ClinicalinterventTypesComponent,
    ClinicalinterventAllocationComponent,
    ClinicaldiseaseConditionsComponent,
    ClinicalallocationSequenceComponent,
    ClinicalTrialpersonnelComponent,
    AgeGroupsComponent,
    ClinicaltrialConfigsetupComponent,
    SharedclinicalTrialconfigurationsComponent,
    CertificateConditionComponent,
    GeneralSystemFormsComponent,

    TransactionCurrencyComponent,
    PermitStorageConditionsComponent,
    SharedPermitapplicationComponent,
    PortEntryTypeComponent,
    PermitappConfigsetupComponent,
    ModeOfTransportComponent,
    InvoiceTypeComponent,
    PortEntryExitComponent,
    
    AppPartnerStates,
    ControlDocmasterlistComponent,
    AppNotificationsComponent,
    AppDashboardsectionsComponent,

    DocumentControlsetupComponent,
    ControlleddrugsConfsetupComponent,

    SystemAdministratorsComponent,
    ReportsanalyticsdashboardComponent,
    AppNmrasinfoComponent,

    SharedNavigationsComponent,
    NavigationsComponent, AppSharedworkflowComponent,
    NavigationTypesComponent, AppExchangeratesComponent,
    KnowledgeCenterinfomanagementComponent,
    AppProcessworkflowstatusesComponent,
    AppSystemprocessesComponent,
    AppProcessworkflowtransitionsComponent,
    AppProcessworkflowsstagesComponent,
    AppProcessworkflowsComponent,
    SharedDocumentchecklistmngComponent,
    NavigationLevelsComponent, NavigationInterfacesComponent,
    InstitutionsDepartmentsComponent,
    AppstageStatusesComponent,
    SharedSysAdministrationComponent,


    ShareusermanagementClassComponent,
    UserAccounttypesComponent, SystemDashbordtypesComponent,
    UsermanagementDashboardComponent, ApplicationDocumentuploadsComponent,
    ApplicationWorkflowsubmissionsComponent,
    PublicationDashboardComponent,

    AdvertisementChannelComponent,
    PrommaterialBookcataloguesComponent,
    PromotionadvertChannelsComponent,
    PromotionmaterialCategoriesComponent,

    AppProcesssubmissionComponent,
    AppSubmissionmethodsComponent,
    AppFormsComponent,
    EcredResourcesmanagementComponent,
    DynamicFormComponent,
    FormFieldsComponent,
    FormTypesComponent,

    AppTranslationmanagementComponent, AppSystemlanguagesComponent,
    AppSystemlabelsmanagementComponent, InstitutionsDetailsComponent,
    AppSystemlabelsmanagementComponent,

    InstitutionsDetailsComponent,
    SystemsFunctionalitiesComponent,


    InstitutionsTypesComponent, AppNationalitiesComponent, AppGenderComponent, AppPublicationTypesComponent,

    RegistrationConditionComponent,
    AppDosageformsComponent, AppApplicationtypesComponent, AppFirewallipsComponent,
    EcredResourcedashboardComponent,
    KnowledgecenterDashboardComponent,
    SystemguidelinesDetailComponent,
    SystemguidelinesDashComponent, AdminsystemguudelinesDetailsComponent,
    AppWorkflowsubmissionactionsComponent,
    AppWorkflowstatusesactionsComponent,
    AppStatusesactionsComponent,
    SyserrorLogsComponent,
    AppOrganizationinformationComponent,
    AppSignatoriesComponent,
    UserloginLogsComponent,
    UserpwdresetrequestLogsComponent,

    UserpwdchangerequestLogsComponent,
    UsermaliciousaccessComponent,
    SyslogsUsersaccessComponent,
    SyslogsComponent,
    UserloginoutLogsComponent,
    UserfaildloginsLogsComponent,

    AssessmentProceduresComponent,
    AtccodesDefinationsComponent,
    ClassificationComponent,
    ClassificationRulesComponent,
    CommonNameComponent,
    DeviceTypesComponent,
    DistributionCategoryComponent,
    DosageFormComponent,
    GmdnCategoriesComponent,
    IngredientTypeComponent,
    IngredientsCategoryComponent,
    IngredientsSpecificationsComponent,
    IntendedendUseComponent,
    IntendedendUserComponent,
    MasterIngredientsComponent,
    MethodofUseComponent,
    
    NutrientsComponent,
    ProdclassificationCategoriesComponent,
    ProdclassificationRulesComponent,
    ProductFormsComponent,
    ProductclassCategoriesComponent,
    ProductspecialCategoryComponent,
    ProductsubCategoriesComponent,
    ReasonforInclusionComponent,
    RouteofAdministrationComponent,
    SiUnitsComponent,
    StorageConditionComponent,
    GmdnCodesComponent,
    ProductconfigurationsSetupComponent,
    SharedproductConfigurationsComponent,
    AppWorkflowactiontypesComponent,
    SystemmanualConfigurationComponent,
    SigninSignupGuidelinesComponent,
    TermsconditionsDetailsComponent,
    GuidelinesoptionsComponent,
    UserSetupComponent,
    MultilingualConfigurationsComponent,
    NavigationSetupComponent,
    InstitutionsInformationComponent,
   
    
    
    
    ExpertprofileSetupComponent,
    
    RegistrationRegulationComponent,
    RefnumberConfigsetupComponent,



    UserDashboardComponent,
    FinanceDashboardComponent,
    ExternalDashboardComponent,
    SharedPortalNavigationsComponent,
    PortalNavigationComponent,
    PortalNavigationTypesComponent,
    PortalNavigationSetupComponent,
    PortalNavigationLevelsComponent,
    PortalNavigationInterfacesComponent,
    PortalProcessesComponent,
    PortalProcessguidelinesComponent,
    PortalStatusactionsComponent,
    PortalServicesComponent,
    PortalProcesstransitionComponent,
    PortalDocdefinationComponent,
    IntegrationManagementComponent,

    ImportexportProceduredetailsComponent,
    ImportexportProceduresConfigsetupComponent,
    ProceduresCategoriesComponent,
    ProceduresSubcategoriesComponent,
    SharedImportexportProceduresComponent,

    StatusesActionsComponent,


  ],
  imports: [
    CommonModule, DxButtonModule, DxProgressBarModule,
    FormsModule, DxToolbarModule, DxLoadPanelModule, DxValidatorModule,
    ReactiveFormsModule, DxDropDownButtonModule,
    NgHttpLoaderModule, DxTreeListModule, AdminRoutingDashboardModule,
    DxDataGridModule, DxActionSheetModule, DxFileUploaderModule, DxNumberBoxModule, DxCheckBoxModule, DxSelectBoxModule, DxContextMenuModule, DxMenuModule, DxTagBoxModule,
    DxTabPanelModule, DxFormModule, DxScrollViewModule, DxChartModule,
    DxSelectBoxModule, DxoExportModule,
    DxValidatorModule, DxDrawerModule,
    DxCalendarModule, DxPopupModule, DxFileUploaderModule, DxNumberBoxModule, DxMenuModule, DxTagBoxModule,
    DxTabPanelModule, DxFileUploaderModule, DxNumberBoxModule,
    DxTextAreaModule, DxMenuModule, DxTagBoxModule, DxTabsModule,
    DxTabPanelModule, HttpClientModule, DxSwitchModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }), DxDiagramModule,
    DxTextBoxModule, DxDateBoxModule, DxDropDownButtonModule, DxPopupModule, DxFileUploaderModule,
    DxActionSheetModule, DxFileUploaderModule, DxNumberBoxModule, DxCheckBoxModule, DxSelectBoxModule, DxTextAreaModule,
    DxContextMenuModule, DxMenuModule, DxScrollViewModule, DxTabPanelModule, DxHtmlEditorModule,
    DxDropDownBoxModule, DxTagBoxModule, DxRadioGroupModule, DxBulletModule, NgxIntlTelInputModule,
    DxActionSheetModule,
    DxResponsiveBoxModule],
  exports: [
    AppdashboardComponent,
    AppfooterComponent,
    AppheaderComponent,
    AppLayoutComponent,
    AppmenuComponent,
    AppMyprofileComponent,
    UserAccessLevelsComponent,
    UserGroupsComponent,
    AppCitiesComponent,
    AppCountriesComponent,
    AppUserTitle,
    AppUserIdentificationType,
    AppInstitution, KnowledgeCenterinfomanagementComponent,
    AppInstitutionDepartments,
    AppActiveUserAccounts,
    RecursiveMenuDirective,
    AppCurrenciesComponent,
    AppSubmissionmethodsComponent,
    AppAuditTrail,
    GeneralApplicationFormComponent,
    AppPartnerStates,
    AppNotificationsComponent,
    AppDashboardsectionsComponent,
    AppWorkflowstatusesinterfacesComponent,
    AppNmrasinfoComponent,
    AdvertisementChannelComponent,
    PrommaterialBookcataloguesComponent,
    PromotionadvertChannelsComponent,
    PromotionmaterialCategoriesComponent,
    PortalTermsComponent,
    FormsModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingDashboardModule,
    UserAccounttypesComponent, SystemDashbordtypesComponent,
    AppTranslationmanagementComponent, AppSystemlanguagesComponent, AppSystemlabelsmanagementComponent,
    InstitutionsInformationComponent,
    SharedusermanagementComponent,
    EcredResourcedashboardComponent,
    TranslateModule,
    SharedSysAdministrationComponent, InstitutionsDepartmentsComponent, InstitutionsDetailsComponent, InstitutionsTypesComponent,
    TranslateModule,
    SharedSysAdministrationComponent, InstitutionsDepartmentsComponent,
    InstitutionsDetailsComponent, InstitutionsTypesComponent, AppNationalitiesComponent, AppGenderComponent,
    AppPublicationTypesComponent,
    AppDosageformsComponent,
    AppApplicationtypesComponent,
    AppFirewallipsComponent,
    KnowledgecenterDashboardComponent,
    SystemsFunctionalitiesComponent,
    SystemguidelinesDetailComponent,
    SystemguidelinesDashComponent,
    AppWorkflowsubmissionactionsComponent,
    AppWorkflowstatusesactionsComponent,
    AppStatusesactionsComponent,
    SharedDocumentManagementSysComponent,
    SyserrorLogsComponent,
    SharedPortalNavigationsComponent,
    PortalNavigationComponent,
    PortalNavigationTypesComponent,
    PortalNavigationSetupComponent,
    PortalNavigationLevelsComponent,
    PortalNavigationInterfacesComponent,
    PortalProcessesComponent,
    PortalProcessguidelinesComponent,
    PortalStatusactionsComponent,
    PortalServicesComponent,
    PortalWorkflowsetupComponent,
    PortalProcesstransitionComponent,
    PortalDocdefinationComponent,
    AppFormsComponent,
    GeneralSystemFormsComponent,
    AppWorkflowstatusesComponent,
   
   
    TransactionCurrencyComponent,
    PermitStorageConditionsComponent,
    SharedPermitapplicationComponent,
    PortEntryTypeComponent,
    PermitappConfigsetupComponent,
    ModeOfTransportComponent,
    InvoiceTypeComponent,
    PortEntryExitComponent,

    SharedconfigurationsComponent,
    UserloginLogsComponent,
    UserpwdresetrequestLogsComponent,
    UserpwdchangerequestLogsComponent,
    UsermaliciousaccessComponent,
    SyslogsUsersaccessComponent,
    PortalInterfacesComponent,
    SyslogsComponent,
    PortalworkflowsComponent,
    UserloginoutLogsComponent,
    UserfaildloginsLogsComponent,
    SigninSignupGuidelinesComponent,
    TermsconditionsDetailsComponent,
    GuidelinesoptionsComponent,
    UserSetupComponent,

    SharedPortalNavigationsComponent,
    ControlleddrugsConfsetupComponent,
    PortalNavigationComponent,
    PortalNavigationTypesComponent,

    PortalNavigationSetupComponent,
    PortalNavigationLevelsComponent,
    PortalNavigationInterfacesComponent,
    DataEntryFormSetupComponent,
    CertificateConditionComponent,
    ControlDocmasterlistComponent,
    ControlDocumentmanagementComponent,
    DocumentControlsetupComponent,
    RegistrationConditionComponent,
    RegistrationRegulationComponent,
    IntegrationManagementComponent,

    AnnualCeilconfComponent,
    CtrlDrugsbasesaltsComponent,
    CtrlDrugsconvfactComponent,
    CtrlDrugssaltsComponent,
    CtrlDrugssubstancesComponent,
    CtrlDrugstypeComponent,

    ImportExportconfsetupComponent,
    PermitReasonsComponent,
    PermittypeCategoriesComponent,
    PortentryExitComponent,
    SharedImportexportconfigComponent,
    AssessmentProcedureComponent,
    GmpConfigsetupComponent,
    GmpProductcategoryComponent,
    GmpProductlineComponent,


    RefNumbertypesComponent,
    RefNumbervariablesComponent,
    RefSubmodulesComponent,
    RefNumberformatsComponent,
    SharedRefnumberconfigurationsComponent,


    AssessmentProceduresComponent,
    AtccodesDefinationsComponent,
    ClassificationComponent,
    ClassificationRulesComponent,
    CommonNameComponent,
    DeviceTypesComponent,
    DistributionCategoryComponent,
    DosageFormComponent,
    GmdnCategoriesComponent,
    IngredientTypeComponent,
    IngredientsCategoryComponent,
    IngredientsSpecificationsComponent,
    IntendedendUseComponent,
    IntendedendUserComponent,
    MasterIngredientsComponent,
    MethodofUseComponent,
    NutrientsComponent,
    ProdclassificationCategoriesComponent,
    ProdclassificationRulesComponent,
    ProductFormsComponent,
    ProductclassCategoriesComponent,
    ProductspecialCategoryComponent,
    ProductsubCategoriesComponent,
    ReasonforInclusionComponent,
    RouteofAdministrationComponent,
    GmdnCodesComponent,
    SiUnitsComponent,
    StorageConditionComponent,
    ProductconfigurationsSetupComponent,
    SharedproductConfigurationsComponent,
    DmsRepositoryDefinitionComponent,


    AgeanalysisDaysspanComponent,
    ApplicationProcessdefinationComponent,
    ProcessdatesSpandefinationComponent,
    RegistrationDuetimespanComponent,
    SharedTimeframeconfigurationsComponent,
    TimeframeConfigsetupComponent,



    AdvertisementTypesComponent,
    PromotionMaterialsComponent,
    PromotionalAdvertconfigsetupComponent,
    SharedPromotionAdvertConfigurationsComponent,

    BusinessCategoriesComponent,
    BusinessScalesComponent,
    BusinessTypeCategoryComponent,
    BusinessTypeDetailsComponent,
    BusinessTypesComponent,
    PersonnelInstitutionsComponent,
    PersonnelPositionComponent,
    PersonnelQualificationsComponent,
    PersonnelstudyFieldComponent,
    PremiseConfigsetupComponent,
    PremiseTypeComponent,
    PremiseinspectRecommendationComponent,
    SharedPremisesconfigurationsComponent,

    PmsConfigsetupComponent,
    PmsScreeningdecisionsComponent,
    PmsanalysisDecisionComponent,
    PmsapprovalDecisionComponent,
    PmsevaluationDecisionsComponent,
    PmssamplingStagesComponent,
    PmstcmeetingDecisionComponent,
    SampleApplicationtypesComponent,
    SamplingReasonComponent,
    SharedPmsconfigurationsComponent,
    ApplicantWorkflowInterfacesComponent,
    ApplicantWorkflowsComponent,
    ApplicantWorkflowsetupComponent,
    ApplicantSystemprocessesComponent,


    SharedCtrldrugsconfigurationComponent,


    StudySitesComponent,
    SponsorsNatureComponent,
    SponsorLevelsComponent,
    FundingsourceTypesComponent,
    ClinicaltrialDesignsComponent,
    ClinicalstudyStatusComponent,
    ClinicalstudyPurposesComponent,
    ClinicalstudyPhaseComponent,
    ClinicalsequenceGenerationComponent,
    ClinicalreportTypesComponent,
    ClinicalrecruitStatusesComponent,
    ClinicaloutcomesTypesComponent,
    ClinicalnatureControlsComponent,
    ClinicalmaskingUsedComponent,
    ClinicalmaskingBindingComponent,
    ClinicalinterventionAssignmentComponent,
    ClinicalinterventTypesComponent,
    ClinicalinterventAllocationComponent,
    ClinicaldiseaseConditionsComponent,
    ClinicalallocationSequenceComponent,
    ClinicalTrialpersonnelComponent,
    AgeGroupsComponent,
    ClinicaltrialConfigsetupComponent,
    SharedclinicalTrialconfigurationsComponent,
    RefnumberConfigsetupComponent,

    LocationCountriesComponent,
    CountryRegionsComponent,
    ProvincesComponent,
    DistrictsComponent,
    DistrictcouncilDefinationComponent,
    LocationParametersComponent,
    DynamicFormComponent,
    FormFieldsComponent,
    FormTypesComponent,

    ImportexportProceduredetailsComponent,
    ImportexportProceduresConfigsetupComponent,
    ProceduresCategoriesComponent,
    ProceduresSubcategoriesComponent,
    SharedImportexportProceduresComponent,

    StatusesActionsComponent,
  ]
})
export class CimexAdminModule { }
// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

