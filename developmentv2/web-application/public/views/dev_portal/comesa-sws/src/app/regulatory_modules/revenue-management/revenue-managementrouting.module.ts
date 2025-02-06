import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { RevenuemngntLayoutComponent } from './views/layout/revenuemngnt-layout/revenuemngnt-layout.component';
import { RevenuemngntDashboardComponent } from './views/revenuemngnt-dashboard/revenuemngnt-dashboard.component';
import { WaiverpaymentManagementComponent } from './views/waiverpayment-management/waiverpayment-management.component';
import { RetentiongenerationReportComponent } from './views/retentioncharges-management/retentiongeneration-report/retentiongeneration-report.component';
import { RetentionchargesPaymentComponent } from './views/retentioncharges-management/retentioncharges-payment/retentioncharges-payment.component';
import { RetentionchargesInvoicesComponent } from './views/retentioncharges-management/retentioncharges-invoices/retentioncharges-invoices.component';
import { ControlleddrugslicenseFeesComponent } from './views/applicationfee-configuration/controlleddrugslicense-fees/controlleddrugslicense-fees.component';
import { ClinicaltrialsFeesComponent } from './views/applicationfee-configuration/clinicaltrials-fees/clinicaltrials-fees.component';
import { PromotionadvertisementFeesComponent } from './views/applicationfee-configuration/promotionadvertisement-fees/promotionadvertisement-fees.component';
import { ImportexportpermitFeesComponent } from './views/applicationfee-configuration/importexportpermit-fees/importexportpermit-fees.component';
import { GmppharmaceuticallicenseFeesComponent } from './views/applicationfee-configuration/gmppharmaceuticallicense-fees/gmppharmaceuticallicense-fees.component';
import { LicensingFeesComponent } from './views/applicationfee-configuration/licensing-fees/licensing-fees.component';
import { DisposalapplicationfeeConfigurationComponent } from './views/applicationfee-configuration/disposalapplicationfee-configuration/disposalapplicationfee-configuration.component';
import { OnlineapplicationsinvoicesgenerationQueriesComponent } from './views/applicationfee-configuration/onlineapplicationsinvoicesgeneration-queries/onlineapplicationsinvoicesgeneration-queries.component';
import { ApplicationinvoicesgenerationQueriesComponent } from './views/applicationfee-configuration/applicationinvoicesgeneration-queries/applicationinvoicesgeneration-queries.component';
import { MarketingauthorisationApplicationComponent } from './views/applicationfee-configuration/marketingauthorisation-application/marketingauthorisation-application.component';
import { InvoiceCancellationComponent } from './views/cancellation-management/invoice-cancellation/invoice-cancellation.component';
import { PaymentcancellationProcessComponent } from './views/cancellation-management/paymentcancellation-process/paymentcancellation-process.component';
import { BillPostingComponent } from './views/billingreceipt-details/bill-posting/bill-posting.component';
import { BatcharetentionInvoicesComponent } from './views/batchinvoice-management/batcharetention-invoices/batcharetention-invoices.component';
import { BatchapplicationInvoicesComponent } from './views/batchinvoice-management/batchapplication-invoices/batchapplication-invoices.component';
import { ChargesConfigurationsComponent } from './views/charges-configurations/charges-configurations/charges-configurations.component';
import { CurrenciesComponent } from './views/charges-configurations/currencies/currencies.component';
import { CostDefinitionComponent } from './views/charges-configurations/cost-definition/cost-definition.component';
import { FeeTypesComponent } from './views/charges-configurations/fee-types/fee-types.component';
import { CostCategoriesComponent } from './views/charges-configurations/cost-categories/cost-categories.component';
import { FeeschargesConfigurationsComponent } from './views/charges-configurations/feescharges-configurations/feescharges-configurations.component';
import { CostSubcategoriesComponent } from './views/charges-configurations/cost-subcategories/cost-subcategories.component';
import { GlAccountsComponent } from './views/charges-configurations/gl-accounts/gl-accounts.component';
import { TransactionTypesComponent } from './views/charges-configurations/transaction-types/transaction-types.component';
import { ExchangeRatesComponent } from './views/charges-configurations/exchange-rates/exchange-rates.component';
import { BanksComponent } from './views/bank-configurations/banks/banks.component';
import { BanksConfigurationsComponent } from './views/bank-configurations/banks-configurations/banks-configurations.component';
import { BankBranchesComponent } from './views/bank-configurations/bank-branches/bank-branches.component';
import { OrganizationbankAccountsComponent } from './views/bank-configurations/organizationbank-accounts/organizationbank-accounts.component';
import { CancellationmanagementSetupComponent } from './views/cancellation-management/cancellationmanagement-setup/cancellationmanagement-setup.component';
import { RetentionchargesmanagementSetupComponent } from './views/retentioncharges-management/retentionchargesmanagement-setup/retentionchargesmanagement-setup.component';
import { BatchinvoicemanagementSetupComponent } from './views/batchinvoice-management/batchinvoicemanagement-setup/batchinvoicemanagement-setup.component';
import { ApplicationfeeConfigurationComponent } from './views/applicationfee-configuration/applicationfee-configuration/applicationfee-configuration.component';

