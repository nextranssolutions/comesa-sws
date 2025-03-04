import { Component, Directive, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ToastrService } from 'ngx-toastr';
import { AppSettings } from 'src/app/app-settings';
import { ConfigurationsService } from 'src/app/core-services/configurations/configurations.service';
import { UtilityService } from 'src/app/core-services/utilities/utility.service';
import { PremisesLicensingService } from '../../services/premises-licensing.service';
import { ModalService } from 'src/app/core-services/modal-service/modal-service';
import { CustomModalComponent } from 'src/app/shared-views/custom-modal/custom-modal.component';
@Directive()
export class SharedpremAppdashboardClass {
  app_renewalduenotifications: number = 0
  app_renewalduenotificationsdetails: any;
  isViewApplicationDueforRenewal: boolean = false;
  app_resp: any;
  base_url = AppSettings.base_url;
  mis_url = AppSettings.mis_url;
  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
  expanded = true;
  items = [];
  itemCount = 0;
  premises_applications: any = [];
  title: string;
  processData: any;
  submitted_application: number = 0;
  router_link: string;
  app_route: any;
  premisesapp_details: any;
  premises_resp: any;
  dtPremisesApplicationData: any = [];
  productApplicationProcessingData: any;
  isPreviewApplicationProcessing: boolean = false;

  //counters 
  contextMenuItems: any;
  printReportTitle: string;
  isPrintReportVisible: boolean = false;
  isApplicationRejectionVisible: boolean = false;
  printiframeUrl: string;
  applicationRejectionData: any;
  premisesappTypeData: any;
  premisessapp_details: any;
  regulatory_function_id: number = 2;

  sectionsData: number;
  applicationStatusData: number;
  FilterDetailsFrm: FormGroup;
  applicationDismissalFrm: FormGroup;
  isDismissApplicationWin: boolean = false;
  reasonForDismissalData: any;
  isPreviewApplicationsDetails: boolean = false;
  frmPreviewApplicationssDetails: FormGroup;
  premises_dashboardtitle: string;
  regulatory_subfunction_id: number;
  businessTypesData: any;
  prodProductTypeData: any;
  regulatedSectionsData: any;
  isPremisesApplicationInitialisation: boolean;
  premisesAppSelectionfrm: FormGroup;
  regulated_productstype_id: number;
  business_type_id: number;
  data_record: any;
  loadingVisible: boolean;
  spinnerMessage: string;


  constructor(private modalService: ModalService, public configService: ConfigurationsService, public appService: PremisesLicensingService, public config: ConfigurationsService, public viewRef: ViewContainerRef, public spinner: SpinnerVisibilityService, public utilityService: UtilityService, public router: Router, public translate: TranslateService, public toastr: ToastrService) {

    this.frmPreviewApplicationssDetails = new FormGroup({
      tracking_no: new FormControl('', Validators.compose([Validators.required])),
      premises_name: new FormControl('', Validators.compose([Validators.required])),
      physical_address: new FormControl('', Validators.compose([Validators.required])),
      application_type: new FormControl('', Validators.compose([Validators.required])),
      status: new FormControl('', Validators.compose([Validators.required]))
    });
    this.FilterDetailsFrm = new FormGroup({
      regulatory_subfunction_id: new FormControl('', Validators.compose([])),
      regulated_productstype_id: new FormControl('', Validators.compose([])),
      application_status_id: new FormControl('', Validators.compose([]))
    });

    this.applicationDismissalFrm = new FormGroup({
      dismissal_reason_id: new FormControl('', Validators.compose([])),
      dismissal_remarks: new FormControl('', Validators.compose([])),
      application_code: new FormControl('', Validators.compose([]))

    });

    this.premisesAppSelectionfrm = new FormGroup({
      regulated_productstype_id: new FormControl(this.sectionsData, Validators.compose([Validators.required])),
      regulatory_subfunction_id: new FormControl(this.regulatory_subfunction_id, Validators.compose([])),
      business_type_id: new FormControl('', Validators.compose([Validators.required]))
    });

    this.onLoadApplicationstatuses();
    this.onLoadSections();
    this.onLoadreasonForDismissalData();
    this.onLoadApplicationCounterDueforRenewal();
    this.onLoadprodProductTypeData();
    // this.onLoadPremisesApplications({application_status_id:1,regulatory_subfunction_id:1,process_id:3,business_type_id:this.business_type_id__});
  }

