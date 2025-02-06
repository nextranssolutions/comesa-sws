import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { DxButtonModule, DxProgressBarModule, DxLoadPanelModule, DxPopupModule, DxDataGridModule, DxActionSheetModule, DxFileUploaderModule, DxNumberBoxModule, DxCheckBoxModule, DxSelectBoxModule, DxTextAreaModule, DxContextMenuModule, DxMenuModule, DxTagBoxModule, DxDateBoxModule, DxTabPanelModule, DxFormModule, DxScrollViewModule, DxTextBoxModule, DxValidatorModule, DxToolbarModule, DxGalleryModule, DxHtmlEditorModule, DxDropDownBoxModule, DxRadioGroupModule } from 'devextreme-angular';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { NgxCaptchaModule } from 'ngx-captcha';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input-gg';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { RevenueManagementRoutingModule } from './revenue-managementrouting.module';
import { RevenuemngntHeaderComponent } from './views/layout/revenuemngnt-header/revenuemngnt-header.component';
import { RevenuemngntLayoutComponent } from './views/layout/revenuemngnt-layout/revenuemngnt-layout.component';
import { RevenuemngntNavigationComponent } from './views/layout/revenuemngnt-navigation/revenuemngnt-navigation.component';
import { SharedModuleModule } from 'src/app/shared-views/shared-module.module';
import { RevenuemngntDashboardComponent } from './views/revenuemngnt-dashboard/revenuemngnt-dashboard.component';
import { WaiverpaymentManagementComponent } from './views/waiverpayment-management/waiverpayment-management.component';
import { RetentiongenerationReportComponent } from './views/retentioncharges-management/retentiongeneration-report/retentiongeneration-report.component';
import { RetentionchargesPaymentComponent } from './views/retentioncharges-management/retentioncharges-payment/retentioncharges-payment.component';
import { RetentionchargesInvoicesComponent } from './views/retentioncharges-management/retentioncharges-invoices/retentioncharges-invoices.component';
import { PromotionadvertisementFeesComponent } from './views/applicationfee-configuration/promotionadvertisement-fees/promotionadvertisement-fees.component';
import { OnlineapplicationsinvoicesgenerationQueriesComponent } from './views/applicationfee-configuration/onlineapplicationsinvoicesgeneration-queries/onlineapplicationsinvoicesgeneration-queries.component';
import { MarketingauthorisationApplicationComponent } from './views/applicationfee-configuration/marketingauthorisation-application/marketingauthorisation-application.component';
import { LicensingFeesComponent } from './views/applicationfee-configuration/licensing-fees/licensing-fees.component';
import { ImportexportpermitFeesComponent } from './views/applicationfee-configuration/importexportpermit-fees/importexportpermit-fees.component';
import { GmppharmaceuticallicenseFeesComponent } from './views/applicationfee-configuration/gmppharmaceuticallicense-fees/gmppharmaceuticallicense-fees.component';
import { DisposalapplicationfeeConfigurationComponent } from './views/applicationfee-configuration/disposalapplicationfee-configuration/disposalapplicationfee-configuration.component';
import { ControlleddrugslicenseFeesComponent } from './views/applicationfee-configuration/controlleddrugslicense-fees/controlleddrugslicense-fees.component';
import { ClinicaltrialsFeesComponent } from './views/applicationfee-configuration/clinicaltrials-fees/clinicaltrials-fees.component';
import { ApplicationinvoicesgenerationQueriesComponent } from './views/applicationfee-configuration/applicationinvoicesgeneration-queries/applicationinvoicesgeneration-queries.component';
import { InvoiceCancellationComponent } from './views/cancellation-management/invoice-cancellation/invoice-cancellation.component';
import { PaymentcancellationProcessComponent } from './views/cancellation-management/paymentcancellation-process/paymentcancellation-process.component';
import { BatcharetentionInvoicesComponent } from './views/batchinvoice-management/batcharetention-invoices/batcharetention-invoices.component';
import { BatchapplicationInvoicesComponent } from './views/batchinvoice-management/batchapplication-invoices/batchapplication-invoices.component';

