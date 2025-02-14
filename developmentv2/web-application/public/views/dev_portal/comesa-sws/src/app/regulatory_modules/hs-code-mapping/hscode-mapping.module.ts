import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HscodemappingHeaderComponent } from './views/layout/hscodemapping-header/hscodemapping-header.component';
import { HscodemappingLayoutComponent } from './views/layout/hscodemapping-layout/hscodemapping-layout.component';
import { HscodemappingNavigationComponent } from './views/layout/hscodemapping-navigation/hscodemapping-navigation.component';
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
import { ImportexportRoutingModule } from '../importexport-control/importexport-routing.module';
import { httpTranslateLoader } from '../revenue-management/revenue-management.module';

const ngWizardConfig: NgWizardConfig = {
  theme: THEME.default
};

@NgModule({
  declarations: [HscodemappingHeaderComponent, HscodemappingLayoutComponent, HscodemappingNavigationComponent],
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
        SafePipeModule,
      ]
  
})
export class HscodeMappingModule {
  HscodemappingHeaderComponent
 }
