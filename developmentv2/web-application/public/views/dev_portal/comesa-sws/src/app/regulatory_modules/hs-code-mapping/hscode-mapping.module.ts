import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HscodemappingHeaderComponent } from './views/layout/hscodemapping-header/hscodemapping-header.component';
import { HscodemappingLayoutComponent } from './views/layout/hscodemapping-layout/hscodemapping-layout.component';
import { HscodemappingNavigationComponent } from './views/layout/hscodemapping-navigation/hscodemapping-navigation.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { DxButtonModule, DxProgressBarModule, DxLoadPanelModule, DxPopupModule, DxDataGridModule, DxActionSheetModule, DxFileUploaderModule, DxNumberBoxModule, DxCheckBoxModule, DxSelectBoxModule, DxTextAreaModule, DxContextMenuModule, DxMenuModule, DxTagBoxModule, DxDateBoxModule, DxTabPanelModule, DxFormModule, DxScrollViewModule, DxTextBoxModule, DxValidatorModule, DxToolbarModule, DxGalleryModule, DxHtmlEditorModule, DxDropDownBoxModule, DxRadioGroupModule, DxTreeListModule } from 'devextreme-angular';
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
import { HscodessubheadingDefinationComponent } from './views/hscodes-mapping/hscodessubheading-defination/hscodessubheading-defination.component';
import { HscodestariffDetailsComponent } from './views/hscodes-mapping/hscodestariff-details/hscodestariff-details.component';
import { SharedhscodesConfigurationsComponent } from './views/hscodes-mapping/sharedhscodes-configurations/sharedhscodes-configurations.component';
import { HscodeDashboardComponent } from './views/hscode-dashboard/hscode-dashboard.component';
import { HscodeInstitutionDepartmentsComponent } from './views/hscode-institutional-information/hscode-institution-departments/hscode-institution-departments.component';
import { HscodeInstitutionsComponent } from './views/hscode-institutional-information/hscode-institutions/hscode-institutions.component';
import { HscodeinstitutionsConfigsetupComponent } from './views/hscode-institutional-information/hscodeinstitutions-configsetup/hscodeinstitutions-configsetup.component';
import { SharedHscodeInstitutionsComponent } from './views/hscode-institutional-information/shared-hscode-institutions/shared-hscode-institutions.component';
import { PermittypeConfigurationsComponent } from './views/permittype-configurations/permittype-configurations.component';
import { HscodeRegistryproductsComponent } from './views/hscode-registryproducts/hscode-registryproducts.component';
import { HscodesproductsRegistryComponent } from './views/hscodes-mapping/hscodesproducts-registry/hscodesproducts-registry.component';
import { RestrictionsProhibitionsComponent } from './views/restrictions-prohibitions/restrictions-prohibitions.component';
import { ServiceDeliveryTimelineComponent } from './views/service_delivery_timeline/service-delivery-timeline/service-delivery-timeline.component';
import { ServiceTypesComponent } from './views/service_delivery_timeline/service-types/service-types.component';
import { ServicedeliveryConfigsetupComponent } from './views/service_delivery_timeline/servicedelivery-configsetup/servicedelivery-configsetup.component';
import { SharedServiceDeliveryComponent } from './views/service_delivery_timeline/shared-service-delivery/shared-service-delivery.component';
import { ImportexportProceduredetailsComponent } from './views/trader_database_procedures/importexport-proceduredetails/importexport-proceduredetails.component';
import { ProcedureCategoriesComponent } from './views/trader_database_procedures/procedure-categories/procedure-categories.component';
import { ProcedureSubcategoriesComponent } from './views/trader_database_procedures/procedure-subcategories/procedure-subcategories.component';
import { SharedTraderdbproceduresComponent } from './views/trader_database_procedures/shared-traderdbprocedures/shared-traderdbprocedures.component';
import { TraderdbproceduresSetupComponent } from './views/trader_database_procedures/traderdbprocedures-setup/traderdbprocedures-setup.component';

const ngWizardConfig: NgWizardConfig = {
  theme: THEME.default
};

@NgModule({

  declarations: [HscodemappingHeaderComponent, HscodemappingLayoutComponent, HscodemappingNavigationComponent, HscodechaptersDefinationComponent,
    HscodesSectionsComponent, HscodesheadingDefinationsComponent, HscodesmappingConfigsetupComponent, HscodeRegistryproductsComponent, HscodesproductsRegistryComponent,
    HscodessubheadingDefinationComponent, HscodestariffDetailsComponent, SharedhscodesConfigurationsComponent, HscodeDashboardComponent,RestrictionsProhibitionsComponent,
    HscodeInstitutionDepartmentsComponent, HscodeInstitutionsComponent, HscodeinstitutionsConfigsetupComponent, SharedHscodeInstitutionsComponent, PermittypeConfigurationsComponent,ServiceDeliveryTimelineComponent,
    ServiceTypesComponent,ServicedeliveryConfigsetupComponent,SharedServiceDeliveryComponent,TraderdbproceduresSetupComponent,SharedTraderdbproceduresComponent,ProcedureSubcategoriesComponent,ProcedureCategoriesComponent,
    ImportexportProceduredetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModuleModule, HscodeRoutingModule, RouterModule,
    NgWizardModule.forRoot(ngWizardConfig),
    NgHttpLoaderModule, DxButtonModule, DxProgressBarModule,
    FormsModule,
    ReactiveFormsModule,
    NgxCaptchaModule, DxLoadPanelModule,
    DxPopupModule, DxDataGridModule, DxActionSheetModule, DxFileUploaderModule, DxNumberBoxModule, DxCheckBoxModule, DxSelectBoxModule, DxTextAreaModule, DxContextMenuModule, DxMenuModule, DxTagBoxModule,
    DxDateBoxModule, DxTabPanelModule, DxFormModule, DxScrollViewModule, DxTreeListModule,
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
