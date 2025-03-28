import { Component, Directive, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DxDataGridComponent } from 'devextreme-angular';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { AppSettings } from 'src/app/app-settings';
import { UtilityService } from 'src/app/core-services/utilities/utility.service';
import { ImportExportService } from '../../services/import-export.service';
import { ConfigurationsService } from 'src/app/core-services/configurations/configurations.service';
import { PublicDashboardService } from 'src/app/core-services/public-dashboard/public-dashboard.service';

@Directive()
export class SharedImpExpdashboardClass {

  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
  is_popupguidelines: boolean;
  applicationsubmission_type_id: number;
  application_status_id: any;
  response: any;
  ImportExpApplicationData: any;
  show_advancesearch: boolean;
  productsapp_details: any;
  navigation_type_id: any;
  loadingVisible: boolean;
  spinnerMessage: string;
  dtImportExpApplicationData: any = [];
  expanded: boolean = false;
  app_route: any;
  regulatory_function_id: number = 4;
  app_response: any;
  processData: any;
  nav_data: any;
  title: string;
  router_link: string;
  base_url = AppSettings.base_url;
  mis_url = AppSettings.mis_url;
  isPreviewApplicationProcessing: boolean = false;
  printReportTitle: string;
  navigation_items: any;
  isPrintReportVisible: boolean = false;
  printiframeUrl: string;
  isPreviewApplicationDetails: boolean;
  frmPreviewAppDetails: FormGroup;
  applicantDetailsForm: FormGroup;
  applicationGeneraldetailsfrm: FormGroup;
  regulated_productstype_id: number;
  applicationSelectionfrm: FormGroup;
  applicationRejectionData: any;
  isApplicationRejectionVisible: boolean = false;
  FilterDetailsFrm: FormGroup;
  applicationStatusData: any;
  importexport_permittype_id: number;
  productTypeData: any;
  data_record: any;
  guidelines_title: string;
  regulatory_subfunction_id: any;
  application_code: any;
  appworkflowstage_category_id: any;
  applicant_id: any;
  permit_type_id: 1;
  application_title: string;
  sectionItem: any;
  app_typeItem: any;
  application_details: any;
  isPermitInitialisation: boolean;
  confirmDataParam: any;
  has_nonregisteredproducts: boolean = false;
  is_approvedVisaPermit: boolean = false;
  win_submitinvoicepayments: boolean;
  permitProductsData: any;
  table_name: string;
  productApplicationProcessingData: any;
  appregulatory_subfunction_id: number;
  app_routing: any;
  appregulatory_function_id: number;
  appstatus_id: number;
  appapplication_code: number;
  onApplicationSubmissionFrm: FormGroup;
  importExportPermitTypesData: any;
  processingData: any;

