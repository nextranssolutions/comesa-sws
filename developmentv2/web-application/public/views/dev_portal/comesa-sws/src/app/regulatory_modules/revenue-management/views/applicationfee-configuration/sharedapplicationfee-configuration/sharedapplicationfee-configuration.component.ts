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
import { RevenueManagementService } from '../../../services/revenue-management.service';

@Component({
  selector: 'app-sharedapplicationfee-configuration',
  templateUrl: './sharedapplicationfee-configuration.component.html',
  styleUrl: './sharedapplicationfee-configuration.component.css'
})
export class SharedapplicationfeeConfigurationComponent {

@Input() table_name: string;
  @Input() parameter_name: string;
  @Input() resetcolumns: string;
  @Input() regulatory_function_id!: number;
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
        { text: "Enable/Disable", action: 'enable_record', icon: 'fa fa-check' },
      ]
    }
  ];

  businessTypeData: any;
  regulatorySubFunctionData:any;
  variationTypeData: any;
  assessmentProcedureTypeData: any;
  importExportPermitTypeData: any;
  classificationData:any;
  investigationProductSectionData: any;
  investigationProdClassificationData: any;
  prodClassCategoryData: any;
  productSubCategoryData: any;
  gmpTypeData: any;
  costElementData: any;
  productOriginData: any;
  applicationFeeTypeData: any;
  advertisementTypeData: any;
  premiseTypeData: any;
  isReadOnly: boolean;
  currencyData: any;
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
  decryptedPayload:any
  constructor(
    private spinner: SpinnerVisibilityService,
    private router: Router,
    private revenueService: RevenueManagementService,
    public toastr: ToastrService,
    public viewRef: ViewContainerRef,
    public configService: ConfigurationsService,
    public utilityService: UtilityService,
    
    private reportingAnalytics: ReportsService,
    public encryptionService: EncryptionService
  ) {
 
    this.createNewDataFrm = new FormGroup({
      id: new FormControl('', Validators.compose([])),
      product_type_id: new FormControl('', Validators.compose([])),
      business_type_id: new FormControl('', Validators.compose([])),
      gmpcountries_region_id: new FormControl('', Validators.compose([])),
      regulatory_function_id: new FormControl('', Validators.compose([])),
      regulatory_subfunction_id: new FormControl('', Validators.compose([])),
      variation_type_id: new FormControl('', Validators.compose([])),
      assessmentprocedure_type_id: new FormControl(false, Validators.compose([])),
      importexport_permittype_id: new FormControl(false, Validators.compose([])),
      classification_id: new FormControl(false, Validators.compose([])),
      is_registered_product: new FormControl(false, Validators.compose([])),
      investigationproduct_section_id: new FormControl(false, Validators.compose([])),
      investigationprod_classification_id: new FormControl(false, Validators.compose([])),
      fasttrack_option_id: new FormControl('', Validators.compose([])),
      prodclass_category_id: new FormControl('', Validators.compose([])),
      product_subcategory_id: new FormControl('', Validators.compose([])),
      element_costs_id: new FormControl('', Validators.compose([])),
      gmp_type_id: new FormControl('', Validators.compose([])),
      product_origin_id: new FormControl('', Validators.compose([])),
      application_feetype_id: new FormControl('', Validators.compose([])),
      advertisement_type_id: new FormControl('', Validators.compose([])),
      inspection_type_id: new FormControl('', Validators.compose([])),
      premise_type_id: new FormControl('', Validators.compose([])),
      businesstype_class_id: new FormControl('', Validators.compose([])),
      retail_in_hospital: new FormControl('', Validators.compose([])),
      locationcouncils_defination_id: new FormControl('', Validators.compose([])),
      assessment_proceduretype_id: new FormControl('', Validators.compose([])),
      is_enabled: new FormControl('', Validators.compose([])),
    });
  }

  ngOnInit() {
    this.createNewDataFrm.get('resetcolumns')?.setValue(this.resetcolumns);
    this.fetchConfigurationItemsDetails(this.regulatory_function_id);
    this.onLoadregulatoryFunctionData();
    this.fetchBusinessTypeData();
    this.fetchRegulatorySubFunctionData(this.regulatory_function_id);
    this.fetchVariationTypeData();
    this.fetchAssessmentProcedureTypeData();
    this.fetchImportExportPermitTypeData();
    this.fetchClassificationData();
    this.fetchInvestigationProductSectionData();
    this.fetchInvestigationProdClassificationData();
    this.fetchProdClassCategoryData();
    this.fetchProductSubCategoryData();
    this.fetchGmpTypeData();
    this.fetchCostElementData();
    this.fetchProductOriginData();
    this.fetchApplicationFeeTypeData();
    this.fetchAdvertisementTypeData();
    this.fetchPremiseTypeData();
    this.fetchProductTypesDetails();
  }
 
  spinnerShow(spinnerMessage) {
    this.loadingVisible = true;
    this.spinnerMessage = spinnerMessage;
  }
  spinnerHide() {
    this.loadingVisible = false;
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


  fetchProductTypesDetails() {

    var data_submit = {
      'table_name': 'par_regulated_productstypes',
      // 'is_enabled': true,
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            // this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.productTypesData = this.data_record.data;
          }
        },
        error => {

        });
  }
  fetchBusinessTypeData() {

    var data_submit = {
      'table_name': 'par_business_types',
      // 'is_enabled': true,
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            // this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.businessTypeData = this.data_record.data;
          }
        },
        error => {

        });
  }

  fetchRegulatorySubFunctionData(regulatory_function_id) {

    var data_submit = {
      'table_name': 'par_regulatory_subfunctions',
      regulatory_function_id: regulatory_function_id
      // 'is_enabled': true,
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            // this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.regulatorySubFunctionData = this.data_record.data;
          }
        },
        error => {

        });
  }

  fetchVariationTypeData() {

    var data_submit = {
      'table_name': 'par_variation_categories',
      // 'is_enabled': true,
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            // this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.variationTypeData = this.data_record.data;
          }
        },
        error => {

        });
  }


  fetchAssessmentProcedureTypeData() {

    var data_submit = {
      'table_name': 'par_assessment_proceduretypes',
      // 'is_enabled': true,
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            // this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.assessmentProcedureTypeData = this.data_record.data;
          }
        },
        error => {

        });
  }

  fetchImportExportPermitTypeData() {

    var data_submit = {
      'table_name': 'par_importexport_permittypes',
      // 'is_enabled': true,
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            // this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.importExportPermitTypeData = this.data_record.data;
          }
        },
        error => {

        });
  }
  fetchClassificationData() {

    var data_submit = {
      'table_name': 'par_classifications',
      // 'is_enabled': true,
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            // this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.classificationData = this.data_record.data;
          }
        },
        error => {

        });
  }
  fetchInvestigationProductSectionData() {

    var data_submit = {
      'table_name': 'par_investigationproduct_sections',
      // 'is_enabled': true,
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            // this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.investigationProductSectionData = this.data_record.data;
          }
        },
        error => {

        });
  }

  fetchInvestigationProdClassificationData() {

    var data_submit = {
      'table_name': 'par_investigationprod_classifications',
      // 'is_enabled': true,
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            // this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.investigationProdClassificationData = this.data_record.data;
          }
        },
        error => {

        });
  }

  fetchProdClassCategoryData() {

    var data_submit = {
      'table_name': 'par_prodclass_categories',
      // 'is_enabled': true,
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            // this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.prodClassCategoryData = this.data_record.data;
          }
        },
        error => {

        });
  }

  fetchProductSubCategoryData() {

    var data_submit = {
      'table_name': 'par_prodclass_subcategories',
      // 'is_enabled': true,
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            // this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.productSubCategoryData = this.data_record.data;
          }
        },
        error => {

        });
  }

  fetchGmpTypeData() {

    var data_submit = {
      'table_name': 'par_gmpinspections_types',
      // 'is_enabled': true,
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            // this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.gmpTypeData = this.data_record.data;
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

  fetchProductOriginData() {

    var data_submit = {
      'table_name': 'par_product_origins',
      // 'is_enabled': true,
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            // this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.productOriginData = this.data_record.data;
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

  fetchAdvertisementTypeData() {

    var data_submit = {
      'table_name': 'par_advertisement_types',
      // 'is_enabled': true,
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            // this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.advertisementTypeData = this.data_record.data;
          }
        },
        error => {

        });
  }

  fetchPremiseTypeData() {

    var data_submit = {
      'table_name': 'par_premises_types',
      // 'is_enabled': true,
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            // this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.premiseTypeData = this.data_record.data;
          }
        },
        error => {

        });
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

  onLoadregulatoryFunctionData() {

    var data_submit = {
      'table_name': 'par_regulatory_functions',
      // 'is_enabled': true,
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            // this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.regulatoryFunctionData = this.data_record.data;
          }
        },
        error => {

        });
  }

  fetchConfigurationItemsDetails(regulatory_function_id) {
    this.spinnerShow('Loading...........');
    const data_submit = {
      table_name: this.table_name,
      'regulatory_function_id': regulatory_function_id
    };
  
    this.revenueService.getAppRegulatoryFunctionFeeConfig(data_submit)
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
    this.createNewDataFrm.reset();
    this.isReadOnly = false;
    this.isnewproduct = true;
  }

  onAddProductCategoryClick() {
    this.createNewDataFrm.reset();
    this.addPopupVisible = true;
  }

  onRegulatoryFunctionDataChange($event) {
    if ($event.selectedItem) {
      let regulatory_function = $event.selectedItem;
      this.fetchRegulatorySubFunctionData(regulatory_function.id);
    }

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
            this.isnewproduct = false;
            this.toastr.success(this.response.message, 'Response');
            this.fetchConfigurationItemsDetails(this.regulatory_function_id);
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
    this.fetchConfigurationItemsDetails(this.regulatory_function_id);
  }

  funcEditDetails(data) {
    this.createNewDataFrm.patchValue(data.data);
    // this.regulatory_function_id = data.data.id;
    // this.fetchConfigurationItemsDetails(this.regulatory_function_id);
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
      this.isReadOnly = true;
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
            this.fetchConfigurationItemsDetails(this.regulatory_function_id);
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
            this.fetchConfigurationItemsDetails(this.regulatory_function_id);
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
