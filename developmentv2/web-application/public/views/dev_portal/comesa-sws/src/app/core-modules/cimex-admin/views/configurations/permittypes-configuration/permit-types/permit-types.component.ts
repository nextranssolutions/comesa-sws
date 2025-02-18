import { Component, HostListener, Input, OnInit, ViewContainerRef} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import { DxTabPanelTypes } from 'devextreme-angular/ui/tab-panel';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ToastrService } from 'ngx-toastr';
import { AppmenuService, Change } from 'src/app/core-services/appmenu.service';
import { ConfigurationsService } from 'src/app/core-services/configurations/configurations.service';
import { ReportsService } from 'src/app/core-services/reports/reports.service';
import { ServiceAdmnistrationService } from 'src/app/core-services/system-admnistration/system-admnistration.service';
import { UtilityService } from 'src/app/core-services/utilities/utility.service';
import { WokflowManagementService } from 'src/app/core-services/workflow-management/wokflow-management.service';


@Component({
  selector: 'app-permit-types',
  templateUrl: './permit-types.component.html',
  styleUrl: './permit-types.component.css'
})
export class PermitTypesComponent implements OnInit {
  table_name:string = 'tra_transactionpermit_types';
  parameter_name:string = 'transaction_permit_types';
  resetcolumns = 'resetcolumns,routerLink';
   workflowPermissionData:any;
   iconPosition:any='top';
   regStatusOptions = [
     { value: true, text: 'Yes' },
     { value: false, text: 'No' },
   ];
   permit_type_id:number;
   account_type_id: number;
   data: any[];
   editRowKey: any;
   editColumnName: any;
   changes: Array<any>;
   workflowData:any;
   workflowStageData:any;
   operationTypeData: any;
   productTypeData: any;
   permitTypeData: any;
   organizationData: any;
   processData: any;
   navigationTypesData:any;
   regulatoryFunctionData: any;
   createNewDataFrm: FormGroup;
   isnewrecord: boolean;
   submitted = false;
   loading = false;
   hasReadpermissions: boolean;
   show_advancesearch: boolean;
   data_value: string;
   response: any;
   showTabPanel: boolean = false;
   tabPanelPopupVisible: boolean = false;
   showWizard = false; 
   createdResponsePopupVisible = false;
   editedResponsePopupVisible = false;
   deletedResponsePopupVisible = false;
   hideAnimation: any;
   showAnimation: any;
   record_id:number;
   addPopupVisible = false;
   deletePopupVisible = false;
   data_record: any;
   config_record:string;
   isLoading:boolean;
   sysadmin: any;
   AppNavigationMenus:any;
   updateUsrPermissNewDataFrm:FormGroup;
   AppHsCodes: any;
   actionsMenuItems = [
     {
       text: "Action",
       icon: 'menu',
       items: [
       //  { text: "View", action: 'view_record', icon: 'fa fa-eye' },
         { text: "Edit Permit Type", action: 'edit_record', icon: 'fa fa-edit' },
         { text: "Delete", action: 'delete_record', icon: 'fa fa-trash' }
       ]
     }
   ];
 
   allinstutitionTypesData:any;
   tabsPositions: DxTabPanelTypes.Position[] = [
     'left', 'top', 'right', 'bottom',
   ];
   tabsPosition: DxTabPanelTypes.Position = this.tabsPositions[1];
   stylingModes: DxTabPanelTypes.TabsStyle[] = ['primary', 'secondary'];
   stylingMode: DxTabPanelTypes.TabsStyle = this.stylingModes[0];
   screenWidth: any;
 
   
   loadingVisible: boolean;
   spinnerMessage: string;
   updateuserPermissionfrm: any;
   navigations: any[] = [];
   organisationData: any[] = [];
   dashboardTypeData:any;
   accountTypesData:any;
   instutitionTypesData:any;
   partnerStateOptions = [
     { value: true, text: 'True' },
     { value: false, text: 'False' },
   ];
   selectedTabIndex = 0;
   selectTextOnEditStart:boolean;
   startEditAction:boolean;
   tabNames = ["PermitTypes","OrganizationInformation","HsCodes"]
   constructor(
     
     private router: Router,
     public toastr: ToastrService,
     public viewRef: ViewContainerRef,
     public utilityService: UtilityService,
      
     private admnistrationService: ServiceAdmnistrationService,
     private userGroupsService: AppmenuService,
     private workflowService:WokflowManagementService,
     private reportingAnalytics: ReportsService
   ) {
 
     this.createNewDataFrm = new FormGroup({
       id: new FormControl('', Validators.compose([])),
       name: new FormControl('', Validators.compose([])),
       description: new FormControl('', Validators.compose([])),
       code: new FormControl('', Validators.compose([])),
       resetcolumns: new FormControl(this.resetcolumns, Validators.compose([])),
       organization_id: new FormControl(this.resetcolumns, Validators.compose([])),
       regulated_producttype_id: new FormControl(this.resetcolumns, Validators.compose([])),
       operation_type_id: new FormControl(this.resetcolumns, Validators.compose([])),
       process_id: new FormControl(this.resetcolumns, Validators.compose([])),
       physical_address: new FormControl(this.resetcolumns, Validators.compose([])),
       workflow_id: new FormControl('', Validators.compose([])),
       permit_type_id:  new FormControl('', Validators.compose([]))
 
     });

  
    // this.resetcolumns = 'resetcolumns,account_type_id,routerLink,has_partnerstate_defination';
     
   }
 ngOnInit() {
   this.fetchSysAdminDetails();
   this.onLoadOperationTypeData();
   this.onLoadPermitTypeData();
   this.onLoadproductTypeData();
   this.onLoadOrganizationData();
   this.onLoadProcessData();
   this.spinnerShow('Loading '+this.parameter_name);
   this.spinnerHide();
   this.checkScreenSize();
   this.onLoadWorkflowData();
   this.fetchAppHsCodes(this.permit_type_id);

 
 }
 @HostListener('window:resize', ['$event'])
 onResize(event: Event): void {
   this.screenWidth = window.innerWidth;
   this.checkScreenSize();
 }
 