  constructor(public utilityService: UtilityService, public publicService: PublicDashboardService, public translate: TranslateService, public viewRef: ViewContainerRef, public spinner: SpinnerVisibilityService, public toastr: ToastrService, public router: Router, public configService: ConfigurationsService, public appService: ImportExportService) { // this.onLoadApplicationCounterDetails();

    //get the navigation process  inform //navigation items and get the sub_function_id 


    this.applicationGeneraldetailsfrm = new FormGroup({
      regulatory_subfunction_id: new FormControl('', Validators.compose([])),

    });

    this.onApplicationSubmissionFrm = new FormGroup({
      paying_currency_id: new FormControl('', Validators.compose([])),
      submission_comments: new FormControl('', Validators.compose([]))
    });
    this.table_name = 'wb_importexport_applications'

    this.onLoadconfirmDataParam();
    this.onLoadimportExportPermitTypesData();
    this.nav_data = localStorage.getItem('nav_data');
    this.nav_data = JSON.parse(this.nav_data);
   


  }


  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scrolling for better UX
    });
  }


  onInitiatenewImportExpApplications(regulatory_subfunction_id, applicationsubmission_type_id) {
    this.nav_data = localStorage.getItem('nav_data');
    this.nav_data = JSON.parse(this.nav_data);

    regulatory_subfunction_id = this.nav_data.regulatory_subfunction_id;

    this.onApplicationSelection(regulatory_subfunction_id, applicationsubmission_type_id);
  }


  onInitiatenewSingleProductPermitImportExpApplications(regulatory_subfunction_id, applicationsubmission_type_id) {
    this.nav_data = localStorage.getItem('nav_data');
    this.nav_data = JSON.parse(this.nav_data);
    regulatory_subfunction_id = this.nav_data.regulatory_subfunction_id;

    this.onApplicationSelection(regulatory_subfunction_id, applicationsubmission_type_id);
  }
  onApplicationSelection(regulatory_subfunction_id, applicationsubmission_type_id) {

    this.spinnerShow(' ');


    this.configService.getApplicantSectionUniformApplication(regulatory_subfunction_id, applicationsubmission_type_id)
      .subscribe(
        data => {
          this.spinnerHide();
          if (data.success) {
            this.processData = data.data.process_infor;

            this.router_link = this.processData.router_link;
            this.productsapp_details = this.processData;
            this.appService.setApplicationDetail(data.data);

            localStorage.setItem('application_details', JSON.stringify(data.data));


            this.app_route = ['./importexport-permit-application/' + this.router_link];

            this.router.navigate(this.app_route);
            this.scrollToTop();

          }
          else {
            this.toastr.error(this.processData.message, 'Alert!');

          }


        });
    return false;
  }


  funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width / 100;
  }


  reloadPermitApplicationsApplications(regulatory_subfunction_id, appworkflowstage_category_id) {
    this.spinnerShow('Loading  ...........');
    const storedTraderData = localStorage.getItem('trader_data');
    const traderData = storedTraderData ? JSON.parse(storedTraderData) : null;
    this.applicant_id = traderData ? traderData.id : null;
    var data_submit = {
      'table_name': this.table_name,
      'regulatory_subfunction_id': regulatory_subfunction_id,
      'appworkflowstage_category_id': appworkflowstage_category_id,
      'applicant_id': this.applicant_id,

    }
    this.appService.onPermitApplicationLoading('getImportExpApplicantPermitsLoading', data_submit)
      .subscribe(
        data => {
          this.data_record = data;

          if (this.data_record.success) {
            this.dtImportExpApplicationData = this.data_record.data;

          }
          this.spinnerHide();
        },
        error => {

          this.spinnerHide();
        });

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
    this.app_route = ['./importexport-permit-application/importexport-approvedappsel'];
    this.router.navigate(this.app_route);
    this.scrollToTop();
  }

  funcRequestforExportLicenseApplication() {
    this.app_route = ['./importexport-permit-application/export-licensesappselection'];
    this.router.navigate(this.app_route);
    this.scrollToTop();
  } funcRequestforPermitInspections() {
    this.app_route = ['./importexport-permit-application/importexport-approvedappinspection'];
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



  funcProductPreviewDetails(app_data) {
    this.isPreviewApplicationDetails = true;
    this.regulatory_subfunction_id = app_data.regulatory_subfunction_id;
    this.applicationsubmission_type_id = app_data.applicationsubmission_type_id;
    this.application_code = app_data.application_code;

    // this.spinnerShow('Loading...........');

    this.configService.getSectionUniformApplication(this.regulatory_subfunction_id, this.applicationsubmission_type_id, this.application_code)
      .subscribe(
        data => {
          if (data.success) {
            this.processData = data.data.process_infor;
            
            this.application_data = data.data;
            this.productsapp_details = this.processData;

            let merged_appdata = Object.assign({}, this.application_data, app_data);
            localStorage.setItem('application_details', JSON.stringify(merged_appdata));
            this.scrollToTop();
          }
          else {
            this.toastr.error(this.processData.message, 'Alert!');
            // this.spinnerHide();
          }


        });
    return false;
  }


  onLoadPermitProductsData(application_code) {
    this.spinnerShow(' ');
    this.appService.getPermitsOtherDetails({ 'application_code': application_code }, 'getPermitProductsDetails')
      .subscribe(
        data => {
          if (data.success) {

            this.permitProductsData = data.data;

          }
          else {
            this.toastr.success(data.message, 'Alert');
          }
          this.spinnerHide();
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
    }else if (action_btn.action === 'proceed_with_application') {
      this.funcApplicationPreveditDetails(data);
    }
    else if (action_btn.action == 'print_applications') {
      this.funcPrintApplicationDetails(data);
    }
    else if (action_btn.action == 'archive') {
      //this.funcArchivePermitApplication(data);
    } else if (action_btn.action == 'delete_application') {
      //this.funcDeletePermitApplication(data);
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

      //   this.funcInitiateLicenseApplication(data);

    }
    else if (action_btn.action == 'inspection_booking' || action_btn.action == 'inspection_booking') {

      //this.funcInitiateInspectionBooking(data);

    }
    else if (action_btn == 'restorearchived') {
      this.funcProductRestoreArchiveApplication(data.data);
    }


  } funcProductRestoreArchiveApplication(data) {
    this.utilityService.funcApplicationRestoreArchiceCall(this.viewRef, data, 'wb_importexport_applications', this.reloadPermitApplicationsApplications)
  }


  funcApplicationRejection(app_data) {

    this.spinnerShow('Loading...........');
    this.utilityService.getApplicationPreRejectionDetails(app_data.application_code, 'txn_importexport_applications', 'application_status_id')
      .subscribe(
        data => {
          this.applicationRejectionData = data.data;
          this.spinnerHide();

          this.isApplicationRejectionVisible = true;
        });
  }
  funcPrintApplicationDetails(app_data) {
    //print details

    let report_url = this.mis_url + 'reports/generateProductsApplicationRpt?application_code=' + app_data.application_code;
    this.funcGenerateRrp(report_url, "Report");

  }
  funcgenenerateImportExportPermit(app_data) {
    let report_url = this.mis_url + 'reports/genenerateImportExportPermit?application_code=' + app_data.application_code + "&regulatory_function_id=" + app_data.regulatory_function_id + "&regulatory_subfunction_id=" + app_data.regulatory_subfunction_id + "&table_name=txn_importexport_applications";
    this.funcGenerateRrp(report_url, "Report")

  }

  funcPrintApplicationReceipts(app_data) {
    this.utilityService.setApplicationDetail(app_data);
    this.app_route = ['./importexport-permit-application/application-payments'];

    this.router.navigate(this.app_route);
    this.scrollToTop();


  }
  funcPrintApplicationInvoice(app_data) {

    let report_url = this.mis_url + 'reports/generateApplicationInvoice?application_code=' + app_data.application_code + "&regulatory_function_id=" + app_data.regulatory_function_id + "&regulatory_subfunction_id=" + app_data.regulatory_subfunction_id + "&table_name=txn_importexport_applications";
    this.funcGenerateRrp(report_url, "Report")

  }
  funcPrintLetterofRejection(app_data) {
    //print details

    let report_url = this.mis_url + 'reports/generateImportExportRejectionLetter?application_code=' + app_data.application_code;
    this.funcGenerateRrp(report_url, "Application Details");

  }

  funcGenerateRrp(report_url, title) {

    this.printiframeUrl = this.configService.returnReportIframe(report_url);
    this.printReportTitle = title;
    this.isPrintReportVisible = true;

  }
  onLoadApplicationProcessingData(data) {

  }
  application_data: any;



  funcApplicationPreveditDetails(app_data) {

    this.regulatory_subfunction_id = app_data.regulatory_subfunction_id;
    this.applicationsubmission_type_id = app_data.applicationsubmission_type_id;
    this.application_code = app_data.application_code;


    this.spinnerShow('Loading...........');

    this.configService.getSectionUniformApplication(this.regulatory_subfunction_id, this.applicationsubmission_type_id, this.application_code)
      .subscribe(
        data => {
          if (data.success) {
            this.processData = data.data.process_infor;
            console.log(this.processData);
            this.application_data = data.data;

            this.router_link = this.processData.router_link;
            this.productsapp_details = this.processData;

            let merged_appdata = Object.assign({}, this.application_data, app_data);

            localStorage.setItem('application_details', JSON.stringify(merged_appdata));

            this.app_route = ['./importexport-permit-application/' + this.router_link];

            this.router.navigate(this.app_route);
            this.scrollToTop();
          }
          else {
            this.toastr.error(this.processData.message, 'Alert!');
            this.spinnerHide();
          }


        });
    return false;
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
              this.spinnerShow(' ');
              this.utilityService.getApplicationProcessInformation(app_data.application_code, 'importexportapp/funcInitiateInspectionBooking')
                .subscribe(
                  data => {
                    this.title = app_data.application_type;
                    if (data.success) {
    
                      app_data.application_status_id = 1;
                      app_data.process_title = this.title;
                      this.appService.setApplicationDetail(data.app_data);
                      this.app_route = ['./importexport-permit-application/inspection-booking'];
                      this.router.navigate(this.app_route);
                      this.scrollToTop();
                    }
                    else {
                      this.toastr.error(data.message, 'Alert!');
                    }
                    this.spinnerHide();
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
  funcInitiateLicenseApplication(app_data) {
    /*
    
        this.modalServ.openDialog(this.viewRef, {
          title: 'Do you want to Initiate Request for Import License Application?',
          childComponent: '',
          settings: {
            closeButtonClass: 'fa fa-close'
          },
          actionButtons: [{
            text: 'Yes',
            buttonClass: 'btn btn-danger',
            onAction: () => new Promise((resolve: any, reject: any) => {
              this.spinnerShow(' ');
              this.utilityService.getApplicationProcessInformation(app_data.application_code, 'importexportapp/funcInitiateLicenseApplication')
                .subscribe(
                  data => {
                    this.title = app_data.application_type;
                    if (data.success) {
                      app_data.application_status_id = 1;
                      app_data.process_title = this.title;
                      this.appService.setApplicationDetail(data.app_data);
                      this.app_route = ['./importexport-permit-application/importexport-application'];
                      this.router.navigate(this.app_route);
                      this.scrollToTop();
                    }
                    else {
                      this.toastr.error(data.message, 'Alert!');
    
    
                    }
    
                    this.spinnerHide();
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
  onCellPrepared(e) {
    this.utilityService.onCellPrepared(e);

  }



  onAdvanceDataGridSearch(e) {
    e.toolbarOptions.items.unshift({
      location: 'after',
      widget: 'dxCheckBox',
      options: {
        icon: 'select',
        text: 'Show Advanced Search',
        value: this.show_advancesearch,
        onValueChanged: this.onActivatetheAdvanceSearch.bind(this)
      }
    });
  }

  onActivatetheAdvanceSearch(e) {

    this.show_advancesearch = e.value;

  }





}