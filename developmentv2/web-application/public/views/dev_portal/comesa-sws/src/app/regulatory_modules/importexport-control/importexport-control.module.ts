import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImportexportRoutingModule } from './importexport-routing.module';
import { ImportexportNavigationComponent } from './views/layout/importexport-navigation/importexport-navigation.component';
import { ImportexportLayoutComponent } from './views/layout/importexport-layout/importexport-layout.component';
import { ImportexportHeaderComponent } from './views/layout/importexport-header/importexport-header.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { DxButtonModule, DxProgressBarModule, DxLoadPanelModule, DxPopupModule, DxDataGridModule, DxActionSheetModule, DxFileUploaderModule, DxNumberBoxModule, DxCheckBoxModule, DxSelectBoxModule, DxTextAreaModule, DxContextMenuModule, DxMenuModule, DxTagBoxModule, DxDateBoxModule, DxTabPanelModule, DxFormModule, DxScrollViewModule, DxTextBoxModule, DxValidatorModule, DxToolbarModule, DxGalleryModule, DxHtmlEditorModule, DxDropDownBoxModule, DxRadioGroupModule } from 'devextreme-angular';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { NgxCaptchaModule } from 'ngx-captcha';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input-gg';
import { httpTranslateLoader } from 'src/app/core-modules/public/public.module';
import { DraftImportlicensedashComponent } from './views/import-license/draft-importlicensedash/draft-importlicensedash.component';
import { PermitproductdetailsComponent } from './views/impexpdata_entry/permitproductdetails/permitproductdetails.component';
import { InitiateImportappComponent } from './views/import-license/initiate-importapp/initiate-importapp.component';
import { PermitgeneraldetailsComponent } from './views/impexpdata_entry/permitgeneraldetails/permitgeneraldetails.component';
// import { SharedImpexpApplicationClass } from './views/shared-impexpapplicationclass/shared-impexpapplicationclass';
import { NgWizardConfig, NgWizardModule, THEME } from 'ng-wizard'
import { SafePipeModule } from '../../safe-pipe/safe-pipe.module';
import { SharedModuleModule } from '../../shared-views/shared-module.module';

const ngWizardConfig: NgWizardConfig = {
  theme: THEME.default
};


@NgModule({
  declarations: [ImportexportNavigationComponent,
    ImportexportLayoutComponent, DraftImportlicensedashComponent,
    PermitproductdetailsComponent, PermitgeneraldetailsComponent,
    ImportexportHeaderComponent,InitiateImportappComponent],
  imports: [
    CommonModule, ImportexportRoutingModule,
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
    SafePipeModule
  ]
})
export class ImportexportControlModule { }