 checkScreenSize(): void {
   if (this.screenWidth < 768) {
     this.tabsPosition = 'top';
   } else {
     this.tabsPosition = 'top';
   }
 }
 
 onAccountTypeSelection($event){
   if ($event.selectedItem) {
     let data = $event.selectedItem;
    
   }
 }
 funcUserRolesTabClick(e){
  
   let tab_index = e.itemIndex;
   
   if(tab_index ==1 || tab_index ==2){
     let permittype_id = this.createNewDataFrm.get('id')?.value;
 
     if(permittype_id < 1){
     
         this.selectedTabIndex = 0;
         this.toastr.error('Kindly save the Permit Type Details Before before moving to the next step.', 'Response');
     }
   }
 }
 
 onSavingRegulatoryFunctionPermissions(e){
 let permit_type_id = this.createNewDataFrm.get('id')?.value;
 
 this.changes = [];
 let access_changes = e.changes;
 for (let rec of access_changes) {
     let data_changeobj = {
           regulatory_function_id: rec.key,
   
     };
 
     this.changes.push(data_changeobj);
 }
  
 if(this.changes){
   let post_data = JSON.stringify(this.changes);
   this.spinnerShow('Saving '+this.parameter_name);
   
   this.admnistrationService.onSavingUserNavigationPermissions('par_regulatoryfunctionaccess_groups', this.createNewDataFrm.value, post_data,'onSavingRegulatoryFunctionPermissions')
     .subscribe(
       response => {
         this.response = response;
         //the details 
         if (this.response.success) {
           this.fetchAppNavigationMenus(permit_type_id, this.account_type_id);
           this.fetchAppHsCodes(permit_type_id);
           
          //  this.fetchWorkflowPermissionData(permit_type_id) 
           this.toastr.success(this.response.message, 'Response');
           this.spinnerHide();
 
         } else {
           this.toastr.error(this.response.message, 'Alert');
         }
         // 
         this.spinnerHide();
       },
       error => {
         this.toastr.error('Error Occurred', 'Alert');
         // 
         this.spinnerHide();
       });
 }
 }
 
 
 onSavingUserWorkflowPermissions(e) {
   // apply changes to local data
   let user_group_id = this.createNewDataFrm.get('id')?.value;
   this.changes = [];
   let access_changes = e.changes;
   for (let rec of access_changes) {
 
       let data_changeobj = {
             workflow_stage_id: rec.key,
             user_group_id:user_group_id,
             user_access_levels_id : rec.data.user_access_levels_id
       };
       this.changes.push(data_changeobj);
   }
   //call to the back end 
   if(this.changes){
     let post_data = JSON.stringify(this.changes);
     this.spinnerShow('Saving '+this.parameter_name);
     
     this.admnistrationService.onSavingUserNavigationPermissions('sys_user_workflowstagepermissions', this.createNewDataFrm.value, post_data,'onSavingUserWorkflowPermissions')
       .subscribe(
         response => {
           this.response = response;
           //the details 
           if (this.response.success) {
             this.fetchAppNavigationMenus(user_group_id, this.account_type_id);
            this.fetchAppHsCodes(user_group_id);
            //  this.fetchWorkflowPermissionData(user_group_id); 
             this.toastr.success(this.response.message, 'Response');
             this.spinnerHide();
   
           } else {
             this.toastr.error(this.response.message, 'Alert');
           }
           // 
           this.spinnerHide();
         },
         error => {
           this.toastr.error('Error Occurred', 'Alert');
           // 
           this.spinnerHide();
         });
   }
 
 }
 
