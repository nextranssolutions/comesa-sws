import { Component } from '@angular/core';
import { StepChangedArgs } from 'ng-wizard';
import { SharedImpexpappclassModule } from '../../shared-impexpappclass/shared-impexpappclass.module';

@Component({
  selector: 'app-initiate-importappreport',

  templateUrl: './initiate-importappreport.component.html',
  styleUrl: './initiate-importappreport.component.css'
})
export class InitiateImportappreportComponent extends SharedImpexpappclassModule {
 ngOnInit() {
    if (!this.application_details) {
      this.router.navigate(['./importexport-control/draft-importlicense-dashboard']);
      this.scrollToTop();
      return;
    }
  }
stepChanged($event: StepChangedArgs) {
throw new Error('Method not implemented.');
}
isValidTypeBoolean: any;
// previousStep() {
// throw new Error('Method not implemented.');
// }
// nextStep() {
// throw new Error('Method not implemented.');
// }


prodclass_category_id: any;
query_ref_id: any;
product_type_id: any;

}
