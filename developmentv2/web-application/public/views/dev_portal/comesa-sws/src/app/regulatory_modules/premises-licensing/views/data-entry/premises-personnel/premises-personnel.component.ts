import { ChangeDetectorRef, Component, ViewContainerRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ToastrService } from 'ngx-toastr';
import { ConfigurationsService } from 'src/app/core-services/configurations/configurations.service';
import { DocumentManagementService } from 'src/app/core-services/document-management/document-management.service';
import { UtilityService } from 'src/app/core-services/utilities/utility.service';
import { PremisesLicensingService } from '../../../services/premises-licensing.service';
import { AuthenticationService } from 'src/app/core-services/authentication/authentication.service';

@Component({
  selector: 'app-premises-personnel',
  templateUrl: './premises-personnel.component.html',
  styleUrl: './premises-personnel.component.css'
})
export class PremisesPersonnelComponent {


  premisesPersonnelDetailsfrm: FormGroup;
  newPremisesPersonnelDetailsFrm: FormGroup;
  premPersonnelDetailsData: any;
  isBusinessPersonnelPopupVisible: boolean;
  qualificationsData: any;
  personnelPositionData: any;
  studyFieldsData: any;
  personnel_informationData: any;
  isaddNewPremisesPersonnelDetails: boolean;
  is_readonly: boolean;

  premise_id: number;
  premisesGeneraldetailsfrm: FormGroup;
  personnelIdentificationTypeData: any;

