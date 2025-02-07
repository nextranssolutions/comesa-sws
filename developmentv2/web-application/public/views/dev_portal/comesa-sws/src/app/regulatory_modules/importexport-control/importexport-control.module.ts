import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { DxButtonModule, DxProgressBarModule, DxLoadPanelModule, DxPopupModule, DxDataGridModule, DxActionSheetModule, DxFileUploaderModule, DxNumberBoxModule, DxCheckBoxModule, DxSelectBoxModule, DxTextAreaModule, DxContextMenuModule, DxMenuModule, DxTagBoxModule, DxDateBoxModule, DxTabPanelModule, DxFormModule, DxScrollViewModule, DxTextBoxModule, DxValidatorModule, DxToolbarModule, DxGalleryModule, DxHtmlEditorModule, DxDropDownBoxModule, DxRadioGroupModule } from 'devextreme-angular';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { NgxCaptchaModule } from 'ngx-captcha';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input-gg';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ImportexportControlRoutingModule } from './importexport-controlrouting.module';
import { ImportHeaderComponent } from './views/layout/import-header/import-header.component';
import { ImportLayoutComponent } from './views/layout/import-layout/import-layout.component';
import { ImportNavigationComponent } from './views/layout/import-navigation/import-navigation.component';
import { SharedModuleModule } from 'src/app/shared-views/shared-module.module';
import { ImportLicenceComponent } from './views/import-licence/import-licence.component';


@NgModule({
  declarations: [
    ImportHeaderComponent,ImportLayoutComponent,ImportNavigationComponent,ImportLicenceComponent
  ],
  imports: [
    CommonModule, NgHttpLoaderModule, ImportexportControlRoutingModule, DxButtonModule, DxProgressBarModule,
        SharedModuleModule,
  ], exports: [
    ImportexportControlRoutingModule,
       FormsModule,
      ReactiveFormsModule,
     
    ]
})
export class ImportexportControlModule { }

export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
