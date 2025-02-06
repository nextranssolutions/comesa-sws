import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ImportLayoutComponent } from './views/layout/import-layout/import-layout.component';
import { ImportLicenceComponent } from './views/import-licence/import-licence.component';


const routes: Routes = [{
    path: '',
      component: ImportLayoutComponent,
      canActivate: [AuthGuard],
   
    children: [{
              path: 'app-import-licence',
              component: ImportLicenceComponent
            }
        ]
  }
]

//  

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ImportexportControlRoutingModule { }

