import { Component, HostListener } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import { DxTabPanelTypes } from 'devextreme-angular/ui/tab-panel';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ToastrService } from 'ngx-toastr';
import { ReportsService } from 'src/app/core-services/reports/reports.service';
import { UtilityService } from 'src/app/core-services/utilities/utility.service';
import { WokflowManagementService } from 'src/app/core-services/workflow-management/wokflow-management.service';


@Component({
  selector: 'app-process-workflows',
  templateUrl: './process-workflows.component.html',
  styleUrl: './process-workflows.component.css'
})
export class ProcessWorkflowsComponent {
  table_name: string;
  parameter_name: string;
  resetcolumns:string;
  show_advancesearch: boolean;
  workflowItemsFrm: FormGroup;
  workflowStageProcessActionsFrm:  FormGroup;
  onAddWorkFlowItemVisible: boolean;
  hasReadpermissions: boolean;
  deletePopupVisible = false;
  deleteWorkflowStagePopupVisible = false;
  deleteWorkflowTransitionPopupVisible = false;
  workflowDetailsVisible = false;
  workflowStageDetailsVisible = false;
  workflowTransitionVisible = false;
  workflowStageActionDetailsVisible = false;
  workflowStageData: any;
  workflow_stage_id: number;
  workflowApplicationStatusData: any;
  enablePopupVisible: boolean;
  workflowStageProcessActionsVisible: boolean;
  is_enabled: boolean;
  enabledisable_workflow: string;
  enabledisable_workflowdescription: string;
  enableWorkflowStageVisible: boolean;
  enabledisable_workflowstage: string;
  enabledisable_workflowstage_description: string;
  enableWorkflowTransitionVisible: boolean;
  enabledisable_workflowTransition: string;
  enabledisable_workflowTransitiondescription: string;
  organisationData: any;
 

  workflowStagesVisible =false;
  workflow_id: number;
  config_record: string;

  // tabPanelPopupVisible: boolean = false;
  selectedTabIndex = 0;
  selectedTabsIndex =0;
  tabNames = ["Workflows","WorkflowStages", "workflowTransitions"];
  // workflowTabName = ["WorkflowStage","WorkflowStageActions"];
  iconPosition:any='top';
  workflowStageStatusesData: any;
  workflowStatusData: any;
  workflowStagesProcessActionsData: any;
  workflowAllStageData: any;
  workflowSubmissionActionsData: any;
  workflowStagesData: any;
  processData: any;
  statusActionsData: any;
  workflowTransitionsData: any;
  workflowInterfaceData: any;
  workflowStagesFrm: FormGroup;
  stageCategoryData: any;
  stageStatusData: any;
  processTypeData: any;
  workflowStageActionsData: any;
  workflowProcessCategoryData: any;
  workflowTransitionFrm: FormGroup;
  workflowStageActionsItemsFrm: FormGroup;
  selectedValue: boolean;
  is_status_tied = [
    { value: true, text: 'Yes' },
    { value: false, text: 'No' },
  ];

  is_inspection_submission= [
    { value: true, text: 'Yes' },
    { value: false, text: 'No' },
  ];
  is_checklist_tied= [
    { value: true, text: 'Yes' },
    { value: false, text: 'No' },
  ];
  is_declarationstatus_tied= [
    { value: true, text: 'Yes' },
    { value: false, text: 'No' },
  ];
  is_paymentrequest_submission= [
    { value: true, text: 'Yes' },
    { value: false, text: 'No' },
  ];
  is_staticappprocess_defination= [
    { value: true, text: 'Yes' },
    { value: false, text: 'No' },
  ];
  permitsubmission_status= [
    { value: true, text: 'Yes' },
    { value: false, text: 'No' },
  ];
  is_external_usersubmission= [
    { value: true, text: 'Yes' },
    { value: false, text: 'No' },
  ];
 
  checklist_category= [
    { value: true, text: 'Yes' },
    { value: false, text: 'No' },
  ];
  is_to_portal = [
    { value: true, text: 'Yes' },
    { value: false, text: 'No' },
  ];
  needs_directive = [
    { value: true, text: 'Yes' },
    { value: false, text: 'No' },
  ];



  needResponsibleUsrData= [
    { value: true, text: 'Yes' },
    { value: false, text: 'No' },
  ];
  isManagerSubmissionData = [
    { value: true, text: 'Yes' },
    { value: false, text: 'No' },
  ];
  workflowStageItemsFrm: FormGroup;
  appWorkflowStatusData: any;
  

  regulatoryFunctionsData: any;
  regulatory_function_id: number;
  regulatorySubFunctionsData: any;
  productTypeData:any;
  loadingVisible = false;
  spinnerMessage: string;
  workflowItemsData: any[] = [];
  data_record: any;
  action_url: string;
  response: any;
  loading = false;
   tabsPositions: DxTabPanelTypes.Position[] = [
      'left', 'top', 'right', 'bottom',
    ];
    tabsPosition: DxTabPanelTypes.Position = this.tabsPositions[1];
    stylingModes: DxTabPanelTypes.TabsStyle[] = ['primary', 'secondary'];
    stylingMode: DxTabPanelTypes.TabsStyle = this.stylingModes[0];
    screenWidth: any;
    workflowTabName = ["WorkflowStage", "WorkflowStageActions"];
  actionsMenuItems = [
    {
      text: "Action",
      icon: 'menu',
      items: [
        { text: "Edit workflow details", action: 'edit_record', icon: 'fa fa-edit' },
        { text: "Delete", action: 'delete_record', icon: 'fa fa-trash' },
        { text: "Enable/Disable", action: 'enable_record', icon: 'fa fa-check' },

      ]
    }
  ];
  workflowStageDetailsMenuItems = [
    {
      text: "Action",
      icon: 'menu',
      items: [
        { text: "Edit workflow Stage details", action: 'edit_record', icon: 'fa fa-edit' },
        { text: "Delete", action: 'delete_record', icon: 'fa fa-trash' },
        { text: "Enable/Disable", action: 'enable_record', icon: 'fa fa-check' },
      ]
    }
  ];

