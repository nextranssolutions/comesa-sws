import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ToastrService } from 'ngx-toastr';
import { ReportsService } from 'src/app/core-services/reports/reports.service';
import { ServiceAdmnistrationService } from 'src/app/core-services/system-admnistration/system-admnistration.service';
import { UtilityService } from 'src/app/core-services/utilities/utility.service';
import { WokflowManagementService } from 'src/app/core-services/workflow-management/wokflow-management.service';

@Component({
  selector: 'app-regulatory-function-guidelines',
  templateUrl: './regulatory-function-guidelines.component.html',
  styleUrl: './regulatory-function-guidelines.component.css'
})
export class RegulatoryFunctionGuidelinesComponent {
  table_name: string;
  parameter_name: string;
  guidelineDetails: any;
  show_advancesearch: boolean;
  data_record: any;
  response: any;
  hasReadpermissions: boolean;
  config_record: string;
  guidelinesFrm: FormGroup;
  enablePopupVisible: boolean;
  enabledisable_guideline: string;
  enabledisable_guidelinedescription: string;
  loadingVisible = false;
  guidelineDetailsVisible: boolean;
  spinnerMessage: string;
  resetcolumns:string;
  regFunctionsData: any;
  record_id: number;
  loading = false;
  statusOptions = [
    { value: true, text: 'Yes' },
    { value: false, text: 'No' },
  ];
  is_enabled: boolean;
  deletePopupVisible: boolean;
  actionsMenuItems = [
    {
      text: "Action",
      icon: 'menu',
      items: [
        { text: "Edit", action: 'edit_record', icon: 'fa fa-edit' },
        { text: "Delete", action: 'delete_record', icon: 'fa fa-trash' },
        { text: "Enable/Disable", action: 'enable_record', icon: 'fa fa-check' },

      ]
    }
  ];

  constructor(
   
      private router: Router,
      public workflowService: WokflowManagementService,
      private spinner: SpinnerVisibilityService,
      public utilityService: UtilityService,
      private reportingAnalytics: ReportsService,
      public toastr: ToastrService,
      private admnistrationService: ServiceAdmnistrationService,
  
    ) {
      this.table_name = 'sys_regulatoryfunction_guidelines';
      this.parameter_name = "regulatory_function_guidelines";
      this.guidelinesFrm = new FormGroup({
        id: new FormControl('', Validators.compose([])),
        name: new FormControl('', Validators.compose([])),
        guideline_descriptions: new FormControl('', Validators.compose([])),
        regulatory_function_id: new FormControl('', Validators.compose([])),
        links: new FormControl('', Validators.compose([])),
        is_enabled: new FormControl('', Validators.compose([])),
        document_path: new FormControl('', Validators.compose([])),
       
      });


    
    }
    ngOnInit() {
      this.fetchGuidelineDetails();
      this.onLoadRegulatoryFunctionsDetails();
    }



