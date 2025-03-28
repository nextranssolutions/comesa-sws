import { Component } from '@angular/core';
import { SharedImpexpApplicationClass } from '../../shared-impexpapplicationclass/shared-impexpapplicationclass';
import { StepChangedArgs } from 'ng-wizard';

@Component({
  selector: 'app-preview-importapplication',
  templateUrl: './preview-importapplication.component.html',
  styleUrl: './preview-importapplication.component.css'
})
export class PreviewImportapplicationComponent extends SharedImpexpApplicationClass {
   ngOnInit() {
      if (!this.application_details) {
        this.router.navigate(['./importexport-permit-application/draft-importlicense-dashboard']);
        this.scrollToTop();
        return;
      }
    }
  
    stepChanged($event: StepChangedArgs) {
      throw new Error('Method not implemented.');
    }
    isValidTypeBoolean: any;
    prodclass_category_id: any;
    query_ref_id: any;
    product_type_id: any;
}
