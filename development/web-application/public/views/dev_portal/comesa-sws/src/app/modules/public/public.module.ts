import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicLayoutComponent } from 'src/app/views/public/layout/public-layout/public-layout.component';
import { FooterComponent } from 'src/app/views/public/layout/footer/footer.component';
import { NavigationComponent } from 'src/app/views/public/layout/navigation/navigation.component';
import { CenterPageComponent } from 'src/app/views/public/layout/center-page/center-page.component';
import { TopSectionComponent } from 'src/app/views/public/layout/top-section/top-section.component';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { PublicRoutingModule } from 'src/app/routes/public/publicrouting.module';
import { DxActionSheetModule, DxGalleryModule, DxFileUploaderModule, DxDataGridModule, DxPopupModule, DxButtonModule, DxDateBoxModule, DxTextBoxModule, DxSelectBoxModule, DxTextAreaModule, DxContextMenuModule, DxMenuModule, DxCheckBoxModule, DxNumberBoxModule, DxTagBoxModule, DxTabPanelModule, DxFormModule, DxScrollViewModule, DxHtmlEditorModule, DxDropDownBoxModule, DxRadioGroupModule, DxProgressBarModule, DxLoadPanelModule, DxValidatorModule, DxToolbarModule } from 'devextreme-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxCaptchaModule } from 'ngx-captcha';
import { AppsignInComponent } from 'src/app/views/public/appsign-in/appsign-in.component';
import { AppsignUpComponent } from 'src/app/views/public/appsign-up/appsign-up.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReportingAndAnalyticsComponent } from 'src/app/views/public/reporting-and-analytics/reporting-and-analytics.component';
import { KnowledgeCenterComponent } from 'src/app/views/public/knowledge-center/knowledge-center.component';
import { HomePageComponent } from 'src/app/views/public/home-page/home-page.component';
import { EcredSecretariatsigninComponent } from 'src/app/views/public/ecred-secretariatsignin/ecred-secretariatsignin.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input-gg'
import { SubscriptionComponent } from 'src/app/views/public/subscription/subscription.component';
import { SystemguudelinesDetailsComponent } from 'src/app/views/utilitiescomponents/systemguudelines-details/systemguudelines-details.component';
import { SystemmanualPageComponent } from 'src/app/views/utilitiescomponents/systemmanual-page/systemmanual-page.component';

@NgModule({
  declarations: [TopSectionComponent,
    PublicLayoutComponent, AppsignInComponent,
    FooterComponent, SystemguudelinesDetailsComponent,
    NavigationComponent, HomePageComponent,
    CenterPageComponent,

    SystemmanualPageComponent, EcredSecretariatsigninComponent, EcredSecretariatsigninComponent,
    
    ReportingAndAnalyticsComponent, 
    KnowledgeCenterComponent,
    AppsignUpComponent,
    SubscriptionComponent
  ],
  imports: [
    CommonModule, NgHttpLoaderModule, PublicRoutingModule, DxButtonModule, DxProgressBarModule,
    FormsModule,
    ReactiveFormsModule,
    NgxCaptchaModule, DxLoadPanelModule,
    DxPopupModule, DxDataGridModule, DxActionSheetModule, DxFileUploaderModule, DxNumberBoxModule, DxCheckBoxModule, DxSelectBoxModule, DxTextAreaModule, DxContextMenuModule, DxMenuModule, DxTagBoxModule,
    DxDateBoxModule, DxTabPanelModule, DxFormModule, DxScrollViewModule,
    DxTextBoxModule,
    DxDateBoxModule, DxDataGridModule,
    HttpClientModule, DxValidatorModule,
    NgxIntlTelInputModule,DxToolbarModule,
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
    DxRadioGroupModule
  ],
  exports: [
    PublicRoutingModule,
    PublicLayoutComponent, FormsModule,
    ReactiveFormsModule,
    TopSectionComponent,
    FooterComponent,
    NavigationComponent
  ]
})
export class PublicModule { }

// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
