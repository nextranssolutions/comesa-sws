import { Component } from '@angular/core';
import { SharedImpexpApplicationClass } from '../../shared-impexpapplicationclass/shared-impexpapplicationclass';
import { StepChangedArgs } from 'ng-wizard';

@Component({
  selector: 'app-initiate-permitsfor-personaluseproducts',
  templateUrl: './initiate-permitsfor-personaluseproducts.component.html',
  styleUrl: './initiate-permitsfor-personaluseproducts.component.css'
})
export class InitiatePermitsforPersonaluseproductsComponent extends SharedImpexpApplicationClass {
  ngOnInit() {
    if (!this.application_details) {
      this.router.navigate(['./importexport-control/personaluseproducts-dash']);
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