 onNextNavigationItems(nextStep){
   this.selectedTabIndex = this.tabNames.indexOf(nextStep);
 }
 
 onLoadWorkflowData(){
 
   var data_submit = {
     'table_name': 'wf_workflows'
   }
   this.admnistrationService.onLoadSystemAdministrationData(data_submit)
     .subscribe(
       data => {
         this.data_record = data;
         
         if (this.data_record.success) {
           this.workflowData = this.data_record.data;
         }
 
       },
       error => {
         
       });
 
 }
 
 spinnerShow(spinnerMessage){
   this.loadingVisible = true;
   this.spinnerMessage = spinnerMessage;
 }
 spinnerHide(){
   this.loadingVisible = false;
 }
 fetchSysAdminDetails() {
 
   var data_submit = {
     'table_name': this.table_name
   }
   this.admnistrationService.onLoadSystemAdministrationData(data_submit)
     .subscribe(
       data => {
         this.data_record = data;
         if (this.data_record.success) {
           this.sysadmin = this.data_record.data;
         }
 
       },
       error => {
         
       });
 
 }
 
 
 
 onFuncSaveRecordData() {
 
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
   this.createNewDataFrm.get('resetcolumns')?.setValue(this.resetcolumns);
 
   this.spinnerShow('Saving '+this.parameter_name);
   
   this.admnistrationService.onSaveSystemAdministrationDetails(this.table_name, this.createNewDataFrm.value, 'onsaveSysAdminData')
     .subscribe(
       response => {
         this.response = response;
        
         if (this.response.success) {
 
             this.fetchSysAdminDetails();
             this.isnewrecord = false;
             this.permit_type_id = this.response.record_id;
             
             this.createNewDataFrm.get('id')?.setValue(this.permit_type_id);
           
             this.selectedTabIndex = 1;
             this.toastr.success(this.response.message, 'Response');
             this.spinnerHide();
 
         } else {
           this.toastr.error(this.response.message, 'Alert');
         }
         
         this.spinnerHide();
       },
       error => {
         this.toastr.error('Error Occurred', 'Alert');
         // 
         this.spinnerHide();
       });
 }
 
 funcpopWidth(percentage_width) {
   return window.innerWidth * percentage_width / 100;
 } 
 funcpopHeight(percentage_height) {
   return window.innerHeight * percentage_height/100;
 }
 finishFunction() {
 
 }
 
 onPopupHidden() {
   this.fetchSysAdminDetails();
 }
 
 funcEditDetails(data) {
   this.createNewDataFrm.patchValue(data.data);
  
   this.permit_type_id = data.data.id;
   this.account_type_id = data.data.account_type_id;
   this.fetchAppNavigationMenus(data.data.id, this.account_type_id);
   this.fetchAppHsCodes(data.data.id);
  //  this.fetchWorkflowPermissionData(data.data.id) 
 }
 funcEditPermissionDetails(data) {
   this.createNewDataFrm.patchValue(data.data);
   
   this.permit_type_id = data.data.id;
   this.fetchAppNavigationMenus(data.data.id, this.account_type_id)
  //  this.fetchWorkflowPermissionData(data.data.id) 
   this.fetchAppHsCodes(data.data.id)
 }
 onAddNewRecord() {
 
   this.createNewDataFrm.reset();
   this.tabPanelPopupVisible = true;
   this.AppNavigationMenus = []; 
 
 }
 fetchAppNavigationMenus(user_group_id, account_type_id) {
   this.spinnerShow('Loading User Permissions Details');
   this.admnistrationService.getAppUserGroupNavigationMenus(user_group_id, account_type_id)
   .subscribe(
     (data) => {
       
       this.AppNavigationMenus = data; 
       this.spinnerHide();
       this.tabPanelPopupVisible = true;
     },
     (error) => {
       console.error('Error fetching Navigation menu:', error);
       this.spinnerHide();
     }
   );
 
 }
 
