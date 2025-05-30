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

  base_url = AppSettings.base_url;
  mis_url = AppSettings.mis_url;
  table_name = 'txn_importexport_applications';
  is_popupguidelines = false;
  expanded = false;
  isPreviewApplicationProcessing = false;
  isPrintReportVisible = false;
  isPreviewApplicationDetails = false;
  isApplicationRejectionVisible = false;
  isPermitInitialisation = false;
  loadingVisible = false;
  isprodnextdisable = false;
  win_submitinvoicepayments = false;

  productsapp_details: any;
  dtImportExpApplicationData: any[] = [];
  applicationSelectionfrm: FormGroup;
  frmPreviewAppDetails: FormGroup;
  onApplicationSubmissionFrm: FormGroup;
  FilterDetailsFrm: FormGroup;
  productApplicationProcessingData: any;
  applicationRejectionData: any;
  applicationStatusData: any;
  processData: any;
  importExportPermitTypesData: any;
  wofklowStatusData: any;
  processingData: any;
  permitTypesData: any;
  application_details: any;
  confirmDataParam: any;
  sectionItem: any;
  app_typeItem: any;
  nav_data: any;
  data_record: any;
  permitProductsData: any;

  // Identifiers
  regulatory_function_id: number;
  regulatory_subfunction_id: number;
  regulatory_subfunction_idsel: number;
  transactionpermit_type_id: number;
  application_status_id: any;
  appworkflowstage_category_id: any;
  applicationsubmission_type_id: number;
  appstatus_id: number;
  permit_type_id: number;
  application_type_id: any;
  application_id: number;

  // Strings
  app_route: any;
  app_routing: any;
  app_response: any;
  process_title: string;
  application_title: string;
  guidelines_title: string;
  printReportTitle: string;
  printiframeUrl: string;
  router_link: string;
  spinnerMessage: string;
  tracking_no: string;
  oga_application_code: any;
  win_previewpermitapp: boolean;

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
    this.table_name = 'txn_importexport_applications';

    this.onLoadconfirmDataParam();
    this.nav_data = localStorage.getItem('nav_data');
    this.nav_data = JSON.parse(this.nav_data);
    let regulatory_subfunction_id = this.nav_data.regulatory_subfunction_id;
    let appworkflowstage_category_id = this.nav_data.appworkflowstage_category_id;
    this.reloadPermitApplicationsApplications(regulatory_subfunction_id, appworkflowstage_category_id);
    this.onLoadPermitTypesData(regulatory_subfunction_id);
    this.onLoadWorkflowStatusData();
    this.onLoadApplicationStatusData();

  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scrolling for better UX
    });
  }

  onInitiatenewImportExpApplications() {
    this.nav_data = localStorage.getItem('nav_data');
    this.nav_data = JSON.parse(this.nav_data);
    let regulatory_subfunction_id = this.nav_data.regulatory_function_id;

    this.onClickSubModuleAppSelection(regulatory_subfunction_id, 'New Import Application')
    this.isPermitInitialisation = true;
  }

  onClickSubModuleAppSelection(regulatory_subfunction_id, subfunction_name) {

    if (regulatory_subfunction_id == 1 || regulatory_subfunction_id == 91) {
      this.isPermitInitialisation = true;
      this.applicationSelectionfrm.get('regulatory_subfunction_id')?.setValue(regulatory_subfunction_id);

    } else {

      this.application_details = { regulatory_function_id: this.regulatory_function_id, process_title: subfunction_name, regulatory_subfunction_id: regulatory_subfunction_id };
      this.appService.setApplicationDetail(this.application_details);

      this.app_route = ['./importexport-control/registered-product-selection'];

      this.router.navigate(this.app_route);
      this.scrollToTop();
    }

  }

  onApplicationSelection() {
    if (this.applicationSelectionfrm.invalid) {
      this.toastr.error('Fill in all the Mandatory Fields', 'Alert!');
      return;
    }

    this.spinnerShow('loading...');
    this.sectionItem = this.applicationSelectionfrm.controls['transactionpermit_type_id'];
    this.nav_data = localStorage.getItem('nav_data');
    this.nav_data = JSON.parse(this.nav_data);
    let regulatory_subfunction_id = this.nav_data.regulatory_subfunction_id;
    this.regulatory_subfunction_id = regulatory_subfunction_id;
    this.transactionpermit_type_id = this.sectionItem.value;

    // Store transactionpermit_type_id in localStorage
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


  reloadPermitApplicationsApplications(regulatory_subfunction_id, appworkflowstage_category_id) {
    // this.spinnerShow('Loading...........');
    let filter_params = {
      regulatory_subfunction_id: regulatory_subfunction_id,
      appworkflowstage_category_id: appworkflowstage_category_id
    };

    this.appService.onPermitApplicationLoading(filter_params, 'getImportExpPermitApplicationLoading')
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.dtImportExpApplicationData = this.data_record.data;
          }
          // this.spinnerHide();
        },
      );
  }

  onLoadPermitTypesData(regulatory_subfunction_id) {

    let data_submit = {
      table_name: 'tra_transactionpermit_types',
      regulatory_subfunction_id: regulatory_subfunction_id,
    };

    // this.spinnerShow('Loading...........');
    this.configService.onPermitApplicationLoading(data_submit, 'getTransactionPermitTypeData')
      .subscribe(
        data => {

          this.data_record = data;
          if (this.data_record.success) {
            this.permitTypesData = this.data_record.data;
          }
          // this.spinnerHide();
        },
      );
  }
  // onLoadPermitTypesData() {
  //   var data = {
  //     table_name: 'tra_transactionpermit_types',
  //     // is_enabled: true
  //   };

  //   this.configService.onLoadConfigurationData(data)
  //     .subscribe(
  //       data => {
  //         this.data_record = data;

  //         if (this.data_record.success) {
  //           this.permitTypesData = this.data_record.data;
  //           
  //         }
  //       });

  // }

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

  onLoadApplicationStatusData() {
    var data = {
      table_name: 'par_application_statuses',
      is_enabled: true
    };

    this.configService.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.data_record = data;

          if (this.data_record.success) {
            this.applicationStatusData = this.data_record.data;
            ;
          }
        });
  }

  onLoadWorkflowStatusData() {
    var data = {
      table_name: 'wf_appworkflow_statuses',
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

  funcRequestforPermitAlteration() {
    this.app_route = ['./import-export/importexport-approvedappsel'];
    this.router.navigate(this.app_route);
    this.scrollToTop();
  }

  funcRequestforExportLicenseApplication() {
    this.app_route = ['./import-export/export-licensesappselection'];
    this.router.navigate(this.app_route);
    this.scrollToTop();
  } funcRequestforPermitInspections() {
    this.app_route = ['./import-export/importexport-approvedappinspection'];
    this.router.navigate(this.app_route);
    this.scrollToTop();
  }

  onClickSubModulehelpGuidelines() {
    this.is_popupguidelines = true;
  }
  /*
 onImportappsToolbarPreparing(e) {
   e.toolbarOptions.items.unshift({
     location: 'before',
     widget: 'dxButton',
     options: {
       text: 'Help & Guidelines',
       type: 'normal', stylingMode: 'outlined',
       icon: 'fa fa-question-circle',
       width:150,
       onClick: this.onClickSubModulehelpGuidelines.bind(this)

     }
   },{
     location: 'before',
     widget: 'dxButton',
     options: {
       text: 'Initiate Import Visa Application',
       tooltip: 'Initialisation of Import/Export Visa Application on Importation of Non-Registered Products.',
       type: 'default',
       icon: 'fa fa-plus',
       onClick: this.funcApplicationSelectcion.bind(this)
     }
   }, {
     location: 'before',
     widget: 'dxButton',
     options: {
       text: 'Import License Application',
       tooltip: 'Initialisation of Import/Export License Application on the Approved Visa Application, Import Permit on Registered/Authorised Products.',
       type: 'default',
       icon: 'fa fa-pencil-square-o',
       onClick: this.funcRequestforLicenseApplication.bind(this)
     }
   },{
     location: 'before',
     widget: 'dxButton',
     options: {
       text: 'Export License Application',
       tooltip: 'Initialisation of Export License Application.',
       type: 'default',
       icon: 'fa fa-pencil-square-o',
       onClick: this.funcRequestforExportLicenseApplication.bind(this)
     }
   },{
     location: 'before',
     widget: 'dxButton',
     options: {
       text: 'Inspection Booking & Request',
       type: 'default',
       icon: 'fa fa-pencil-square-o',
       onClick: this.funcRequestforPermitInspections.bind(this)
     }
   },{
       location: 'after',
       widget: 'dxButton',
       options: {
         icon: 'refresh',
         onClick: this.refreshDataGrid.bind(this)
       }
     });
 }
 */


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
      // this.funcApplicationPreveditDetails(data);

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

    } else if (action_btn.action == 'initiate_license_application' || action_btn.action == 'initiate_license_application') {


    }
    else if (action_btn.action == 'uploadsub_paymentdetails' || action_btn.action == 'uploadsub_paymentdetails') {

      // this.funcUploadPaymentDetails(data);

    } else if (action_btn.action == 'inspection_booking' || action_btn.action == 'inspection_booking') {

      this.funcInitiateInspectionBooking(data);

    }
    else if (action_btn == 'restorearchived') {
      this.funcProductRestoreArchiveApplication(data.data);
    }


  } funcProductRestoreArchiveApplication(data) {
    this.utilityService.funcApplicationRestoreArchiceCall(this.viewRef, data, 'txn_importexport_applications', this.reloadPermitApplicationsApplications)
  }
  application_data: any;
  current_stage_id: number;

  funcApplicationPreveditDetails(app_data) {

    this.regulatory_subfunction_id = app_data.regulatory_subfunction_id;
    this.regulatory_function_id = app_data.regulatory_function_id;
    this.transactionpermit_type_id = app_data.transactionpermit_type_id;
    this.current_stage_id = app_data.current_stage_id;
    this.oga_application_code = app_data.oga_application_code;
    let appprocess_data = { current_stage_id: this.current_stage_id, oga_application_code: this.oga_application_code, transactionpermit_type_id: this.transactionpermit_type_id, regulatory_subfunction_id: this.regulatory_subfunction_id, regulatory_function_id: this.regulatory_function_id }
    this.spinner.show();
    this.configService.getPermitUniformApplicationProces(appprocess_data, 'getPermitUniformApplicationProces')
      .subscribe(
        data => {
          this.spinner.hide();
          if (data.success) {
            this.processData = data.data.process_infor;
            this.application_data = data.data;

            this.router_link = this.processData.router_link;
            this.productsapp_details = this.processData;
            let merged_appdata = Object.assign({}, this.application_data, app_data);
            localStorage.setItem('application_details', JSON.stringify(merged_appdata));

            this.app_route = ['./importexport-control/' + this.router_link];

            this.router.navigate(this.app_route);
            this.scrollToTop();
          }
          else {
            this.toastr.error(data.message || "An error occurred", 'Alert!');
          }
        },
        error => {
          this.spinner.hide();
          this.toastr.error("Failed to fetch application details", "Error");
          console.error("API Error:", error);
        }
      );

    return false;
  }


  funcProductPreviewDetails(app_data) {
    this.win_previewpermitapp = true;
    this.regulatory_function_id = app_data.regulatory_function_id;
    this.regulatory_subfunction_id = app_data.regulatory_subfunction_id;
    this.transactionpermit_type_id = app_data.transactionpermit_type_id;
    this.current_stage_id = app_data.current_stage_id;
    this.oga_application_code = app_data.oga_application_code;
    let appprocess_data = { current_stage_id: this.current_stage_id, oga_application_code: this.oga_application_code, transactionpermit_type_id: this.transactionpermit_type_id, regulatory_function_id: this.regulatory_function_id, regulatory_subfunction_id: this.regulatory_subfunction_id }
    this.spinner.show();
    this.configService.getPermitUniformApplicationProces(appprocess_data, 'getPermitUniformApplicationProces')
      .subscribe(
        data => {
          this.spinner.hide();
          if (data.success) {
            this.processData = data.data.process_infor;
            this.application_data = data.data;

            this.router_link = this.processData.router_link;
            this.productsapp_details = this.processData;

            let merged_appdata = Object.assign({}, this.application_data, app_data);

            localStorage.setItem('application_details', JSON.stringify(merged_appdata));

            // this.app_route = ['./importexport-control/' + this.router_link];

            this.router.navigate(this.app_route);
            this.scrollToTop();
          }
          else {
            this.toastr.error(data.message || "An error occurred", 'Alert!');
          }
        },
        error => {
          this.spinner.hide();
          this.toastr.error("Failed to fetch application details", "Error");
          console.error("API Error:", error);
        }
      );

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
    let report_url = this.mis_url + 'reports/genenerateImportExportPermit?oga_application_code=' + app_data.oga_application_code + "&regulatory_function_id=" + app_data.regulatory_function_id + "&regulatory_subfunction_id=" + app_data.regulatory_subfunction_id + "&table_name=txn_importexport_applications";
    this.funcGenerateRrp(report_url, "Report")

  }

  funcPrintApplicationReceipts(app_data) {
    this.utilityService.setApplicationDetail(app_data);
    this.app_route = ['./import-export/application-payments'];

    this.router.navigate(this.app_route);
    this.scrollToTop();


  }
  funcPrintApplicationInvoice(app_data) {

    let report_url = this.mis_url + 'reports/generateApplicationInvoice?oga_application_code=' + app_data.oga_application_code + "&regulatory_function_id=" + app_data.regulatory_function_id + "&regulatory_subfunction_id=" + app_data.regulatory_subfunction_id + "&table_name=txn_importexport_applications";
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

    this.reloadPermitApplicationsApplications(this.regulatory_subfunction_id, this.appworkflowstage_category_id);
  }
  funcInitiateInspectionBooking(app_data) {
    /*
        this.modalServ.openDialog(this.viewRef, {
          title: 'Do you want to Initiate Booking Inspection Application?',
          childComponent: '',
          settings: {
            closeButtonClass: 'fa fa-close'
          },
          actionButtons: [{
            text: 'Yes',
            buttonClass: 'btn btn-danger',
            onAction: () => new Promise((resolve: any, reject: any) => {
              this.spinner.show();
              this.utilityService.getApplicationProcessInformation(app_data.application_code, 'importexportapp/funcInitiateInspectionBooking')
                .subscribe(
                  data => {
                    this.title = app_data.application_type;
                    if (data.success) {
    
                      app_data.application_status_id = 1;
                      app_data.process_title = this.title;
                      this.appService.setApplicationDetail(data.app_data);
                      this.app_route = ['./import-export/inspection-booking'];
                      this.router.navigate(this.app_route);
                      this.scrollToTop();
                    }
                    else {
                      this.toastr.error(data.message, 'Alert!');
                    }
                    this.spinner.hide();
                  });
              resolve();
            })
          }, {
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

  // onCellPrepared(e) {
  //   this.utilityService.onCellPrepared(e);
  // }

  onCellPrepared(e) {
    this.utilityService.onCellCountriesPrepared(e);
  }

  onCellAppStatusPrepared(e: any) {

    if (e.rowType === "data" && e.column.dataField === "appworkflow_status_id") {
      let statusId = e.data.appworkflow_status_id;  // Ensure the value is retrieved correctly

      switch (statusId) {
        case 1:  // Draft
          e.cellElement.style.color = "white";
          e.cellElement.style.backgroundColor = "#64B0F2";
          break;
        case 2:  // Under Processing
          e.cellElement.style.color = "white";
          e.cellElement.style.backgroundColor = "#FF5D48";
          break;
        case 3:  // Approved
          e.cellElement.style.color = "white";
          e.cellElement.style.backgroundColor = "green";
          break;
        default: // Default style
          e.cellElement.style.color = "black";
      }
    }
  }



}