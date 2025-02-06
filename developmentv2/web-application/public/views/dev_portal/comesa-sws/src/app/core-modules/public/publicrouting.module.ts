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
    },{
      path: 'knowledge-center',
      component: KnowledgeCenterComponent
    }, {
      path: 'reporting-and-analytics',
      component: ReportingAndAnalyticsComponent
    }, {
      path: 'amrh-secretariate',
      component: EcredSecretariatsigninComponent
    },{
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
    }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PublicRoutingModule { }