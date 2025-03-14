import { Component } from '@angular/core';
import { SharedImpexpApplicationClass } from '../../shared-impexpapplicationclass/shared-impexpapplicationclass';
import { StepChangedArgs } from 'ng-wizard';
@Component({
  selector: 'app-initiate-personalproducts-permit',
 
  templateUrl: './initiate-personalproducts-permit.component.html',
  styleUrl: './initiate-personalproducts-permit.component.css'
})
export class InitiatePersonalproductsPermitComponent extends SharedImpexpApplicationClass{
  ngOnInit() {
    if (!this.application_details) {
      this.router.navigate(['./importexport-permit-application/draft-personalproductslicense-dashboard']);
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
