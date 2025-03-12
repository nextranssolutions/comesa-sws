
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
import { AppNationalitiesComponent } from './views/configurations/app-nationalities/app-nationalities.component';
import { AppGenderComponent } from './views/configurations/app-gender/app-gender.component';
import { AppPublicationTypesComponent } from './views/configurations/app-publication-types/app-publication-types.component';
import { AppSubmissionmethodsComponent } from './views/configurations/app-submissionmethods/app-submissionmethods.component';
import { DisclaimerStatementTypesComponent } from './views/configurations/disclaimer-statement-types/disclaimer-statement-types.component';
import { DisclaimerStatementsComponent } from './views/configurations/disclaimer-statements/disclaimer-statements.component';
import { TruncateWordsadminPipe } from 'src/app/core-services/TruncateWordsadminPipe';
import { AppProcesssubmissionComponent } from './views/utilities/app-processsubmission/app-processsubmission.component';

import { AppApplicationtypesComponent } from './views/configurations/app-applicationtypes/app-applicationtypes.component';
import { AppFirewallipsComponent } from './views/configurations/app-firewallips/app-firewallips.component';

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

import { InstitutionsInformationComponent } from './views/system-administration/institutions-information/institutions-information.component';
import { UserSetupComponent } from './views/system-administration/user-setup/user-setup.component';
import { AppOrganizationinformationComponent } from './views/system-administration/app-organizationinformation/app-organizationinformation.component';
import { AppSignatoriesComponent } from './views/system-administration/app-signatories/app-signatories.component';
import { AppWorkflowactiontypesComponent } from './views/workflow-management/workflows/app-workflowactiontypes/app-workflowactiontypes.component';
import { AppWorkflowstatusesinterfacesComponent } from './views/workflow-management/workflows/app-workflowstatusesinterfaces/app-workflowstatusesinterfaces.component';
import { KnowledgeCenterinfomanagementComponent } from './views/information-sharing/knowledge-centerinfomanagement/knowledge-centerinfomanagement.component';
import { AppGenericnamesComponent } from './views/configurations/app-genericnames/app-genericnames.component';
import { UserDashboardComponent } from './views/dashboard/user-dashboard/user-dashboard.component';
import { CertificateConditionComponent } from './views/quality_auditmanagement/certificate-condition/certificate-condition.component';
import { DocumentControlsetupComponent } from './views/quality_auditmanagement/document-controlsetup/document-controlsetup.component';
import { AppFormsComponent } from './views/configurations/forms/app-forms-setup/app-forms.component';
import { DynamicFormComponent } from './views/configurations/forms/dynamic-form/dynamic-form.component';
import { FormFieldsComponent } from './views/configurations/forms/form-fields/form-fields.component';
import { FormTypesComponent } from './views/configurations/forms/form-types/form-types.component';
import { AdminRoutingDashboardModule } from './admin-routing-dashboard.module';
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
import { RegulatoryprocessDocdefinationComponent } from './views/document-checklistsmng/dms/regulatoryprocess-docdefination/regulatoryprocess-docdefination.component';

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
    ProcessConfigsetupComponent,RegulatoryprocessDocdefinationComponent,
    AppUserTitle, DisclaimerStatementTypesComponent, DisclaimerStatementsComponent,
    AppUserIdentificationType,
    AppInstitution,
    ApiUsersComponent,
    RegulatedProductsTypesComponent,
    AppInstitutionDepartments,
    SharedconfigurationsComponent,
    DataEntryFormSetupComponent,
    AppActiveUserAccounts,
    RecursiveMenuDirective,
    AppSectionsComponent,
    AppGenericnamesComponent,
    AppCurrenciesComponent,
    AppAuditTrail,
    RegulatoryFunctionGuidelinesComponent,
    SharedProcessconfigsComponent,
    GeneralApplicationFormComponent,

    TraderAccountManagementComponent,
    SectionsComponent,
    SharedCtrldrugsconfigurationComponent,
    DmsRepositoryDefinitionComponent,
    ImportExportconfsetupComponent,
    PermitReasonsComponent,
    PermittypeCategoriesComponent,
    PortentryExitComponent,
    SharedImportexportconfigComponent,
    ExternalUsersComponent,
    ApplicantWorkflowInterfacesComponent,
    ApplicantWorkflowsComponent,
    ApplicantWorkflowsetupComponent,
    ApplicantSystemprocessesComponent,
   


    RefNumbertypesComponent,
    RefNumbervariablesComponent,
    RefSubmodulesComponent,
    RefNumberformatsComponent,
    SharedRefnumberconfigurationsComponent,

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
    AppNotificationsComponent,
    AppDashboardsectionsComponent,

    DocumentControlsetupComponent,

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

    AppProcesssubmissionComponent,
    AppSubmissionmethodsComponent,
    AppFormsComponent,
    DynamicFormComponent,
    FormFieldsComponent,
    FormTypesComponent,

    AppTranslationmanagementComponent, AppSystemlanguagesComponent,
    AppSystemlabelsmanagementComponent, InstitutionsDetailsComponent,
    AppSystemlabelsmanagementComponent,

    InstitutionsDetailsComponent,
    SystemsFunctionalitiesComponent,


    InstitutionsTypesComponent, AppNationalitiesComponent, AppGenderComponent, AppPublicationTypesComponent,
   AppApplicationtypesComponent, AppFirewallipsComponent,
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
    AppWorkflowactiontypesComponent,
    SystemmanualConfigurationComponent,
    SigninSignupGuidelinesComponent,
    TermsconditionsDetailsComponent,
    GuidelinesoptionsComponent,
    UserSetupComponent,
    MultilingualConfigurationsComponent,
    NavigationSetupComponent,
    InstitutionsInformationComponent,
   
  
    RefnumberConfigsetupComponent,



    UserDashboardComponent,
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
    FormsModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingDashboardModule,
    UserAccounttypesComponent, SystemDashbordtypesComponent,
    AppTranslationmanagementComponent, AppSystemlanguagesComponent, AppSystemlabelsmanagementComponent,
    InstitutionsInformationComponent,
    SharedusermanagementComponent,
    TranslateModule,
    SharedSysAdministrationComponent, InstitutionsDepartmentsComponent, InstitutionsDetailsComponent, InstitutionsTypesComponent,
    TranslateModule,
    SharedSysAdministrationComponent, InstitutionsDepartmentsComponent,
    InstitutionsDetailsComponent, InstitutionsTypesComponent, AppNationalitiesComponent, AppGenderComponent,
    AppPublicationTypesComponent,

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
    AppFormsComponent,
    GeneralSystemFormsComponent,
   
   
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
    SyslogsComponent,
    UserloginoutLogsComponent,
    UserfaildloginsLogsComponent,
    SigninSignupGuidelinesComponent,
    TermsconditionsDetailsComponent,
    GuidelinesoptionsComponent,
    UserSetupComponent,

    DataEntryFormSetupComponent,
    CertificateConditionComponent,
    DocumentControlsetupComponent,
    IntegrationManagementComponent,

    ImportExportconfsetupComponent,
    PermitReasonsComponent,
    PermittypeCategoriesComponent,
    PortentryExitComponent,
    SharedImportexportconfigComponent,

    RefNumbertypesComponent,
    RefNumbervariablesComponent,
    RefSubmodulesComponent,
    RefNumberformatsComponent,
    SharedRefnumberconfigurationsComponent,


    DmsRepositoryDefinitionComponent,


    AgeanalysisDaysspanComponent,
    ApplicationProcessdefinationComponent,
    ProcessdatesSpandefinationComponent,
    RegistrationDuetimespanComponent,
    SharedTimeframeconfigurationsComponent,
    TimeframeConfigsetupComponent,

    ApplicantWorkflowInterfacesComponent,
    ApplicantWorkflowsComponent,
    ApplicantWorkflowsetupComponent,
    ApplicantSystemprocessesComponent,


    SharedCtrldrugsconfigurationComponent,

    
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

