import { Component } from '@angular/core';
import { StepChangedArgs } from 'ng-wizard';
import { SharedImpexpApplicationClass } from '../../shared-impexpapplicationclass/shared-impexpapplicationclass';
@Component({
  selector: 'app-preview-importapp',
  templateUrl: './preview-importapp.component.html',
  styleUrl: './preview-importapp.component.css'
})
export class PreviewImportappComponent extends SharedImpexpApplicationClass{
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