  workflowStageActionsMenuItems = [
    {
      text: "Action",
      icon: 'menu',
      items: [
        { text: "Edit", action: 'edit_record', icon: 'fa fa-edit' },
        { text: "Delete", action: 'delete_record', icon: 'fa fa-trash' }
      ]
    }
  ];

  TransitionMenuItems = [
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
    public utilityService: UtilityService, 
    public toastr: ToastrService,
    private spinner: SpinnerVisibilityService,
    public workflowService: WokflowManagementService,
    public reportingAnalytics: ReportsService,
  ) {
    this.table_name = 'wf_workflows';
    this.parameter_name = "workflows";
    this.checkScreenSize();
     
}
ngOnInit() {
    this.workflowItemsFrm = new FormGroup({
        id: new FormControl('', Validators.compose([])),
        name: new FormControl('', Validators.compose([])),
        description: new FormControl('', Validators.compose([])),
        code: new FormControl('', Validators.compose([])),
        order_no: new FormControl('', Validators.compose([])),
        process_id: new FormControl('', Validators.compose([])),
        workflow_id: new FormControl('', Validators.compose([])),
        prevworkflow_stage_id: new FormControl('', Validators.compose([])),
        nextworkflow_stage_id: new FormControl('', Validators.compose([])),
        workflow_status_id: new FormControl('', Validators.compose([])),
        resetcolumns: new FormControl('', Validators.compose([])),
        stage_status_id: new FormControl('', Validators.compose([])),
        table_name: new FormControl('', Validators.compose([])),
        workflow_action_id: new FormControl('', Validators.compose([])),
        statuses_action_id: new FormControl('', Validators.compose([])),
        action: new FormControl('', Validators.compose([])),
        is_default_action: new FormControl('', Validators.compose([])),
        workflow_actionstype_id: new FormControl('', Validators.compose([])),
        system_interface_id: new FormControl('', Validators.compose([])),
        dashboard_type_id: new FormControl('', Validators.compose([])),
        regulatory_function_id: new FormControl('', Validators.compose([])),
        regulatory_subfunction_id: new FormControl('', Validators.compose([])),
        // regulated_productstype_id: new FormControl('', Validators.compose([])),
        firstName: new FormControl('', Validators.compose([])),
        organisation_id:new FormControl('', Validators.compose([])),
      });

  this.workflowStagesFrm = new FormGroup({
    id: new FormControl('', Validators.compose([])),
    name: new FormControl('', Validators.compose([])),
    description: new FormControl('', Validators.compose([])),
    code: new FormControl('', Validators.compose([])),
    order_no: new FormControl('', Validators.compose([])),
    workflow_id: new FormControl('', Validators.compose([])),
    stage_status_id: new FormControl('', Validators.compose([])),
    stage_category_id: new FormControl('', Validators.compose([])),
    needs_responsible_user: new FormControl('', Validators.compose([])),
    regulatory_function_id: new FormControl('', Validators.compose([])),
    is_manager_submission: new FormControl('', Validators.compose([])),
    process_id: new FormControl('', Validators.compose([])),
    interface_id: new FormControl('', Validators.compose([])),
    process_category_id: new FormControl('', Validators.compose([])),
   

    
  });
 
  this.workflowTransitionFrm = new FormGroup({
    id: new FormControl('', Validators.compose([])),
    name: new FormControl('', Validators.compose([])),
    description: new FormControl('', Validators.compose([])),
    code: new FormControl('', Validators.compose([])),
    order_no: new FormControl('', Validators.compose([])),
    workflow_id: new FormControl('', Validators.compose([])),
    workflow_action_id:new FormControl('', Validators.compose([])),
    workflow_status_id: new FormControl('', Validators.compose([])),
    prevworkflow_stage_id: new FormControl('', Validators.compose([])),
    nextworkflow_stage_id: new FormControl('', Validators.compose([])),
    nextworkflow_status_id: new FormControl('', Validators.compose([])),
  });

  this.workflowStageItemsFrm = new FormGroup({
    id: new FormControl('', Validators.compose([])),
    name: new FormControl('', Validators.compose([])),
    description: new FormControl('', Validators.compose([])),
    code: new FormControl('', Validators.compose([])),
    order_no: new FormControl('', Validators.compose([])),
    workflow_id: new FormControl('', Validators.compose([])),
    stage_status_id: new FormControl('', Validators.compose([])),
    stage_category_id: new FormControl('', Validators.compose([])),
    needs_responsible_user: new FormControl('', Validators.compose([])),
    regulatory_function_id: new FormControl('', Validators.compose([])),
    is_manager_submission: new FormControl('', Validators.compose([])),
    process_id: new FormControl('', Validators.compose([])),
    interface_id: new FormControl('', Validators.compose([])),
    process_category_id: new FormControl('', Validators.compose([])),
  });

  this.workflowStageActionsItemsFrm = new FormGroup({
    id: new FormControl('', Validators.compose([])),
    name: new FormControl('', Validators.compose([])),
    description: new FormControl('', Validators.compose([])),
    code: new FormControl('', Validators.compose([])),
    order_no: new FormControl('', Validators.compose([])),
    stage_id: new FormControl('', Validators.compose([])),
    is_status_tied: new FormControl('', Validators.compose([])),
    application_status_id: new FormControl('', Validators.compose([])),
    is_checklist_tied: new FormControl('', Validators.compose([])),
    is_paymentrequest_submission: new FormControl('', Validators.compose([])),
    workflow_stage_id:new FormControl('', Validators.compose([])),
    workflow_id:new FormControl('', Validators.compose([])),
  });

  this.workflowStageProcessActionsFrm = new FormGroup({
    id: new FormControl('', Validators.compose([])),
    name: new FormControl('', Validators.compose([])),
    description: new FormControl('', Validators.compose([])),
    code: new FormControl('', Validators.compose([])),
    order_no: new FormControl('', Validators.compose([])),
    is_enabled: new FormControl('', Validators.compose([])),
    workflow_stage_id:new FormControl('', Validators.compose([])),
    workflow_id:new FormControl('', Validators.compose([])),
    statuses_action_id: new FormControl('', Validators.compose([])),
    
  });

 
  this.fetchWorkflowItemsDetails();
  // this.onloadworkflowData();
  this.onLoadregulatoryFunctionsData();
  // this.onLoadregulatorySubFunctionsData(this.regulatory_function_id);
  this.onLoadproductTypeData();
  this.onLoadworkflowStageStatusesData();
  // this.fetchWorkflowStagesDetails(this.workflow_id);
  // this.fetchWorkflowTransitionsDetails(this.workflow_id);
  this.onLoadworkflowStatusData();
  this.onloadworkflowAllStageData();
  this.onLoadWorkflowSubmissionTransitonActionsData();
  this.onLoadworkflowInterfaceData();
  this.onLoadStageCategoryData();
  this.onLoadStageStatusData();
  this.onLoadProcessTypesData();
  this.onLoadProcessCategoryData();
  this.onLoadStageData();
  this.onLoadApplicationStatusData();
  this.onLoadappWorkflowStatusData();
  this.onLoadOrganisationData();
  this.onLoadProcessData();
  this.onLoadStatusActionsData();
  this.onLoadWorkflowStagesData() 


}
@HostListener('window:resize', ['$event'])
  onResize(event: Event): void{
    this.screenWidth = window.innerWidth;
    this.checkScreenSize();
  }

