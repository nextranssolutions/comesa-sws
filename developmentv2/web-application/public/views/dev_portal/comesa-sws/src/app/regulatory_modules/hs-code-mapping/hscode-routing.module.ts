import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HscodemappingLayoutComponent } from './views/layout/hscodemapping-layout/hscodemapping-layout.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { HscodesmappingConfigsetupComponent } from './views/hscodes-mapping/hscodesmapping-configsetup/hscodesmapping-configsetup.component';
import { HscodechaptersDefinationComponent } from './views/hscodes-mapping/hscodechapters-defination/hscodechapters-defination.component';
import { HscodesSectionsComponent } from './views/hscodes-mapping/hscodes-sections/hscodes-sections.component';
import { HscodesheadingDefinationsComponent } from './views/hscodes-mapping/hscodesheading-definations/hscodesheading-definations.component';
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


const routes: Routes = [{
  path: '',
  component: HscodemappingLayoutComponent,
  canActivate: [AuthGuard],
  children: [{
    path: 'app-hscode-dashboard',
    component: HscodeDashboardComponent
  },
  {
    path: 'app-hscodesmapping-configsetup',
    component: HscodesmappingConfigsetupComponent
  }, {
    path: 'app-hscodechapters-defination',
    component: HscodechaptersDefinationComponent
  },
  {
    path: 'app-hscodes-sections',
    component: HscodesSectionsComponent
  },
  {
    path: 'app-hscodesheading-definations',
    component: HscodesheadingDefinationsComponent
  },
  {
    path: 'app-hscodesproducts-registry',
    component: HscodesproductsRegistryComponent
  },
  {
    path: 'app-hscode-registryproducts',
    component: HscodeRegistryproductsComponent
  },
  {
    path: 'app-hscode-registryproducts',
    component: HscodeRegistryproductsComponent
  },
  {
    path: 'app-hscodessubheading-defination',
    component: HscodessubheadingDefinationComponent
  },
  {
    path: 'app-hscodestariff-details',
    component: HscodestariffDetailsComponent
  },
  {
    path: 'app-sharedhscodes-configurations',
    component: SharedhscodesConfigurationsComponent
  },

  {
    path: 'app-hscode-institution-departments',
    component: HscodeInstitutionDepartmentsComponent
  },
  {
    path: 'app-hscode-institutions',
    component: HscodeInstitutionsComponent
  },
  {
    path: 'app-hscodeinstitutions-configsetup',
    component: HscodeinstitutionsConfigsetupComponent
  },
  {
    path: 'app-shared-hscode-institutions',
    component: SharedHscodeInstitutionsComponent
  },
  {
    path: 'app-permittype-configurations',
    component: PermittypeConfigurationsComponent
  },
  {
    path: 'app-restrictions-prohibitions',
    component: RestrictionsProhibitionsComponent
  },
  {
    path: 'app-shared-service-delivery',
    component: SharedServiceDeliveryComponent
  },
  {
    path: 'app-servicedelivery-configsetup',
    component: ServicedeliveryConfigsetupComponent
  },
  {
    path: 'app-service-types',
    component: ServiceTypesComponent
  },
  {
    path: 'app-service-delivery-timeline',
    component: ServiceDeliveryTimelineComponent
  },
  {
    path: 'app-importexport-proceduredetails',
    component: ImportexportProceduredetailsComponent
  },
  {
    path: 'app-procedure-categories',
    component: ProcedureCategoriesComponent
  },
  {
    path: 'app-procedure-subcategories',
    component: ProcedureSubcategoriesComponent
  },
  {
    path: 'app-shared-traderdbprocedures',
    component: SharedTraderdbproceduresComponent
  },
  {
    path: 'app-traderdbprocedures-setup',
    component: TraderdbproceduresSetupComponent
  },
  ]
}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class HscodeRoutingModule { }