  ngOnInit() {
    this.onLoadPremisesApplications({application_status_id:1,regulatory_subfunction_id:1,process_id:3});

  }
  spinnerShow(spinnerMessage) {
    this.loadingVisible = true;
    this.spinnerMessage = spinnerMessage;
  }
  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scrolling for better UX
    });
  }
  spinnerHide() {
    this.loadingVisible = false;
  }
  onLoadApplicationCounterDueforRenewal() {

    this.utilityService.getApplicationUniformDetails({ regulatory_function_id: this.regulatory_function_id }, 'onLoadApplicationCounterDueforRenewal')
      .subscribe(
        resp_data => {
          if (resp_data.success) {
            this.app_renewalduenotifications = resp_data.app_renewalduenotifications;
          }
          else {
            this.toastr.error(resp_data.message, 'Alert!');
          }
          this.spinner.hide();
        });
  } onCellPrepared(e) {
    this.utilityService.onCellPrepared(e);
  }
  onLoadApplicationDetailsDueforRenewal() {
    if (this.app_renewalduenotifications < 1) {
      this.toastr.error('There is no application due for expiry (3months)!!', 'Alert!');
      return;
    }
    this.utilityService.getApplicationUniformDetails({ regulatory_function_id: this.regulatory_function_id }, 'onLoadApplicationDetailsDueforRenewal')
      .subscribe(
        resp_data => {
          if (resp_data.success) {
            this.app_renewalduenotificationsdetails = resp_data.app_renewalduenotificationsdetails;
            this.isViewApplicationDueforRenewal = true;
          }
          else {
            this.toastr.error(resp_data.message, 'Alert!');
          }
          this.spinner.hide();
        });
  }

  // onLoadPremisesApplications(filter_params = {}) {

  //   this.appService.onPremisesApplicationLoading(filter_params)
  //     .subscribe(
  //       resp_data => {
  //         if (resp_data.success) {
  //           this.dtPremisesApplicationData = resp_data.data;

  //         }
  //         else {
  //           this.toastr.error(resp_data.message, 'Alert!');

  //         }
  //       });
  // }
  onLoadPremisesApplications(filter_params = {}) {
    this.spinnerShow('Loading Information...........');
    this.appService.onPremisesApplicationLoading(filter_params)
      .subscribe(
        data => {

          this.data_record = data;
          if (this.data_record.success) {
            this.dtPremisesApplicationData = this.data_record.data;
          }
          this.spinnerHide();
        },
      );
  }
  onLoadingActionMenu(e, data) {

  }
  funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width / 100;
  }
  funcpopHeight(percentage_width) {
    return window.innerHeight * percentage_width / 100;
  }

  funcDismissApplication(data) {
    this.applicationDismissalFrm.get('application_code')?.setValue(data.application_code)
    this.isDismissApplicationWin = true;
  }
  onSubmitApplicationDismissal(data) {

    if (this.applicationDismissalFrm.invalid) {
      return;
    }
    this.utilityService.onSubmitApplicationDismissal('txn_premises_applications', 'ptl_premises_applications', this.applicationDismissalFrm.value, data.application_code)
      .subscribe(
        data => {

          this.app_resp = data;
          if (this.app_resp.success) {

            this.toastr.success(this.app_resp.message, 'Response');
            this.isDismissApplicationWin = false;
            this.onLoadPremisesApplications({ regulatory_subfunction_id: this.regulatory_subfunction_id });

          } else {
            this.toastr.error(this.app_resp.message, 'Alert');
          }


        });

  }
  onLoadApplicationstatuses() {

    var data = {
      table_name: 'wb_statuses'
    };
    this.configService.onLoadPortalConfigurationData(data)
      .subscribe(
        data => {
          this.applicationStatusData = data;
        });
  }
  onLoadreasonForDismissalData() {

    var data = {
      table_name: 'par_applicationdismissal_reasons'
    };
    this.configService.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.reasonForDismissalData = data;
        });
  }

  onLoadSections() {
    var data = {
      table_name: 'par_regulated_productstypes',
    };

    this.configService.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.sectionsData = data;
        });
  }
  onLoadPremisesAppType(regulatory_subfunction_id) {

    var data = {
      table_name: 'par_regulatory_subfunctions',
      regulatory_function_id: 2,
      regulatory_subfunction_id: this.regulatory_subfunction_id
    };

    this.configService.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.premisesappTypeData = data;
        });
  }
  onClickSubModuleAppSelection(regulatory_subfunction_id, sub_module_name) {

    if (regulatory_subfunction_id == 1) {
      this.isPremisesApplicationInitialisation = true;
      // this.app_route = ['./premises-licensing/premisesapplication-sel'];
      // this.router.navigate(this.app_route);
      //this.scrollToTop();
    } else if (regulatory_subfunction_id == 89) {
      this.premisessapp_details = { regulatory_function_id: this.regulatory_function_id, process_title: sub_module_name, regulatory_subfunction_id: regulatory_subfunction_id };
      this.appService.setPremisesApplicationDetail(this.premisessapp_details);

      this.app_route = ['./premises-licensing/premisessiteapproval-application'];

      this.router.navigate(this.app_route);
      this.scrollToTop();

    } else {

      this.premisessapp_details = { regulatory_function_id: this.regulatory_function_id, process_title: sub_module_name, regulatory_subfunction_id: regulatory_subfunction_id };
      this.appService.setPremisesApplicationDetail(this.premisessapp_details);

      this.app_route = ['./premises-licensing/registered-premises-selection'];

      this.router.navigate(this.app_route);
      this.scrollToTop();
    }

  }

  onLoadApplicationProcessingData(data) {

    this.utilityService.onLoadApplicationProcessingData(data.application_code)
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
  singleApplicationActionColClick(data) {

    this.funcActionsProcess(data.action, data);

  }

  premActionColClick(e, data) {

    var action_btn = e.itemData;
    this.funcActionsProcess(action_btn.action, data.data);

  }
  funcActionsProcess(action_btn, data) {
    if (action_btn === 'edit') {
      this.funcPremisePreveditDetails(data);
    }
    else if (action_btn === 'preview') {
      this.funcPremisePreviewDetails(data);
    }

    else if (action_btn == 'print_applications') {
      this.funcPrintApplicationDetails(data);
    }
    else if (action_btn == 'archive') {
      this.funcPremiseArchiveApplication(data);
    }
    else if (action_btn == 'pre_rejection') {
      this.funcApplicationRejection(data);
    }
    else if (action_btn == 'query_response') {

      this.funcPremisePreveditDetails(data);
    } else if (action_btn == 'processing_details') {

      this.onLoadApplicationProcessingData(data);

    }
    else if (action_btn == 'print_invoice') {

      this.funcPrintApplicationInvoice(data);

    } else if (action_btn == 'print_rejectionletter') {

      this.funcPrintLetterofRejection(data);

    } else if (action_btn == 'reg_certificate') {

      this.funcPrintPremisesRegistrationCertificate(data);

    } else if (action_btn == 'business_permit') {

      this.funcPrintPremisesBusinessPermit(data);

    } else if (action_btn == 'dismiss_applications') {

      this.funcDismissApplication(data);

    } else if (action_btn == 'print_receipt') {

      this.funcPrintApplicationReceipts(data);
    }
    else if (action_btn.action == 'uploadsub_paymentdetails' || action_btn.action == 'uploadsub_paymentdetails') {

      this.funcUploadPaymentDetails(data);

    } else if (action_btn == 'reinspectionreq') {

      this.funcIntiateREinspectionProcesses(data);

    } else if (action_btn == 'reinspectionreq') {

      this.funcIntiateREinspectionProcesses(data);

    }
    else if (action_btn == 'delete_application') {
      this.funcDeletePermitApplication(data);
    }
    else if (action_btn == 'restorearchived') {
      this.funcProductRestoreArchiveApplication(data.data);
    }


  } funcProductRestoreArchiveApplication(data) {
    this.utilityService.funcApplicationRestoreArchiceCall(this.viewRef, data, 'ptl_premises_applications', this.onLoadPremisesApplications)
  }

  funcDeletePermitApplication(data) {
    // this.utilityService.funcApplicationDeleteCall(this.viewRef,data,'ptl_premises_applications', this.onLoadPremisesApplications);
  }

  funcIntiateREinspectionProcesses(app_data) {

    //this.spinner.show();
    /*
     this.modalServ.openDialog(this.viewRef, {
       title: 'Do you want to Initiate Responses to Re-Inspection Request(Note the service is billed based on the Fees and charges)?',
       childComponent: '',
       settings: {
         closeButtonClass: 'fa fa-close'
       },
       actionButtons: [{
         text: 'Yes',
         buttonClass: 'btn btn-danger',
         onAction: () => new Promise((resolve: any, reject: any) => {
           this.spinner.show();
           this.utilityService.getApplicationProcessInformation(app_data.application_code,'premisesregistration/IntiateREinspectionResponseProcesses')
         .subscribe(
           data => {
             this.title = app_data.process_title;
             if(data.success){
               //let application_data = data.app_data;
               this.processData = data.data;
                 app_data.application_status_id = 40;
                 this.router_link = this.processData.router_link;
 
                 this.appService.setPremisesApplicationDetail(this.processData);
                 if(this.router_link != ''){
                   this.app_route = ['./premises-licensing/' + this.router_link];
       
                   this.router.navigate(this.app_route);
                   this.scrollToTop();
                 }
                 else{
                   this.toastr.error("The application process route has not been mapped, contact SUpport Team!!", 'Alert!');
                 }
                
 
             }
             else{
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
  funcUploadPaymentDetails(data) {
    /*
    this.appsub_regulatory_function_id = data.regulatory_subfunction_id;
    this.appregulatory_function_id = data.regulatory_function_id;
    this.appregulated_productstype_id = data.regulated_productstype_id;
    this.appapplication_code = data.application_code;
    if(this.appsub_regulatory_function_id == 78 || this.appsub_regulatory_function_id ==82){
      this.app_routing  = ['./premises-licensing/importlicense-dashboard'];

    }else{
      this.app_routing  = ['./premises-licensing/exportlicense-dashboard'];

    }
      data.onApplicationSubmissionFrm = this.onApplicationSubmissionFrm;
      data.app_routing = this.app_routing;
      
      this.utilityService.setApplicationDetail(data);
      this.app_route = ['./premises-licensing/application-invoices'];
     
      this.router.navigate(this.app_route);
      this.scrollToTop();
*/
  }
  funcPrintPremisesRegistrationCertificate(app_data) {

    let report_url = this.mis_url + 'reports/generatePremiseCertificate?application_code=' + app_data.application_code + "&regulatory_function_id=" + app_data.regulatory_function_id + "&regulatory_subfunction_id=" + app_data.regulatory_subfunction_id + "&table_name=txn_premises_applications";
    this.funcGenerateRrp(report_url, "Application Certificate")

  }
  funcPrintPremisesBusinessPermit(app_data) {

    let report_url = this.mis_url + 'reports/generatePremisePermit?application_code=' + app_data.application_code + "&regulatory_function_id=" + app_data.regulatory_function_id + "&regulatory_subfunction_id=" + app_data.regulatory_subfunction_id + "&table_name=txn_premises_applications";
    this.funcGenerateRrp(report_url, "Business Permits")
  }

  funcPrintApplicationInvoice(app_data) {

    let report_url = this.mis_url + 'reports/generateApplicationInvoice?application_code=' + app_data.application_code + "&regulatory_function_id=" + app_data.regulatory_function_id + "&regulatory_subfunction_id=" + app_data.regulatory_subfunction_id + "&table_name=txn_premises_applications";
    this.funcGenerateRrp(report_url, "Application Invoice")

  }
  funcPrintApplicationReceipts(app_data) {
    this.utilityService.setApplicationDetail(app_data);
    this.app_route = ['./premises-licensing/application-payments'];

    this.router.navigate(this.app_route);
    this.scrollToTop();

  }
  funcPrintLetterofRejection(app_data) {
    //print details
    let report_url = this.mis_url + 'reports/generatePremisesRejectionLetter?application_code=' + app_data.application_code;
    this.funcGenerateRrp(report_url, "Application Details");

  }
  funcPrintApplicationDetails(app_data) {
    //print details

    let report_url = this.mis_url + 'reports/generatePremisesApplicationRpt?application_code=' + app_data.application_code;
    this.funcGenerateRrp(report_url, "Application Details");

  }
  funcGenerateRrp(report_url, title) {

    this.printiframeUrl = this.configService.returnReportIframe(report_url);
    this.printReportTitle = title;
    this.isPrintReportVisible = true;

  }
  funcPremisesApplicationSelectcion() {

    this.app_route = ['./premises-licensing/premisesapplication-sel'];
    this.router.navigate(this.app_route);
    this.scrollToTop();
  }
  onPremisesappsToolbarPreparing(e) {
    e.toolbarOptions.items.unshift({
      location: 'after',
      widget: 'dxButton',
      options: {
        icon: 'refresh',
        onClick: this.refreshDataGrid.bind(this)
      }
    });
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
    this.onLoadPremisesApplications({ regulatory_subfunction_id: this.regulatory_subfunction_id });
  }
  funcPremiseArchiveApplication(data) {
    this.utilityService.funcApplicationArchiceCall(this.viewRef, data, 'ptl_premises_applications', this.onLoadPremisesApplications)


  }
  funcPremisePreviewDetails(app_data) {
    this.isPreviewApplicationsDetails = true;
    this.frmPreviewApplicationssDetails.patchValue(app_data);

  }

  funcApplicationRejection(app_data) {

    //this.spinner.show();
    this.utilityService.getApplicationPreRejectionDetails(app_data.application_code, 'ptl_premises_applications', 'application_status_id')
      .subscribe(
        data => {
          this.applicationRejectionData = data.data;
          this.spinner.hide();
          this.isApplicationRejectionVisible = true;
        });
  }

  funcPremisePreveditDetails(app_data) {

    this.spinner.show();
    this.appService.getpremisesApplicationDetails(app_data.application_id)
      .subscribe(
        data => {
          this.processData = data.data;
          this.spinner.hide();
          if (data.success) {
            this.title = this.processData.process_title;
            this.router_link = this.processData.router_link;

            this.appService.setPremisesApplicationDetail(this.processData);

            if (this.router_link != '') {
              this.app_route = ['./premises-licensing/' + this.router_link];

              this.router.navigate(this.app_route);
              this.scrollToTop();
            }
            else {
              this.toastr.error("The application process route has not been mapped, contact SUpport Team!!", 'Alert!');
            }

          }
          else {
            this.toastr.error(this.processData.message, 'Alert!');

          }

        });
  }
  onViewRegisteredPremisesApps(registration_status, validity_status, process_title) {


    this.premisessapp_details = { registration_status: registration_status, process_title: process_title, validity_status: validity_status };
    this.appService.setPremisesApplicationDetail(this.premisessapp_details);

    this.app_route = ['./premises-licensing/registered-premises'];

    this.router.navigate(this.app_route);
    this.scrollToTop();

  }

  onSectionsCboSelect($event) {
    if ($event.selectedItem) {
      let product_type = $event.selectedItem;
      this.onBusinessTypesLoad(product_type.id)
    }


  }

  onBusinessTypesLoad(regulated_productstype_id) {

    var data = {
      table_name: 'par_business_types',
      regulated_productstype_id: regulated_productstype_id
    };
    this.configService.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.businessTypesData = this.data_record.data;
          }
        },
        error => {
          return false
        });
  }

  onLoadprodProductTypeData() {
    var data = {
      table_name: 'par_regulated_productstypes'
    };
    this.configService.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.prodProductTypeData = this.data_record.data;
          }
        });
  }
  onprodProductTypeDataChange($event) {
    if ($event.selectedItem) {
      let prodtypes = $event.selectedItem;
      this.onLoadRegulatedSectionsData(prodtypes.id)
    }

  }

  onLoadRegulatedSectionsData(regulated_producttype_id) {
    var data = {
      table_name: 'par_regulated_productstypes'
    };

    this.configService.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.regulatedSectionsData = this.data_record.data;
          }
        });
  }

  onPremisesAppSelection() {

    if (this.premisesAppSelectionfrm.invalid) {
      this.toastr.error('Fill in all the Mandatory Fields', 'Alert!');

      return;
    }
    this.spinner.show();
    this.regulated_productstype_id = this.premisesAppSelectionfrm.get('regulated_productstype_id')?.value;
    this.business_type_id = this.premisesAppSelectionfrm.get('business_type_id')?.value;
    this.regulatory_subfunction_id = 1;
    this.configService.getSectionUniformApplicationProces(this.regulatory_subfunction_id, 1,this.regulated_productstype_id)
      .subscribe(
        data => {
          
          this.spinner.hide();
          if (data.success) {
            this.processData = data.data.process_infor;
            
            this.router_link = this.processData.router_link;

            this.premisesapp_details = this.processData;

            this.appService.setPremisesApplicationDetail(data.data);
            this.app_route = ['./premises-licensing/' + this.router_link];

            this.router.navigate(this.app_route);
            this.scrollToTop();

          }
          else {
            this.toastr.error(this.processData.message, 'Alert!');

          }


        });
    return false;
  }


  onInitiatenewPremisesApplications() {



    this.onClickSubModuleAppSelection(1, 'New Premises Registration');
  }

}