  fetchGuidelineDetails() {
    var data_submit = {
      'table_name': this.table_name,    
    }
    this.admnistrationService.onLoadSystemAdministrationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.guidelineDetails = this.data_record.data;
          }
        },
        error => { 
        });
  }
  onLoadRegulatoryFunctionsDetails() {
    var data_submit = {
      'table_name': 'par_regulatory_functions',    
    }
    this.admnistrationService.onLoadSystemAdministrationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.regFunctionsData = this.data_record.data;
          }
        },
        error => { 
        });
  }

  // onFuncSaveRecordData() {
  //   const formData = new FormData();
  //   const invalid = [];
  //   const controls = this.guidelinesFrm.controls;

    
  //   for (const name in controls) {
  //     if (controls[name].invalid) {
  //       this.toastr.error('Fill In All Mandatory fields with (*), missing value on ' + name.replace('_id', ''), 'Alert');
  //       return;
  //     }
  //   }
  //   if (this.guidelinesFrm.invalid) {
  //     return;
  //   }
  
  
  //   this.guidelinesFrm.get('resetcolumns')?.setValue(this.resetcolumns);
  //   this.guidelinesFrm.get('table_name')?.setValue(this.table_name);
  //   this.spinnerShow('Saving ' + this.parameter_name);
   
  //   this.spinner.show();
  //   this.admnistrationService.onSaveSystemAdministrationDetails(this.table_name, this.guidelinesFrm.value, 'onSaveRegulatoryFunctionGuidelines')
  //     .subscribe(
  //       response => {
  //         this.response = response;
  //         //the details 
  //         if (this.response.success) {
  
  //           this.fetchGuidelineDetails();
  //           this.toastr.success(this.response.message, 'Response');
  
  //           this.spinnerHide();
  //         } else {
  //           this.toastr.error(this.response.message, 'Alert');
  //           this.spinnerHide();
  //         }
  //         this.spinnerHide();
  //       },
  //       error => {
  //         this.toastr.error('Error Occurred', 'Alert');
  //         this.spinnerHide();
  //       });
  // }

  onFuncSaveRecordData() {
    const formData = new FormData();
    Object.keys(this.guidelinesFrm.controls).forEach(key => {
      formData.append(key, this.guidelinesFrm.get(key)?.value);
    });
    formData.append('table_name', this.table_name);
    formData.append('resetcolumns', this.resetcolumns);

    this.spinnerShow('Saving ' + this.parameter_name);
    this.admnistrationService.onSaveSystemAdministrationDetails(this.table_name, formData, 'onSaveRegulatoryFunctionGuidelines')
      .subscribe(
        response => {
          this.response = response;
          if (this.response.success) {
            this.fetchGuidelineDetails();
            this.guidelineDetailsVisible = false;
            this.record_id = this.response.record_id;
            this.guidelinesFrm.get('id')?.setValue(this.record_id);
            this.toastr.success(this.response.message, 'Response');
            this.spinnerHide();
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




  onFileSelected(event: any) {
    const file = event.file;  // DevExtreme specific
    if (file) {
      this.guidelinesFrm.patchValue({ document_path: file });
    } else {
      console.error('No file uploaded or file format is incorrect.');
    }
  }



  onAddGuideline(){
    this.guidelinesFrm.reset();
    this.guidelineDetailsVisible = true;
    this.guidelineDetails = [];
  }


  spinnerShow(spinnerMessage) {
    this.loadingVisible = true;
    this.spinnerMessage = spinnerMessage;
  }
  spinnerHide() {
    this.loadingVisible = false;
  }

   onCellPrepared(e) {
      this.utilityService.onCellCountriesPrepared(e);
    }
     onExporting(e: DxDataGridTypes.ExportingEvent) {
    
        if (e.format == 'pdf') {
          this.reportingAnalytics.onExportingPDF(e)
        }
        else {
          this.reportingAnalytics.onExportingExcelData(e)
        }
    
      }
      onAdvanceProductRegistrySearch(e){
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
    
      onActivatetheAdvanceSearch(e){
    
        this.show_advancesearch =  e.value;
    
    }

    funcEditDetails(data) {
      this.guidelinesFrm.patchValue(data.data);
      this.guidelineDetailsVisible = true;
      
    }
    funcDeleteDetails(data) {
      this.guidelinesFrm.patchValue(data.data);
      this.config_record = data.data.name;
      this.deletePopupVisible = true;
    }
    funcEnableDisableRecord(data) {
      this.guidelinesFrm.patchValue(data.data);
   
      this.config_record = data.data.name;
      this.is_enabled = data.data.is_enabled;
      // console.log(this.is_enabled)
      if (this.is_enabled) {
        this.enabledisable_guideline = "disable_guideline";
        this.enabledisable_guidelinedescription = "are_you_sure_you_want_to_disable_guideline";
  
      }
      else {
        this.enabledisable_guideline = "enable_guideline";
        this.enabledisable_guidelinedescription = "are_you_sure_you_want_to_enable_guideline";
      }
  
      this.enablePopupVisible = true;
    }

    funcActionColClick(e, data) {
      var action_btn = e.itemData;
      if (action_btn.action === 'edit_record') {
        this.funcEditDetails(data);
      } else if (action_btn.action === 'delete_record') {
        this.funcDeleteDetails(data);
      }else if (action_btn.action === 'enable_record') {
        this.funcEnableDisableRecord(data);
      }
      
    }

    funcpopWidth(percentage_width) {
      return window.innerWidth * percentage_width / 100;
    }
    funcpopHeight(percentage_height) {
      return window.innerHeight * percentage_height / 100;
    }

    iniateEnableDisableRecord() {
 
      this.spinnerShow('Saving_details');
      this.guidelinesFrm.get('table_name')?.setValue('wf_workflows');
      this.workflowService.onEnableWorkflowDetails(this.guidelinesFrm.value, this.table_name, this.parameter_name)
        .subscribe(
          response => {
            this.spinner.hide();
            this.response = response;
            if (this.response.success) {
              this.fetchGuidelineDetails();
              this.enablePopupVisible = false;
              this.toastr.success(this.response.message, 'Response');
              // this.deletePopupVisible = false;
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
    onDeleteWorkflowDetails() {
      this.spinnerShow('deleting ' + this.parameter_name);
    
      this.workflowService.onDeleteWorkflowsDetails(this.guidelinesFrm.value, this.table_name, this.parameter_name)
        .subscribe(
          response => {
    
            this.response = response;
            if (this.response.success) {
              this.fetchGuidelineDetails();
              this.toastr.success(this.response.message, 'Response');
              this.deletePopupVisible = false;
            }
            else {
    
              this.toastr.success(this.response.message, 'Response');
    
            } this.spinnerHide();
    
          },
          error => {
            this.loading = false;
          });
    
    }
    
}
