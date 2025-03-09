import { ViewChild, Directive } from '@angular/core';

import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { SpinnerVisibilityService } from 'ng-http-loader';

import { DxDataGridComponent } from 'devextreme-angular';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { UtilityService } from 'src/app/core-services/utilities/utility.service';
import { ImportExportService } from '../../services/import-export.service';
import { AuthenticationService } from 'src/app/core-services/authentication/authentication.service';
import { ConfigurationsService } from 'src/app/core-services/configurations/configurations.service';
import { UserManagementService } from 'src/app/core-services/user-management/user-management.service';
import { NgWizardConfig, NgWizardService, STEP_STATE, THEME } from 'ng-wizard';

@Directive({
  selector: '[appSharedImpexpApplicationClass]' // Add a unique selector here
})
export class SharedImpexpApplicationClass {
  
  //start test wizrd 
  stepStates = {
    normal: STEP_STATE.normal,
    disabled: STEP_STATE.disabled,
    error: STEP_STATE.error,
    hidden: STEP_STATE.hidden

  };

  config: NgWizardConfig = {
    selected: 0,
    theme: THEME.arrows,
    toolbarSettings: {
      showNextButton: false,
      showPreviousButton: false
    }
  };
  //ImportexportService
  //dms 
  permitProductsData:any;
  @ViewChild(DxDataGridComponent)
  applicant_id: number;
  isShowAppProcessSubmission:boolean;
  dataGrid: DxDataGridComponent;
  productApplicationProcessingData: any;
  isPreviewApplicationProcessing: boolean = false;
  data_record: any;
  appworkflow_status_id: number;
  product_resp: any; confirmDataParam: any;

  applicationGeneraldetailsfrm: FormGroup;
  permitReceiverSenderFrm: FormGroup;
  applicantDetailsForm: FormGroup;
  
  permitProductsFrm: FormGroup;
  regulatedProductsPermitData: any;
  

  application_details: any;
  status_id: number;
  regulatory_subfunction_id: number;
  process_title: string;;
  regulated_productstype_id: number;
  application_id: number;
  oga_application_code: number;
  transactionpermit_type_id: number;

  process_id: number;
  tracking_no: string;
  status_name: string;
  permit_name: string;
  regulatory_function_id: number = 4;

  app_route: any;
  applicationTypeData: any;
  applicationCategoryData: any;
  applicationTypeCategoryData: any;
  
  termscheckbox: boolean = false;
  app_resp: any;
  consignee_options_id: number;
  consignee_options_check: boolean = true;

  loading: boolean = true;
  terms_conditions: any;
  
  trasactionpermit_type_id: number;
  
  loadingVisible: boolean;
  spinnerMessage: string;
  
  traderAccountData: any;
  
  applicationPreckingQueriesData: any;
  query_sectioncheck: string;

  onApplicationSubmissionFrm: FormGroup;
  queryresponsefrm: FormGroup;
  
  app_routing: any;
  isSaved: boolean = false; // Track save state
  isprodnextdisable: boolean = true;
  response: any;
  addPopupVisible: boolean;
  filesToUpload: Array<File> = [];
  producttype_defination_id: number;

  form_fielddata: any;
  permits_fielddata: any;
  products_fielddata: any;
  applicants_fielddata: any;

  id: number;
  applicant_details:any;

