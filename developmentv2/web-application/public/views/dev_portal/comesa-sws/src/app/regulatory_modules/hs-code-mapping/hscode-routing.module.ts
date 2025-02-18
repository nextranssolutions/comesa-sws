import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { HscodemappingLayoutComponent } from './views/layout/hscodemapping-layout/hscodemapping-layout.component';

const routes: Routes = [{
  path: '',
  component: HscodemappingLayoutComponent,
  canActivate: [AuthGuard],
  children: [{
  //  " path: '',
  //   component: "
  }
]

}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HscodeRoutingModule { }



