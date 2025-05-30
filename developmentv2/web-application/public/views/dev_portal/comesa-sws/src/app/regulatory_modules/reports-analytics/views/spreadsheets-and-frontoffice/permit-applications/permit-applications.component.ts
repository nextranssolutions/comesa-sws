import { Component, Directive, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DxDataGridComponent } from 'devextreme-angular';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ToastrService } from 'ngx-toastr';
import { AppSettings } from 'src/app/app-settings';
import { UtilityService } from 'src/app/core-services/utilities/utility.service';
import { ConfigurationsService } from 'src/app/core-services/configurations/configurations.service';
import { AuthenticationService } from 'src/app/core-services/authentication/authentication.service';
import { ImportExportService } from "src/app/regulatory_modules/importexport-control/services/import-export.service";


@Component({
  selector: 'app-permit-applications',
  templateUrl: './permit-applications.component.html',
  styleUrl: './permit-applications.component.css'
})
export class PermitApplicationsComponent {
 
   @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
   is_popupguidelines: boolean;
   productsapp_details: any;
   application_code: any;
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
   filtersFrm: FormGroup;
   filteredGridData: any[] = [];
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
   applicationsubmission_type_id: number;
   transactionpermit_type_id: number;
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
   appapplication_code: number;
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
   actionsMenuItems = [
    {
      text: "Action",
      icon: 'menu',
      items: [
         { text: "Preview Application", action: 'view_record', icon: 'fa fa-eye' },
        
      ]
    }
  ];
 
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
     this.filtersFrm = new FormGroup({
       received_from: new FormControl('', Validators.compose([Validators.required])),
       received_to: new FormControl('', Validators.compose([Validators.required])),
     });
     this.table_name = 'txn_importexport_applications';
 