  constructor(
    private configService: ConfigurationsService, 
    public userservice: UserManagementService, 
    public utilityService: UtilityService, 
    public fb: FormBuilder,
    public spinner: SpinnerVisibilityService, 
    public appService: ImportExportService, 
    public router: Router,
    public formBuilder: FormBuilder, 
    public toastr: ToastrService, 
    public authService: AuthenticationService, 
    public httpClient: HttpClient,
    private ngWizardService: NgWizardService
  ) {
    //form 
    let user = this.authService.getUserDetails();
    let me = this;
    this.applicant_id = user.applicant_id;
    this.application_details = localStorage.getItem('application_details');

    this.application_details = JSON.parse(this.application_details);

    this.form_fielddata = this.application_details.application_form;
    this.products_fielddata = this.application_details.permit_products_details;
    this.applicants_fielddata = this.application_details.applicant_details;
    this.applicant_details = this.application_details.applicant_details;
    
    this.applicationGeneraldetailsfrm = this.formBuilder.group({});
    this.permitProductsFrm = this.formBuilder.group({});
    this.applicantDetailsForm = this.formBuilder.group({});

    for (let appfield_name of this.form_fielddata) {
      let field_name = appfield_name['field_name'];
      if (appfield_name['is_mandatory'] == 1) {
        me.applicationGeneraldetailsfrm.addControl(field_name, new FormControl('', Validators.compose([Validators.required])));

      } else {
        me.applicationGeneraldetailsfrm.addControl(field_name, new FormControl('', Validators.compose([])));
      }
    }
  
    for (let prodform_field of this.products_fielddata) {
      let field_name = prodform_field['field_name'];
      if (prodform_field['is_mandatory'] == 1) {
        me.permitProductsFrm.addControl(field_name, new FormControl('', Validators.compose([Validators.required])));
      } else {
        me.permitProductsFrm.addControl(field_name, new FormControl('', Validators.compose([])));
      }
    }

    for (let applicaform_field of this.applicants_fielddata) {
      let field_name = applicaform_field['field_name'];
      
      if (applicaform_field['is_mandatory'] == 1) {
        me.applicantDetailsForm.addControl(field_name, new FormControl('', Validators.compose([Validators.required])));
      } else {
        me.applicantDetailsForm.addControl(field_name, new FormControl('', Validators.compose([])));
      }
    }
    if (this.applicant_details) {
      
      this.applicantDetailsForm.patchValue(this.applicant_details);
    }

    if (this.application_details) {
      this.regulatory_subfunction_id = this.application_details.regulatory_subfunction_id;
      this.process_title = this.application_details.process_title;
      this.application_id = this.application_details.application_id;
      this.tracking_no = this.application_details.tracking_no;
      this.status_name = this.application_details.status_name;
      this.permit_name = this.application_details.permit_name;
      this.status_id = this.application_details.application_status_id;
      this.oga_application_code = this.application_details.oga_application_code;
      this.transactionpermit_type_id = this.application_details.transactionpermit_type_id;
      
      this.applicationGeneraldetailsfrm.patchValue(this.application_details);
    }

    
    this.permitReceiverSenderFrm = new FormGroup({
      name: new FormControl('', Validators.compose([Validators.required])),
      country_id: new FormControl('', Validators.compose([Validators.required])),
      region_id: new FormControl('', Validators.compose([])),
      district_id: new FormControl('', Validators.compose([])),
      email_address: new FormControl('', Validators.compose([Validators.required])),
      postal_address: new FormControl('', Validators.compose([])),
      telephone_no: new FormControl('', Validators.compose([])),
      mobile_no: new FormControl('', Validators.compose([])),
      physical_address: new FormControl('', Validators.compose([Validators.required])),
      tin_no: new FormControl('', Validators.compose([]))
    });

    this.onApplicationSubmissionFrm = new FormGroup({
      paying_currency_id: new FormControl('', Validators.compose([])),
      submission_comments: new FormControl('', Validators.compose([]))
    });
    if (this.status_id < 1) {
      this.status_name = "New"
    }
  }

  funcAutoLoadedParamters() {

    if (this.application_details) {
      this.applicationGeneraldetailsfrm.patchValue(this.application_details);
      this.applicantDetailsForm.patchValue(this.application_details);
      this.applicationGeneraldetailsfrm.patchValue(this.application_details);
    }

  }

  funcReloadQueriesDetails() {

    this.funcgetPreckingQueriesData();

  }
  funcgetPreckingQueriesData() {

    this.utilityService.getApplicationPreQueriesDetails(this.oga_application_code, 'tra_importexport_applications', 'application_status_id', 'utilities/getApplicationQueriesData')
      .subscribe(
        data => {
          this.data_record = data;

          if (this.data_record.success) {
            this.applicationPreckingQueriesData = this.data_record.data;
            ;
          }
        });
  }

  onLoadGuidelines(regulatory_subfunction_id, regulated_productstype_id) {
    this.configService.onLoadAppSubmissionGuidelines(regulatory_subfunction_id, regulated_productstype_id)
      //.pipe(first())
      .subscribe(
        data => {
          this.terms_conditions = data.data;
        },
        error => {
          return false
        });
  }
  onApplicationDashboard() {
   // this.app_route = this.funcREturnApplicationDashboardROute();
    this.router.navigate(this.app_route);
    this.scrollToTop();
  }
  
  onSectionsCboSelect($event) {
    //this.onBusinessTypesLoad($event.value)
  }

