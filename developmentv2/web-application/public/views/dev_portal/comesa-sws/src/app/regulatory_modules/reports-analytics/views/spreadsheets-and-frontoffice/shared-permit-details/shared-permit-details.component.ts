import { Component, HostListener, Input, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ToastrService } from 'ngx-toastr';
import { AppSettings } from 'src/app/app-settings';
import { UtilityService } from 'src/app/core-services/utilities/utility.service';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/core-services/authentication/authentication.service';
import { ConfigurationsService } from 'src/app/core-services/configurations/configurations.service';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import { ReportsService } from 'src/app/core-services/reports/reports.service';
import { DxTabPanelTypes } from 'devextreme-angular/ui/tab-panel';
import { EncryptionService } from 'src/app/core-services/encryption/encryption.service';
import { ImportExportService } from 'src/app/regulatory_modules/importexport-control/services/import-export.service';

@Component({
  selector: 'app-shared-permit-details',
  templateUrl: './shared-permit-details.component.html',
  styleUrl: './shared-permit-details.component.css'
})
export class SharedPermitDetailsComponent {
 @Input() table_name: string;
  @Input() parameter_name: string;
  @Input() resetcolumns: string;

 
  createNewDataFrm: FormGroup;
  isnewproduct: boolean;
  submitted = false;
  loading = false;
  hasReadpermissions: boolean;
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
  organisationDetails: any;
  locationinfoData: any[] = [];
  operationType: any;
  dtImportExpApplicationData: any[] = [];
  country: any;
  approvedProducts: any;
  requestedProducts: any;
  approvedPermitsVisible: boolean;
  filterInformation: FormGroup;
  treeBoxValue: number[] = [];
  operationTypeData: any;