  personnel_id: number;
  personnel_QualificationData: any;
  personnel_type_id: number;
  app_resp: any;
  isPersonnelPopupVisible: boolean;
  premises_resp: any;
  isperssonelAddPopupVisible: boolean;
  loading: boolean;
  constructor(public cdr: ChangeDetectorRef, public dmsService: DocumentManagementService, public fb: FormBuilder, public spinner: SpinnerVisibilityService, public configService: ConfigurationsService, public appService: PremisesLicensingService, public router: Router, public formBuilder: FormBuilder, public config: ConfigurationsService,  public toastr: ToastrService, public authService: AuthenticationService, public utilityService: UtilityService) {

  }
  ngOnInit() {
    this.onLoadPremisesPersonnelDetails();
    this.onpersonnelIdentificationTypeDataLoad();
  }
  funcEditPersonnelDetails(data) {

    // this.premisesPersonnelDetailsfrm.patchValue({personnel_id:data.data.personnel_id,id:data.data.id,start_date:data.data.start_date,end_date:data.data.end_date, personnel_name:data.data.personnel_name})
    this.premisesPersonnelDetailsfrm.patchValue(data.data);

    this.premisesPersonnelDetailsfrm.patchValue(data.data);
    //load the personnel qualifiations 

    this.isBusinessPersonnelPopupVisible = true;
    this.onLoadPersonnerQualifationsDetails(data.data.personnel_id);
    this.personnel_id = data.data.personnel_id;

  }
  onLoadPersonnerQualifationsDetails(personnel_id) {
    this.appService.onLoadPersonnerQualifationsDetails(personnel_id)
      .subscribe(
        data_response => {
          this.personnel_QualificationData = data_response.data;
        },
        error => {
          return false
        });

  } onPremisesPerGridToolbar(e, is_readonly) {
    this.functDataGridToolbar(e, this.funAddNewPremisesPersonnelDetails, '', is_readonly);
  } funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width / 100;
  }

  /* onSavePersonnelQualification() {
 
     if (this.personnelQualificationFrm.invalid) {
       return;
     }
     //also get the premises ID
     this.appService.onSavePersonnelQualification(this.personnelQualificationFrm.value)
       .subscribe(
         response => {
           this.premises_resp = response.json();
           if (this.premises_resp.success) {
 
             this.toastr.success(this.premises_resp.message, 'Response');
 
             this.onLoadPersonnerQualifationsDetails(this.premises_resp.personnel_id);
 
           } else {
             this.toastr.error(this.premises_resp.message, 'Alert');
           }
         },
         error => {
           this.loading = false;
         });
   }
   */
  onLoadPremisesPersonnelDetails() {

    this.appService.onLoadPremisesPersonnelDetails(this.premise_id)
      //.pipe(first())
      .subscribe(
        data => {//dtpremPersonnelDetailsData
          this.premPersonnelDetailsData = data.data;
        },
        error => {
          return false
        });
  }
  funcDeletePersonnelDetails(data) {
    //func_delete records 
    let record_id = data.data.id;
    let apppremises_id = data.data.premise_id;
    let table_name = 'wb_premises_personnel';
    this.funcDeleteDetailhelper(record_id, apppremises_id, table_name, 'busines_personnel', 'Premises Personnel');

  }
  funcDeleteDetailhelper(record_id, apppremises_id, table_name, reload_type, title) {
    /* this.modalServ.openDialog(this.viewRef, {
       title: 'Are You sure You want to delete ' + title + '?',
       childComponent: '',
       settings: {
         closeButtonClass: 'fa fa-close'
       },
       actionButtons: [
         {
           text: 'Yes',
           buttonClass: 'btn btn-danger',
           onAction: () => new Promise((resolve: any, reject: any) => {
             this.appService.onDeletePremisesDetails(record_id, table_name, apppremises_id, 'Premises Other Details')
               //.pipe(first())
               .subscribe(
                 data_response => {
                   let resp = data_response.json();
 
                   if (resp.success) {
                     
                       this.onLoadPremisesPersonnelDetails();
 
                     this.toastr.success(resp.message, 'Response');
                   }
                   else {
                     this.toastr.error(resp.message, 'Alert');
                   }
                 },
                 error => {
                   return false
                 });
             resolve();
           })
         },
         {
           text: 'no',
           buttonClass: 'btn btn-default',
           onAction: () => new Promise((resolve: any) => {
 
             resolve();
 
           })
         }
       ]
     });
     */
  }
  funAddNewPremisesPersonnelDetails() {
    this.isaddNewPremisesPersonnelDetails = true;
  }
  onPersonnelSearchDetails(personnel_type_id) {
    this.personnel_type_id = personnel_type_id;
    this.appService.onLoadPersonnelInformations()
      .subscribe(
        data_response => {
          this.personnel_informationData = data_response.data;

          this.isPersonnelPopupVisible = true;
        },
        error => {
          return false
        });

  }

  funcSelectPremisePersonnel(data) {
    if (this.personnel_type_id == 1) {
      this.premisesGeneraldetailsfrm.patchValue({ contact_person_id: data.data.id, contact_person: data.data.name })
    }
    else {
      this.premisesPersonnelDetailsfrm.patchValue({ personnel_id: data.data.id, name: data.data.name, email_address: data.data.email_address, telephone_no: data.data.telephone_no, postal_address: data.data.postal_address })
      //reload the qualifications and documents
      this.personnel_id = data.data.id;
    }


    this.isPersonnelPopupVisible = false;

  } onPremisesPersonnelToolbar(e, is_readonly) {
    this.functDataGridToolbar(e, this.funAddPremisesPersonnelDetails, 'Premises Personnel', is_readonly);
  }

  functDataGridToolbar(e, funcBtn, btn_title, is_readonly = false) {
    e.toolbarOptions.items.unshift({
      location: 'before',
      widget: 'dxButton',
      options: {
        text: btn_title,
        type: 'default',
        disabled: is_readonly,
        icon: 'fa fa-plus',
        onClick: funcBtn.bind(this)

      }
    }, {
      location: 'after',
      widget: 'dxButton',
      options: {
        icon: 'refresh',
        // onClick: this.refreshDataGrid.bind(this)
      }
    });
  } onpersonnelIdentificationTypeDataLoad() {

    var data = {
      table_name: 'par_identification_types'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          ;
          this.personnelIdentificationTypeData = data;
        },
        error => {
          return false
        });
  }
  funAddPremisesPersonnelDetails() {

    this.premisesPersonnelDetailsfrm.reset();
    //load the personnel qualifiations 

    this.isBusinessPersonnelPopupVisible = true;
    this.personnel_id = 0;
    this.personnel_QualificationData = {};

  }

  onSaveNewPremisesPersonnelDetails() {
    //    this.spinner.show();
    let table_name;
    table_name = 'tra_personnel_information';
    let name = this.newPremisesPersonnelDetailsFrm.get('name')?.value;
    let email_address = this.newPremisesPersonnelDetailsFrm.get('email_address')?.value;
    let telephone_no = this.newPremisesPersonnelDetailsFrm.get('telephone_no')?.value;
    let postal_address = this.newPremisesPersonnelDetailsFrm.get('postal_address')?.value;

    this.utilityService.onAddPersonnDetails(table_name, this.newPremisesPersonnelDetailsFrm.value)
      .subscribe(
        response => {
          this.app_resp = response;
          //the details 
          if (this.app_resp.success) {
            if (this.personnel_type_id == 1) {

              this.toastr.success(this.app_resp.message, 'Response');

              this.premisesGeneraldetailsfrm.patchValue({ contact_person_id: this.app_resp.record_id, contact_person: name })
            }
            else {
              this.premisesPersonnelDetailsfrm.patchValue({ personnel_id: this.app_resp.record_id, name: name, email_address: email_address, telephone_no: telephone_no, postal_address: postal_address })
            }
            this.isaddNewPremisesPersonnelDetails = false;
            this.isPersonnelPopupVisible = false;
          } else {
            this.toastr.error(this.app_resp.message, 'Alert');
          }
          this.spinner.hide();
        },
        error => {
          this.toastr.error('Error Occurred', 'Alert');
        });
  }
  onSavePremisesPersonnelDetails() {
    if (this.premisesPersonnelDetailsfrm.invalid) {
      return;
    }
    //also get the premises ID
    this.appService.onSavePremisesPersonnelDetails(this.premisesPersonnelDetailsfrm.value, this.premise_id)
      .subscribe(
        response => {
          this.premises_resp = response;
          if (this.premises_resp.success) {
            this.toastr.success(this.premises_resp.message, 'Response');
            this.isBusinessPersonnelPopupVisible = false;
            this.isperssonelAddPopupVisible = false;

            this.onLoadPremisesPersonnelDetails();

          } else {
            this.toastr.error(this.premises_resp.message, 'Alert');
          }
        },
        error => {
          this.loading = false;
        });
  }
}