     this.onLoadProductTypes();
     this.onLoadconfirmDataParam();
     this.onLoadproducttypeDefinationData();
     this.reloadPermitApplicationsApplications();
     this.onLoadPermitTypesData();
     this.onLoadWorkflowStatusData();
 
   }

   columnVisibility = {
    application_reference: true,
    permit_type: true,
    date_of_application: true,
    invoice_number: true,
    invoice_date: true,
    total_invoice_value: true,
    currency_of_transaction: true,
    importer_exporter_name: true,
    date_added: true,
    application_status: true,

    expected_date_of_shipment: true,
    port_of_entryexit: true,
    mode_of_transport: true,
    transpoter_name: true,
    transporter_contact: true,
    invoice_type: true,
    regulatory_function: true,
    regulatory_subfunction: true,
    transporter_country: true,
    zone: true,
    final_destination_country: true,
    currency_oftransaction: true,
    port_type: true,
    appworkflow_status: true,
    declaration_statuses: true,
    applicationsubmission_type: true,
    workflowprocess: true,
    applicant: true,
    applicationapplicant_option: true,
    customs_office: true,
    permit_typecategory: true,
    transactionpermit_type: true,
    organisation: true,
    oga_application_code: true,
    application_code: true,
   
  };

  onColumnVisibilityChange() {
    
  }
 
   scrollToTop(): void {
     window.scrollTo({
       top: 0,
       behavior: 'smooth' // Smooth scrolling for better UX
     });
   }
 
   onInitiatenewImportExpApplications(){
     this.onClickSubModuleAppSelection(1, 'New Import Application')
     this.isPermitInitialisation = true; 
 }
 
   onClickSubModuleAppSelection(regulatory_subfunction_id, subfunction_name) {
 
     if (regulatory_subfunction_id == 1 || regulatory_subfunction_id == 91) {
       this.isPermitInitialisation = true;
       this.applicationSelectionfrm.get('regulatory_subfunction_id')?.setValue(regulatory_subfunction_id);
 
     } else if (regulatory_subfunction_id == 30) {
       this.isPermitInitialisation = true;
       this.applicationSelectionfrm.get('regulatory_subfunction_id')?.setValue(regulatory_subfunction_id);
 
     } else if (regulatory_subfunction_id == 94) {
 
       this.application_details = { regulatory_function_id: this.regulatory_function_id, process_title: subfunction_name, regulatory_subfunction_id: regulatory_subfunction_id };
       this.appService.setApplicationDetail(this.application_details);
 
       this.app_route = ['./importexport-control/product-variantapp-selection'];
 
       this.router.navigate(this.app_route);
       this.scrollToTop();
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
 
     // let transactionpermit_type_id = this.applicationSelectionfrm.get('transactionpermit_type_id')?.value;
     let regulatory_subfunction_id = this.applicationSelectionfrm.get('regulatory_subfunction_id')?.value;
 
     this.regulatory_subfunction_id = regulatory_subfunction_id;
     this.transactionpermit_type_id = this.sectionItem.value;
 
 
     // localStorage.setItem('transactionpermit_type_id', JSON.stringify(this.transactionpermit_type_id));
     
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
 
   onLoadProductAppType(regulatory_subfunction_id) {
 
     var data = {
       table_name: 'par_regulatory_subfunctions',
       regulatory_function_id: 4,
       regulatory_subfunction_id: regulatory_subfunction_id
     };
     this.configService.onLoadConfigurationData(data)
       .subscribe(
         data => {
           this.data_record = data;
 
           if (this.data_record.success) {
             this.productappTypeData = this.data_record.data;
             ;
           }
         });
   }
   onLoadproducttypeDefinationData() {
     var data = {
       table_name: 'par_producttype_definations',
     };
     this.configService.onLoadConfigurationData(data)
       .subscribe(
         data => {
           this.data_record = data;
 
           if (this.data_record.success) {
             this.producttypeDefinationData = this.data_record.data;
             ;
           }
         });
 
   }



  onFuncFiltersData() {
  
    const controls = this.filtersFrm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        this.toastr.error('Fill In All Mandatory fields with (*), missing value on ' + name.replace('_id', ''), 'Alert');
        return;
      }
    }
    if (this.filtersFrm.invalid) {
      return;
    }
  
    const filters = this.filtersFrm.value;
    console.log(filters);
  
    let filteredData = this.dtImportExpApplicationData; // Original data
  
    const received_from = new Date(filters.received_from);
    const received_to = new Date(filters.received_to);
  
    if (isNaN(received_from.getTime()) || isNaN(received_to.getTime())) {
      console.error("Invalid date range provided.");
      return;
    }
  
    // Convert to ISO format for consistent comparison
    const startDate = received_from.toISOString().split("T")[0];
    const endDate = received_to.toISOString().split("T")[0];
  
    console.log("Filtering from:", startDate, "to:", endDate);
  
    const matchedData = filteredData.filter((item) => {
      const itemDate = new Date(item.date_of_application).toISOString().split("T")[0];
      return itemDate >= startDate && itemDate <= endDate;
    });
  
    console.log(matchedData);
    this.dtImportExpApplicationData = matchedData;
    // this.reloadPermitApplicationsApplications();
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
     if(action_btn.action === 'view_record'){
      console.log(this.funcApplicationPreveditDetails(data.data));
     }
     
 
   }
 
  //  singleApplicationActionColClick(data) {
 
  //    this.funcActionsProcess(data, data);
 
  //  }
 
  //  funcActionsProcess(action_btn, data) {
 
  //    if (action_btn.action === 'edit') {
  //      this.funcApplicationPreveditDetails(data);
  //      // this.funcApplicationPreveditDetails(data);
 
  //    }
  //    else if (action_btn.action === 'preview') {
  //      this.funcProductPreviewDetails(data);
  //    }
  //    else if (action_btn.action == 'print_applications') {
  //      this.funcPrintApplicationDetails(data);
  //    }
  //    else if (action_btn.action == 'archive') {
  //      this.funcArchivePermitApplication(data);
  //    } else if (action_btn.action == 'delete_application') {
  //      this.funcDeletePermitApplication(data);
  //    }
  //    else if (action_btn.action == 'pre_rejection') {
  //      this.funcApplicationRejection(data);
  //    }
  //    else if (action_btn.action == 'query_response') {
 
  //      this.funcApplicationPreveditDetails(data);
 
  //    }
  //    else if (action_btn.action == 'processing_details') {
 
  //      this.onLoadApplicationProcessingData(data);
 
  //    }
  //    else if (action_btn.action == 'print_invoice') {
 
  //      this.funcPrintApplicationInvoice(data);
 
  //    }
  //    else if (action_btn.action == 'print_receipt') {
 
  //      this.funcPrintApplicationReceipts(data);
 
  //    }
  //    else if (action_btn.action == 'print_rejectionletter') {
 
  //      this.funcPrintLetterofRejection(data);
 
  //    }
 
  //    else if (action_btn.action == 'reg_certificate' || action_btn.action == 'reg_certificate') {
 
  //      this.funcgenenerateImportExportPermit(data);
 
  //    }
  //    else if (action_btn.action == 'approval_permit' || action_btn.action == 'print_permit') {
 
  //      this.funcgenenerateImportExportPermit(data);
 
  //    } else if (action_btn.action == 'initiate_license_application' || action_btn.action == 'initiate_license_application') {
 
       
  //    }
  //    else if (action_btn.action == 'uploadsub_paymentdetails' || action_btn.action == 'uploadsub_paymentdetails') {
 
  //      // this.funcUploadPaymentDetails(data);
 
  //    } else if (action_btn.action == 'inspection_booking' || action_btn.action == 'inspection_booking') {
 
  //      this.funcInitiateInspectionBooking(data);
 
  //    }
  //    else if (action_btn == 'restorearchived') {
  //      this.funcProductRestoreArchiveApplication(data.data);
  //    }
 
 
  //  } 
   funcProductRestoreArchiveApplication(data) {
     this.utilityService.funcApplicationRestoreArchiceCall(this.viewRef, data, 'txn_importexport_applications', this.reloadPermitApplicationsApplications)
   }
   application_data: any;

  //  funcApplicationPreveditDetails(app_data) { 
  //  console.log(app_data);
  //   this.regulatory_subfunction_id = app_data.regulatory_subfunction_id;
  //   this.applicationsubmission_type_id = app_data.applicationsubmission_type_id;
  //   // this.application_code = app_data.application_code;
  //   let apppreview_data = {regulatory_subfunction_id:this.regulatory_subfunction_id,applicationsubmission_type_id:this.applicationsubmission_type_id,application_code:this.application_code}
  //   this.spinnerShow('Loading...........');

  //   this.configService.getSectionUniformApplication(apppreview_data, 'getUniformSectionApplicationProcess')
  //     .subscribe(
  //       data => {

  //         if (data.success) {
  //           this.processData = data.data.process_infor;
  //           this.application_data = data.data;
            
  //           this.router_link = this.processData.router_link;
  //           this.productsapp_details = this.processData;
  //           let merged_appdata = Object.assign({}, this.application_data, app_data);
  //           console.log(merged_appdata);
  //           localStorage.setItem('applicant_details', JSON.stringify(merged_appdata));

  //           this.app_route = ['./importexport-permit-application/' + this.router_link];

  //           this.router.navigate(this.app_route);
  //           this.scrollToTop();

  //         }
  //         else {
  //           this.toastr.error(this.processData.message, 'Alert!');
  //           this.spinnerHide();
  //         }


  //       });
  //   return false;
  // }

  current_stage_id:number;

  funcApplicationPreveditDetails(app_data) {
    
    this.regulatory_subfunction_id = app_data.regulatory_subfunction_id;
    this.regulatory_function_id = app_data.regulatory_function_id;
    this.transactionpermit_type_id = app_data.transactionpermit_type_id;
    this.current_stage_id = app_data.current_stage_id;
    this.oga_application_code = app_data.oga_application_code;
    let appprocess_data = {current_stage_id:this.current_stage_id,oga_application_code:this.oga_application_code,transactionpermit_type_id:this.transactionpermit_type_id,regulatory_subfunction_id:this.regulatory_subfunction_id,regulatory_function_id:this.regulatory_function_id }
    // this.spinner.show();
    this.spinnerShow('Loading...........');
    this.configService.getPermitUniformApplicationProces(appprocess_data, 'getPermitUniformApplicationProces')
      .subscribe(
        data => {
          // this.spinner.hide();
          if (data.success) {
            this.processData = data.data.process_infor;
            console.log(this.processData)
            this.application_data = data.data;

            this.router_link = this.processData.router_link;
            this.productsapp_details = this.processData;
            let merged_appdata = Object.assign({}, this.application_data, app_data);
            localStorage.setItem('application_details', JSON.stringify(merged_appdata));
            this.app_route = ['./reports-analytics/' + this.router_link];

            this.router.navigate(this.app_route);
            this.scrollToTop();
            this.spinnerHide();
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
 
     this.reloadPermitApplicationsApplications();
 
 
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
   
   onCellPrepared(e) {
     this.utilityService.onCellPrepared(e);
   }
  
}
