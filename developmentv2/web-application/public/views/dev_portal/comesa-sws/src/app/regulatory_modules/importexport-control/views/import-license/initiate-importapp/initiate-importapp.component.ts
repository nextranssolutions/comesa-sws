import { Component } from '@angular/core';
import { SharedImpexpApplicationClass } from '../../shared-impexpapplicationclass/shared-impexpapplicationclass';
import { StepChangedArgs } from 'ng-wizard';

@Component({
  selector: 'app-initiate-importapp',
  templateUrl: './initiate-importapp.component.html',
  styleUrl: './initiate-importapp.component.css'
})
export class InitiateImportappComponent extends SharedImpexpApplicationClass{
config: any;
stepChanged($event: StepChangedArgs) {
throw new Error('Method not implemented.');
}
isValidTypeBoolean: any;
previousStep() {
throw new Error('Method not implemented.');
}
nextStep() {
throw new Error('Method not implemented.');
}


prodclass_category_id: any;
query_ref_id: any;
product_type_id: any;

}
