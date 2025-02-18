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
import { httpTranslateLoader } from '../revenue-management/revenue-management.module';
import { HscodeRoutingModule } from './hscode-routing.module';
import { RouterModule } from '@angular/router';
import { HscodechaptersDefinationComponent } from './views/hscodes-mapping/hscodechapters-defination/hscodechapters-defination.component';
import { HscodesSectionsComponent } from './views/hscodes-mapping/hscodes-sections/hscodes-sections.component';
import { HscodesheadingDefinationsComponent } from './views/hscodes-mapping/hscodesheading-definations/hscodesheading-definations.component';
import { HscodesmappingConfigsetupComponent } from './views/hscodes-mapping/hscodesmapping-configsetup/hscodesmapping-configsetup.component';
import { HscodesproductsRegistryComponent } from './views/hscodes-mapping/hscodesproducts-registry/hscodesproducts-registry.component';
import { HscodessubheadingDefinationComponent } from './views/hscodes-mapping/hscodessubheading-defination/hscodessubheading-defination.component';
import { HscodestariffDetailsComponent } from './views/hscodes-mapping/hscodestariff-details/hscodestariff-details.component';
import { SharedhscodesConfigurationsComponent } from './views/hscodes-mapping/sharedhscodes-configurations/sharedhscodes-configurations.component';
import { HscodeDashboardComponent } from './views/hscode-dashboard/hscode-dashboard.component';


const ngWizardConfig: NgWizardConfig = {
  theme: THEME.default
};

@NgModule({
  declarations: [HscodemappingHeaderComponent, HscodemappingLayoutComponent, HscodemappingNavigationComponent,HscodechaptersDefinationComponent,
    HscodesSectionsComponent,HscodesheadingDefinationsComponent,HscodesmappingConfigsetupComponent,HscodesproductsRegistryComponent,
    HscodessubheadingDefinationComponent,HscodestariffDetailsComponent,SharedhscodesConfigurationsComponent,HscodeDashboardComponent],
  imports: [
     CommonModule,
        SharedModuleModule,HscodeRoutingModule,RouterModule,  
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
  
 }
