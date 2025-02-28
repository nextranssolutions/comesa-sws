import { ViewChild,  Directive } from '@angular/core';

import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { SpinnerVisibilityService } from 'ng-http-loader';

import { DxDataGridComponent } from 'devextreme-angular';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { NgWizardConfig, NgWizardService, STEP_STATE, StepChangedArgs, THEME } from "ng-wizard";
import { UtilityService } from 'src/app/core-services/utilities/utility.service';
import { ImportExportService } from '../../services/import-export.service';
import { AuthenticationService } from 'src/app/core-services/authentication/authentication.service';
import { ConfigurationsService } from 'src/app/core-services/configurations/configurations.service';

@Directive({
  selector: '[appSharedImpexpApplicationClass]' // Add a unique selector here
})
export class SharedImpexpApplicationClass {
  //ImportexportService
  //dms 
  @ViewChild(DxDataGridComponent)
  appuploaded_document_id: number;
  trader_id: number;
  mistrader_id: number;
  permit_id: any;
  dataGrid: DxDataGridComponent;
  productApplicationProcessingData: any;
  isPreviewApplicationProcessing: boolean = false;
  deviceTypeData: any;
  data_record: any;
  
  product_resp: any; confirmDataParam: any;
  applicationGeneraldetailsfrm: FormGroup;
  documentUploadfrm: FormGroup;
  permitProductsFrm: FormGroup;
  regulatedProductsPermitData: any;

  sectionsData: any;
  zoneData: any;
  permit_product_id: number;
  isUploadedInvoiceProductsWin: boolean;
  documentMenuItems = [
    {
      text: "Document(s) Action",
      icon: 'menu',
      items: [
        { text: "Preview/Download Document", action: 'download', icon: 'fa fa-download', },
        { text: "Update Document", action: 'update', icon: 'fa fa-upload', },
        { text: "Delete Document", action: 'delete', icon: 'fa fa-trash-o' },
        { text: "Preview Previous Versions", action: 'version', icon: 'fa fa-upload', },
      ]
    }
  ];
  documentVersionMenuItems = [
    {
      text: "Document(s) Action",
      icon: 'menu',
      items: [
        { text: "Preview/Download Document", action: 'versiondownload', icon: 'fa fa-download' }
      ]
    }
  ];

  appDocumentsUploadData: any = {};
  appDocumentsUploadRequirement: any = {};
  appDocumentsVersionsUploadData: any = {};
  application_type_id: any;

  application_details: any;
  status_id: number;
  regulatory_subfunction_id: number;
  process_title: string;;
  regulated_productstype_id: number;
  application_id: number;
  application_code: number;
  tracking_no: string;
  status_name: string;
  regulatory_function_id: number = 4;

  app_route: any;
  applicationTypeData: any;
  applicationCategoryData: any;
  applicationTypeCategoryData: any;
  permitReasonData: any;
  portOfEntryExitData: any;
  payingCurrencyData: any;
  consigneeOptionsData: any;
  modeOfTransportData: any;

  termscheckbox: boolean = false;
  app_resp: any;
  consignee_options_id: number;
  consignee_options_check: boolean = true;
  userAccountFrm: FormGroup;
  applicantDetailsForm: FormGroup;
  isPermitproductsPopupVisible: boolean = false;
  isDocumentUploadPopupVisible: boolean = false;

  loading: boolean = true;
  terms_conditions: any;

  countries: any;
  regions: any;
  districts: any;

  senderReceiverData: any = {};
  ispremisesSearchWinVisible: boolean = false;
  issenderreceiverSearchWinVisible: boolean = false;
  issenderreceiverAddWinVisible: boolean = false;
  registered_premisesData: any = {};
  permitReceiverSenderFrm: FormGroup;
  productGeneraldetailsfrm: FormGroup;

  consignee_sendertitle: string;
  checkifsenderreceiver: boolean;

  document_previewurl: any;
  isDocumentPreviewDownloadwin: boolean = false;
  isDocumentVersionPreviewDownloadwin: boolean = false;
  documentsVersionsUploadData: any;
  documentsUploadData: any;
  documentsUploadRequirementData: any;

