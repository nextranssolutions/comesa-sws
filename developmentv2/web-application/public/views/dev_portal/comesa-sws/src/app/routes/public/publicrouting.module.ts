import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppsignInComponent } from 'src/app/views/public/appsign-in/appsign-in.component';
import { AppsignUpComponent } from 'src/app/views/public/appsign-up/appsign-up.component';

import { PublicLayoutComponent } from 'src/app/views/public/layout/public-layout/public-layout.component';
import { ReportingAndAnalyticsComponent } from 'src/app/views/public/reporting-and-analytics/reporting-and-analytics.component';
import { KnowledgeCenterComponent } from 'src/app/views/public/knowledge-center/knowledge-center.component';
import { HomePageComponent } from 'src/app/views/public/home-page/home-page.component';
import { EcredSecretariatsigninComponent } from 'src/app/views/public/ecred-secretariatsignin/ecred-secretariatsignin.component';
import { SubscriptionComponent } from 'src/app/views/public/subscription/subscription.component';
import { SystemmanualPageComponent } from 'src/app/views/utilitiescomponents/systemmanual-page/systemmanual-page.component';
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

