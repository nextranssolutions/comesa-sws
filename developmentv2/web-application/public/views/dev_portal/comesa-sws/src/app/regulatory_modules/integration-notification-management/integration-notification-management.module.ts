import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IntegrationNotificationManagementRoutingModule } from './integration-notification-management-routing.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { DxButtonModule, DxProgressBarModule, DxLoadPanelModule, DxPopupModule, DxDataGridModule, DxActionSheetModule, DxFileUploaderModule, DxNumberBoxModule, DxCheckBoxModule, DxSelectBoxModule, DxTextAreaModule, DxContextMenuModule, DxMenuModule, DxTagBoxModule, DxDateBoxModule, DxTabPanelModule, DxFormModule, DxScrollViewModule, DxTextBoxModule, DxValidatorModule, DxToolbarModule, DxGalleryModule, DxHtmlEditorModule, DxDropDownBoxModule, DxRadioGroupModule } from 'devextreme-angular';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { NgWizardConfig, THEME, NgWizardModule } from 'ng-wizard';
import { NgxCaptchaModule } from 'ngx-captcha';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input-gg';
import { SafePipeModule } from 'src/app/safe-pipe/safe-pipe.module';
import { SharedModuleModule } from 'src/app/shared-views/shared-module.module';
import { httpTranslateLoader } from '../revenue-management/revenue-management.module';
import { IntegrationNtfMgtHeaderComponent } from './views/layout/integration-ntf-mgt-header/integration-ntf-mgt-header.component';
import { IntegrationNtfMgtLayoutComponent } from './views/layout/integration-ntf-mgt-layout/integration-ntf-mgt-layout.component';
import { IntegrationNtfMgtNavigationComponent } from './views/layout/integration-ntf-mgt-navigation/integration-ntf-mgt-navigation.component';
import { IntegrationNtfManagementDashboardComponent } from './views/integration-ntf-management-dashboard/integration-ntf-management-dashboard.component';
import { EmailConfigurationComponent } from './views/Notification-integration/email-configuration/email-configuration.component';
import { EmailsetupTypesComponent } from './views/Notification-integration/emailsetup-types/emailsetup-types.component';
import { NotificationscheduleConfigComponent } from './views/Notification-integration/notificationschedule-config/notificationschedule-config.component';
import { NotificationscheduleTypeComponent } from './views/Notification-integration/notificationschedule-type/notificationschedule-type.component';
import { PaymentintegrationSetupComponent } from './views/payment-integration/paymentintegration-setup/paymentintegration-setup.component';
import { PaymentintegrationTypesComponent } from './views/payment-integration/paymentintegration-types/paymentintegration-types.component';
import { PaymentremittanceOptionsComponent } from './views/payment-integration/paymentremittance-options/paymentremittance-options.component';



const ngWizardConfig: NgWizardConfig = {
  theme: THEME.default
};


@NgModule({
  declarations: [IntegrationNtfMgtHeaderComponent, IntegrationNtfMgtLayoutComponent, IntegrationNtfMgtNavigationComponent,IntegrationNtfManagementDashboardComponent,
    EmailConfigurationComponent,EmailsetupTypesComponent,NotificationscheduleTypeComponent,NotificationscheduleConfigComponent,PaymentintegrationSetupComponent,PaymentintegrationTypesComponent,
    PaymentremittanceOptionsComponent
  ],
  imports: [
    CommonModule, IntegrationNotificationManagementRoutingModule,
    SharedModuleModule,
    NgWizardModule.forRoot(ngWizardConfig),
    NgHttpLoaderModule, DxButtonModule, DxProgressBarModule,
    FormsModule,
    ReactiveFormsModule,
    NgxCaptchaModule, DxLoadPanelModule,
    DxPopupModule, DxDataGridModule, DxActionSheetModule, DxFileUploaderModule, DxNumberBoxModule, DxCheckBoxModule, DxSelectBoxModule, DxTextAreaModule, DxContextMenuModule, DxMenuModule, DxTagBoxModule,
    DxDateBoxModule, DxTabPanelModule, DxFormModule, DxScrollViewModule,
    DxTextBoxModule,
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
    SafePipeModule,
  ]
})
export class IntegrationNotificationManagementModule { }
