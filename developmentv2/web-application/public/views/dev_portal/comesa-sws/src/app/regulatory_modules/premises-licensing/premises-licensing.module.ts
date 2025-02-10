import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PremiseslicensingNavigationComponent } from './views/layout/premiseslicensing-navigation/premiseslicensing-navigation.component';
import { PremiseslicensingHeaderComponent } from './views/layout/premiseslicensing-header/premiseslicensing-header.component';
import { PremiseslicensingLayoutComponent } from './views/layout/premiseslicensing-layout/premiseslicensing-layout.component';
import { SharedModuleModule } from 'src/app/shared-views/shared-module.module';
import { PremiseslicensingRoutingModule } from './premiseslicensing-routing.module';
import { DraftNewpremisesapplicationComponent } from './views/newprem-appdashboard/draft-newpremisesapplication/draft-newpremisesapplication.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { DxButtonModule, DxProgressBarModule, DxLoadPanelModule, DxPopupModule, DxDataGridModule, DxActionSheetModule, DxFileUploaderModule, DxNumberBoxModule, DxCheckBoxModule, DxSelectBoxModule, DxTextAreaModule, DxContextMenuModule, DxMenuModule, DxTagBoxModule, DxDateBoxModule, DxTabPanelModule, DxFormModule, DxScrollViewModule, DxTextBoxModule, DxValidatorModule, DxToolbarModule, DxGalleryModule, DxHtmlEditorModule, DxDropDownBoxModule, DxRadioGroupModule } from 'devextreme-angular';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { NgWizardConfig, NgWizardModule, THEME } from 'ng-wizard';
import { NgxCaptchaModule } from 'ngx-captcha';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input-gg';
import { httpTranslateLoader } from 'src/app/core-modules/public/public.module';
import { InitiateNewpremiseApplicationComponent } from './views/newprem-appdashboard/initiate-newpremise-application/initiate-newpremise-application.component';
import { PremisesGeneralInfoComponent } from './views/data-entry/premises-general-info/premises-general-info.component';
import { PremisesOtherstoreslocationComponent } from './views/data-entry/premises-otherstoreslocation/premises-otherstoreslocation.component';
import { PremisesPersonnelComponent } from './views/data-entry/premises-personnel/premises-personnel.component';
import { PremisesProductlineDetailsComponent } from './views/data-entry/premises-productline-details/premises-productline-details.component';
import { PremisesBusinessoperationsComponent } from './views/data-entry/premises-businessoperations/premises-businessoperations.component';


const ngWizardConfig: NgWizardConfig = {
  theme: THEME.default
};

@NgModule({
  declarations: [PremiseslicensingNavigationComponent, InitiateNewpremiseApplicationComponent,
    PremisesGeneralInfoComponent,PremisesBusinessoperationsComponent, PremisesOtherstoreslocationComponent, PremisesPersonnelComponent, PremisesProductlineDetailsComponent,
    PremiseslicensingHeaderComponent, PremiseslicensingLayoutComponent, DraftNewpremisesapplicationComponent],
  imports: [
    CommonModule, SharedModuleModule, PremiseslicensingRoutingModule,
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
  ]
})
export class PremisesLicensingModule { }