const routes: Routes = [{
    path: '',
    component: RevenuemngntLayoutComponent,
    canActivate: [AuthGuard],
    children: [
        {
        path: 'revenuemngnt-dashboard',
        component: RevenuemngntDashboardComponent
    },  {
        path: 'app-waiverpayment-management',
        component: WaiverpaymentManagementComponent
    },  {
        path: 'retentiongeneration-report',
        component: RetentiongenerationReportComponent
      }, {
        path: 'retentioncharges-payment',
        component: RetentionchargesPaymentComponent
      }, {
        path: 'retentioncharges-invoices',
        component: RetentionchargesInvoicesComponent
      }, {
        path: 'controlleddrugslicense-fees',
        component: ControlleddrugslicenseFeesComponent
      }, {
        path: 'clinicaltrials-fees',
        component: ClinicaltrialsFeesComponent
      }, {
        path: 'promotionadvertisement-fees',
        component: PromotionadvertisementFeesComponent
      }, {
        path: 'importexportpermit-fees',
        component: ImportexportpermitFeesComponent
      }, {
        path: 'gmppharmaceuticallicense-fees',
        component: GmppharmaceuticallicenseFeesComponent
      }, {
        path: 'licensing-fees',
        component: LicensingFeesComponent
      }, {
        path: 'disposalapplicationfee-configuration',
        component: DisposalapplicationfeeConfigurationComponent
      }, {
        path: 'onlineapplicationsinvoicesgeneration-queries',
        component: OnlineapplicationsinvoicesgenerationQueriesComponent
      }, {
        path: 'applicationinvoicesgeneration-queries',
        component: ApplicationinvoicesgenerationQueriesComponent
      }, {
        path: 'marketingauthorisation-application',
        component: MarketingauthorisationApplicationComponent
      }, {
        path: 'invoice-cancellation',
        component: InvoiceCancellationComponent
      }, {
        path: 'paymentcancellation-process',
        component: PaymentcancellationProcessComponent
      }, {
        path: 'bill-posting',
        component: BillPostingComponent
      },  {
        path: 'batchretention-invoices',
        component: BatcharetentionInvoicesComponent
      },  {
        path: 'batchapplication-invoices',
        component: BatchapplicationInvoicesComponent
      }, {
        path: 'organizationbank-accounts',
        component: OrganizationbankAccountsComponent
      }, {
        path: 'bank-branches',
        component: BankBranchesComponent
      }, {
        path: 'banks-configurations',
        component: BanksConfigurationsComponent
      }, {
        path: 'banks',
        component: BanksComponent
      }, {
        path: 'exchange-rates',
        component: ExchangeRatesComponent
      }, {
        path: 'transaction-types',
        component: TransactionTypesComponent
      }, {
        path: 'gl-accounts',
        component: GlAccountsComponent
      }, {
        path: 'cost-subcategories',
        component: CostSubcategoriesComponent
      }, {
        path: 'feescharges-configurations',
        component: FeeschargesConfigurationsComponent
      }, {
        path: 'cost-categories',
        component: CostCategoriesComponent
      }, {
        path: 'fee-types',
        component: FeeTypesComponent
      }, {
        path: 'cost-definition',
        component: CostDefinitionComponent
      }, {
        path: 'currencies',
        component: CurrenciesComponent
      }, {
        path: 'charges-configurations',
        component: ChargesConfigurationsComponent
      },  {
        path: 'cancellation-management',
        component: CancellationmanagementSetupComponent
      },   {
        path: 'retentionchargesmanagement-setup',
        component: RetentionchargesmanagementSetupComponent
      },   {
        path: 'batchinvoicemanagement-setup',
        component: BatchinvoicemanagementSetupComponent
      },  {
        path: 'applicationfee-configuration',
        component: ApplicationfeeConfigurationComponent
      },
      
    ]   
}  
]  

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class RevenueManagementRoutingModule { }