  onconsigneeOptionsChange($event) {
    this.consignee_options_id = $event.selectedItem.id;
    if (this.consignee_options_id == 1) {
      this.consignee_options_check = true;
    }
    else {
      this.consignee_options_check = false;
    }
  }
  funcValidatePermitDetails(validation_title, nextStep) {

    const invalid = [];
    const controls = this.applicationGeneraldetailsfrm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        this.toastr.error('Fill In All Mandatory fields with (*), missing value on ' + name.replace('_id', '') + ' and save permit application', 'Alert');
        return;
      }
    }
    if (this.applicationGeneraldetailsfrm.invalid) {
      //this.wizard.model.navigationMode.goToStep(nextStep);
      return;
    }

  }
  
  nextStep() {
    this.ngWizardService.next();
  }

  nextStep1() {
    if (!this.applicantDetailsForm.get('applicant_id')?.value) {
        this.toastr.error('Applicant ID is required before proceeding.', 'Error');
        return;
    }

    // Proceed to the next step after ensuring applicant_id is set
    this.ngWizardService.next(); 
}


  previousStep() {
    this.ngWizardService.previous();
  }

  onSaveImportExportApplication() {

    const invalid = [];
    const controls = this.applicationGeneraldetailsfrm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        this.toastr.error('Fill In All Mandatory fields with (*), missing value on ' + name.replace('_id', ''), 'Alert');
        return;
      }
    }
    if (this.applicationGeneraldetailsfrm.invalid) {
      return;
    }
    
    this.spinner.show();
    // let registrant_details = this.applicationApplicantdetailsfrm.value;//applicant values
    let applicant_id = this.applicantDetailsForm.get('id')?.value;
    let application_options_id = this.applicantDetailsForm.get('application_options_id')?.value;

    this.applicationGeneraldetailsfrm.value['applicant_id'] = applicant_id;
    this.applicationGeneraldetailsfrm.value['application_options_id'] = application_options_id;
    
    this.applicationGeneraldetailsfrm.value['regulatory_subfunction_id'] = this.regulatory_subfunction_id;
    this.spinner.show();
    this.appService.onSavePermitApplication(this.applicationGeneraldetailsfrm.value, 'uploaData', 'saveOgaImportExportApplication')
      .subscribe(
        response => {
          this.product_resp = response;
          if (this.product_resp.success) {
            this.tracking_no = this.product_resp.tracking_no;
            this.trasactionpermit_type_id = this.product_resp.trasactionpermit_type_id;

            this.oga_application_code = this.product_resp.oga_application_code;

            this.applicationGeneraldetailsfrm.patchValue({ trasactionpermit_type_id: this.trasactionpermit_type_id })
            this.toastr.success(this.product_resp.message, 'Response');
            this.isSaved = true; 

          } else {
            this.toastr.error(this.product_resp.message, 'Alert');
            this.isSaved = false;
          }
          this.spinner.hide();
        },
        error => {
          this.loading = false;
          this.isSaved = false;
          this.spinner.hide();
        });
  }

  // Function to handle the next step