  checkScreenSize(): void{
    if(this.screenWidth < 768){
      this.tabsPosition = 'top';
    }else{
      this.tabsPosition = 'top';
    }
  }


onAddWorkFlowItem(){
  this.workflowItemsFrm.reset();
  this.workflowDetailsVisible = true;
  this.workflowStagesData = [];
}

onAddWorkFlowStageProcessActions(){
  this.workflowStageProcessActionsFrm.reset();
  this.workflowStageProcessActionsVisible = true;
  this.workflowStagesProcessActionsData = [];
  this.workflowStageActionsItemsFrm.get('workflow_stage_id')?.setValue(this.workflow_stage_id);
  
  //this.workflowStageProcessActionsFrm.get('table_name')?.setValue('wf_workflow_stages');
 //this.workflowStageProcessActionsFrm.get('workflow_id')?.setValue(this.workflow_id);

  
}

onAddWorkFlowStage(){
 
  this.workflowStagesFrm.reset();
  this.workflowStagesVisible = true;
  // this.workflowStagesData = [];
  this.workflowStagesFrm.get('table_name')?.setValue('wf_workflow_stages');
  this.workflowStagesFrm.get('workflow_id')?.setValue(this.workflow_id);
  
}

onAddWorkFlowTransition(){
 this.workflowTransitionFrm.reset();
 this.workflowTransitionVisible = true;

 this.workflowTransitionFrm.get('table_name')?.setValue('wf_workflow_transitions');
 this.workflowTransitionFrm.get('workflow_id')?.setValue(this.workflow_id);
}

onAddWorkFlowStageActions(){
  this.workflowStageActionsItemsFrm.reset();
  this.workflowStageActionDetailsVisible = true;

  this.workflowTransitionFrm.get('table_name')?.setValue('wf_workflow_actions');
  this.workflowTransitionFrm.get('workflow_id')?.setValue(this.workflow_id);
  this.workflowStageActionsItemsFrm.get('workflow_stage_id')?.setValue(this.workflow_stage_id);
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

onIsStatusTied(e){
  // this.selectedValue =this.workflowStageActionsItemsFrm.get('is_status_tied')?.value;
  // if(this.selectedValue == true){
  
  // }
}


fetchWorkflowItemsDetails() {

  var data_submit = {
    'table_name': this.table_name
  }
  this.workflowService.getWorkflowConfigs(data_submit)
    .subscribe(
      data => {
        this.data_record = data;
        if (this.data_record.success) {
          this.workflowItemsData = this.data_record.data;
        }

      },
      error => {

      });

}



fetchWorkflowStagesDetails(workflow_id) {
  this.spinnerShow('Loading Workflow Stages Details');
  var data_submit = {
    'table_name': 'wf_workflow_stages',
    workflow_id: workflow_id
  }
  this.workflowService.getWorkflowConfigs(data_submit)
  .subscribe(
    data => {
      
      this.data_record = data;
      if (this.data_record.success) {
        this.workflowStagesData = this.data_record.data;
      }
    });
    this.spinnerHide();
  // .subscribe(
  //   (data) => {
      
  //     this.workflowStagesData = data; 
  //     this.spinnerHide();
  //     this.workflowDetailsVisible = true;
  //   },
  //   (error) => {
  //     console.error('Error fetching Navigation menu:', error);
  //     this.spinnerHide();
  //   }
  // );
  

}

fetchWorkflowStageProcessActions(workflow_id) {
  this.spinnerShow('Loading Workflow Stages Details');
  var data_submit = {
    'table_name': 'wf_workflowstageprocess_actions',
    workflow_id: workflow_id
  }
  this.workflowService.getWorkflowConfigs(data_submit)
  .subscribe(
    data => {
      
      this.data_record = data;
      if (this.data_record.success) {
        this.workflowStagesProcessActionsData = this.data_record.data;
      }
    });
    this.spinnerHide();
}

fetchWorkflowStagesInfo(workflow_id) {
  this.spinnerShow('Loading Workflow Stages Details');
  var data_submit = {
    'table_name': 'wf_workflow_stages',
    workflow_id: workflow_id
  }
  this.workflowService.getWorkflowConfigs(data_submit)
  .subscribe(
    data => {
      
      this.data_record = data;
      if (this.data_record.success) {
        this.workflowStagesData = this.data_record.data;
      }
    });
    this.spinnerHide();
}

fetchWorkflowStageActionsDetails(workflow_id) {
  this.spinnerShow('Loading Workflow Stages Details');
  var data_submit = {
    'table_name': 'wf_workflow_actions',
    workflow_id: workflow_id
  }
  this.workflowService.getWorkflowConfigs(data_submit)
  .subscribe(
    data => {
      this.data_record = data;
      if (this.data_record.success) {
        this.workflowStageActionsData = this.data_record.data;
      }
    });
    this.spinnerHide();
}


fetchWorkflowTransitionsDetails(workflow_id) {
  this.spinnerShow('Loading Workflow Stages Details');
  var data_submit = {
    'table_name': 'wf_workflow_transitions',
    workflow_id: workflow_id
  }
  this.workflowService.getWorkflowConfigs(data_submit)
  .subscribe(
    data => {
      this.data_record = data;
      if (this.data_record.success) {
        this.workflowTransitionsData = this.data_record.data;
      }
    });
    this.spinnerHide();


}

// fetchWorkflowTransitionsDetails(workflow_id) {
//   this.spinnerShow('Loading Workflow Stages Details');
//   this.workflowService.getAppWorkflowTransitions(workflow_id)
//   .subscribe(
//     data => {
//       ;
//       this.data_record = data;
//       if (this.data_record.success) {
//         this.workflowTransitionsData = this.data_record.data;
//       }
//     });
//     this.spinnerHide();

// }
onRegulatoryFunctionChange($event) {
  if ($event.selectedItem) {
    let regulatory_function = $event.selectedItem;
    this.onLoadregulatorySubFunctionsData(regulatory_function.id)
  }
}


onLoadregulatoryFunctionsData() {
  var data_submit = {
    'table_name': 'par_regulatory_functions',
    // process_id: process_id
  }
  this.workflowService.getWorkflowConfigs(data_submit)
    .subscribe(
      data => {
        this.data_record = data;
        if (this.data_record.success) {
          this.regulatoryFunctionsData = this.data_record.data;
        }
      },
      error => {

      });

}

onLoadregulatorySubFunctionsData(regulatory_function_id) {
  var data_submit = {
    'table_name': 'par_regulatory_subfunctions',
    regulatory_function_id : regulatory_function_id
  }
  this.workflowService.getWorkflowConfigs(data_submit)
    .subscribe(
      data => {
        this.data_record = data;
        if (this.data_record.success) {
          this.regulatorySubFunctionsData = this.data_record.data;
        }
      },
      error => {

      });

}

onLoadOrganisationData() {
  var data_submit = {
    'table_name': 'tra_organisation_information',
   
  }
  this.workflowService.getWorkflowConfigs(data_submit)
    .subscribe(
      data => {
        this.data_record = data;
        if (this.data_record.success) {
          this.organisationData = this.data_record.data;
        }
      },
      error => {

      });

}

onLoadProcessData() {
  var data_submit = {
    'table_name': 'wf_processes',
   
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
onLoadStatusActionsData() {
  var data_submit = {
    'table_name': 'wf_statuses_actions',
   
  }
  this.workflowService.getWorkflowConfigs(data_submit)
    .subscribe(
      data => {
        this.data_record = data;
        if (this.data_record.success) {
          this.statusActionsData = this.data_record.data;
        }
      },
      error => {

      });

}

onLoadWorkflowStagesData() {
  var data_submit = {
    'table_name': 'wf_workflow_stages',
   
  }
  this.workflowService.getWorkflowConfigs(data_submit)
    .subscribe(
      data => {
        this.data_record = data;
        if (this.data_record.success) {
          this.workflowStagesData = this.data_record.data;
        }
      },
      error => {

      });

}


onLoadproductTypeData() {
  var data_submit = {
    'table_name': 'par_regulated_productstypes',
    // process_id: process_id
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
onLoadworkflowStageStatusesData() {
  var data_submit = {
    'table_name': 'wf_stage_statuses',
    
  }
  this.workflowService.getWorkflowConfigs(data_submit)
    .subscribe(
      data => {
        this.data_record = data;
        if (this.data_record.success) {
          this.workflowStageStatusesData = this.data_record.data;
        }
      },
      error => {

      });
}

onLoadappWorkflowStatusData() {
  var data_submit = {
    'table_name': 'par_application_statuses',
    
  }
  this.workflowService.getWorkflowConfigs(data_submit)
    .subscribe(
      data => {
        this.data_record = data;
        if (this.data_record.success) {
          this.appWorkflowStatusData = this.data_record.data;
        }
      },
      error => {

      });
}


onloadworkflowAllStageData() {
  var data_submit = {
    'table_name': 'wf_workflow_stages'
  }
  this.workflowService.getWorkflowConfigs(data_submit)
    .subscribe(
      data => {
        this.data_record = data;
        if (this.data_record.success) {
          this.workflowAllStageData = this.data_record.data;
        }
      },
      error => {

      });


}
onLoadworkflowStatusData() {
  var data_submit = {
    'table_name': 'wf_workflow_statuses',
    // process_id:process_id
  }
  this.workflowService.getWorkflowConfigs(data_submit)
    .subscribe(
      data => {
        this.data_record = data;
        if (this.data_record.success) {
          this.workflowStatusData = this.data_record.data;
        }
      },
      error => {

      });

}
onLoadWorkflowSubmissionTransitonActionsData() {
  var data_submit = {
    'table_name': 'wf_workflowsubmission_actions',
    // process_id: process_id
  }
  this.workflowService.getWorkflowConfigs(data_submit)
    .subscribe(
      data => {
        this.data_record = data;
        if (this.data_record.success) {
          this.workflowSubmissionActionsData = this.data_record.data;
        }
      },
      error => {

      });

}
onLoadworkflowInterfaceData() {
  var data_submit = {
    'table_name': 'wf_workflow_interfaces',
    // process_id: process_id
  }
  this.workflowService.getWorkflowConfigs(data_submit)
    .subscribe(
      data => {
        this.data_record = data;
        if (this.data_record.success) {
          this.workflowInterfaceData = this.data_record.data;
        }
      },
      error => {

      });

}

onLoadStageCategoryData() {
  var data_submit = {
    'table_name': 'wf_stage_categories',
    // process_id: process_id
  }
  this.workflowService.getWorkflowConfigs(data_submit)
    .subscribe(
      data => {
        this.data_record = data;
        if (this.data_record.success) {
          this.stageCategoryData = this.data_record.data;
        }
      },
      error => {

      });

}

onLoadStageStatusData() {
  var data_submit = {
    'table_name': 'wf_stage_statuses',
    // process_id: process_id
  }
  this.workflowService.getWorkflowConfigs(data_submit)
    .subscribe(
      data => {
        this.data_record = data;
        if (this.data_record.success) {
          this.stageStatusData = this.data_record.data;
        }
      },
      error => {

      });

}
onLoadProcessTypesData() {
  var data_submit = {
    'table_name': 'par_process_types',
    // process_id: process_id
  }
  this.workflowService.getWorkflowConfigs(data_submit)
    .subscribe(
      data => {
        this.data_record = data;
        if (this.data_record.success) {
          this.processTypeData = this.data_record.data;
        }
      },
      error => {

      });

}

onLoadProcessCategoryData() {
  var data_submit = {
    'table_name': 'wf_workflow_process_category',
    // process_id: process_id
  }
  this.workflowService.getWorkflowConfigs(data_submit)
    .subscribe(
      data => {
        this.data_record = data;
        if (this.data_record.success) {
          this.workflowProcessCategoryData = this.data_record.data;
        }
      },
      error => {

      });

}

onLoadStageData() {
  var data_submit = {
    'table_name': 'wf_workflow_stages',
    // process_id: process_id
  }
  this.workflowService.getWorkflowConfigs(data_submit)
    .subscribe(
      data => {
        this.data_record = data;
        if (this.data_record.success) {
          this.workflowStageData = this.data_record.data;
        }
      },
      error => {

      });

}
onLoadApplicationStatusData() {
  var data_submit = {
    'table_name': 'par_application_statuses',
    // process_id: process_id
  }
  this.workflowService.getWorkflowConfigs(data_submit)
    .subscribe(
      data => {
        this.data_record = data;
        if (this.data_record.success) {
          this.workflowApplicationStatusData = this.data_record.data;
        }
      },
      error => {

      });

}






onFuncSaveWorlflowData() {
  const formData = new FormData();
  const invalid = [];
  const controls = this.workflowItemsFrm.controls;
  for (const name in controls) {
    if (controls[name].invalid) {
      this.toastr.error('Fill In All Mandatory fields with (*), missing value on ' + name.replace('_id', ''), 'Alert');
      return;
    }
  }
  if (this.workflowItemsFrm.invalid) {
    return;
  }


  this.workflowItemsFrm.get('resetcolumns')?.setValue(this.resetcolumns);
  this.workflowItemsFrm.get('table_name')?.setValue(this.table_name);
  this.spinnerShow('Saving ' + this.parameter_name);
  this.action_url = 'onsaveWorkflowConfigData';

  this.spinner.show();
  this.workflowService.onSaveWorkflowDetailsDetails(this.table_name, this.workflowItemsFrm.value, this.action_url)
    .subscribe(
      response => {
        this.response = response;
        //the details 
        if (this.response.success) {

          this.fetchWorkflowItemsDetails();
          this.toastr.success(this.response.message, 'Response');

          this.workflow_id = this.response.record_id;
          
          this.workflowItemsFrm.get('id')?.setValue(this.workflow_id);
          this.fetchWorkflowStagesDetails(this.workflow_id)
          this.selectedTabIndex = 1;
          this.spinnerHide();
        } else {
          this.toastr.error(this.response.message, 'Alert');
          this.spinnerHide();
        }
        this.spinnerHide();
      },
      error => {
        this.toastr.error('Error Occurred', 'Alert');
        this.spinnerHide();
      });
}

onFuncSaveWorlflowStageTransitionData() {


  const formData = new FormData();
  const invalid = [];
  const controls = this.workflowTransitionFrm.controls;
  for (const name in controls) {
    if (controls[name].invalid) {
      this.toastr.error('Fill In All Mandatory fields with (*), missing value on ' + name.replace('_id', ''), 'Alert');
      return;
    }
  }
  if (this.workflowTransitionFrm.invalid) {
    return;
  }

  this.workflowTransitionFrm.get('resetcolumns')?.setValue(this.resetcolumns);
  this.spinnerShow('Saving Process Transition');
  this.action_url = 'onsaveWorkflowConfigData';

  this.spinner.show();

  this.workflowService.onSaveWorkflowDetailsDetails('wf_workflow_transitions', this.workflowTransitionFrm.value, this.action_url)
    .subscribe(
      response => {
        this.response = response;
        //the details 
        if (this.response.success) {

          this.fetchWorkflowTransitionsDetails(this.workflow_id);
          this.workflowTransitionVisible = false;
          this.toastr.success(this.response.message, 'Response');
          this.spinnerHide();
        } else {
          this.toastr.error(this.response.message, 'Alert');
          this.spinnerHide();
        }
        this.spinnerHide();
      },
      error => {
        this.toastr.error('Error Occurred', 'Alert');
        this.spinnerHide();
      });
}
onFuncSaveWorkflowStageData() {


  const formData = new FormData();
  const invalid = [];
  const controls = this.workflowStagesFrm.controls;
  for (const name in controls) {
    if (controls[name].invalid) {
      this.toastr.error('Fill In All Mandatory fields with (*), missing value on ' + name.replace('_id', ''), 'Alert');
      return;
    }
  }
  if (this.workflowStagesFrm.invalid) {
    return;
  }

  this.workflowStagesFrm.get('resetcolumns')?.setValue(this.resetcolumns);
  this.spinnerShow('Saving ' + this.parameter_name);
  this.action_url = 'onsaveWorkflowConfigData';

  this.spinner.show();
  this.workflowStagesFrm.get('workflow_id')?.setValue(this.workflow_id);
  this.workflowService.onSaveWorkflowDetailsDetails('wf_workflow_stages', this.workflowStagesFrm.value, this.action_url)
    .subscribe(
      response => {
        this.response = response;
        //the details 
        if (this.response.success) {

          this.fetchWorkflowStagesDetails(this.workflow_id);
          this.workflowStagesVisible = false;

          this.workflow_stage_id = this.response.record_id;
          this.workflowStagesFrm.get('id')?.setValue(this.workflow_id);
          this.fetchWorkflowStageActionsDetails(this.workflow_id);
          this.fetchWorkflowStageProcessActions(this.workflow_id);
          this.toastr.success(this.response.message, 'Response');
          this.spinnerHide();
        } else {
          this.toastr.error(this.response.message, 'Alert');
          this.spinnerHide();
        }
        this.spinnerHide();
      },
      error => {
        this.toastr.error('Error Occurred', 'Alert');
        this.spinnerHide();
      });
}

onFuncSaveWorkflowStageDetailsData() {
  const formData = new FormData();
  const invalid = [];
  const controls = this.workflowStagesFrm.controls;
  for (const name in controls) {
    if (controls[name].invalid) {
      this.toastr.error('Fill In All Mandatory fields with (*), missing value on ' + name.replace('_id', ''), 'Alert');
      return;
    }
  }
  if (this.workflowStagesFrm.invalid) {
    return;
  }

  this.workflowStagesFrm.get('resetcolumns')?.setValue(this.resetcolumns);
  this.spinnerShow('Saving ' + this.parameter_name);
  this.action_url = 'onsaveWorkflowConfigData';

  this.spinner.show();

  this.workflowService.onSaveWorkflowDetailsDetails('wf_workflow_stages', this.workflowStagesFrm.value, this.action_url)
    .subscribe(
      response => {
        this.response = response;
        //the details 
        if (this.response.success) {

          this.fetchWorkflowStageActionsDetails(this.workflow_stage_id);
          this.workflowStagesVisible = false;
          this.workflow_stage_id = this.response.record_id;
          
          this.workflowStagesFrm.get('id')?.setValue(this.workflow_stage_id);
          
          this.toastr.success(this.response.message, 'Response');
          this.spinnerHide();
        } else {
          this.toastr.error(this.response.message, 'Alert');
          this.spinnerHide();
        }
        this.spinnerHide();
      },
      error => {
        this.toastr.error('Error Occurred', 'Alert');
        this.spinnerHide();
      });
      
}

onFuncSaveWorlflowStageActionData() {
  const formData = new FormData();
  const invalid = [];
  const controls = this.workflowStageActionsItemsFrm.controls;
  for (const name in controls) {
    if (controls[name].invalid) {
      this.toastr.error('Fill In All Mandatory fields with (*), missing value on ' + name.replace('_id', ''), 'Alert');
      return;
    }
  }
  if (this.workflowStageActionsItemsFrm.invalid) {
    return;
  }

  this.workflowStageActionsItemsFrm.get('resetcolumns')?.setValue(this.resetcolumns);
  this.spinnerShow('Saving ' + this.parameter_name);
  this.action_url = 'onsaveWorkflowConfigData';

  this.spinner.show();
  this.workflowStageActionsItemsFrm.get('workflow_id')?.setValue(this.workflow_id);
  this.workflowService.onSaveWorkflowDetailsDetails('wf_workflow_actions', this.workflowStageActionsItemsFrm.value, this.action_url)
    .subscribe(
      response => {
        this.response = response;
        //the details 
        if (this.response.success) {

          this.fetchWorkflowStageActionsDetails(this.workflow_id);
          this.workflowStageDetailsVisible = false;
          this.toastr.success(this.response.message, 'Response');
          this.spinnerHide();
        } else {
          this.toastr.error(this.response.message, 'Alert');
          this.spinnerHide();
        }
        this.spinnerHide();
      },
      error => {
        this.toastr.error('Error Occurred', 'Alert');
        this.spinnerHide();
      });
}


onFuncSaveWorkflowStageProcessActionsData() {
  const formData = new FormData();
  const invalid = [];
  const controls = this.workflowStageProcessActionsFrm.controls;
  for (const name in controls) {
    if (controls[name].invalid) {
      this.toastr.error('Fill In All Mandatory fields with (*), missing value on ' + name.replace('_id', ''), 'Alert');
      return;
    }
  }
  if (this.workflowStageProcessActionsFrm.invalid) {
    return;
  }

  this.workflowStageProcessActionsFrm.get('resetcolumns')?.setValue(this.resetcolumns);
  this.spinnerShow('Saving ' + this.parameter_name);
  this.action_url = 'onsaveWorkflowConfigData';

  this.spinner.show();
  this.workflowStageProcessActionsFrm.get('workflow_id')?.setValue(this.workflow_id);
  this.workflowService.onSaveWorkflowDetailsDetails('wf_workflowstageprocess_actions', this.workflowStageProcessActionsFrm.value, this.action_url)
    .subscribe(
      response => {
        this.response = response;
        //the details 
        if (this.response.success) {

          this.fetchWorkflowStageProcessActions(this.workflow_id);
          this.workflowStageProcessActionsVisible = false;
          this.toastr.success(this.response.message, 'Response');
          this.spinnerHide();
        } else {
          this.toastr.error(this.response.message, 'Alert');
          this.spinnerHide();
        }
        this.spinnerHide();
      },
      error => {
        this.toastr.error('Error Occurred', 'Alert');
        this.spinnerHide();
      });
}


// onFuncSaveWorlflowStageActionData() {

//   const formData = new FormData();
//   const invalid = [];
//   const controls = this.workflowStageActionsItemsFrm.controls;
//   for (const name in controls) {
//     if (controls[name].invalid) {
//       this.toastr.error('Fill In All Mandatory fields with (*), missing value on ' + name.replace('_id', ''), 'Alert');
//       return;
//     }
//   }
//   if (this.workflowStageActionsItemsFrm.invalid) {
//     return;
//   }

//   this.workflowStageActionsItemsFrm.get('resetcolumns')?.setValue(this.resetcolumns);
//   this.spinnerShow('Saving ' + this.parameter_name);
//   this.action_url = 'onsaveWorkflowConfigData';

//   this.spinner.show();

//   this.workflowService.onSaveWorkflowDetailsDetails('wf_workflow_actions', this.workflowStageActionsItemsFrm.value, this.action_url)
//     .subscribe(
//       response => {
//         this.response = response;
//         //the details 
//         if (this.response.success) {

//           this.fetchWorkflowStageActionsDetails(this.workflow_id);
//           this.workflowStageDetailsVisible = false;
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




spinnerShow(spinnerMessage) {
  this.loadingVisible = true;
  this.spinnerMessage = spinnerMessage;
}
spinnerHide() {
  this.loadingVisible = false;
}


funcpopWidth(percentage_width) {
  return window.innerWidth * percentage_width / 100;
}
funcpopHeight(percentage_height) {
  return window.innerHeight * percentage_height / 100;
}
finishFunction() {

}

onPopupHidden() {
  this.fetchWorkflowItemsDetails();
}

funcEditDetails(data) {
  this.workflowItemsFrm.patchValue(data.data);
  this.workflowDetailsVisible = true;
 
  this.workflow_id = data.data.id;
  this.fetchWorkflowStagesDetails(data.data.id);
  this.fetchWorkflowTransitionsDetails(data.data.id) 
  
}
funcDeleteDetails(data) {
  this.workflowItemsFrm.patchValue(data.data);
  this.config_record = data.data.name;
  this.deletePopupVisible = true;
}

funcDeleteWorkflowStageDetails(data) {
  this.workflowStageItemsFrm.patchValue(data.data);
  this.config_record = data.data.name;
  this.deleteWorkflowStagePopupVisible = true;
}
funcDeleteTransitionDetails(data) {
  this.workflowTransitionFrm.patchValue(data.data);
  this.config_record = data.data.name;
  this.deleteWorkflowTransitionPopupVisible = true;
}




funcWorkflowDetails(data){
 
}

funcEnableDisableRecord(data) {
      
  this.workflowItemsFrm.patchValue(data.data);

  this.config_record = data.data.name;
  this.is_enabled = data.data.is_enabled;
  // console.log(this.is_enabled)
  if (this.is_enabled) {
    this.enabledisable_workflow = "disable_workflow";
    this.enabledisable_workflowdescription = "are_you_sure_you_want_to_disableworkflow";

  }
  else {
    this.enabledisable_workflow = "enable_workflow";
    this.enabledisable_workflowdescription = "are_you_sure_you_want_to_enableworkflow";
  }

  this.enablePopupVisible = true;
}

funcEnableDisableWorkflowStage(data) {
      
  this.workflowStageItemsFrm.patchValue(data.data);

  this.config_record = data.data.name;
  this.is_enabled = data.data.is_enabled;
  // console.log(this.is_enabled)
  if (this.is_enabled) {
    this.enabledisable_workflowstage = "disable_workflowstage";
    this.enabledisable_workflowstage_description = "are_you_sure_you_want_to_disableworkflowstage";

  }
  else {
    this.enabledisable_workflowstage = "enable_workflowstage";
    this.enabledisable_workflowstage_description = "are_you_sure_you_want_to_enableworkflowstage";
  }

  this.enableWorkflowStageVisible = true;
}
funcEnableDisableTransition(data) {
      
  this.workflowTransitionFrm.patchValue(data.data);

  this.config_record = data.data.name;
  this.is_enabled = data.data.is_enabled;
  // console.log(this.is_enabled)
  if (this.is_enabled) {
    this.enabledisable_workflowTransition = "disable_workflowTransition";
    this.enabledisable_workflowTransitiondescription = "are_you_sure_you_want_to_disableworkflowTransition";

  }
  else {
    this.enabledisable_workflowTransition = "enable_workflowTransition";
    this.enabledisable_workflowTransitiondescription = "are_you_sure_you_want_to_enableworkflowTransition";
  }

  this.enableWorkflowTransitionVisible = true;
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
   else if (action_btn.action === 'workflow_details'){
    this.funcWorkflowDetails(data);
  }
}

funcEditTransitionDetails(data){
  this.workflowTransitionFrm.reset();
  this.workflowTransitionVisible = true
  this.workflowTransitionFrm.patchValue(data.data);
  
  this.workflowTransitionFrm.get('table_name')?.setValue('wf_workflow_transitions');
  this.workflowTransitionFrm.get('workflow_id')?.setValue(this.workflow_id);
  
}

funcTransitionActionColClick(e,data){
  var action_btn = e.itemData;
  if (action_btn.action === 'edit_record') {
    this.funcEditTransitionDetails(data);
  } else if (action_btn.action === 'delete_record') {
    this.funcDeleteTransitionDetails(data);
  }else if (action_btn.action === 'enable_record') {
    this.funcEnableDisableTransition(data);
  }
}

funcEditStageDetails(data){
//  this.workflowStageDetailsVisible = true
//  this.workflowStagesFrm.reset();
console.log(data)
this.workflowStagesFrm.reset();
this.workflowStageDetailsVisible = true
this.workflowStagesFrm.patchValue(data.data);

// this.workflowStagesFrm.get('table_name')?.setValue('wf_workflow_stages');
// this.workflowStagesFrm.get('workflow_id')?.setValue(this.workflow_id);

this.fetchWorkflowStageActionsDetails(data.data.workflow_id);
this.fetchWorkflowStageProcessActions(data.data.workflow_id);
}

funcStageDetailsOnClick(e, data) {
  var action_btn = e.itemData;
  if (action_btn.action === 'edit_record') {
    this.funcEditStageDetails(data);
  } else if (action_btn.action === 'delete_record') {
    this.funcDeleteWorkflowStageDetails(data);
  } else if (action_btn.action === 'enable_record') {
    this.funcEnableDisableWorkflowStage(data);
  }
}

funcEditStageActions(data){
  this.workflowStageActionsItemsFrm.reset();
  this.workflowStageActionDetailsVisible = true
  this.workflowStageActionsItemsFrm.patchValue(data.data);
  
  this.workflowStageActionsItemsFrm.get('table_name')?.setValue('wf_workflow_actions');
  this.workflowStageActionsItemsFrm.get('workflow_id')?.setValue(this.workflow_id);
}
funcDeleteStageActions(data){

}
funcStageActionClick(e, data) {
  var action_btn = e.itemData;
  if (action_btn.action === 'edit_record') {
    this.funcEditStageActions(data);
  } else if (action_btn.action === 'delete_record') {
    this.funcDeleteStageActions(data);
  } 
}

onCellPrepared(e) {
  this.utilityService.onCellCountriesPrepared(e);
}
onDeleteWorkflowDetails() {
  this.spinnerShow('deleting ' + this.parameter_name);
  this.workflowItemsFrm.get('table_name')?.setValue('wf_workflows');
  this.workflowService.onDeleteWorkflowsDetails(this.workflowItemsFrm.value, this.table_name, this.parameter_name)
    .subscribe(
      response => {

        this.response = response;
        if (this.response.success) {
          this.fetchWorkflowItemsDetails();
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
onDeleteWorkflowStageDetails() {
  this.spinnerShow('deleting ' + this.parameter_name);
  this.workflowStageItemsFrm.get('table_name')?.setValue('wf_workflow_stages');
  this.workflowService.onDeleteWorkflowsDetails(this.workflowStageItemsFrm.value, 'wf_workflow_stages', this.parameter_name)
    .subscribe(
      response => {
        
        this.response = response;
        if (this.response.success) {
          this.fetchWorkflowStagesDetails(this.workflow_id);
          this.toastr.success(this.response.message, 'Response');
          this.deleteWorkflowStagePopupVisible = false;
        }
        else {

          this.toastr.success(this.response.message, 'Response');

        } this.spinnerHide();

      },
      error => {
        this.loading = false;
      });

}

onDeleteWorkflowTransitionDetails() {
  this.spinnerShow('deleting ' + this.parameter_name);
  this.workflowTransitionFrm.get('table_name')?.setValue('wf_workflow_transitions');
  this.workflowService.onDeleteWorkflowsDetails(this.workflowTransitionFrm.value, 'wf_workflow_transitions', this.parameter_name)
    .subscribe(
      response => {
        
        this.response = response;
        if (this.response.success) {
          this.fetchWorkflowTransitionsDetails(this.workflow_id);
          this.toastr.success(this.response.message, 'Response');
          this.deleteWorkflowTransitionPopupVisible = false;
        }
        else {

          this.toastr.success(this.response.message, 'Response');

        } this.spinnerHide();

      },
      error => {
        this.loading = false;
      });

}

iniateEnableDisableRecord() {
 
  this.spinnerShow('Saving_details');
  this.workflowItemsFrm.get('table_name')?.setValue('wf_workflows');
  this.workflowService.onEnableWorkflowDetails(this.workflowItemsFrm.value, this.table_name, this.parameter_name)
    .subscribe(
      response => {
        this.spinner.hide();
        this.response = response;
        if (this.response.success) {
          this.fetchWorkflowItemsDetails();
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
iniateEnableDisableWorkflowStage() {
 
  this.spinnerShow('Saving_details');
  this.workflowStageItemsFrm.get('table_name')?.setValue('wf_workflow_stages');
  this.workflowService.onEnableWorkflowDetails(this.workflowStageItemsFrm.value, 'wf_workflow_stages', this.parameter_name)
    .subscribe(
      response => {
        this.spinner.hide();
        this.response = response;
        if (this.response.success) {
          this.fetchWorkflowStagesDetails(this.workflow_id);
          this.enableWorkflowStageVisible = false;
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

iniateEnableDisableWorkflowTransition() {
 
  this.spinnerShow('Saving_details');
  this.workflowTransitionFrm.get('table_name')?.setValue('wf_workflow_transitions');
  this.workflowService.onEnableWorkflowDetails(this.workflowTransitionFrm.value, 'wf_workflow_transitions', this.parameter_name)
    .subscribe(
      response => {
        this.spinner.hide();
        this.response = response;
        if (this.response.success) {
          this.fetchWorkflowTransitionsDetails(this.workflow_id);
          this.enableWorkflowTransitionVisible = false;
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
 onExporting(e: DxDataGridTypes.ExportingEvent) {

    if (e.format == 'pdf') {
      this.reportingAnalytics.onExportingPDF(e)
    }
    else {
      this.reportingAnalytics.onExportingExcelData(e)
    }
  }




 

  funcUserRolesTabClick(e){
    //add logic
    let tab_index = e.itemIndex;
    
    if(tab_index ==1 || tab_index ==2){
      let workflow_id = this.workflowItemsFrm.get('id')?.value;
  
      if(workflow_id < 1){
          //validate the form based on saving 
          this.selectedTabIndex = 0;
          this.toastr.error('Kindly save the Workflow details Before before moving to the next step.', 'Response');
      }
    }
  }
  onNextNavigationItems(nextStep){
    this.selectedTabIndex = this.tabNames.indexOf(nextStep);
  }

  onNextWorkflowNavItem(nextTab){
    this.selectedTabIndex = this.workflowTabName.indexOf(nextTab);
  }

  onUpdateWorkflowsSubmit(){

  }
}
