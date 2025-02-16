import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { DxActionSheetModule, DxGalleryModule, DxFileUploaderModule, DxDataGridModule, DxPopupModule, DxButtonModule, DxDateBoxModule, DxTextBoxModule, DxSelectBoxModule, DxTextAreaModule, DxContextMenuModule, DxMenuModule, DxCheckBoxModule, DxNumberBoxModule, DxTagBoxModule, DxTabPanelModule, DxFormModule, DxScrollViewModule, DxHtmlEditorModule, DxDropDownBoxModule, DxRadioGroupModule, DxProgressBarModule, DxLoadPanelModule, DxValidatorModule, DxToolbarModule } from 'devextreme-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxCaptchaModule } from 'ngx-captcha';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input-gg'
import { SystemguudelinesDetailsComponent } from 'src/app/shared-views/utilitiescomponents/systemguudelines-details/systemguudelines-details.component';
import { SystemmanualPageComponent } from 'src/app/shared-views/utilitiescomponents/systemmanual-page/systemmanual-page.component';
import { AppsignInComponent } from './views/appsign-in/appsign-in.component';
import { AppsignUpComponent } from './views/appsign-up/appsign-up.component';
import { EcredSecretariatsigninComponent } from './views/ecred-secretariatsignin/ecred-secretariatsignin.component';
import { HomePageComponent } from './views/home-page/home-page.component';
import { KnowledgeCenterComponent } from './views/knowledge-center/knowledge-center.component';
import { CenterPageComponent } from './views/layout/center-page/center-page.component';
import { FooterComponent } from './views/layout/footer/footer.component';
import { NavigationComponent } from './views/layout/navigation/navigation.component';
import { PublicLayoutComponent } from './views/layout/public-layout/public-layout.component';
import { TopSectionComponent } from './views/layout/top-section/top-section.component';
import { ReportingAndAnalyticsComponent } from './views/reporting-and-analytics/reporting-and-analytics.component';
import { SubscriptionComponent } from './views/subscription/subscription.component';
import { PublicRoutingModule } from './publicrouting.module';
import { ImportProceduresComponent } from './views/import-procedures/import-procedures.component';
import { TransitProceduresComponent } from './views/transit-procedures/transit-procedures.component';
import { ExportProceduresComponent } from './views/export-procedures/export-procedures.component';
import { ProducthscodeInformationComponent } from './views/producthscode-information/producthscode-information.component';
import { ImportexportsCostsComponent } from './views/importexports-costs/importexports-costs.component';
import { RestrictionsprohibitsComponent } from './views/restrictionsprohibits/restrictionsprohibits.component';
import { FaqsComponent } from './views/faqs/faqs.component';
import { SearchProceduresComponent } from './views/search-procedures/search-procedures.component';

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
    SubscriptionComponent,
    ImportProceduresComponent,
    TransitProceduresComponent,
    ExportProceduresComponent,
    ProducthscodeInformationComponent,
    ImportexportsCostsComponent,
    RestrictionsprohibitsComponent,
    FaqsComponent,SearchProceduresComponent
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