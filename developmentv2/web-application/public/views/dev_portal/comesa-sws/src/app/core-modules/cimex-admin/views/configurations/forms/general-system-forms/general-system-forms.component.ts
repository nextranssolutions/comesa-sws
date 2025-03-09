import { Component, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ToastrService } from 'ngx-toastr';
import { ConfigurationsService } from 'src/app/core-services/configurations/configurations.service';
import { EncryptionService } from 'src/app/core-services/encryption/encryption.service';
import { ReportsService } from 'src/app/core-services/reports/reports.service';
import { UtilityService } from 'src/app/core-services/utilities/utility.service';

@Component({
  selector: 'app-general-system-forms',
  templateUrl: './general-system-forms.component.html',
  styleUrl: './general-system-forms.component.css'
})
export class GeneralSystemFormsComponent {
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
     formTypeData: any;

     isConfigureApplicationFormFields: boolean;
     applicationFormFieldsData: any;
     formfieldConfigurationData: any;
     onaddApplicationFormFieldsWin: boolean;
     systemFormFieldsFrm: FormGroup;
     systemforms_configuration_id: number;
     decryptedPayload: any;
    //  regulatory_function_id: number;


    
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
     enable_disableOptions = [
      { value: true, text: 'Yes', data_value: 1 },
      { value: false, text: 'No', data_value: 0 },
    ];
   
     loading = false;
   
     actionsMenuItems = [
       {
         text: "Action",
         icon: 'menu',
         items: [
           { text: "Configure Fields", action: 'configure_fields', icon: 'fa fa-plus' },
           { text: "Edit", action: 'edit_record', icon: 'fa fa-edit' },
           { text: "Delete", action: 'delete_record', icon: 'fa fa-trash' },
           { text: "enable/disable", action: 'enable_record', icon: 'fa fa-check' }
         ]
       }
     ];
     actionsFormFieldMenuItems = [
      {
        text: "Action",
        icon: 'menu',
        items: [
          { text: "Edit", action: 'edit_record', icon: 'fa fa-edit' }
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
       public reportingAnalytics: ReportsService,
       public configService: ConfigurationsService,
       public encryptionService: EncryptionService
     ) {
   
      
        this.table_name = 'par_systemgeneral_forms';
        this.parameter_name = "general_system_forms";
      
         this.createNewDataFrm = new FormGroup({
           id: new FormControl('', Validators.compose([])),
           name: new FormControl('', Validators.compose([Validators.required])),
           description: new FormControl('', Validators.compose([Validators.required])),
           is_enabled: new FormControl('', Validators.compose([])),
           form_type_id: new FormControl('', Validators.compose([])),
           code: new FormControl('', Validators.compose([])),
           
         });
         this.systemFormFieldsFrm = new FormGroup({
          id: new FormControl('', Validators.compose([])),
          formfield_configuration_id: new FormControl('', Validators.compose([Validators.required])),
          systemforms_configuration_id: new FormControl('', Validators.compose([Validators.required])),
          is_mandatory: new FormControl('', Validators.compose([Validators.required])),
          is_hidden: new FormControl('', Validators.compose([Validators.required])),
          is_readonly: new FormControl('', Validators.compose([Validators.required])),
          order_no: new FormControl('', Validators.compose([Validators.required])),
          description: new FormControl('', Validators.compose([])),
          default_value: new FormControl('', Validators.compose([])),
          is_enabled: new FormControl('', Validators.compose([Validators.required])),
        });
       
     
   
     }
   
     ngOnInit() {
    
       this.fetchRegFunctionData();
       this.fetchNewConfigurations();
      this.fetchRegSubFunctionDetailsData();
       this.fetchProductTypesData();
      this.fetchFormTypeData();
      // this.onloadformfieldConfigurationData();
     
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
    fetchFormTypeData() {
   
      var data_submit = {
        'table_name': 'par_form_types',
        
      }
      this.configService.onLoadConfigurationData(data_submit)
        .subscribe(
          data => {
            this.data_record = data;
            if (this.data_record.success) {
              this.formTypeData = this.data_record.data
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
     onloadformfieldConfigurationData() {

      var data_submit = {
        'table_name': 'par_formfield_configuration',
        // 'regulatory_function_id': regulatory_function_id,
      }
      this.configService.onLoadConfigurationData(data_submit)
        .subscribe(
          data => {
            this.data_record = data;
            if (this.data_record.success) {
              // this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
              this.formfieldConfigurationData = this.data_record.data;
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
       } else if (action_btn.action === 'configure_fields') {
        this.funcConfigureFields(data.data);
      }
     }
     funcActionFormFieldColClick(e, data) {
      var action_btn = e.itemData;
      if (action_btn.action === 'edit_record') {
        this.funcFormFieldEditDetails(data);
      }
      else if (action_btn.action === 'enable_record') {
        this.funcEnableDisableRecord(data);
      }
  
    }
    funcFormFieldEditDetails(data) {
      this.systemFormFieldsFrm.patchValue(data.data);
      this.onaddApplicationFormFieldsWin = true;
    }

     funcConfigureFields(data) {
      this.isConfigureApplicationFormFields = true;
      this.systemforms_configuration_id = data.id;
      // this.regulatory_function_id = data.regulatory_function_id;
  
      this.onloadformfieldConfigurationData();
      this.onGetApplicationFormFields();
  
    }

    OnAddapplicationFormFields() {
      this.systemFormFieldsFrm.reset();
      this.onaddApplicationFormFieldsWin = true;
      this.systemFormFieldsFrm.get('systemforms_configuration_id')?.setValue(this.systemforms_configuration_id)
  
    }
    onGetApplicationFormFields() {
      this.spinnerShow('Loading...........');
      var data_submit = {
        'table_name': 'par_systemgeneral_forms_fields',
        systemforms_configuration_id: this.systemforms_configuration_id
      }
      this.configService.onLoadConfigurationData(data_submit)
        .subscribe(
          data => {
            this.data_record = data;
            if (this.data_record.success) {
              this.decryptedPayload = this.encryptionService.OnDecryptData(this.data_record.data);
              this.applicationFormFieldsData = this.data_record.data;
            }
            this.spinnerHide();
          },
          error => {
            this.spinnerHide();
          });
    }
    onFuncSaveApplicationFormFieldData() {
      const formData = new FormData();
      const invalid = [];
      const controls = this.systemFormFieldsFrm.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          this.toastr.error('Fill In All Mandatory fields with (*), missing value on ' + name.replace('_id', ''), 'Alert');
          return;
        }
      }
      if (this.systemFormFieldsFrm.invalid) {
        return;
      }
  
      this.spinnerShow('saving applicationform fields');
      this.configService.onSaveConfigurationDetailsDetails('par_systemgeneral_forms_fields', this.systemFormFieldsFrm.value, 'onsaveConfigData')
        .subscribe(
          response => {
            this.response = response;
            //the details 
            if (this.response.success) {
              this.onGetApplicationFormFields();
  
              this.onaddApplicationFormFieldsWin = false;
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
