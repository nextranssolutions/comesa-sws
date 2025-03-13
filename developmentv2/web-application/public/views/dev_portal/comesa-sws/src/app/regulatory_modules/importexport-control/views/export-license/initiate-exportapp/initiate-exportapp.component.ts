import { Component } from '@angular/core';
import { SharedImpexpApplicationClass } from '../../shared-impexpapplicationclass/shared-impexpapplicationclass';
import { StepChangedArgs } from 'ng-wizard';

@Component({
  selector: 'app-initiate-exportapp',
  templateUrl: './initiate-exportapp.component.html',
  styleUrl: './initiate-exportapp.component.css'
})
export class InitiateExportappComponent extends SharedImpexpApplicationClass{
  isValidTypeBoolean: any;

    ngOnInit() {
      if (!this.application_details) {
        this.router.navigate(['./importexport-control/draft-exportlicense-dash']);
        this.scrollToTop();
        return;
      }
    }
  stepChanged($event: StepChangedArgs) {
  throw new Error('Method not implemented.');
  }
}
