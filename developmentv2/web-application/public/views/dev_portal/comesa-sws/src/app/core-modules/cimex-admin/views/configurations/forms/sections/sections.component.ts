import { Component, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ToastrService } from 'ngx-toastr';
import { ConfigurationsService } from 'src/app/core-services/configurations/configurations.service';
import { ReportsService } from 'src/app/core-services/reports/reports.service';
import { UtilityService } from 'src/app/core-services/utilities/utility.service';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrl: './sections.component.css'
})
export class SectionsComponent {
  table_name: string;
   parameter_name: string;
   hasReadpermissions: boolean;
   createNewDataFrm: FormGroup;
   onAddNewConfiVisible: boolean;
   NewConfigData: any[] = [];
   regFunctionData: any[] = [];
   regSubFunctionData: any[] = [];
   regSubFunctionDetailsData: any;
   productTypesData: any[] = [];
   show_advancesearch: boolean;
   isnewprocess: boolean;
   config_record: string;
   deletePopupVisible = false;
   is_enabled: boolean;
  
   enablePopupVisible: boolean;
   data_record: any;
   loadingVisible: boolean;
   spinnerMessage: string;
   enabledisable_appsection: string;
   enabledisable_appsectiondescription: string;
   response: any;
   regStatusOptions = [
     { value: true, text: 'Yes' },
     { value: false, text: 'No' },
   ];
 
   loading = false;
 
   actionsMenuItems = [
     {
       text: "Action",
       icon: 'menu',
       items: [
         //  { text: "View", action: 'view_record', icon: 'fa fa-eye' },
         { text: "Edit", action: 'edit_record', icon: 'fa fa-edit' },
         { text: "Delete", action: 'delete_record', icon: 'fa fa-trash' },
         { text: "enable/disable", action: 'enable_record', icon: 'fa fa-check' }
       ]
     }
   ];
 
 
   constructor(
     private spinner: SpinnerVisibilityService,
     private router: Router,
     public toastr: ToastrService,
     public viewRef: ViewContainerRef,
     public translate: TranslateService,
     public utilityService: UtilityService,
     public modalService: NgxSmartModalService,
     public reportingAnalytics: ReportsService,
     public configService: ConfigurationsService,
   ) {
 
    
      this.table_name = 'par_application_sections';
      this.parameter_name = "application_section";
    
       this.createNewDataFrm = new FormGroup({
         id: new FormControl('', Validators.compose([])),
         name: new FormControl('', Validators.compose([Validators.required])),
         description: new FormControl('', Validators.compose([Validators.required])),
         is_enabled: new FormControl('', Validators.compose([])),
         regulatory_function_id: new FormControl('', Validators.compose([])),
         regulatory_subfunction_id: new FormControl('', Validators.compose([])),
         product_type_id: new FormControl('', Validators.compose([])),
         application_section: new FormControl('', Validators.compose([])),
         is_active: new FormControl('', Validators.compose([])),
         code: new FormControl('', Validators.compose([])),
         
       });
     
   
 
   }
 
   ngOnInit() {
  
     this.fetchRegFunctionData();
     this.fetchNewConfigurations();
    this.fetchRegSubFunctionDetailsData();
     this.fetchProductTypesData();
    
   
     }
 
     spinnerShow(spinnerMessage) {
       this.loadingVisible = true;
       this.spinnerMessage = spinnerMessage;
     }
     spinnerHide() {
       this.loadingVisible = false;
     }
   
   resetcolumns(resetcolumns: any) {
     throw new Error('Method not implemented.');
   }
 
   onCellPrepared(e) {
     this.utilityService.onCellCountriesPrepared(e);
   }
 
   onAddNewConfig() {
     this.createNewDataFrm.reset();
     this.onAddNewConfiVisible = true;
   }
 
