import { Component } from '@angular/core';
import { NgWizardConfig, NgWizardService, STEP_STATE, StepChangedArgs, THEME } from 'ng-wizard';
import { SharedpremApplicationClass } from '../../sharedprem-applicationclass/sharedprem-applicationclass';

@Component({
  selector: 'app-initiate-newpremise-application',
  templateUrl: './initiate-newpremise-application.component.html',
  styleUrl: './initiate-newpremise-application.component.css'
})
export class InitiateNewpremiseApplicationComponent extends SharedpremApplicationClass{
override ngOnInit(): void {
    if (!this.premisesapp_details){
      this.router.navigate(['./premises-licensing/draftnew_premisesregiatration']);
      this.scrollToTop();
      return;
    }
}
}