onNextStep() {
  if (!this.isSaved) {
    this.toastr.error('Kindly save before proceeding to the next step.', 'Validation Error');
    return;
  }
  this.ngWizardService.next(); // Move to the next step only if saved
}
  

  onPermitsApplicationPrint() {


  }
  submissionsTermscheckbox(e) {

    this.termscheckbox = e.value;

  }

  spinnerShow(spinnerMessage) {
    this.loadingVisible = true;
    this.spinnerMessage = spinnerMessage;
  }
  spinnerHide() {
    this.loadingVisible = false;
  }
  onPermitsApplicationSubmit() {
    if (this.onApplicationSubmissionFrm.invalid) {
      this.toastr.error('Fill in all the submission details to proceed!!', 'Alert');
      return;
    }
   // this.app_route = this.app_route = this.funcREturnApplicationDashboardROute();

    //this.utilityService.onPermitsApplicationSubmit(this.viewRef, this.oga_application_code, this.tracking_no, 'txn_importexport_applications', this.app_route, this.onApplicationSubmissionFrm.value);

  }
  functDataGridToolbar(e, funcBtn, btn_title) {
    e.toolbarOptions.items.unshift({
      location: 'before',
      widget: 'dxButton',
      options: {
        text: btn_title,
        type: 'default',
        icon: 'fa fa-plus',
        onClick: funcBtn.bind(this)

      }
    }, {
      location: 'after',
      widget: 'dxButton',
      options: {
        icon: 'refresh',
        onClick: this.refreshDataGrid.bind(this)
      }
    });
  }

  refreshDataGrid() {
    this.dataGrid.instance.refresh();
  }
  onPremisesPerGridToolbar(e) {
    this.functDataGridToolbar(e, this.nullFunc, '');
  }
  nullFunc() {

  }

  funcValidatePermitProductDetails(validation_title, nextStep) {

    this.spinner.show();
    this.appService.onfuncValidatePermitDetails(this.oga_application_code, validation_title, 'tra_permits_products')
      .subscribe(
        response => {
          if (response.success) {
            this.ngWizardService.next();
          } else {
            this.toastr.error(response.message, 'Alert');
          }
          this.spinner.hide();
        },
        error => {
          this.toastr.error(error.message, 'Alert');
          this.spinner.hide();
        });
  }


  funcValidateApplicationQueryresponse(nextStep) {

    this.spinner.show();
    this.utilityService.funcValidateApplicationQueryresponse(this.oga_application_code, 'txn_importexport_applications')
      .subscribe(
        response => {
          if (response.success) {
            this.ngWizardService.next();
          } else {
            this.toastr.error(response.message, 'Alert');
          }
          this.spinner.hide();
        },
        error => {
          this.toastr.error(error.message, 'Alert');
          this.spinner.hide();
        });
  }

  funcValidatePermitDocumentsDetails(nextStep) {
    this.utilityService.validateApplicationDocumentsQuerySubmission(this.oga_application_code, this.status_id, 'txn_importexport_applications')
      .subscribe(
        response => {
          this.spinner.hide();
          let response_data = response;
          if (response_data.success) {
            this.ngWizardService.next();
          }
          else {

            this.toastr.error(response_data.message, 'Response');
          }

          this.spinner.hide();
        });


  }
  funcValidateStepDetails(validation_title, data, nextStep) {

    if (data.length != 0 && data.length) {
     
      this.ngWizardService.next();
    }
    else {
      this.toastr.error(validation_title, 'Alert');
    }

  }

  onSaveinitqueryresponse() {
    if (this.queryresponsefrm.invalid) {
      return;
    }

    //also get the premises ID onsaveApplicationCodeDetails(oga_application_code, app_data, action_url)
    this.utilityService.onsaveApplicationCodeDetails(this.oga_application_code, this.queryresponsefrm.value, 'onSavePrecheckingqueryresponse')
      .subscribe(
        response => {
          this.app_resp = response;
          if (this.app_resp.success) {
            this.toastr.success(this.app_resp.message, 'Response');
            this.funcReloadQueriesDetails();

          } else {
            this.toastr.error(this.app_resp.message, 'Alert');
          }
        },
        error => {
          this.toastr.error('Error occurred!!', 'Alert');
        });
  } funcInitQueryResponse(data) {

    // this.premisesPersonnelDetailsfrm.patchValue({personnel_id:data.data.personnel_id,id:data.data.id,start_date:data.data.start_date,end_date:data.data.end_date, personnel_name:data.data.personnel_name})
    this.queryresponsefrm.patchValue(data.data);
    this.query_sectioncheck = data.data.application_section;

    ///this.isInitalQueryResponseFrmVisible = true;

  }
  funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width / 100;
  }
  funcpopHeight(percentage_height) {
    return window.innerHeight * percentage_height / 100;
  }

  funcValidatePermitdetails(previous_step, direction) {
    const invalid = [];
    const controls = this.applicationGeneraldetailsfrm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        this.toastr.error('Fill In All Mandatory fields with (*), missing value on ' + name.replace('_id', ''), 'Alert');

        return;
      }
    }

  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scrolling for better UX
    });
  }

  funcValidateNavPermitProductDetails(nextStep, direction) {

    this.spinner.show();
    this.appService.onfuncValidatePermitDetails(this.oga_application_code, 'Invoice Product details', 'tra_permits_products')
      .subscribe(
        response => {
          if (!response.success) {
            this.toastr.error('Add the Invoice Product details to proceed', 'Alert');
            
            return;
          }else{
            this.ngWizardService.next();
          }
          this.spinner.hide();
        },
        error => {
          this.toastr.error(error.message, 'Alert');
          this.spinner.hide();
        });
  }
  onFuncSubmitApplication() {
    this.isShowAppProcessSubmission= true;
  }

}
