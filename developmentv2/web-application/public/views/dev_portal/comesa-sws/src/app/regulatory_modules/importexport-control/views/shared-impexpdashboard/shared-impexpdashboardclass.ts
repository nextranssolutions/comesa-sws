import { Component, Directive, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DxDataGridComponent } from 'devextreme-angular';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ToastrService } from 'ngx-toastr';
import { AppSettings } from 'src/app/app-settings';
import { UtilityService } from 'src/app/core-services/utilities/utility.service';
import { ImportExportService } from '../../services/import-export.service';
import { ConfigurationsService } from 'src/app/core-services/configurations/configurations.service';
import { AuthenticationService } from 'src/app/core-services/authentication/authentication.service';

@Directive()
export class SharedImpExpdashboardClass {

  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
  is_popupguidelines: boolean;
  productsapp_details: any;
  dtImportExpApplicationData: any = [];
  expanded: boolean = false;
  app_route: any;
  regulatory_function_id: number = 4;
  app_response: any;
  processData: any;
  title: string;
  router_link: string;
  base_url = AppSettings.base_url;
  mis_url = AppSettings.mis_url;
  productApplicationProcessingData: any;
  isPreviewApplicationProcessing: boolean = false;
  printReportTitle: string;
  isPrintReportVisible: boolean = false;
  printiframeUrl: string;
  isPreviewApplicationDetails: boolean = false;
  frmPreviewAppDetails: FormGroup;
  regulated_productstype_id: number;
  permitTypesData: any;
  applicationSelectionfrm: FormGroup;
  applicationRejectionData: any;
  isApplicationRejectionVisible: boolean = false;
  FilterDetailsFrm: FormGroup;
  productappTypeData: any;
  applicationStatusData: any;
  productTypeData: any;
  data_record: any;
  guidelines_title: string;
  regulatory_subfunction_id: number;
  transactionpermit_type_id: any;
  application_title: string;
  sectionItem: any;
  app_typeItem: any;
  application_details: any;
  regulatory_subfunction_idsel: number;
  isPermitInitialisation: boolean;
  confirmDataParam: any;
  has_nonregisteredproducts: boolean = false;
  win_submitinvoicepayments: boolean;
  permitProductsData: any;
  application_status_id: any;
  loadingVisible: boolean;
  spinnerMessage: string;
  appregulatory_subfunction_id: number;
  app_routing: any;
  appregulatory_function_id: number;
  appregulated_productstype_id: number;
  appstatus_id: number;
  appoga_application_code: number;
  producttypeDefinationData: any;
  onApplicationSubmissionFrm: FormGroup;
  hasFinishedProducts: boolean;
  producttype_defination_id: number;
  importExportPermitTypesData: any;
  processingData: any;
  wofklowStatusData: any;
  form_fielddata: any;
  trader_id: number;
  mistrader_id: number;
  process_title: string;
  tracking_no: string;
  application_id: number;
  oga_application_code: number;
  permit_type_id: number;
  application_type_id: any;
  table_name: string;

