import { Component, HostListener, ViewContainerRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import { DxTabPanelTypes } from 'devextreme-angular/ui/tab-panel';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ToastrService } from 'ngx-toastr';
import { AppmenuService } from 'src/app/core-services/appmenu.service';
import { ReportsService } from 'src/app/core-services/reports/reports.service';
import { ServiceAdmnistrationService } from 'src/app/core-services/system-admnistration/system-admnistration.service';
import { UtilityService } from 'src/app/core-services/utilities/utility.service';
import { WokflowManagementService } from 'src/app/core-services/workflow-management/wokflow-management.service';

@Component({
  selector: 'app-permittype-configurations',
  templateUrl: './permittype-configurations.component.html',
  styleUrl: './permittype-configurations.component.css'
})
export class PermittypeConfigurationsComponent {
 table_name: string = 'tra_transactionpermit_types';
  parameter_name: string = 'transaction_permit_types';
  resetcolumns = 'resetcolumns,routerLink';
  workflowPermissionData: any;
  iconPosition: any = 'top';
  regStatusOptions = [
    { value: true, text: 'Yes' },
    { value: false, text: 'No' },
  ];
  transactionpermit_type_id: number;
  account_type_id: number;
  organisation_id: number;
  workflow_id: number;
  data: any[];
  editRowKey: any;
  editColumnName: any;
  changes: Array<any>;
  workflowData: any;
  workflowStageData: any;
  operationTypeData: any;
  serviceTypeData: any;
  timelineTypeData: any;
  refNumberData: any;
  productTypeData: any;
  renewableStatusData: any;
  permitStatusData: any;
  hsCodeData: any;
  quotaLimitationData: any;
  mappingStatusData: any;
  hscodeMappingOptionData: any;
  permitTemplateTypeData: any;
  permitTemplateData: any;
  documentTypeData: any;
  wfStageData: any;
  checklistTypeData: any;
  checklistDefData: any;
  documentRequirementTypeData: any;
  permitTypeData: any;
  organizationData: any;
  processData: any;
  navigationTypesData: any;
  regulatoryFunctionData: any;
  createNewDataFrm: FormGroup;
  hsCodeDataFrm: FormGroup;
  PermitSignatoriesFrm: FormGroup;
  PermitChecklistFrm: FormGroup;
  PermitSpecialConditionsFrm: FormGroup;
  PermitRqdDocFrm: FormGroup;
  isnewrecord: boolean;
  submitted = false;
  loading = false;
  hasReadpermissions: boolean;
  show_advancesearch: boolean;
  is_enabled: boolean;
  data_value: string;
  enabledisable_permit_type: string;
  enabledisable_permit_typedescription: string;
  response: any;
  showTabPanel: boolean = false;
  tabPanelPopupVisible: boolean = false;
  hscodePopupVisible: boolean = false;
  PermitSignatoriesPopupVisible: boolean = false;
  PermitSpecialConditionsPopupVisible: boolean = false;
  PermitRqdDocPopupVisible: boolean = false;
  PermitChecklistPopupVisible: boolean = false;
  showWizard = false;
  createdResponsePopupVisible = false;
  editedResponsePopupVisible = false;
  deletedResponsePopupVisible = false;
  hideAnimation: any;
  showAnimation: any;
  record_id: number;
  addPopupVisible = false;
  deletePopupVisible = false;
  data_record: any;
  action_url: string;
  config_record: string;
  isLoading: boolean;
  permitTypes: any;
  AppNavigationMenus: any;
  updateUsrPermissNewDataFrm: FormGroup;
  AppHsCodes: any;
  AppPermitCertificateTemplate: any;
  AppPermitReportGeneration: any;
  AppPermitRequiredDocuments: any;
  AppPermitChecklist: any;
  enablePopupVisible: boolean;
  actionsMenuItems = [
    {
      text: "Action",
      icon: 'menu',
      items: [
        //  { text: "View", action: 'view_record', icon: 'fa fa-eye' },
        { text: "Edit Permit Type", action: 'edit_record', icon: 'fa fa-edit' },
        { text: "Delete", action: 'delete_record', icon: 'fa fa-trash' },
        { text: "Enable/Disable", action: 'enable_record', icon: 'fa fa-check' }
      ]
    }
  ];