  actionsMenuItems = [
    {
      text: "Action",
      icon: 'menu',
      items: [
         { text: "Preview", action: 'view_record', icon: 'fa fa-eye' },
        // { text: "Edit", action: 'edit_record', icon: 'fa fa-edit' },
        // { text: "Delete", action: 'delete_record', icon: 'fa fa-trash' },
        // { text: "Enable/Disable", action: 'enable_record', icon: 'fa fa-check' },
      ]
    }
  ];
 

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
    private AuthService: AuthenticationService,
    public toastr: ToastrService,
    public viewRef: ViewContainerRef,
    public configService: ConfigurationsService,
    public utilityService: UtilityService,
    private reportingAnalytics: ReportsService,
    public encryptionService: EncryptionService,
    public appService: ImportExportService,
    private formBuilder: FormBuilder,
  ) {

    this.createNewDataFrm = new FormGroup({
      id: new FormControl('', Validators.compose([])),
      name: new FormControl('', Validators.compose([Validators.required])),
      description: new FormControl('', Validators.compose([])),
      code: new FormControl('', Validators.compose([])),
      is_enabled: new FormControl('', Validators.compose([])),
    });
    this.filterInformation = this.formBuilder.group({
      operation_type_id: new FormControl('', Validators.compose([])),
      
    });


  }

  ngOnInit() {
    this.createNewDataFrm.get('resetcolumns')?.setValue(this.resetcolumns);
    this.fetchConfigurationItemsDetails();
    this.fetchConfigurationCountriesDetails();
    this.fetchOrganisationDetails();
    this.onLoadOperationTypeDetails();
    this.scrollToTop();
  }
 
  spinnerShow(spinnerMessage) {
    this.loadingVisible = true;
    this.spinnerMessage = spinnerMessage;
  }
  spinnerHide() {
    this.loadingVisible = false;
  }
  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scrolling for better UX
    });
  }

  onCellClick(e: any) {
    // console.log(e.data);
    
    if (e.column && e.column.dataField === 'number_of_products_approved') {
      this.country = e.data.name; // Assuming 'country' field exists in your data
      this.approvedProducts = e.data.number_of_products_approved;
      
      // console.log(`Country: ${this.country}, Approved Products: ${this.approvedProducts}`);
  

      this.viewApprovedProducts(this.country , this.approvedProducts);
    }
    else if(e.column && e.column.dataField === 'number_of_products_request'){
      this.country = e.data.name; 
      this.requestedProducts = e.data.number_of_products_request;
      
      // console.log(`Country: ${this.country}, Approved Products: ${this.requestedProducts}`);
  
   
      this.viewApprovedProducts(this.country , this.approvedProducts);
    }
  }
  
  viewApprovedProducts(country: string, approvedProducts: number) {
    // alert(`Approved Products in ${this.country}: ${this.approvedProducts}`);
    this.approvedPermitsVisible = true;
  }




  onCellAppStatusPrepared(e: any) {
    // console.log(e);
    if (e.rowType === "data" && e.column.dataField === "number_of_products_approved") {
      let approvedPermits = e.data.number_of_products_approved;  // Ensure the value is retrieved correctly
      
      
      if (e.cellElement) {  // Ensure cellElement exists
        if (approvedPermits >= 1) {
          e.cellElement.style.color = "white";
          e.cellElement.style.backgroundColor = "#08a541";
        } else {
          e.cellElement.style.color = "white";
          e.cellElement.style.backgroundColor = "#ffffff";
        }
      }
  
    }
    else if(e.rowType === "data" && e.column.dataField === "number_of_products_request"){
      let requestedPermits = e.data.number_of_products_request;  // Ensure the value is retrieved correctly
      
      if (e.cellElement) {  // Ensure cellElement exists
        if (requestedPermits >= 1) {
          e.cellElement.style.color = "white";
          e.cellElement.style.backgroundColor = "#ccc";
        } else {
          e.cellElement.style.color = "white";
          e.cellElement.style.backgroundColor = "#ffffff";
        }
      }
    }
  }
  

  reloadPermitApplicationsApplications(regulatory_subfunction_id,appworkflowstage_category_id) {
    this.spinnerShow('Loading...........');
    let filter_params = {
      regulatory_subfunction_id: regulatory_subfunction_id,
      appworkflowstage_category_id: appworkflowstage_category_id
    };
    
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
  

  fetchConfigurationItemsDetails() {
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
            this.locationinfoData = this.data_record.data;
          }
          this.spinnerHide();
        },
        error => {
          this.spinnerHide();
        });
  }

  onFuncFiltersData($event){
    let filter_data = this.filterInformation.value;

    this.fetchOperationTypeDetails(filter_data);
   
  }
  onDropDownBoxValueChanged(e: any): void {
    
      this.treeBoxValue = e.value;
    }

    onTreeViewSelectionChanged(e: any): void {
      this.treeBoxValue = e.component.getSelectedNodeKeys();
    }
  
    onTreeViewReady(e: any): void {
      e.component.selectItem(this.treeBoxValue);
    }
  
  


  fetchConfigurationCountriesDetails() {

    var data_submit = {
      'table_name': 'par_countries',

    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            
            this.Countries = this.data_record.data;
          }

        },
        error => {

        });
  }
  
  fetchOperationTypeDetails(filter_data: any) {

    var data_submit = {
      'table_name': 'par_operation_type',
      filter_data: filter_data
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            
            this.operationType = this.data_record.data;
          }

        },
        error => {

        });
  }
  onLoadOperationTypeDetails() {

    var data_submit = {
      'table_name': 'par_operation_type',
     
    }
    this.configService.onLoadConfigurationData(data_submit)
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



  fetchOrganisationDetails() {

    var data_submit = {
      'table_name': 'tra_organisation_information',
      'is_enabled': true,
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            // this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.organisationDetails = this.data_record.data;
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
            this.fetchConfigurationItemsDetails();
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
    this.fetchConfigurationItemsDetails();
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

  applicationActionColClick(e, data) {
 
    var action_btn = e.itemData;
    if(action_btn.action === 'view_record'){
     console.log(this.funcApplicationPreveditDetails(data.data));
    }
    

  }

  funcApplicationPreveditDetails(app_data){
    
  }

  funcActionColClick(e, data) {
    var action_btn = e.itemData;
    if (action_btn.action === 'view_record') {
      this.funcApplicationPreveditDetails(data.data);
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
            this.fetchConfigurationItemsDetails();
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
            this.fetchConfigurationItemsDetails();
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