  constructor(public utilityService: UtilityService, public viewRef: ViewContainerRef,
    public spinner: SpinnerVisibilityService,
    public toastr: ToastrService,
    public router: Router, public configService: ConfigurationsService,
    public authService: AuthenticationService,
    public formBuilder: FormBuilder,
    public appService: ImportExportService) { // this.onLoadApplicationCounterDetails();

    this.applicationSelectionfrm = new FormGroup({
      // regulated_productstype_id: new FormControl(this.productTypeData, Validators.compose([Validators.required])),
      regulatory_subfunction_id: new FormControl('', Validators.compose([])),
      // producttype_defination_id: new FormControl('', Validators.compose([])),
      transactionpermit_type_id: new FormControl('', Validators.compose([]))
    });

    this.frmPreviewAppDetails = new FormGroup({
      tracking_no: new FormControl('', Validators.compose([Validators.required])), reference_no: new FormControl('', Validators.compose([Validators.required])),
      proforma_invoice_no: new FormControl('', Validators.compose([Validators.required])),
      proforma_invoice_date: new FormControl('', Validators.compose([Validators.required])),
      sender_receiver: new FormControl('', Validators.compose([Validators.required])),
      premises_name: new FormControl('', Validators.compose([Validators.required])),
      application_type: new FormControl('', Validators.compose([Validators.required])),
      status: new FormControl('', Validators.compose([Validators.required]))
    });

    this.onApplicationSubmissionFrm = new FormGroup({
      paying_currency_id: new FormControl('', Validators.compose([])),
      submission_comments: new FormControl('', Validators.compose([]))
    });
    this.table_name = 'tra_importexport_applications';

    this.onLoadProductTypes();
    this.onLoadconfirmDataParam();
    this.reloadPermitApplicationsApplications();
    this.onLoadPermitTypesData();
    this.onLoadWorkflowStatusData();

  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scrolling for better UX
    });
  }

  onApplicationSelection() {
    if (this.applicationSelectionfrm.invalid) {
      this.toastr.error('Fill in all the Mandatory Fields', 'Alert!');
      return;
    }

    this.spinnerShow('loading...');

    // Fetch transactionpermit_type_id value
    let transactionpermit_type_id = this.applicationSelectionfrm.get('transactionpermit_type_id')?.value;
    let regulatory_subfunction_id = this.applicationSelectionfrm.get('regulatory_subfunction_id')?.value;


    this.regulatory_subfunction_id = regulatory_subfunction_id;
    this.transactionpermit_type_id = transactionpermit_type_id;

    localStorage.setItem('transactionpermit_type_id', JSON.stringify(this.transactionpermit_type_id));
    this.configService.getSectionUniformApplicationProces(this.regulatory_subfunction_id, this.transactionpermit_type_id)
      .subscribe(
        data => {
          if (data.success) {

            this.processData = data.data.process_infor;


            this.router_link = this.processData.router_link;
            this.productsapp_details = this.processData;

            this.appService.setApplicationDetail(data.data);

            localStorage.setItem('application_details', JSON.stringify(data.data));

            this.app_route = ['./importexport-control/' + this.router_link];
            this.router.navigate(this.app_route);
            this.scrollToTop();
          } else {
            this.toastr.error(this.processData.message, 'Alert!');
          }

          this.spinnerHide();
        },
        error => {
          this.toastr.error('An error occurred while processing', 'Error');
          this.spinnerHide();
        }
      );

    return false;
  }



  funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width / 100;
  }

  funcpopHeight(percentage_height) {
    return window.innerHeight * percentage_height / 100;
  }


  reloadPermitApplicationsApplications(filter_params = { application_status_id: this.application_status_id }) {
    this.spinnerShow('Loading...........');
    this.appService.onPermitApplicationLoading(filter_params, 'getImportExpPermitApplicationLoading')
      .subscribe(
        data => {

          this.data_record = data;
          // console.log(this.data_record);
          if (this.data_record.success) {
            this.dtImportExpApplicationData = this.data_record.data;
          }
          this.spinnerHide();
        },
      );
  }

  spinnerShow(spinnerMessage) {
    this.loadingVisible = true;
    this.spinnerMessage = spinnerMessage;
  }
  spinnerHide() {
    this.loadingVisible = false;
  }



  onLoadimportExportPermitTypesData() {
    var data = {
      table_name: 'par_importexport_permittypes',
      is_enabled: 1
    };

    this.configService.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.data_record = data;

          if (this.data_record.success) {
            this.importExportPermitTypesData = this.data_record.data;
            ;
          }
        });

  }

  onLoadPermitTypesData() {
    var data = {
      table_name: 'tra_transactionpermit_types',
      // is_enabled: true
    };

    this.configService.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.data_record = data;

          if (this.data_record.success) {
            this.permitTypesData = this.data_record.data;
            ;
          }
        });

  }
  onLoadWorkflowStatusData() {
    var data = {
      table_name: 'wf_workflow_statuses',
      // is_enabled: true
    };

    this.configService.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.data_record = data;

          if (this.data_record.success) {
            this.wofklowStatusData = this.data_record.data;
          }
        });

  }

  onLoadProductTypes() {
    var data = {
      table_name: 'par_regulated_productstypes',
      is_enabled: 1
    };

    this.configService.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.data_record = data;

          if (this.data_record.success) {
            this.productTypeData = this.data_record.data;
            ;
          }
        });
  }


  onLoadconfirmDataParam() {
    var data = {
      table_name: 'par_confirmations'
    };

    this.configService.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.data_record = data;

          if (this.data_record.success) {
            this.confirmDataParam = this.data_record.data;
          }
        });

  }

  onClickSubModulehelpGuidelines() {
    this.is_popupguidelines = true;
  }


  groupChanged(e) {
    this.dataGrid.instance.clearGrouping();
    this.dataGrid.instance.columnOption(e.value, 'groupIndex', 0);

  }

  collapseAllClick(e) {
    this.expanded = !this.expanded;
    e.component.option({
      text: this.expanded ? 'Collapse All' : 'Expand All'
    });
  }

  refreshDataGrid() {
    this.dataGrid.instance.refresh();
  }

  funcProductPreviewDetails(data) {
    this.isPreviewApplicationDetails = true;
    this.frmPreviewAppDetails.patchValue(data);
    this.onLoadPermitProductsData(data.oga_application_code);
  }
  onLoadPermitProductsData(oga_application_code) {
    this.spinner.show();
    this.appService.getPermitsOtherDetails({ 'oga_application_code': oga_application_code }, 'getPermitProductsDetails')
      .subscribe(
        data => {
          if (data.success) {

            this.permitProductsData = data.data;

          }
          else {
            this.toastr.success(data.message, 'Alert');
          }
          this.spinner.hide();
        },
        error => {
          return false
        });
  }
  applicationActionColClick(e, data) {

    var action_btn = e.itemData;
    this.funcActionsProcess(action_btn, data.data);

  }

  singleApplicationActionColClick(data) {

    this.funcActionsProcess(data, data);

  }

  funcActionsProcess(action_btn, data) {

    if (action_btn.action === 'edit') {
      this.funcApplicationPreveditDetails(data);
    }
    else if (action_btn.action === 'preview') {
      this.funcProductPreviewDetails(data);
    }
    else if (action_btn.action == 'print_applications') {
      this.funcPrintApplicationDetails(data);
    }
    else if (action_btn.action == 'archive') {
      this.funcArchivePermitApplication(data);
    } else if (action_btn.action == 'delete_application') {
      this.funcDeletePermitApplication(data);
    }
    else if (action_btn.action == 'pre_rejection') {
      this.funcApplicationRejection(data);
    }
    else if (action_btn.action == 'query_response') {

      this.funcApplicationPreveditDetails(data);

    }
    else if (action_btn.action == 'processing_details') {

      this.onLoadApplicationProcessingData(data);

    }
    else if (action_btn.action == 'print_invoice') {

      this.funcPrintApplicationInvoice(data);

    }
    else if (action_btn.action == 'print_receipt') {

      this.funcPrintApplicationReceipts(data);

    }
    else if (action_btn.action == 'print_rejectionletter') {

      this.funcPrintLetterofRejection(data);

    }

    else if (action_btn.action == 'reg_certificate' || action_btn.action == 'reg_certificate') {

      this.funcgenenerateImportExportPermit(data);

    }
    else if (action_btn.action == 'approval_permit' || action_btn.action == 'print_permit') {

      this.funcgenenerateImportExportPermit(data);

    }
    else if (action_btn.action == 'uploadsub_paymentdetails' || action_btn.action == 'uploadsub_paymentdetails') {

      // this.funcUploadPaymentDetails(data);

    }
    else if (action_btn == 'restorearchived') {
      this.funcProductRestoreArchiveApplication(data.data);
    }


  } funcProductRestoreArchiveApplication(data) {
    this.utilityService.funcApplicationRestoreArchiceCall(this.viewRef, data, 'txn_importexport_applications', this.reloadPermitApplicationsApplications)
  }
  application_data: any;
  funcApplicationPreveditDetails(app_data) {
    this.regulatory_subfunction_id = app_data.regulatory_subfunction_id;

    this.spinner.show();

    this.configService.getSectionUniformApplication(this.regulatory_subfunction_id)
      .subscribe(
        data => {
          this.spinner.hide();
          if (data.success) {
            this.processData = data.data.process_infor;
            this.application_data = data.data;

            this.router_link = this.processData.router_link;
            this.productsapp_details = this.processData;
            let merged_appdata = Object.assign({}, this.application_data, app_data);
            console.log(merged_appdata);
            localStorage.setItem('application_details', JSON.stringify(merged_appdata));
            // this.appService.setProductApplicationDetail(data.data);
            this.app_route = ['./importexport-control/' + this.router_link];

            this.router.navigate(this.app_route);
            this.scrollToTop();

          }
          else {
            this.toastr.error(this.processData.message, 'Alert!');

          }


        });
    return false;
  }

  funcApplicationRejection(app_data) {

    //this.spinner.show();
    this.utilityService.getApplicationPreRejectionDetails(app_data.oga_application_code, 'txn_importexport_applications', 'application_status_id')
      .subscribe(
        data => {
          this.applicationRejectionData = data.data;
          this.spinner.hide();

          this.isApplicationRejectionVisible = true;
        });
  }
  funcPrintApplicationDetails(app_data) {
    //print details

    let report_url = this.mis_url + 'reports/generateProductsApplicationRpt?oga_application_code=' + app_data.oga_application_code;
    this.funcGenerateRrp(report_url, "Report");

  }
  funcgenenerateImportExportPermit(app_data) {
    let report_url = this.mis_url + 'reports/genenerateImportExportPermit?oga_application_code=' + app_data.oga_application_code + "&regulatory_function_id=" + app_data.regulatory_function_id + "&regulatory_subfunction_id=" + app_data.regulatory_subfunction_id + "&table_name=tra_importexport_applications";
    this.funcGenerateRrp(report_url, "Report")

  }

  funcPrintApplicationReceipts(app_data) {
    this.utilityService.setApplicationDetail(app_data);
    this.app_route = ['./import-export/application-payments'];

    this.router.navigate(this.app_route);
    this.scrollToTop();


  }
  funcPrintApplicationInvoice(app_data) {

    let report_url = this.mis_url + 'reports/generateApplicationInvoice?oga_application_code=' + app_data.oga_application_code + "&regulatory_function_id=" + app_data.regulatory_function_id + "&regulatory_subfunction_id=" + app_data.regulatory_subfunction_id + "&table_name=tra_importexport_applications";
    this.funcGenerateRrp(report_url, "Report")

  }
  funcPrintLetterofRejection(app_data) {
    //print details

    let report_url = this.mis_url + 'reports/generateImportExportRejectionLetter?oga_application_code=' + app_data.oga_application_code;
    this.funcGenerateRrp(report_url, "Application Details");

  }

  funcGenerateRrp(report_url, title) {

    this.printiframeUrl = this.configService.returnReportIframe(report_url);
    this.printReportTitle = title;
    this.isPrintReportVisible = true;

  }
  onLoadApplicationProcessingData(data) {

    this.utilityService.onLoadApplicationProcessingData(data.oga_application_code)
      .subscribe(
        resp_data => {
          if (resp_data.success) {
            this.productApplicationProcessingData = resp_data.data;
            this.isPreviewApplicationProcessing = true;
          }
          else {
            this.toastr.error(resp_data.message, 'Alert!');
          }
        });
  }

  funcArchivePermitApplication(data) {
    this.utilityService.funcApplicationArchiceCall(this.viewRef, data, 'txn_importexport_applications', this.reloadPermitApplicationsApplications);
  }

  funcDeletePermitApplication(data) {
    //  this.utilityService.funcApplicationDeleteCall(this.viewRef, data, 'txn_importexport_applications', this.reloadPermitApplicationsApplications);


  }

  onClearProdutFilters() {
    this.FilterDetailsFrm.reset();
    this.FilterDetailsFrm.reset();
    this.FilterDetailsFrm.reset();

    this.reloadPermitApplicationsApplications();


  }
  onCellPrepared(e) {
    this.utilityService.onCellPrepared(e);

  }

}