  allinstutitionTypesData: any;
  tabsPositions: DxTabPanelTypes.Position[] = [
    'left', 'top', 'right', 'bottom',
  ];
  tabsPosition: DxTabPanelTypes.Position = this.tabsPositions[0];
  stylingModes: DxTabPanelTypes.TabsStyle[] = ['primary', 'secondary'];
  stylingMode: DxTabPanelTypes.TabsStyle = this.stylingModes[0];
  screenWidth: any;


  loadingVisible: boolean;
  spinnerMessage: string;
  updateuserPermissionfrm: any;
  navigations: any[] = [];
  organisationData: any[] = [];
  dashboardTypeData: any;
  accountTypesData: any;
  instutitionTypesData: any;
  partnerStateOptions = [
    { value: true, text: 'True' },
    { value: false, text: 'False' },
  ];
  selectedTabIndex = 0;
  selectTextOnEditStart: boolean;
  startEditAction: boolean;
  tabNames = ["PermitTypes", "HsCodes", "PermitRequiredDocuments", "PermitChecklists", "PermitSignatories", "PermitSpecialConditions"];
  constructor(
    private spinner: SpinnerVisibilityService,
    private router: Router,
    public toastr: ToastrService,
    public viewRef: ViewContainerRef,
    public utilityService: UtilityService,

    private admnistrationService: ServiceAdmnistrationService,
    private userGroupsService: AppmenuService,
    private workflowService: WokflowManagementService,
    private reportingAnalytics: ReportsService
  ) {

    this.createNewDataFrm = new FormGroup({
      id: new FormControl('', Validators.compose([])),
      name: new FormControl('', Validators.compose([])),
      description: new FormControl('', Validators.compose([])),
      code: new FormControl('', Validators.compose([])),
      resetcolumns: new FormControl(this.resetcolumns, Validators.compose([])),
      organisation_id: new FormControl(this.resetcolumns, Validators.compose([])),
      service_type_id: new FormControl(this.resetcolumns, Validators.compose([])),
      timeline_type_id: new FormControl(this.resetcolumns, Validators.compose([])),
      reference_noformat_id: new FormControl(this.resetcolumns, Validators.compose([])),
      permit_status_id: new FormControl(this.resetcolumns, Validators.compose([])),
      renewable_status_id: new FormControl(this.resetcolumns, Validators.compose([])),
      permit_validity_definition: new FormControl(this.resetcolumns, Validators.compose([])),
      permit_validity_timeline: new FormControl(this.resetcolumns, Validators.compose([])),
      product_category_id: new FormControl(this.resetcolumns, Validators.compose([])),
      operation_type_id: new FormControl(this.resetcolumns, Validators.compose([])),
      process_id: new FormControl(this.resetcolumns, Validators.compose([])),
      workflow_id: new FormControl('', Validators.compose([])),
      transactionpermit_type_id: new FormControl('', Validators.compose([])),
      is_enabled: new FormControl('', Validators.compose([])),
      service_deliverytimeline: new FormControl('', Validators.compose([])),
    });

    this.hsCodeDataFrm = new FormGroup({
      id: new FormControl('', Validators.compose([])),
      name: new FormControl('', Validators.compose([])),
      description: new FormControl('', Validators.compose([])),
      hs_code_start_int: new FormControl('', Validators.compose([])),
      hs_code_end_int: new FormControl('', Validators.compose([])),
      hs_code_specific_int: new FormControl('', Validators.compose([])),
      hs_code_selection_option: new FormControl('', Validators.compose([])),
      quota_limitationstype_id: new FormControl('', Validators.compose([])),
      mapping_status_id: new FormControl('', Validators.compose([])),
      hscodemapping_option_id: new FormControl('', Validators.compose([])),
      special_conditions: new FormControl('', Validators.compose([])),
      limitation_description:  new FormControl('', Validators.compose([])),
      code: new FormControl('', Validators.compose([])),
      transactionpermit_type_id: new FormControl('', Validators.compose([])),
      is_enabled: new FormControl('', Validators.compose([]))
    });

    this.PermitSignatoriesFrm = new FormGroup({
      id: new FormControl('', Validators.compose([])),
      name: new FormControl('', Validators.compose([])),
      description: new FormControl('', Validators.compose([])),
      permit_template_type_id: new FormControl('', Validators.compose([])),
      permit_template_id: new FormControl('', Validators.compose([])),
      workflow_stage_id: new FormControl('', Validators.compose([])),
      permit_signatory: new FormControl('', Validators.compose([])),
      is_approval_document: new FormControl('', Validators.compose([])),
      code: new FormControl('', Validators.compose([])),
      transactionpermit_type_id: new FormControl('', Validators.compose([])),
      is_enabled: new FormControl('', Validators.compose([]))
    });

    this.PermitSpecialConditionsFrm = new FormGroup({
      id: new FormControl('', Validators.compose([])),
      name: new FormControl('', Validators.compose([])),
      description: new FormControl('', Validators.compose([])),
      transactionpermit_type_id: new FormControl('', Validators.compose([])),
      limitation_description: new FormControl('', Validators.compose([])),
      quota_limitationstype_id: new FormControl('', Validators.compose([])),
      special_conditions: new FormControl('', Validators.compose([])),
      is_enabled: new FormControl('', Validators.compose([]))

    });

    this.PermitRqdDocFrm = new FormGroup({
      id: new FormControl('', Validators.compose([])),
      transactionpermit_type_id: new FormControl('', Validators.compose([])),
      document_type_id: new FormControl('', Validators.compose([])),
      document_requirement_id: new FormControl('', Validators.compose([])),
      is_mandatory: new FormControl('', Validators.compose([])),
      allow_multiple: new FormControl('', Validators.compose([])),
      has_validity_period: new FormControl('', Validators.compose([])),
      status: new FormControl('', Validators.compose([])),
      document_type: new FormControl('', Validators.compose([])),
      document_requirement: new FormControl('', Validators.compose([])),
      is_enabled: new FormControl('', Validators.compose([]))

    });

    this.PermitChecklistFrm = new FormGroup({
      id: new FormControl('', Validators.compose([])),
      transactionpermit_type_id: new FormControl('', Validators.compose([])),
      checklist_type_id: new FormControl('', Validators.compose([])),
      checklist_defination_id: new FormControl('', Validators.compose([])),
      workflow_stage_id: new FormControl('', Validators.compose([])),
      is_mandatory: new FormControl('', Validators.compose([])),
      has_query_check: new FormControl('', Validators.compose([])),
      checklist_type: new FormControl('', Validators.compose([])),
      checklist_defination: new FormControl('', Validators.compose([])),
      is_enabled: new FormControl('', Validators.compose([]))

    });

    // this.resetcolumns = 'resetcolumns,account_type_id,routerLink,has_partnerstate_defination';

  }
  ngOnInit() {
    this.fetchPermitTypeDetails();
    this.onLoadOperationTypeData();
    this.onLoadPermitTypeData();
    this.onLoadRenewableStatusData();
    this.onLoadproductTypeData();
    this.onLoadHsCodeData();
    this.onLoadQuotaLimitationData();
    this.onLoadMappingStatusData();
    this.onLoadRefNumberData();
    this.onLoadHscodeMappingOptionData();
    this.onLoadPermitStatusData();
    this.onLoadOrganizationData();
    this.onLoadPermitTemplateTypeData();
    this.onLoadPermitTemplateData();
    this.onLoadDocumentTypeData();
    this.onLoadWfStageData();
    this.onLoadDocumentRequirementTypeData();
    this.onLoadChecklistTypeData();
    this.onLoadChecklistDefData();
    this.onLoadServiceTypeData();
    this.onLoadTimelineTypeData();
    //  this.onLoadProcessData(this.organization_id);
    this.spinnerShow('Loading ' + this.parameter_name);
    this.spinnerHide();
    this.checkScreenSize();
    //  this.onLoadWorkflowData();
    this.fetchAppHsCodes(this.transactionpermit_type_id);


  }
  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.screenWidth = window.innerWidth;
    this.checkScreenSize();
  }

  checkScreenSize(): void {
    if (this.screenWidth < 768) {
      this.tabsPosition = 'left';
    } else {
      this.tabsPosition = 'left';
    }
  }

  onOrganisationDefinationSelection($event) {
    let organisation_id = $event.selectedItem.id;
    this.onLoadProcessData(organisation_id);
    this.onLoadWorkflowData(organisation_id)
  }

  onAccountTypeSelection($event) {
    if ($event.selectedItem) {
      let data = $event.selectedItem;

    }
  }
  funcUserRolesTabClick(e) {

    let tab_index = e.itemIndex;

    if (tab_index == 1 || tab_index == 2) {
      let permittype_id = this.createNewDataFrm.get('id')?.value;

      if (permittype_id < 1) {

        this.selectedTabIndex = 0;
        this.toastr.error('Kindly save the Permit Type Details Before before moving to the next step.', 'Response');
      }
    }
  }


  onNextNavigationItems(nextStep) {
    this.selectedTabIndex = this.tabNames.indexOf(nextStep);
  }

  onLoadWorkflowData(organisation_id) {

    var data_submit = {
      'table_name': 'wf_workflows',
      organisation_id: organisation_id
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

  spinnerShow(spinnerMessage) {
    this.loadingVisible = true;
    this.spinnerMessage = spinnerMessage;
  }
  spinnerHide() {
    this.loadingVisible = false;
  }
  fetchPermitTypeDetails() {

    var data_submit = {
      'table_name': this.table_name
    }
    this.admnistrationService.onLoadTransactionPermitTypeData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.permitTypes = this.data_record.data;
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
    this.createNewDataFrm.get('table_name')?.setValue(this.table_name);
    this.spinnerShow('Saving ' + this.parameter_name);
    this.action_url = 'onsaveSysAdminData';
    this.spinner.show();


    this.admnistrationService.onSaveSystemAdministrationDetails(this.table_name, this.createNewDataFrm.value, this.action_url)
      .subscribe(
        response => {
          this.response = response;

          if (this.response.success) {

            this.fetchPermitTypeDetails();
            this.toastr.success(this.response.message, 'Response');
            // this.isnewrecord = false;
            this.transactionpermit_type_id = this.response.record_id;
            this.createNewDataFrm.get('id')?.setValue(this.transactionpermit_type_id);
            this.fetchAppHsCodes(this.transactionpermit_type_id)
            this.selectedTabIndex = 1;
            // this.toastr.success(this.response.message, 'Response');
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


  onFuncSaveHsCodeData() {


    const formData = new FormData();
    const invalid = [];
    const controls = this.hsCodeDataFrm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        this.toastr.error('Fill In All Mandatory fields with (*), missing value on ' + name.replace('_id', ''), 'Alert');
        return;
      }
    }
    if (this.hsCodeDataFrm.invalid) {
      return;
    }

    this.hsCodeDataFrm.get('resetcolumns')?.setValue(this.resetcolumns);
    this.spinnerShow('Saving ' + this.parameter_name);


    // this.spinner.show();
    this.hsCodeDataFrm.get('transactionpermit_type_id')?.setValue(this.transactionpermit_type_id);
    this.admnistrationService.onSaveSystemAdministrationDetails('tra_transactionpermit_hs_codes', this.hsCodeDataFrm.value, 'onsaveSysAdminData')
      .subscribe(
        response => {
          this.response = response;
          //the details 
          if (this.response.success) {

            this.fetchAppHsCodes(this.transactionpermit_type_id);
            this.hscodePopupVisible = false;
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


  onFuncSavePermitSignatories() {


    const formData = new FormData();
    const invalid = [];
    const controls = this.PermitSignatoriesFrm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        this.toastr.error('Fill In All Mandatory fields with (*), missing value on ' + name.replace('_id', ''), 'Alert');
        return;
      }
    }
    if (this.PermitSignatoriesFrm.invalid) {
      return;
    }

    this.PermitSignatoriesFrm.get('resetcolumns')?.setValue(this.resetcolumns);
    this.spinnerShow('Saving ' + this.parameter_name);


    // this.spinner.show();
    this.PermitSignatoriesFrm.get('transactionpermit_type_id')?.setValue(this.transactionpermit_type_id);
    this.admnistrationService.onSaveSystemAdministrationDetails('tra_transactionpermit_signatories', this.PermitSignatoriesFrm.value, 'onsaveSysAdminData')
      .subscribe(
        response => {
          this.response = response;
          //the details 
          if (this.response.success) {

            this.fetchAppPermitSignatories(this.transactionpermit_type_id);
            this.PermitSignatoriesPopupVisible = false;
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

  onFuncSavePermitSpecialConditions() {


    const formData = new FormData();
    const invalid = [];
    const controls = this.PermitSpecialConditionsFrm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        this.toastr.error('Fill In All Mandatory fields with (*), missing value on ' + name.replace('_id', ''), 'Alert');
        return;
      }
    }
    if (this.PermitSpecialConditionsFrm.invalid) {
      return;
    }

    this.PermitSpecialConditionsFrm.get('resetcolumns')?.setValue(this.resetcolumns);
    this.spinnerShow('Saving ' + this.parameter_name);


    // this.spinner.show();
    this.PermitSpecialConditionsFrm.get('transactionpermit_type_id')?.setValue(this.transactionpermit_type_id);
    this.admnistrationService.onSaveSystemAdministrationDetails('tra_permit_special_conditions', this.PermitSpecialConditionsFrm.value, 'onsaveSysAdminData')
      .subscribe(
        response => {
          this.response = response;
          //the details 
          if (this.response.success) {

            this.fetchAppPermitSpecialConditions(this.transactionpermit_type_id);
            this.PermitSpecialConditionsPopupVisible = false;
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

  onFuncSavePermitRequiredDocuments() {
    const formData = new FormData();
    const invalid = [];
    const controls = this.PermitRqdDocFrm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        this.toastr.error('Fill In All Mandatory fields with (*), missing value on ' + name.replace('_id', ''), 'Alert');
        return;
      }
    }
    if (this.PermitRqdDocFrm.invalid) {
      return;
    }

    this.PermitRqdDocFrm.get('resetcolumns')?.setValue(this.resetcolumns);
    this.spinnerShow('Saving ' + this.parameter_name);


    // this.spinner.show();
    this.PermitRqdDocFrm.get('transactionpermit_type_id')?.setValue(this.transactionpermit_type_id);
    this.admnistrationService.onSaveSystemAdministrationDetails('tra_transactionpermit_requireddocuments', this.PermitRqdDocFrm.value, 'onsaveSysAdminData')
      .subscribe(
        response => {
          this.response = response;
          //the details 
          if (this.response.success) {

            this.fetchAppPermitRequiredDocuments(this.transactionpermit_type_id);
            this.PermitRqdDocPopupVisible = false;
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

  onFuncSavePermitChecklist() {
    const formData = new FormData();
    const invalid = [];
    const controls = this.PermitChecklistFrm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        this.toastr.error('Fill In All Mandatory fields with (*), missing value on ' + name.replace('_id', ''), 'Alert');
        return;
      }
    }
    if (this.PermitChecklistFrm.invalid) {
      return;
    }

    this.PermitChecklistFrm.get('resetcolumns')?.setValue(this.resetcolumns);
    this.spinnerShow('Saving ' + this.parameter_name);


    // this.spinner.show();
    this.PermitChecklistFrm.get('transactionpermit_type_id')?.setValue(this.transactionpermit_type_id);
    this.admnistrationService.onSaveSystemAdministrationDetails('tra_transactionpermit_checklists', this.PermitChecklistFrm.value, 'onsaveSysAdminData')
      .subscribe(
        response => {
          this.response = response;
          //the details 
          if (this.response.success) {

            this.fetchAppPermitChecklist(this.transactionpermit_type_id);
            this.PermitChecklistPopupVisible = false;
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


  funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width / 100;
  }
  funcpopHeight(percentage_height) {
    return window.innerHeight * percentage_height / 100;
  }
  finishFunction() {

  }

  onPopupHidden() {
    this.fetchPermitTypeDetails();
  }

  funcEditDetails(data) {
    this.createNewDataFrm.patchValue(data.data);

    this.transactionpermit_type_id = data.data.id;
    //  this.account_type_id = data.data.account_type_id
    this.fetchAppNavigationMenus(data.data.id, this.account_type_id);
    this.fetchAppHsCodes(data.data.id);
    //  this.fetchWorkflowPermissionData(data.data.id) 
  }
  funcEditPermissionDetails(data) {
    this.createNewDataFrm.patchValue(data.data);

    this.transactionpermit_type_id = data.data.id;
    this.fetchAppNavigationMenus(data.data.id, this.account_type_id)
    //  this.fetchWorkflowPermissionData(data.data.id) 
    this.fetchAppHsCodes(data.data.id)
  }
  onAddNewRecord() {

    this.createNewDataFrm.reset();
    this.tabPanelPopupVisible = true;
    this.AppNavigationMenus = [];

  }
  onAddNewHscode() {
    this.hsCodeDataFrm.reset();
    this.hscodePopupVisible = true;
    this.AppNavigationMenus = [];

  }

  onAddNewPermitSignatories() {
    this.PermitSignatoriesFrm.reset();
    this.PermitSignatoriesPopupVisible = true;
    this.AppNavigationMenus = [];
  }
  onAddNewPermitSpecialConditions() {
    this.PermitSpecialConditionsFrm.reset();
    this.PermitSpecialConditionsPopupVisible = true;
    this.AppNavigationMenus = [];
  }
  onAddNewAppPermitRequiredDocuments() {
    this.PermitRqdDocFrm.reset();
    this.PermitRqdDocPopupVisible = true;
    this.AppNavigationMenus = [];
  }

  onAddNewAppPermitChecklists() {
    this.PermitChecklistFrm.reset();
    this.PermitChecklistPopupVisible = true;
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

  fetchAppHsCodes(transactionpermit_type_id) {
    this.spinnerShow('Loading User Permissions Details');

    var data_submit = {
      table_name: 'tra_transactionpermit_hs_codes',
      transactionpermit_type_id: transactionpermit_type_id
    }
    this.admnistrationService.onLoadDataUrl(data_submit, 'getAppHscodes')
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.AppHsCodes = this.data_record.data;
          }
        });
    this.spinnerHide();
  }

  fetchAppPermitSignatories(transactionpermit_type_id) {
    this.spinnerShow('Loading User Permissions Details');

    var data_submit = {
      table_name: 'tra_transactionpermit_signatories',
      transactionpermit_type_id: transactionpermit_type_id
    }
    this.admnistrationService.onLoadDataUrl(data_submit, 'getAppPermitSignatoriesData')
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.AppPermitCertificateTemplate = this.data_record.data;
          }
        });
    this.spinnerHide();
  }

  fetchAppPermitSpecialConditions(transactionpermit_type_id) {
    this.spinnerShow('Loading User Permissions Details');

    var data_submit = {
      table_name: 'tra_permit_special_conditions',
      transactionpermit_type_id: transactionpermit_type_id
    }
    this.admnistrationService.onLoadDataUrl(data_submit, 'getAppPermitSpecialConditions')
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.AppPermitReportGeneration = this.data_record.data;
          }
        });
    this.spinnerHide();
  }

  fetchAppPermitRequiredDocuments(transactionpermit_type_id) {
    this.spinnerShow('Loading User Permissions Details');

    var data_submit = {
      table_name: 'tra_transactionpermit_requireddocuments',
      transactionpermit_type_id: transactionpermit_type_id
    }
    this.admnistrationService.onLoadDataUrl(data_submit, 'getAppPermitRequiredDocuments')
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.AppPermitRequiredDocuments = this.data_record.data;
          }
        });
    this.spinnerHide();
  }


  fetchAppPermitChecklist(transactionpermit_type_id) {
    this.spinnerShow('Loading User Permissions Details');

    var data_submit = {
      table_name: 'tra_transactionpermit_checklists',
      transactionpermit_type_id: transactionpermit_type_id
    }
    this.admnistrationService.onLoadDataUrl(data_submit, 'getAppPermitChecklist')
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.AppPermitChecklist = this.data_record.data;
          }
        });
    this.spinnerHide();
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
      this.enabledisable_permit_type = "disable_configuration_item";
      this.enabledisable_permit_typedescription = "are_you_sure_you_want_to_disableconfigurationitem";

    }
    else {
      this.enabledisable_permit_type = "enable_configuration_item";
      this.enabledisable_permit_typedescription = "are_you_sure_you_want_to_enableconfigurationitem";
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
    this.admnistrationService.onEnablePermitTypeDetails(this.createNewDataFrm.value, this.table_name, this.parameter_name)
      .subscribe(
        response => {
          this.spinner.hide();
          this.response = response;
          if (this.response.success) {
            this.fetchPermitTypeDetails();
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


  onCellPrepared(e) {
    this.utilityService.onCellCountriesPrepared(e);
  }


  onLoadOperationTypeData() {
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
  onLoadproductTypeData() {
    var data_submit = {
      'table_name': 'par_product_categories'
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

  onLoadPermitStatusData() {
    var data_submit = {
      'table_name': 'par_permit_statuses'
    }
    this.workflowService.getWorkflowConfigs(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.permitStatusData = this.data_record.data;

          }
        },
        error => {

        });
  }

  onLoadRenewableStatusData() {
    var data_submit = {
      'table_name': 'par_renewable_statuses'
    }
    this.workflowService.getWorkflowConfigs(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.renewableStatusData = this.data_record.data;

          }
        },
        error => {

        });
  }
  
  onLoadServiceTypeData() {
    var data_submit = {
      'table_name': 'par_service_type'
    }
    this.workflowService.getWorkflowConfigs(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.serviceTypeData = this.data_record.data;

          }
        },
        error => {

        });
        console.log(this.data_record);
  } 

  onLoadTimelineTypeData() {
    var data_submit = {
      'table_name': 'par_timeline_type'
    }
    this.workflowService.getWorkflowConfigs(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.timelineTypeData = this.data_record.data;

          }
        },
        error => {

        });
  } 
  onLoadRefNumberData() {
    var data_submit = {
      'table_name': 'par_refnumbers_formats'
    }
    this.workflowService.getWorkflowConfigs(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.refNumberData = this.data_record.data;

          }
        },
        error => {

        });
  } 

  onLoadHsCodeData() {
    var data_submit = {
      'table_name': 'par_hscode_seloption'
    }
    this.workflowService.getWorkflowConfigs(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.hsCodeData = this.data_record.data;

          }
        },
        error => {

        });
  }

  onLoadQuotaLimitationData() {
    var data_submit = {
      'table_name': 'par_quota_limitationstype'
    }
    this.workflowService.getWorkflowConfigs(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.quotaLimitationData = this.data_record.data;

          }
        },
        error => {

        });
  }

  onLoadMappingStatusData() {
    var data_submit = {
      'table_name': 'par_mapping_status'
    }
    this.workflowService.getWorkflowConfigs(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.mappingStatusData = this.data_record.data;

          }
        },
        error => {

        });
  }

  onLoadHscodeMappingOptionData() {
    var data_submit = {
      'table_name': 'par_hscodemapping_option'
    }
    this.workflowService.getWorkflowConfigs(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.hscodeMappingOptionData = this.data_record.data;

          }
        },
        error => {

        });
  }

  onLoadPermitTemplateTypeData() {
    var data_submit = {
      'table_name': 'par_permittemplate_types'
    }
    this.workflowService.getWorkflowConfigs(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.permitTemplateTypeData = this.data_record.data;

          }
        },
        error => {

        });
  }

  onLoadPermitTemplateData() {
    var data_submit = {
      'table_name': 'par_permit_templates'
    }
    this.workflowService.getWorkflowConfigs(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.permitTemplateData = this.data_record.data;

          }
        },
        error => {

        });
  }

  onLoadDocumentRequirementTypeData() {
    var data_submit = {
      'table_name': 'dms_document_requirements'
    }
    this.workflowService.getWorkflowConfigs(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.documentRequirementTypeData = this.data_record.data;

          }
        },
        error => {

        });
  }

  onLoadChecklistTypeData() {
    var data_submit = {
      'table_name': 'chk_checklist_types'
    }
    this.workflowService.getWorkflowConfigs(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.checklistTypeData = this.data_record.data;

          }
        },
        error => {

        });
  }

  onLoadChecklistDefData() {
    var data_submit = {
      'table_name': 'chk_checklist_definations'
    }
    this.workflowService.getWorkflowConfigs(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.checklistDefData = this.data_record.data;

          }
        },
        error => {

        });
  }
  onLoadDocumentTypeData() {
    var data_submit = {
      'table_name': 'par_document_types'
    }
    this.workflowService.getWorkflowConfigs(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.documentTypeData = this.data_record.data;

          }
        },
        error => {

        });
  }

  onLoadWfStageData() {
    var data_submit = {
      'table_name': 'wf_workflow_stages'
    }
    this.workflowService.getWorkflowConfigs(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.wfStageData = this.data_record.data;

          }
        },
        error => {

        });
  }


  onLoadPermitTypeData() {
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

  // 
  onLoadOrganizationData() {
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

  onLoadProcessData(organisation_id) {
    var data_submit = {
      'table_name': 'wf_processes',
      organisation_id: organisation_id,

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
  onUpdatePermitType() {

    this.showWizard = true;
  }

  onUpdateHsCode() {

    this.showWizard = true;
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

      } else if (user_access_levels_id == 2) {

        e.cellElement.style.color = 'white';
        e.cellElement.style.backgroundColor = '#0000FF';

      } else if (user_access_levels_id == 4) {

        e.cellElement.style.color = 'white';
        e.cellElement.style.backgroundColor = '#50c878';

      } else {

        e.cellElement.style.color = 'white';

      }
    }
  }
  onDeleteSystemAdministrationDetails() {

    this.admnistrationService.onDeleteSystemAdministrationDetails(this.createNewDataFrm.value, this.table_name, this.parameter_name)
      .subscribe(
        response => {

          this.response = response;
          if (this.response.success) {
            this.fetchPermitTypeDetails();
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