   fetchNewConfigurations() {
     this.spinnerShow('Loading...........');
     var data_submit = {
       'table_name': this.table_name
     }
     this.configService.onLoadConfigurationData(data_submit)
       .subscribe(
         data => {
           this.data_record = data;
           if (this.data_record.success) {
             // this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
             this.NewConfigData = this.data_record.data;
           }
           this.spinnerHide();
         },
         error => {
           this.spinnerHide();
         });
   }
   onFuncSaveNewConfigData() {
 
     const formData = new FormData();
     const invalid = [];
     const controls = this.createNewDataFrm.controls;
     for (const name in controls) {
       if (controls[name].invalid) {
         this.toastr.error('Fill In All Mandatory fields with (*), missing value on ' + name.replace('_id', ''), 'Alert');
         return;
       }
     }
     if (this.createNewDataFrm.invalid) {
       return;
     }
     this.spinnerShow('saving ' + this.parameter_name);
     this.configService.onSaveConfigurationDetailsDetails(this.table_name, this.createNewDataFrm.value, 'onsaveConfigData')
       .subscribe(
         response => {
           this.response = response;
           //the details 
           if (this.response.success) {
             this. fetchNewConfigurations();
             this.onAddNewConfiVisible = false;
             this.toastr.success(this.response.message, 'Response');
 
           } else {
             this.toastr.error(this.response.message, 'Alert');
           }
           this.spinnerHide();
         },
         error => {
           this.toastr.error('Error Occurred', 'Alert');
           this.spinnerHide();
         });
   }
 
   

 
   fetchRegFunctionData() {
 
     var data_submit = {
       'table_name': 'par_regulatory_functions'
     }
     this.configService.onLoadConfigurationData(data_submit)
       .subscribe(
         data => {
           this.data_record = data;
           if (this.data_record.success) {
             this.regFunctionData = this.data_record.data
           }
         },
         error => {
 
         });
 
   }
   fetchRegSubFunctionDetailsData() {
 
    var data_submit = {
      'table_name': 'par_regulatory_subfunctions',
      
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.regSubFunctionDetailsData = this.data_record.data
          }
        },
        error => {

        });

  }
 
   fetchRegSubFunctionData(regulatory_function_id) {
 
     var data_submit = {
       'table_name': 'par_regulatory_subfunctions',
       regulatory_function_id: regulatory_function_id
     }
     this.configService.onLoadConfigurationData(data_submit)
       .subscribe(
         data => {
           this.data_record = data;
           if (this.data_record.success) {
             this.regSubFunctionData = this.data_record.data
           }
         },
         error => {
 
         });
 
   }
   onRegulatoryFunctionChange($event) {
    if ($event.selectedItem) {
      let regulatory_function = $event.selectedItem;
      this.fetchRegSubFunctionData(regulatory_function.id)
    }
  }
   fetchProductTypesData() {
 
     var data_submit = {
       'table_name': 'par_regulated_productstypes'
     }
     this.configService.onLoadConfigurationData(data_submit)
       .subscribe(
         data => {
           this.data_record = data;
           if (this.data_record.success) {
             this.productTypesData = this.data_record.data
           }
         },
         error => {
 
         });
 
   }
    
   funcpopWidth(percentage_width) {
     return window.innerWidth * percentage_width / 100;
   }
 
   funcpopHeight(percentage_height) {
     return window.innerHeight * percentage_height / 100;
   }
   finishFunction() {
 
   }
 
   funcEditDetails(data) {
     this.createNewDataFrm.patchValue(data.data);
     this.onAddNewConfiVisible = true;
   }
   funcDeleteDetails(data) {
     this.createNewDataFrm.patchValue(data.data);
     this.config_record = data.data.name;
     this.deletePopupVisible = true;
   }
 
   funcEnableDisableRecord(data) {
     this.createNewDataFrm.patchValue(data.data);
 
     this.config_record = data.data.name;
     this.is_enabled = data.data.is_enabled;
     if (this.is_enabled) {
       this.enabledisable_appsection = "disable_application_section";
       this.enabledisable_appsectiondescription = "are_you_sure_you_want_to_disable_application_section";
 
     }
     else {
       this.enabledisable_appsection = "enable_application_section";
       this.enabledisable_appsectiondescription = "are_you_sure_you_want_to_enable_application_section";
     }
 
     this.enablePopupVisible = true;
   }
   funcActionColClick(e, data) {
     var action_btn = e.itemData;
     if (action_btn.action === 'edit_record') {
       this.funcEditDetails(data);
     } else if (action_btn.action === 'delete_record') {
       this.funcDeleteDetails(data);
     } else if (action_btn.action === 'enable_record') {
       this.funcEnableDisableRecord(data);
     } else if (action_btn.action === 'block_record') {
       this.funcDeleteDetails(data);
     }
   }
 
   iniateEnableDisableRecord() {
 
     this.spinnerShow('Saving_details');
     this.configService.onEnableConfigurationsDetails(this.createNewDataFrm.value, this.table_name, this.parameter_name)
       .subscribe(
         response => {
           this.spinner.hide();
           this.response = response;
           if (this.response.success) {
             this.fetchNewConfigurations();
             this.enablePopupVisible = false;
             this.toastr.success(this.response.message, 'Response');
             this.deletePopupVisible = false;
           }
           else {
             this.toastr.success(this.response.message, 'Response');
           }
           this.spinnerHide();
         },
         error => {
           this.loading = false;
           this.spinnerHide();
         });
   }
 
   
   onAdvanceProductRegistrySearch(e) {
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
 
   onDeleteConfigurationsDetails() {
     this.spinnerShow('deleting ' + this.parameter_name);
     this.configService.onDeleteConfigurationsDetails(this.createNewDataFrm.value, this.table_name, this.parameter_name)
       .subscribe(
         response => {
           this.spinner.hide();
           this.response = response;
           if (this.response.success) {
             this.fetchNewConfigurations();
             this.toastr.success(this.response.message, 'Response');
             this.deletePopupVisible = false;
           }
           else {
 
             this.toastr.success(this.response.message, 'Response');
 
           }
           this.spinnerHide();
 
         },
         error => {
           this.loading = false;
           this.spinnerHide();
         });
 
   }
 
 
 
     onExporting(e: DxDataGridTypes.ExportingEvent) {
   
       if (e.format == 'pdf') {
         this.reportingAnalytics.onExportingPDF(e)
       }
       else {
         this.reportingAnalytics.onExportingExcelData(e)
       }
     }
}
