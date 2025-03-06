import { Component, Input, ViewContainerRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import { SpinnerVisibilityService } from 'ng-http-loader';

import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/core-services/authentication/authentication.service';
import { ConfigurationsService } from 'src/app/core-services/configurations/configurations.service';
import { EncryptionService } from 'src/app/core-services/encryption/encryption.service';
import { ReportsService } from 'src/app/core-services/reports/reports.service';
import { UtilityService } from 'src/app/core-services/utilities/utility.service';

@Component({
  selector: 'app-feescharges-configurations',
  templateUrl: './feescharges-configurations.component.html',
  styleUrl: './feescharges-configurations.component.css'
})
export class FeeschargesConfigurationsComponent {

  @Input() resetcolumns: string;
  @Input() regulatory_function_id!: number;
  table_name: string;
  parameter_name: string;
  applicationFeeConfigData: any[] = [];
  institutionData: any[] = [];
  institutionTypesData: any[] = [];
  institutionDepartmentData: any[] = [];
  regulatoryFunctionData: any;
  docrequirementsData: any[] = [];
  createNewDataFrm: FormGroup;
  isnewproduct: boolean;
  submitted = false;
  loading = false;
  hasReadpermissions: boolean;
  subCategoriesData: any;
  data_value: string;
  response: any;
  showTabPanel: boolean = false;
  tabPanelPopupVisible: boolean = false;
  createdResponsePopupVisible = false;
  editedResponsePopupVisible = false;
  deletedResponsePopupVisible = false;
  hideAnimation: any;
  showAnimation: any;
  record_id: number;
  addPopupVisible = false;
  show_advancesearch: boolean;
  deletePopupVisible = false;
  data_record: any;
  config_record: string;
  Countries: any;
  actionsMenuItems = [
    {
      text: "Action",
      icon: 'menu',
      items: [
        //  { text: "View", action: 'view_record', icon: 'fa fa-eye' },
        { text: "Edit", action: 'edit_record', icon: 'fa fa-edit' },
        { text: "Delete", action: 'delete_record', icon: 'fa fa-trash' },
        // { text: "Enable/Disable", action: 'enable_record', icon: 'fa fa-check' },
      ]
    }
  ];

  confirmationData = [
    { id: 'yes', name: 'Yes' },
    { id: 'no', name: 'No' }
  ];
  currencyData: any;

  costCategoryData: any;
  costSubCategoryData: any;
  costElementData: any;
  applicationFeeTypeData: any;
  costTypeData: any;
  // confirmationData: any;
  glCodeData: any;
  bankData: any;
  productTypesData: any;
  categoriesData: any;
  feeTypesData: any;
  loadingVisible: boolean;
  is_enabled: boolean;
  enabledisable_tracer: string;
  enabledisable_tracerdescription: string;
  enablePopupVisible: boolean
  spinnerMessage: string;
  regStatusOptions = [
    { value: true, text: 'Yes' },
    { value: false, text: 'No' },
  ];
  decryptedPayload: any

  isFormular: string | null = null; // Tracks the selected value of is_formular
  showFormularRate: boolean = false; // Determines which form items to display
  constructor(
    private spinner: SpinnerVisibilityService,
    private router: Router,
    private AuthService: AuthenticationService,
    public toastr: ToastrService,
    public viewRef: ViewContainerRef,
    public configService: ConfigurationsService,
    public utilityService: UtilityService,
    
    private reportingAnalytics: ReportsService,
    public encryptionService: EncryptionService
  ) {

    this.createNewDataFrm = new FormGroup({
      id: new FormControl('', Validators.compose([])),
      element_id: new FormControl('', Validators.compose([])),
      application_feetype_id: new FormControl('', Validators.compose([])),
      cost_type_id: new FormControl('', Validators.compose([])),
      is_fast_track: new FormControl('', Validators.compose([])),
      costs: new FormControl('', Validators.compose([])),
      currency_id: new FormControl('', Validators.compose([])),
      formula: new FormControl(false, Validators.compose([])),
      optional: new FormControl(false, Validators.compose([])),
      formula_rate: new FormControl(false, Validators.compose([])),
      fee_type_id: new FormControl(false, Validators.compose([])),
      sub_cat_id: new FormControl(false, Validators.compose([])),
      cost_category_id: new FormControl(false, Validators.compose([])),
      technique_id: new FormControl('', Validators.compose([])),
      migration_code: new FormControl('', Validators.compose([])),
      gl_code_id: new FormControl('', Validators.compose([])),
      gl_code: new FormControl('', Validators.compose([])),
      formular: new FormControl('', Validators.compose([])),
      formular_rate: new FormControl('', Validators.compose([])),
      is_enabled: new FormControl('', Validators.compose([])),
    });

    this.table_name = 'tra_feescharges_configurations';
    this.parameter_name = "feescharges_configurations";
  }

  ngOnInit() {
    this.createNewDataFrm.get('resetcolumns')?.setValue(this.resetcolumns);
    this.fetchApplicationFeeConfigDetails();
    this.fetchApplicationFeeTypeData()
    this.fetchCostElementData()
    this.fetchCostSubCategoryData(this.cost_category_id)
    this.fetchCostCategoryData()
    this.fetchFeeTypesDetails()
    this.fetchCurrencyDetails()
    this.fetchGlCodeDetails()
    // this.fetchConfirmationsDetails()
  }
  cost_category_id(cost_category_id: any) {
    throw new Error('Method not implemented.');
  }

  spinnerShow(spinnerMessage) {
    this.loadingVisible = true;
    this.spinnerMessage = spinnerMessage;
  }
  spinnerHide() {
    this.loadingVisible = false;
  }

  onCostCategoryDataChange($event) {
    if ($event.selectedItem) {
      let cost_category = $event.selectedItem;
      this.fetchCostSubCategoryData(cost_category.id);
    }

  }

  toggleVisibility(event: any): void {
    this.showFormularRate = event.value === 'yes';
  }

  fetchFeeTypesDetails() {

    var data_submit = {
      'table_name': 'par_fee_types',
      // 'is_enabled': true,
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            // this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.feeTypesData = this.data_record.data;
          }
        },
        error => {

        });
  }

  fetchGlCodeDetails() {

    var data_submit = {
      'table_name': 'par_gl_accounts',
      // 'is_enabled': true,
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            // this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.glCodeData = this.data_record.data;
          }
        },
        error => {

        });
  }


  // fetchConfirmationsDetails() {

  //   var data_submit = {
  //     'table_name': 'par_confirmations',
  //     'is_enabled': 1,
  //   }
  //   this.configService.onLoadConfigurationData(data_submit)
  //     .subscribe(
  //       data => {
  //         this.data_record = data;
  //         if (this.data_record.success) {
  //           // this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
  //           this.confirmationData = this.data_record.data;
  //         }
  //       },
  //       error => {

  //       });
  // }


  fetchCurrencyDetails() {

    var data_submit = {
      'table_name': 'par_currencies',
      // 'is_enabled': true,
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            // this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.currencyData = this.data_record.data;
          }
        },
        error => {

        });
  }


  fetchCostCategoryData() {

    var data_submit = {
      'table_name': 'par_cost_categories',
      // 'is_enabled': true,
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            // this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.costCategoryData = this.data_record.data;
          }
        },
        error => {

        });
  }

  fetchCostSubCategoryData(cost_category_id) {

    var data_submit = {
      'table_name': 'par_cost_sub_categories',
      cost_category_id: cost_category_id
      // 'is_enabled': true,
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            // this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.costSubCategoryData = this.data_record.data;
          }
        },
        error => {

        });
  }

  fetchCostElementData() {

    var data_submit = {
      'table_name': 'par_cost_elements',
      // 'is_enabled': true,
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            // this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.costElementData = this.data_record.data;
          }
        },
        error => {

        });
  }

  fetchApplicationFeeTypeData() {

    var data_submit = {
      'table_name': 'par_applicationfee_types',
      // 'is_enabled': true,
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            // this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.applicationFeeTypeData = this.data_record.data;
          }
        },
        error => {

        });
  }

  fetchCostTypeData() {

    var data_submit = {
      'table_name': 'par_cost_types',
      // 'is_enabled': true,
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            // this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.costTypeData = this.data_record.results;
          }
        },
        error => {

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

  fetchApplicationFeeConfigDetails() {
    this.spinnerShow('Loading...........');
    const data_submit = {
      table_name: this.table_name,
    };

    this.configService.getFeesChargesConfigurations(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.applicationFeeConfigData = this.data_record.results;
          }
          this.spinnerHide();
        },
        error => {
          console.error('Error fetching data:', error);
          this.spinnerHide();
        }
      );
  }


  onAddNewProduct() {
    this.isnewproduct = true;

  }

  onAddProductCategoryClick() {
    this.createNewDataFrm.reset();
    this.addPopupVisible = true;
  }
  onFuncSaveCountriesData() {

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
            this.fetchApplicationFeeConfigDetails();
            this.isnewproduct = false;
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

  funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width / 100;
  }
  funcpopHeight(percentage_height) {
    return window.innerHeight * percentage_height / 100;
  }
  finishFunction() {

  }

  onPopupHidden() {
    this.fetchApplicationFeeConfigDetails();
  }

  funcEditDetails(data) {
    this.createNewDataFrm.patchValue(data.data);
    this.isnewproduct = true;
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
    } else if (action_btn.action === 'enable_record') {
      this.funcEnableDisableRecord(data);
    } else if (action_btn.action === 'block_record') {
      this.funcDeleteDetails(data);
    }
  }
  onCellPrepared(e) {
    this.utilityService.onCellCountriesPrepared(e);
  }
  onDeleteConfigurationsDetails() {
    this.spinnerShow('deleting ' + this.parameter_name);
    this.configService.onDeleteConfigurationsDetails(this.createNewDataFrm.value, this.table_name, this.parameter_name)
      .subscribe(
        response => {
          this.spinner.hide();
          this.response = response;
          if (this.response.success) {
            this.fetchApplicationFeeConfigDetails();
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

  funcEnableDisableRecord(data) {
    this.createNewDataFrm.patchValue(data.data);

    this.config_record = data.data.name;
    this.is_enabled = data.data.is_enabled;
    if (this.is_enabled) {
      this.enabledisable_tracer = "disable_configuration_item";
      this.enabledisable_tracerdescription = "are_you_sure_you_want_to_disableconfigurationitem";

    }
    else {
      this.enabledisable_tracer = "enable_configuration_item";
      this.enabledisable_tracerdescription = "are_you_sure_you_want_to_enableconfigurationitem";
    }

    this.enablePopupVisible = true;
  }


  iniateEnableDisableRecord() {

    this.spinnerShow('Saving_details');
    this.configService.onEnableConfigurationsDetails(this.createNewDataFrm.value, this.table_name, this.parameter_name)
      .subscribe(
        response => {
          this.spinner.hide();
          this.response = response;
          if (this.response.success) {
            this.fetchApplicationFeeConfigDetails();
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

  onExporting(e: DxDataGridTypes.ExportingEvent) {

    if (e.format == 'pdf') {
      this.reportingAnalytics.onExportingPDF(e)
    }
    else {
      this.reportingAnalytics.onExportingExcelData(e)
    }

  }
}
