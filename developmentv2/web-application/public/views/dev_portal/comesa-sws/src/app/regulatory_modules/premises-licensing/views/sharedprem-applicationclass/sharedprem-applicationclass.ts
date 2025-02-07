import { ChangeDetectorRef, Component, Directive, ElementRef, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ToastrService } from 'ngx-toastr';
import { AppSettings } from 'src/app/app-settings';
import { ConfigurationsService } from 'src/app/core-services/configurations/configurations.service';
import { DocumentManagementService } from 'src/app/core-services/document-management/document-management.service';
import { PremisesLicensingService } from '../../services/premises-licensing.service';
import { AuthenticationService } from 'src/app/core-services/authentication/authentication.service';
import { UtilityService } from 'src/app/core-services/utilities/utility.service';
import { NgWizardConfig, NgWizardService, STEP_STATE, StepChangedArgs, THEME } from 'ng-wizard';
import { ModalService } from 'src/app/core-services/modal-service/modal-service';
@Directive()
export class SharedpremApplicationClass {
  @ViewChild('regSubfunctionId', { static: true }) regSubfunctionId: ElementRef;
  is_readonly: boolean = false;
  appuploaded_document_id: number;
  mis_url: string = AppSettings.mis_url;
  zoneparams: any;
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
  nonstructreddocumentMenuItems = [
    {
      text: "Document(s) Action",
      icon: 'menu',
      items: [
        { text: "Preview/Download Document", action: 'download', icon: 'fa fa-download', },
        { text: "Update Document", action: 'update', icon: 'fa fa-upload', },
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

  query_ref_id: number;
  initWizardPanel: number = 0;
  dataGrid: DxDataGridComponent;
  currentDate = new Date();
  //data table config


  app_resp: any;

  maxLength: number = 25;

  premises_resp: any;
  tracking_no: string;
  application_code: number;
  premises_id: number;
  personnel_id: number;

  premisesGeneraldetailsfrm: FormGroup;
  premisesOtherDetailsfrm: FormGroup;
  premisesPersonnelDetailsfrm: FormGroup;
  premisesStoreslocationFrm: FormGroup;

  personnelDetailsfrm: FormGroup;
  personnelQualificationFrm: FormGroup;

  premisesDocumentUploadfrm: FormGroup;
  premisesPersonnelDocumentUploadfrm: FormGroup;

  premisesAmmendmentsrequestFrm: FormGroup;

  value: any;
  loading: false;
  app_route: any;
  terms_conditions: any;
  checkPremisesSubmission: boolean = false;

  status_name: string;
  status_id: number;
  tra_premise_id: number;
  registered_id: number;
  premise_id: number;
  process_title: string;
  regulatory_subfunction_id: number;
  regulated_productstype_id: number;
  premisesapp_details: any;
  //premises other details 
  premisesOtherDetailsRows: any;
  registered_premisesData: any;

  premisesDocumentsRows: any;

  isInitalCapaResponseFrmVisible: boolean;
  public business_type_id: number;
  isPrintReportVisible: boolean = false;
  printiframeUrl: string;
  printReportTitle: string;

  //premises pop-ups
  isBusinessTypePopupVisible: boolean = false;
  isDocumentUploadPopupVisible: boolean = false;
  isPersonnelDocumentUploadPopupVisible: boolean = false;
  isBusinessPersonnelPopupVisible: boolean = false;
  isperssonelAddPopupVisible: boolean = false;
  isDocumentPreviewDownloadwin: boolean = false;
  isDocumentVersionPreviewDownloadwin: boolean = false;

  document_previewurl: any;

  regulatory_function_id: number;
  isPersonnelPopupVisible = false;
  ispremisesSearchWinVisible = false;
  applicationRejectionData: any;
  applicationInitialQueriesData: any;

  isInitalQueryWinVisible: boolean = false;
  personnel_type_id: number;
  isApplicationSubmitwin: boolean = false;
  isaddNewPremisesPersonnelDetails: boolean = false;
  //@Inject(WizardState) public wizard: WizardState,
  newPremisesPersonnelDetailsFrm: FormGroup;
  confirmDataParam: any;
  isReadOnlyTraderasContact: boolean = false;

  isInitalQueryResponseFrmVisible: boolean = false;

  //sections 
  query_sectioncheck: string;
  applicationPreckingQueriesData: any;
  initqueryresponsefrm: FormGroup;
  initcaparesponsefrm: FormGroup;
  fastTrackOptionsData: any;
  payingCurrencyData: any;
  action_url: string;
  onApplicationSubmissionFrm: FormGroup;
  isFoodPremises: boolean;
  premises_typetitle: string;
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
  applicationCAPARequestsData: any;
  applicationReinspectionRequestsData: any;
  application_formfields: any;
  personnel_informationfields: any;
  business_operationsfields: any;
  storelocationsfields: any;

  app_data:any;
  constructor(private modalService: ModalService, public ngWizardService: NgWizardService, public cdr: ChangeDetectorRef, public dmsService: DocumentManagementService, public spinner: SpinnerVisibilityService, public configService: ConfigurationsService, public appService: PremisesLicensingService, public router: Router, public formBuilder: FormBuilder, public toastr: ToastrService, public authService: AuthenticationService, public utilityService: UtilityService) {
    let me = this;
    this.premisesGeneraldetailsfrm = this.formBuilder.group({});
    this.personnelDetailsfrm = this.formBuilder.group({});
    this.premisesOtherDetailsfrm = this.formBuilder.group({});
    this.premisesStoreslocationFrm = this.formBuilder.group({});

    this.premisesapp_details = this.appService.getPremisesApplicationDetail();

    if (!this.premisesapp_details) {
      // this.router.navigate(['./../premises-licensing/premisesreg-dashboard']);
      //this.scrollToTop();
      //return;
    }
    else {

      this.regulatory_subfunction_id = this.premisesapp_details.process_infor.regulatory_subfunction_id;
      this.process_title = this.premisesapp_details.process_title;
      this.regulated_productstype_id = this.premisesapp_details.regulated_productstype_id;
      this.premise_id = this.premisesapp_details.premise_id;
      this.tracking_no = this.premisesapp_details.tracking_no;
      this.application_code = this.premisesapp_details.application_code;
      this.status_name = this.premisesapp_details.status_name;
      this.status_id = this.premisesapp_details.status_id;
      this.regulatory_function_id = this.premisesapp_details.regulatory_function_id;
      this.app_data = this.premisesapp_details.process_info;
      this.application_formfields = this.premisesapp_details.application_form;
      this.personnel_informationfields = this.premisesapp_details.personnel_information;
      this.business_operationsfields = this.premisesapp_details.business_operations;
      this.storelocationsfields = this.premisesapp_details.storelocations;
      ;
      for (let form_field of this.application_formfields) {
        let field_name = form_field['field_name'];
        if (form_field['is_mandatory'] == 1) {
          this.premisesGeneraldetailsfrm.addControl(field_name, new FormControl('', Validators.compose([Validators.required])));
        } else {
          this.premisesGeneraldetailsfrm.addControl(field_name, new FormControl('', Validators.compose([])));
        }
      }
      for (let form_field of this.personnel_informationfields) {
        let field_name = form_field['field_name'];
        if (form_field['is_mandatory'] == 1) {
          me.personnelDetailsfrm.addControl(field_name, new FormControl('', Validators.compose([Validators.required])));
        } else {
          me.personnelDetailsfrm.addControl(field_name, new FormControl('',  Validators.compose([])));
        }
      }
      for (let form_field of this.business_operationsfields) {
        let field_name = form_field['field_name'];
        if (form_field['is_mandatory'] == 1) {
          me.premisesOtherDetailsfrm.addControl(field_name, new FormControl('', Validators.compose([Validators.required])));
        } else {
          me.premisesOtherDetailsfrm.addControl(field_name, new FormControl('',  Validators.compose([])));
        }
      }
      for (let form_field of this.storelocationsfields) {
        let field_name = form_field['field_name'];
        if (form_field['is_mandatory'] == 1) {
          me.premisesStoreslocationFrm.addControl(field_name, new FormControl('', Validators.compose([Validators.required])));

        } else {
          me.premisesStoreslocationFrm.addControl(field_name, new FormControl('',  Validators.compose([])));

        }
      }

    }
    if (this.regulated_productstype_id == 1) {
      this.isFoodPremises = true;
      this.premises_typetitle = "Premises Product Types";
    }
    else {
      this.isFoodPremises = true;
      this.premises_typetitle = "Premises Main Activities";
    }
    this.onApplicationSubmissionFrm = new FormGroup({
      paying_currency_id: new FormControl('', Validators.compose([])),
      is_fast_track: new FormControl('', Validators.compose([])),
      submission_comments: new FormControl('', Validators.compose([]))
    });
    if (this.regulatory_subfunction_id == 1) {
      this.is_readonly = false;
    }
    else {
      this.is_readonly = false;

    }
    if (this.status_id < 1) {
      this.status_name = "New"
    }
    if (this.status_id == 6 || this.status_id == 17 || this.status_id == 7) {
      this.initWizardPanel = 1;
    }
    if (this.premisesapp_details) {

      this.premisesGeneraldetailsfrm.patchValue(this.premisesapp_details);

      this.business_type_id = this.premisesapp_details.business_type_id;

      if (this.premise_id < 1) {

        this.premisesGeneraldetailsfrm.patchValue(this.premisesapp_details);

      }
    }


    this.initqueryresponsefrm = new FormGroup({
      queries_remarks: new FormControl('', Validators.compose([Validators.required])),
      response_txt: new FormControl('', Validators.compose([Validators.required])),
      id: new FormControl('', Validators.compose([])),
      query_id: new FormControl('', Validators.compose([]))
    });
    this.initcaparesponsefrm = new FormGroup({
      deficiencies: new FormControl('', Validators.compose([Validators.required])),
      deficiency_references: new FormControl('', Validators.compose([])),
      root_causeanalysis: new FormControl('', Validators.compose([])),
      corrective_actions: new FormControl('', Validators.compose([Validators.required])),
      corrective_actionssteps: new FormControl('', Validators.compose([])),
      completion_date: new FormControl('', Validators.compose([Validators.required])),
      application_code: new FormControl('', Validators.compose([])),
      id: new FormControl('', Validators.compose([])),
      inspection_capa_id: new FormControl('', Validators.compose([]))
    });


    // this.funcReloadQueriesDetails();
    // this.funcgetapplicationCAPARequestsData();

    // this.funcgetapplicationReinspectionRequestsData();
  }
  ngOnInit(): void {
    // Populate the form with fields dynamically
    
  }
  funcReloadQueriesDetails() {

    this.funcgetapplicationReinspectionRequestsData();
    this.funcgetapplicationCAPARequestsData();
    this.funcgetPreckingQueriesData();

  }
  funcgetapplicationCAPARequestsData() {

    this.utilityService.getApplicationPreQueriesDetails(this.application_code, 'ptl_premises_applications', 'application_status_id', 'utilities/getapplicationCAPARequestsData')
      .subscribe(
        data => {
          this.applicationCAPARequestsData = data.data;
          this.spinner.hide();
        });
  }
  funcPrintcapaRequestsLetter(data) {
    this.appuploaded_document_id = data.data.query_id;

    let report_url = this.mis_url + 'reports/printRequestForCAPAResponses?application_code=' + this.application_code + "&regulatory_function_id=" + this.regulatory_function_id + "&regulatory_subfunction_id=" + this.regulatory_subfunction_id + "&query_id=" + this.appuploaded_document_id;

    this.funcGenerateRrp(report_url, "Print Request for RE-Inspection");

  }
  funcPrintReinspectionRequestsLetter(data) {
    this.appuploaded_document_id = data.data.query_id;

    let report_url = this.mis_url + 'reports/printREinspectionueryLetter?application_code=' + this.application_code + "&regulatory_function_id=" + this.regulatory_function_id + "&regulatory_subfunction_id=" + this.regulatory_subfunction_id + "&query_id=" + this.appuploaded_document_id;

    this.funcGenerateRrp(report_url, "Print Request for RE-Inspection");

  } printAppREquestforAdditionalInformation() {
    let report_url = this.mis_url + 'reports/printRequestForAdditionalInformation?application_code=' + this.application_code + "&regulatory_function_id=" + this.regulatory_function_id + "&regulatory_subfunction_id=" + this.regulatory_subfunction_id + "&query_id=" + this.query_ref_id;
    this.funcGenerateRrp(report_url, "Print Request for Additional Information");
  }
  funcGenerateRrp(report_url, title) {

    this.printiframeUrl = this.configService.returnReportIframe(report_url);
    this.printReportTitle = title;
    this.isPrintReportVisible = true;


  }
  funcgetapplicationReinspectionRequestsData() {

    this.utilityService.getApplicationPreQueriesDetails(this.application_code, 'ptl_premises_applications', 'application_status_id', 'utilities/getapplicationReinspectionRequestsData')
      .subscribe(
        data => {
          this.applicationReinspectionRequestsData = data.data;
          this.spinner.hide();
        });
  }
  onLoadpayingCurrencyData() {
    var data = {
      table_name: 'par_currencies',
      is_paying_currency: 1
    };
    this.configService.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.payingCurrencyData = data;
        });

  }
  onLoadfastTrackOptionsData() {
    var data = {
      table_name: 'par_fasttrack_options'
    };
    this.configService.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.fastTrackOptionsData = data;
        });

  }

  onTraderasContactpersnChange($event) {

    this.value = $event.value;
    if ($event.value == 1) {
      this.isReadOnlyTraderasContact = true;

    } else {
      this.isReadOnlyTraderasContact = false;
    }


  }

  onAppQueryPreparing(e) {

    e.toolbarOptions.items.unshift({
      location: 'after',
      widget: 'dxButton',
      options: {
        icon: 'refresh',
        onClick: this.funcReloadQueriesDetails.bind(this)
      }
    });

  }
  ngAfterViewInit() {
    //  this.message = 'all done loading :)'
    this.cdr.detectChanges();
  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scrolling for better UX
    });
  }
  onProductDashboard() {
    //check for unsaved changes 

    this.router.navigate(['../premises-licensing/premisesreg-dashboard']);
    this.scrollToTop();

  }
  onSavePremisesApplication() {

    const invalid = [];
    const controls = this.premisesGeneraldetailsfrm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        this.toastr.error('Fill In All Mandatory fields with (*), missing value on ' + name.replace('_id', ''), 'Alert');
        return;
      }
    }
    if (this.premisesGeneraldetailsfrm.invalid) {
      return;
    }


    if (this.premisesGeneraldetailsfrm.invalid) {
      //  return;
    }
    this.spinner.show();
    this.premisesGeneraldetailsfrm.value['regulatory_subfunction_id'] = this.regulatory_subfunction_id;
    this.appService.onSavePremisesApplication(this.premisesGeneraldetailsfrm.value, 'onSavePremisesApplication')
      .subscribe(
        response => {
          this.premises_resp = response;
          //the details 
          this.spinner.hide();
          this.tracking_no = this.premises_resp.tracking_no;
          this.premise_id = this.premises_resp.premise_id;
          this.application_code = this.premises_resp.application_code;

          if (this.premises_resp.success) {
            this.toastr.success(this.premises_resp.message, 'Response');
            // this.wizard.model.navigationMode.goToStep(1);
            this.nextStep();
          } else {
            this.toastr.error(this.premises_resp.message, 'Alert');
          }
        },
        error => {
          this.loading = false;
        });
  }
  onPremisesApplicationSubmit() {
    this.app_route = ['./premises-licensing/premisesreg-dashboard'];
    this.utilityService.onPermitsApplicationSubmit('', this.application_code, this.tracking_no, 'ptl_premises_applications', this.app_route, this.onApplicationSubmissionFrm.value);
    this.isApplicationSubmitwin = false;
  }
  //reload the premsies Other Details 


  appDocumentsUploadRequirement
  //load premises personnel dms_repository_structure
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

  onPremisesAmmendmentsToolbar(e) {
    e.toolbarOptions.items.unshift({
      location: 'before',
      widget: 'dxButton',
      options: {
        text: 'Add Ammended Sections',
        type: 'default',
        icon: 'fa fa-plus',
        //  onClick: this.funAddPremisesAmmendementsRquest.bind(this)

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

  funAddApplicationUploadDetails() {

    this.isDocumentUploadPopupVisible = true;

  }
  funAddPersonnelUploadDetails() {

    this.isPersonnelDocumentUploadPopupVisible = true;

  }
  onLoadconfirmDataParm() {
    var data = {
      table_name: 'par_confirmations',
    };

    this.configService.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.confirmDataParam = data;
        });
  }

  onPremisesPerGridToolbar(e, is_readonly) {
    this.functDataGridToolbar(e, this.funAddNewPremisesPersonnelDetails, '', is_readonly);
  }

  funAddNewPremisesPersonnelDetails() {
    this.isaddNewPremisesPersonnelDetails = true;
  }
  onApplicationDocumentToolbar(e, is_readonly) {
    this.functDataGridToolbar(e, this.funAddApplicationUploadDetails, 'Upload Document', is_readonly);

  }
  onPersonnelDocumentToolbar(e, is_readonly = false) {
    this.functDataGridToolbar(e, this.funAddPersonnelUploadDetails, 'Personnel Upload Document', is_readonly);

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
        onClick: this.refreshDataGrid.bind(this)
      }
    });
  }
  onPersQualificationGridToolbar(e) {
    e.toolbarOptions.items.unshift();
  }
  refreshDataGrid() {
    this.dataGrid.instance.refresh();
  }




  funcDeletePersonnelDetails(data) {
    //func_delete records 
    let record_id = data.data.id;
    let apppremises_id = data.data.premise_id;
    let table_name = 'ptl_premises_personnel';
    //  this.funcDeleteDetailhelper(record_id, apppremises_id, table_name, 'busines_personnel', 'Premises Personnel');

  }

  onPremisesDashboard() {
    this.app_route = ['./premises-licensing/draftnew_premisesregiatration'];
    this.router.navigate(this.app_route);

    this.scrollToTop();
  }
  
  onPremisesApplicationPrint() {

  }
  newPremTermscheckbox(e) {
    ;
    this.checkPremisesSubmission = e.value;

  }
  funcValidatePremBusinessDetails(nextStep) {

    this.funcValidateStepDetails('Add Premises Business Details to proceed', 'ptl_premises_otherdetails', nextStep);

  }
  funcValidatePremPersonnelDetails(nextStep) {

    this.funcValidateStepDetails('Add Premises Personnel', 'ptl_premises_personnel', nextStep);

  }

  funcValidateStepDetails(title_validate, table_name, nextStep) {
    //validate details 
    this.spinner.show();
    this.appService.onValidatePremisesOtherdetails(this.premise_id, table_name, title_validate)
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
  funcValidatePremDocumentsDetails(nextStep) {
    this.utilityService.validateApplicationDocumentsQuerySubmission(this.application_code, this.status_id, 'ptl_premises_applications')
      .subscribe(
        response => {
          this.spinner.hide();
          let response_data = response;
          if (response_data.success) {
            //  this.wizard.model.navigationMode.goToStep(nextStep);

          }
          else {

            this.toastr.error(response_data.message, 'Response');
          }

          this.spinner.hide();
        });
  }
  //

  onRegisteredPremisesSearch() {
    if (!this.tracking_no) {
      //the 
      //load the Premises Details 
      this.appService.onLoadRegisteredPremises({})
        .subscribe(
          data_response => {
            this.ispremisesSearchWinVisible = true;
            this.registered_premisesData = data_response.data;
          },
          error => {
            return false
          });

    }
    else {
      this.toastr.error('Renewal Business Permit application has already been saved', 'Alert');
    }
  }
  onClickApplicationSubmitWin() {

    this.isApplicationSubmitwin = true;
  }
  //document uploa details 

  private preparePersonnelDocSave(): any {
    let input = new FormData();

    input.append('file', this.premisesPersonnelDocumentUploadfrm.get('file')?.value);
    input.append('id', this.premisesPersonnelDocumentUploadfrm.get('id')?.value);
    input.append('node_ref', this.premisesPersonnelDocumentUploadfrm.get('node_ref')?.value);
    input.append('personnel_id', this.premisesPersonnelDocumentUploadfrm.get('personnel_id')?.value);


    return input;

  }


  onNonStrctureFileChange(event) {

    if (event.target.files.length > 0) {
      let file = event.target.files[0];

      this.premisesPersonnelDocumentUploadfrm.get('file')?.setValue(file);
    }
  }

  private prepareSave(): any {
    let input = new FormData();
    input.append('document_requirement_id', this.premisesDocumentUploadfrm.get('document_requirement_id')?.value);
    input.append('file', this.premisesDocumentUploadfrm.get('file')?.value);
    input.append('id', this.premisesDocumentUploadfrm.get('id')?.value);
    input.append('node_ref', this.premisesDocumentUploadfrm.get('node_ref')?.value);

    return input;
  }
  onFileChange(event) {

    if (event.target.files.length > 0) {
      let file = event.target.files[0];

      this.premisesDocumentUploadfrm.get('file')?.setValue(file);
    }
  }


  funcDocumentUpdateDetails(data) {
    this.premisesDocumentUploadfrm.patchValue(data);
    //load the personnel qualifiations 

    this.isDocumentUploadPopupVisible = true;

  }
  funcDocmentPreviewedit(data) {
    this.spinner.show();

    this.dmsService.getApplicationDocumentDownloadurl(this.application_code, data.node_ref, data.id)
      .subscribe(
        response => {

          this.spinner.hide();
          let response_data = response;
          if (response_data.success) {

            this.document_previewurl = this.configService.getSafeUrl(response_data.document_url);

            this.isDocumentPreviewDownloadwin = true;

          }
          else {

            this.toastr.success(response_data.message, 'Response');

          }

        },
        error => {
          this.loading = false;
        });

  }


  onSaveinitCAPAresponses() {
    if (this.initcaparesponsefrm.invalid) {
      this.toastr.error('', 'Response');

      return;
    }
    this.action_url = 'onSaveinitCAPAresponses';
    this.utilityService.onsaveApplicationCodeDetails(this.application_code, this.initcaparesponsefrm.value, this.action_url)
      .subscribe(
        response => {
          this.premises_resp = response;
          if (this.premises_resp.success) {
            this.toastr.success(this.premises_resp.message, 'Response');
            this.funcgetapplicationCAPARequestsData();
            this.isInitalCapaResponseFrmVisible = false;
          } else {
            this.toastr.error(this.premises_resp.message, 'Alert');
          }
        },
        error => {
          this.toastr.error('Error occurred!!', 'Alert');
        });
  }

  onSaveinitqueryresponse() {
    if (this.initqueryresponsefrm.invalid) {
      return;
    }

    this.action_url = 'onSavePrecheckingqueryresponse';

    //also get the premises ID onsaveApplicationCodeDetails(application_code, app_data, action_url)
    this.utilityService.onsaveApplicationCodeDetails(this.application_code, this.initqueryresponsefrm.value, this.action_url)
      .subscribe(
        response => {
          this.premises_resp = response;
          if (this.premises_resp.success) {
            this.toastr.success(this.premises_resp.message, 'Response');
            this.funcReloadQueriesDetails();

            this.initqueryresponsefrm.get('id')?.setValue('id');
          } else {
            this.toastr.error(this.premises_resp.message, 'Alert');
          }
        },
        error => {
          this.toastr.error('Error occurred!!', 'Alert');
        });
  }

  funcgetPreckingQueriesData() {

    this.utilityService.getApplicationPreQueriesDetails(this.application_code, 'ptl_premises_applications', 'application_status_id', 'utilities/getApplicationQueriesData')
      .subscribe(
        data => {
          this.applicationPreckingQueriesData = data.data;
          this.spinner.hide();
        });
  }

  funcgetInitialQueriesData(application_code) {

    this.utilityService.getApplicationPreQueriesDetails(application_code, 'ptl_premises_applications', 'application_status_id', 'utilities/getApplicationPreQueriesDetails')
      .subscribe(
        data => {
          this.applicationInitialQueriesData = data.data;
          this.spinner.hide();
        });
  }
  onShowInitalQueriesWin() {

    this.isInitalQueryWinVisible = true;
  }
  onShowPrecheckingQueriesWin() {


  }
  funcDownloadUploadedDoc() {

    let report_url = this.mis_url + 'reports/printRequestForCAPAResponses?application_code=' + this.application_code + "&regulatory_function_id=" + this.regulatory_function_id + "&regulatory_subfunction_id=" + this.regulatory_subfunction_id + "&premise_id=" + this.premise_id + "&table_name=tra_premises_applications";
    this.funcGenerateRrp(report_url, "print Query Letter");

    /*if(this.appuploaded_document_id >0){
      this.dmsService.getApplicationDocumentDownloadurl(this.application_code, '', this.appuploaded_document_id)
      .subscribe(
        response => {
          this.spinner.hide();
          let response_data = response;
          if (response_data.success) {
            this.document_previewurl = this.configService.getSafeUrl(response_data.document_url);
            this.isDocumentPreviewDownloadwin  = true;
          }
          else {
            this.toastr.success(response_data.message, 'Response');
          }
        },
        error => {
          this.loading = false;
        });
    }
    else{
      this.toastr.error('No Query Letter that has been Uploaded, preview the query for detail.', 'Alert');
    }
    */
  }
  funcDownloadQueryLetter(data) {
    this.appuploaded_document_id = data.data.appuploaded_document_id;


    this.funcDownloadUploadedDoc();
  }

  funcValidatePremDocumentsUpload(nextStep) {
    this.utilityService.validateApplicationDocumentsQuerySubmission(this.application_code, this.status_id, 'ptl_premises_applications')
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
  funcValidateApplicationWithdrawalDetails(nextStep) {
    this.utilityService.validateApplicationotherDetails(this.application_code, 'ptl_application_withdrawaldetails')
      .subscribe(
        response => {
          this.spinner.hide();
          let response_data = response;
          if (response_data.success) {

          }
          else {

            this.toastr.error(response_data.message, 'Response');
          }
          //  this.wizard.model.navigationMode.goToStep(nextStep);

          this.spinner.hide();
        });

  }
  funcInitQueryResponse(data) {

    // this.premisesPersonnelDetailsfrm.patchValue({personnel_id:data.data.personnel_id,id:data.data.id,start_date:data.data.start_date,end_date:data.data.end_date, personnel_name:data.data.personnel_name})
    this.initqueryresponsefrm.patchValue(data.data);
    this.query_sectioncheck = data.data.application_section;

    this.isInitalQueryResponseFrmVisible = true;

  }
  funcInitCAPAResponse(data) {

    // this.premisesPersonnelDetailsfrm.patchValue({personnel_id:data.data.personnel_id,id:data.data.id,start_date:data.data.start_date,end_date:data.data.end_date, personnel_name:data.data.personnel_name})
    this.initcaparesponsefrm.patchValue(data.data);
    this.query_sectioncheck = data.data.application_section;

    this.isInitalCapaResponseFrmVisible = true;

  }

  onLoadPremisesOtherDetails() {

    this.appService.onLoadPremisesOtherDetails(this.premise_id)
      .subscribe(
        data => {
          this.premisesOtherDetailsRows = data;
        },
        error => {
          return false
        });
  } funcValidateApplicationQueryresponse(nextStep) {

    this.spinner.show();
    this.utilityService.funcValidateApplicationQueryresponse(this.application_code, 'ptl_premises_applications')
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
  } funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width / 100;
  }
  funcCloseQueryWindow() {
    this.isInitalQueryResponseFrmVisible = false;
  }
  funcCloseCAPAWindow() {
    this.isInitalCapaResponseFrmVisible = true;
  }

  resetWizard(event?: Event) {
    this.ngWizardService.reset();
  }

  setTheme(theme: THEME) {
    this.ngWizardService.theme(theme);
  }

  stepChanged(args: StepChangedArgs) {

    //  
  }
  isValidTypeBoolean: boolean = true;

  nextStep() {
    this.ngWizardService.next();
  }

  previousStep() {
    this.ngWizardService.previous();
  }
}