  permitProductsData: any;
  permitUploadedProductsData: any;
  registeredProductsData: any = {};
  commonNamesData: any;
  productCategoryData: any;
  devicesTypeData: any;
  device_type_visible: boolean = false;
  import_typecategory_visible: boolean = false;
  isPermitproductsAddPopupVisible: boolean = false;
  currencyData: any;
  weightsUnitData: any;
  packagingUnitsData: any;
  siUnitsData: any;
  classificationData: any;
  quantity: number = 100;
  unit_price: number;
  isnewproductAddWinVisible: boolean = false;
  enabled_newproductadd: boolean = false;
  showProductAddOption: boolean = false;
  is_regulatedproducts: boolean = false;
  proforma_currency_id: number;
  isInitalQueryResponseFrmVisible: boolean = false;
  initqueryresponsefrm: FormGroup;
  applicationPreckingQueriesData: any;
  query_sectioncheck: string;
  onApplicationSubmissionFrm: FormGroup;
  permitProductsCategoryData: any;
  has_invoicegeneration: boolean;
  app_routing: any;
  form_fielddata: any;
  isprodnextdisable: boolean = true;

  filesToUpload: Array<File> = [];
  producttype_defination_id: number;
  constructor(public ngWizardService: NgWizardService, private configService:ConfigurationsService, public utilityService: UtilityService, public fb: FormBuilder, 
    public spinner: SpinnerVisibilityService, public appService: ImportExportService, public router: Router, 
    public formBuilder: FormBuilder, public toastr: ToastrService, public authService: AuthenticationService, public httpClient: HttpClient) {
    //form 
    let user = this.authService.getUserDetails();

    this.trader_id = user.trader_id;
    this.mistrader_id = user.mistrader_id;
    this.application_details = localStorage.getItem('application_details');
    this.application_details = JSON.parse(this.application_details);
    this.form_fielddata = this.application_details.application_form;
    this.applicationGeneraldetailsfrm = this.formBuilder.group({});
    

    for (let form_field of this.form_fielddata) {
      let field_name = form_field['field_name'];
      if (form_field['is_mandatory'] == 1) {
        this.applicationGeneraldetailsfrm.addControl(field_name, new FormControl('', Validators.compose([Validators.required])));

      } else {
        this.applicationGeneraldetailsfrm.addControl(field_name, new FormControl('', Validators.compose([])));

      }

    }
    
    if (this.application_details) {
      

      this.regulatory_subfunction_id = this.application_details.regulatory_subfunction_id;
      this.process_title = this.application_details.process_title;
      this.application_type_id = this.application_details.application_type_id;

      this.application_id = this.application_details.application_id;
      this.tracking_no = this.application_details.tracking_no;

    }
  
  

    this.onApplicationSubmissionFrm = new FormGroup({
      paying_currency_id: new FormControl('', Validators.compose([])),
      submission_comments: new FormControl('', Validators.compose([]))
    });

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

    this.documentUploadfrm = this.fb.group({
      file: null,
      document_requirement_id: [null, Validators.required],
      node_ref: null,
      id: null,
      description: [null]
    });
    
    
    this.import_typecategory_visible = true;


  }
  funcAutoLoadedParamters() {
    
    if (this.application_details) {
      this.applicationGeneraldetailsfrm.patchValue(this.application_details);
    }

  }
 