 fetchAppHsCodes(permit_type_id) {
   this.spinnerShow('Loading User Permissions Details');
   this.admnistrationService.getAppHsCodes(this.permit_type_id)
   .subscribe(
     data => {
       this.data_record = data;
       console.log(this.data_record)
       if (this.data_record.success) {
         this.AppHsCodes = this.data_record.data;
       }
     });
     this.spinnerHide();
 
 }
 fetchWorkflowPermissionData(user_group_id) {
   this.spinnerShow('Loading User Workflow Details');
   this.admnistrationService.getAppUserGroupWorkflowPermission(user_group_id).subscribe(
     (data) => {
       this.workflowPermissionData = data.data; 
       this.spinnerHide();
      // this.tabPanelPopupVisible = true;
     },
     (error) => {
       console.error('Error fetching Navigation menu:', error);
       this.spinnerHide();
     }
   );
 }
 
 funcDeleteDetails(data) {
   this.createNewDataFrm.patchValue(data.data);
   this.config_record = data.data.name;
   this.deletePopupVisible = true;
 }
 
 funcActionColClick(e, data) {
   var action_btn = e.itemData;
   if (action_btn.action === 'edit_record') {
     this.funcEditDetails(data);
   } else if (action_btn.action === 'delete_record') {
     this.funcDeleteDetails(data);
   } else if (action_btn.action === 'block_record') {
     this.funcDeleteDetails(data);
   } else if (action_btn.action === 'user_permissions') {
     this.funcEditPermissionDetails(data);
   }
 }
 onCellPrepared(e) {
   this.utilityService.onCellCountriesPrepared(e);
 }
 

 onLoadOperationTypeData(){
  var data_submit = {
    'table_name': 'par_operation_type'
  }
  this.workflowService.getWorkflowConfigs(data_submit)
    .subscribe(
      data => {
        this.data_record = data;
        if (this.data_record.success) {
          this.operationTypeData = this.data_record.data;
          
        }
      },
      error => {
        
      });
}
 onLoadproductTypeData(){
   var data_submit = {
     'table_name': 'par_regulated_productstypes'
   }
   this.workflowService.getWorkflowConfigs(data_submit)
     .subscribe(
       data => {
         this.data_record = data;
         if (this.data_record.success) {
           this.productTypeData = this.data_record.data;
           
         }
       },
       error => {
         
       });
 }

 onLoadPermitTypeData(){
  var data_submit = {
    'table_name': 'tra_transactionpermit_types'
  }
  this.workflowService.getWorkflowConfigs(data_submit)
    .subscribe(
      data => {
        this.data_record = data;
        if (this.data_record.success) {
          this.permitTypeData = this.data_record.data;
          
        }
      },
      error => {
        
      });
}
onLoadOrganizationData(){
  var data_submit = {
    'table_name': 'tra_organisation_information'
  }
  this.workflowService.getWorkflowConfigs(data_submit)
    .subscribe(
      data => {
        this.data_record = data;
        if (this.data_record.success) {
          this.organizationData = this.data_record.data;
          
        }
      },
      error => {
        
      });
}

onLoadProcessData(){
  var data_submit = {
    'table_name': 'wf_processes'
  }
  this.workflowService.getWorkflowConfigs(data_submit)
    .subscribe(
      data => {
        this.data_record = data;
        if (this.data_record.success) {
          this.processData = this.data_record.data;
          
        }
      },
      error => {
        
      });
}
 onUpdateUserPermissionSubmit() {

   this.showWizard = true;
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
 
editorPreparing(e) {
   if (e.dataField === 'Head_ID' && e.row.data.ID === 1) {
     e.cancel = true;
   }
 }
 
 onRolesCellPrepared(e) {
   this.onCellUserAccountPrepared(e);
 }
 onCellUserAccountPrepared(e) {
   if (e.rowType === "data" && e.column.dataField === "user_access_levels_id") {
     let user_access_levels_id = e.data.user_access_levels_id;
 
     if (user_access_levels_id == 1) {
 
       e.cellElement.style.color = 'white';
       e.cellElement.style.backgroundColor = '#2e2e2e';
 
     }else   if (user_access_levels_id == 2) {
 
       e.cellElement.style.color = 'white';
       e.cellElement.style.backgroundColor = '#0000FF';
 
     } else   if (user_access_levels_id == 4) {
 
       e.cellElement.style.color = 'white';
       e.cellElement.style.backgroundColor = '#50c878';
 
     }  else {
 
       e.cellElement.style.color = 'white';
 
     }
   }
 }
 onDeleteSystemAdministrationDetails() {
   
   this.admnistrationService.onDeleteSystemAdministrationDetails(this.createNewDataFrm.value, this.table_name, this.parameter_name)
     .subscribe(
       response => {
         
         this.response  = response;
         if (this.response.success) {
           this.fetchSysAdminDetails();
           this.deletePopupVisible = false;
           this.toastr.success(this.response.message, 'Response');
         }
         else {
 
           this.toastr.error(this.response.message, 'Response');
 
         }
 
       },
       error => {
         this.loading = false;
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

