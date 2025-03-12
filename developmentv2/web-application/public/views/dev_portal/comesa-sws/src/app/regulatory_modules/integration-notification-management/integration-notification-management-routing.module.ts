import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { IntegrationNtfMgtLayoutComponent } from './views/layout/integration-ntf-mgt-layout/integration-ntf-mgt-layout.component';
import { IntegrationNtfManagementDashboardComponent } from './views/integration-ntf-management-dashboard/integration-ntf-management-dashboard.component';
import { EmailConfigurationComponent } from './views/Notification-integration/email-configuration/email-configuration.component';
import { EmailsetupTypesComponent } from './views/Notification-integration/emailsetup-types/emailsetup-types.component';
import { NotificationscheduleConfigComponent } from './views/Notification-integration/notificationschedule-config/notificationschedule-config.component';
import { NotificationscheduleTypeComponent } from './views/Notification-integration/notificationschedule-type/notificationschedule-type.component';
import { PaymentintegrationSetupComponent } from './views/payment-integration/paymentintegration-setup/paymentintegration-setup.component';
import { PaymentintegrationTypesComponent } from './views/payment-integration/paymentintegration-types/paymentintegration-types.component';
import { PaymentremittanceOptionsComponent } from './views/payment-integration/paymentremittance-options/paymentremittance-options.component';

const routes: Routes = [{
  path: '',
  component: IntegrationNtfMgtLayoutComponent,
  canActivate: [AuthGuard],
  children: [{
    path: 'app-integration-ntf-management-dashboard',
    component: IntegrationNtfManagementDashboardComponent

  },
  {
    path: 'app-emailsetup-types',
    component: EmailsetupTypesComponent
  },
  {
    path: 'app-email-configuration',
    component: EmailConfigurationComponent
  },
  {
    path: 'app-notificationschedule-config',
    component: NotificationscheduleConfigComponent
  },
  {
    path: 'app-notificationschedule-type',
    component: NotificationscheduleTypeComponent
  },
  {
    path: 'app-paymentintegration-setup',
    component: PaymentintegrationSetupComponent
  },
  {
    path: 'app-paymentintegration-types',
    component: PaymentintegrationTypesComponent
  },
  {
    path: 'app-paymentremittance-options',
    component: PaymentremittanceOptionsComponent
  } 
]
}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IntegrationNotificationManagementRoutingModule { }
