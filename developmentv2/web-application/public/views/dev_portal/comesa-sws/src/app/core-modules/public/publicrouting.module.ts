import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicLayoutComponent } from './views/layout/public-layout/public-layout.component';
import { HomePageComponent } from './views/home-page/home-page.component';
import { SystemmanualPageComponent } from 'src/app/shared-views/utilitiescomponents/systemmanual-page/systemmanual-page.component';
import { AppsignInComponent } from './views/appsign-in/appsign-in.component';
import { AppsignUpComponent } from './views/appsign-up/appsign-up.component';
import { KnowledgeCenterComponent } from './views/knowledge-center/knowledge-center.component';
import { ReportingAndAnalyticsComponent } from './views/reporting-and-analytics/reporting-and-analytics.component';
import { EcredSecretariatsigninComponent } from './views/ecred-secretariatsignin/ecred-secretariatsignin.component';
import { SubscriptionComponent } from './views/subscription/subscription.component';
import { ImportProceduresComponent } from './views/import-procedures/import-procedures.component';
import { TransitProceduresComponent } from './views/transit-procedures/transit-procedures.component';
import { ExportProceduresComponent } from './views/export-procedures/export-procedures.component';
import { ProducthscodeInformationComponent } from './views/producthscode-information/producthscode-information.component';
import { ImportexportsCostsComponent } from './views/importexports-costs/importexports-costs.component';
import { RestrictionsprohibitsComponent } from './views/restrictionsprohibits/restrictionsprohibits.component';
import { FaqsComponent } from './views/faqs/faqs.component';
import { SearchProceduresComponent } from './views/search-procedures/search-procedures.component';
import { AllProceduresComponent } from './views/all-procedures/all-procedures.component';

const routes: Routes = [{
  path: '',
  component: PublicLayoutComponent,
  children: [{
    path: '',
    component: HomePageComponent
  }, {
    path: 'index',
    component: HomePageComponent
  }, {
    path: 'system-manual',
    component: SystemmanualPageComponent
  }, {
    path: 'knowledge-center',
    component: KnowledgeCenterComponent
  }, {
    path: 'reporting-and-analytics',
    component: ReportingAndAnalyticsComponent
  }, {
    path: 'amrh-secretariate',
    component: EcredSecretariatsigninComponent
  }, {
    path: 'sign-up',
    component: AppsignUpComponent
  }, {
    path: 'sign-in',
    component: AppsignInComponent
  }, {
    path: 'sign-up',
    component: AppsignUpComponent
  }, {
    path: 'user-subscription',
    component: SubscriptionComponent
  }, {
    path: 'import_procedures',
    component: ImportProceduresComponent
  }, {
    path: 'transit_procedures',
    component: TransitProceduresComponent
  }, {
    path: 'export_procedures',
    component: ExportProceduresComponent
  }, {
    path: 'producthscodes_info',
    component: ProducthscodeInformationComponent
  }, {
    path: 'costs_associatedwith_importexport',
    component: ImportexportsCostsComponent
  }, {
    path: 'trader_restrictionsprohibits',
    component: RestrictionsprohibitsComponent
  }, {
    path: 'faqs',
    component: FaqsComponent
  }, {
    path: 'search-procedures',
    component: SearchProceduresComponent
  }, {
    path: 'all-procedures',
    component: AllProceduresComponent
  }
  // 
  ]
}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PublicRoutingModule { }