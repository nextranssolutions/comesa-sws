import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HscodemappingLayoutComponent } from './views/layout/hscodemapping-layout/hscodemapping-layout.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { DraftImportlicensedashComponent } from '../importexport-control/views/import-license/draft-importlicensedash/draft-importlicensedash.component';
import { HscodesconfigSetupComponent } from 'src/app/core-modules/cimex-admin/views/configurations/hscodes-configurations/hscodesconfig-setup/hscodesconfig-setup.component';
import { PermitTypesComponent } from 'src/app/core-modules/cimex-admin/views/configurations/permittypes-configuration/permit-types/permit-types.component';
import { InstitutionsInformationComponent } from 'src/app/core-modules/cimex-admin/views/system-administration/institutions-information/institutions-information.component';

const routes: Routes = [{
path: '',
  component: HscodemappingLayoutComponent,
  canActivate: [AuthGuard],
  children: [{
    path: '',
    component:DraftImportlicensedashComponent
  },{
      path: 'app-hscodesconfig-setup',
      component: HscodesconfigSetupComponent
    },
    {
      path: 'app-permit-types',
      component: PermitTypesComponent
    },
    {
      path: 'app-institutions-information',
      component: InstitutionsInformationComponent
    }
]
}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
 
})
export class HscodeRoutingModule { }