  funcReloadQueriesDetails() {

    this.funcgetPreckingQueriesData();

  }
  funcgetPreckingQueriesData() {

    this.utilityService.getApplicationPreQueriesDetails(this.application_code, 'txn_importexport_applications', 'application_status_id', 'utilities/getApplicationQueriesData')
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
    this.app_route = this.funcREturnApplicationDashboardROute();

    this.router.navigate(this.app_route);
    this.scrollToTop();
  }
  funcREturnApplicationDashboardROute() {
    if (this.regulatory_subfunction_id == 12) {
      this.app_routing = ['./online-services/importvisa-dashboard'];

    }
    else if (this.regulatory_subfunction_id == 78 || this.regulatory_subfunction_id == 82) {
      this.app_routing = ['./online-services/importlicense-dashboard'];

    } else if (this.regulatory_subfunction_id == 81) {
      this.app_routing = ['./online-services/exportlicense-dashboard'];

    }
    else {
      this.app_routing = ['./online-services/inspectionbookin-dashboard'];

    }
    return this.app_routing;

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
  private prepareSavePermitDoc(): any {
    //let input = new FormData();
    let input = this.applicationGeneraldetailsfrm.value;
    const files: Array<File> = this.filesToUpload;
    // input.append('file', this.uploadpaymentdetailsfrm.get('file').value);
    for (let i = 0; i < files.length; i++) {
      input.append("file", files[i], files[i]['name']);
    }
    return input;
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
    const uploadData = this.prepareSavePermitDoc();

    this.spinner.show();
    // let registrant_details = this.applicationApplicantdetailsfrm.value;//applicant values
    this.applicationGeneraldetailsfrm.value['regulatory_subfunction_id'] = this.regulatory_subfunction_id;
    console.log(this.applicationGeneraldetailsfrm.value);
    this.spinner.show();
    this.appService.onSavePermitApplication(this.applicationGeneraldetailsfrm.value, uploadData, 'saveImportExportApplication')
      .subscribe(
        response => {
          this.product_resp = response;
          console.log(this.product_resp);
          if (this.product_resp.success) {
            this.tracking_no = this.product_resp.tracking_no;
            this.permit_id = this.product_resp.permit_id;
           
            this.application_code = this.product_resp.application_code;

            this.applicationGeneraldetailsfrm.patchValue({ permit_id: this.permit_id })
            this.toastr.success(this.product_resp.message, 'Response');


          } else {
            this.toastr.error(this.product_resp.message, 'Alert');
          }
          this.spinner.hide();
        },
        error => {
          this.loading = false;

          this.spinner.hide();
        });
  }


  onPermitsApplicationPrint() {


  }
  submissionsTermscheckbox(e) {

    this.termscheckbox = e.value;

  }

  onPermitsApplicationSubmit() {
    if (this.onApplicationSubmissionFrm.invalid) {
      this.toastr.error('Fill in all the submission details to proceed!!', 'Alert');
      return;
    }
    this.app_route = this.app_route = this.funcREturnApplicationDashboardROute();

   // this.utilityService.onPermitsApplicationSubmit(this.viewRef, this.application_code, this.tracking_no, 'txn_importexport_applications', this.app_route, this.onApplicationSubmissionFrm.value);

  }

  onApplicationDocumentToolbar(e) {
    this.functDataGridToolbar(e, this.funAddApplicationUploadDetails, 'Upload Document');

  }
  funAddApplicationUploadDetails() {
    this.isDocumentUploadPopupVisible = true;

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
    this.appService.onfuncValidatePermitDetails(this.application_code, validation_title, 'wb_permits_products')
      .subscribe(
        response => {
          if (response.success) {
           // this.wizard.model.navigationMode.goToStep(nextStep);
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
    this.utilityService.funcValidateApplicationQueryresponse(this.application_code, 'txn_importexport_applications')
      .subscribe(
        response => {
          if (response.success) {
           // this.wizard.model.navigationMode.goToStep(nextStep);
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
    this.utilityService.validateApplicationDocumentsQuerySubmission(this.application_code, this.status_id, 'txn_importexport_applications')
      .subscribe(
        response => {
          this.spinner.hide();
          let response_data = response;
          if (response_data.success) {
           // this.wizard.model.navigationMode.goToStep(nextStep);

          }
          else {

            this.toastr.error(response_data.message, 'Response');
          }

          this.spinner.hide();
        });


  }
  funcValidateStepDetails(validation_title, data, nextStep) {

    if (data.length != 0 && data.length) {
   //   this.wizard.model.navigationMode.goToStep(nextStep);
    }
    else {
      this.toastr.error(validation_title, 'Alert');
    }

  }
  funAddNewPermitProducts() {
    this.isnewproductAddWinVisible = true;
  }

  onSaveinitqueryresponse() {
    if (this.initqueryresponsefrm.invalid) {
      return;
    }

    //also get the premises ID onsaveApplicationCodeDetails(application_code, app_data, action_url)
    this.utilityService.onsaveApplicationCodeDetails(this.application_code, this.initqueryresponsefrm.value, 'onSavePrecheckingqueryresponse')
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
    this.initqueryresponsefrm.patchValue(data.data);
    this.query_sectioncheck = data.data.application_section;

    this.isInitalQueryResponseFrmVisible = true;

  }
  funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width / 100;
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
    this.appService.onfuncValidatePermitDetails(this.application_code, 'Invoice Product details', 'wb_permits_products')
      .subscribe(
        response => {
          if (!response.success) {
            this.toastr.error('Add the Invoice Product details to proceed', 'Alert');
           // this.wizard.model.navigationMode.goToStep(nextStep);


            return;
          }
          this.spinner.hide();
        },
        error => {
          this.toastr.error(error.message, 'Alert');
          this.spinner.hide();
        });
  }

  resetWizard(event?: Event) {
    this.ngWizardService.reset();
  }

  setTheme(theme: THEME) {
    this.ngWizardService.theme(theme);
  }

  nextStep() {
    this.ngWizardService.next();
  }

  previousStep() {
    this.ngWizardService.previous();
  }
  

}