import { BanksConfigurationsComponent } from './views/bank-configurations/banks-configurations/banks-configurations.component';
import { BanksComponent } from './views/bank-configurations/banks/banks.component';
import { OrganizationbankAccountsComponent } from './views/bank-configurations/organizationbank-accounts/organizationbank-accounts.component';
import { BankBranchesComponent } from './views/bank-configurations/bank-branches/bank-branches.component';
import { ExchangeRatesComponent } from './views/charges-configurations/exchange-rates/exchange-rates.component';
import { TransactionTypesComponent } from './views/charges-configurations/transaction-types/transaction-types.component';
import { GlAccountsComponent } from './views/charges-configurations/gl-accounts/gl-accounts.component';
import { CostSubcategoriesComponent } from './views/charges-configurations/cost-subcategories/cost-subcategories.component';
import { FeeschargesConfigurationsComponent } from './views/charges-configurations/feescharges-configurations/feescharges-configurations.component';
import { CostCategoriesComponent } from './views/charges-configurations/cost-categories/cost-categories.component';
import { FeeTypesComponent } from './views/charges-configurations/fee-types/fee-types.component';
import { CostDefinitionComponent } from './views/charges-configurations/cost-definition/cost-definition.component';
import { CurrenciesComponent } from './views/charges-configurations/currencies/currencies.component';
import { ChargesConfigurationsComponent } from './views/charges-configurations/charges-configurations/charges-configurations.component';
import { CancellationmanagementSetupComponent } from './views/cancellation-management/cancellationmanagement-setup/cancellationmanagement-setup.component';
import { RetentionchargesmanagementSetupComponent } from './views/retentioncharges-management/retentionchargesmanagement-setup/retentionchargesmanagement-setup.component';
import { BillPostingComponent } from './views/billingreceipt-details/bill-posting/bill-posting.component';
import { BatchinvoicemanagementSetupComponent } from './views/batchinvoice-management/batchinvoicemanagement-setup/batchinvoicemanagement-setup.component';
import { ApplicationfeeConfigurationComponent } from './views/applicationfee-configuration/applicationfee-configuration/applicationfee-configuration.component';
import { SharedapplicationfeeConfigurationComponent } from './views/applicationfee-configuration/sharedapplicationfee-configuration/sharedapplicationfee-configuration.component';
import { SharedrevenueconfigurationsComponent } from './views/sharedrevenueconfigurations/sharedrevenueconfigurations.component';
import { CimexAdminModule } from 'src/app/core-modules/cimex-admin/cimex-admin.module';


@NgModule({
  declarations: [
    RevenuemngntNavigationComponent, RevenuemngntDashboardComponent,
    RevenuemngntLayoutComponent, RevenuemngntHeaderComponent,
    WaiverpaymentManagementComponent, RetentiongenerationReportComponent,
    RetentionchargesPaymentComponent, RetentionchargesInvoicesComponent,
    PromotionadvertisementFeesComponent, OnlineapplicationsinvoicesgenerationQueriesComponent,
    MarketingauthorisationApplicationComponent, LicensingFeesComponent,
    ImportexportpermitFeesComponent, GmppharmaceuticallicenseFeesComponent,
    DisposalapplicationfeeConfigurationComponent, ControlleddrugslicenseFeesComponent,
    ClinicaltrialsFeesComponent, ApplicationinvoicesgenerationQueriesComponent,
    InvoiceCancellationComponent, PaymentcancellationProcessComponent,
    BatcharetentionInvoicesComponent, BatchapplicationInvoicesComponent,
    BanksConfigurationsComponent,
    BanksComponent,SharedrevenueconfigurationsComponent,
    OrganizationbankAccountsComponent,
    BankBranchesComponent,
    ExchangeRatesComponent, TransactionTypesComponent, GlAccountsComponent,
    CostSubcategoriesComponent, FeeschargesConfigurationsComponent, CostCategoriesComponent,
    FeeTypesComponent, CostDefinitionComponent, CurrenciesComponent, ChargesConfigurationsComponent,
    CancellationmanagementSetupComponent, RetentionchargesmanagementSetupComponent,
    BillPostingComponent, BatchinvoicemanagementSetupComponent,ApplicationfeeConfigurationComponent,
    SharedapplicationfeeConfigurationComponent
  ],
  imports: [
    CommonModule, NgHttpLoaderModule, RevenueManagementRoutingModule, DxButtonModule, DxProgressBarModule,
    FormsModule, SharedModuleModule,
    ReactiveFormsModule,
    NgxCaptchaModule, DxLoadPanelModule,
    DxPopupModule, DxDataGridModule, DxActionSheetModule, DxFileUploaderModule, DxNumberBoxModule, DxCheckBoxModule, DxSelectBoxModule, DxTextAreaModule, DxContextMenuModule, DxMenuModule, DxTagBoxModule,
    DxDateBoxModule, DxTabPanelModule, DxFormModule, DxScrollViewModule,
    DxTextBoxModule, CimexAdminModule,
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
  ], exports: [
    RevenueManagementRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    WaiverpaymentManagementComponent,
    RetentiongenerationReportComponent,
    RetentionchargesPaymentComponent, RetentionchargesInvoicesComponent,
    PromotionadvertisementFeesComponent, OnlineapplicationsinvoicesgenerationQueriesComponent,
    MarketingauthorisationApplicationComponent, LicensingFeesComponent,
    ImportexportpermitFeesComponent, GmppharmaceuticallicenseFeesComponent,
    DisposalapplicationfeeConfigurationComponent, ControlleddrugslicenseFeesComponent,
    ClinicaltrialsFeesComponent, ApplicationinvoicesgenerationQueriesComponent,
    InvoiceCancellationComponent, PaymentcancellationProcessComponent,
    BatcharetentionInvoicesComponent, BatchapplicationInvoicesComponent,

  ]
})
export class RevenueManagementModule { }
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
