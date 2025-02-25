import { Component, Input, ViewContainerRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import { SpinnerVisibilityService } from 'ng-http-loader';

import { ToastrService } from 'ngx-toastr';
import { ConfigurationsService } from 'src/app/core-services/configurations/configurations.service';
import { ReportsService } from 'src/app/core-services/reports/reports.service';
import { UtilityService } from 'src/app/core-services/utilities/utility.service';

@Component({
  selector: 'app-sharedclinical-trialconfigurations',
  templateUrl: './sharedclinical-trialconfigurations.component.html',
  styleUrl: './sharedclinical-trialconfigurations.component.css'
})
export class SharedclinicalTrialconfigurationsComponent {
  @Input() table_name: string;
  @Input() parameter_name: string;
  hasReadpermissions: boolean;
  ClinicalTrialConfigFrm: FormGroup;
  onAddClinicalTrialConfiVisible: boolean;
  ClinicalTrialConfig: any[] = [];
  ClinicalTrialConfigData: any[] = [];
  productTypeData: any[] = [];
  countryData: any; 
  regionData: any;
  districtData: any;
  show_advancesearch: boolean;
  isnewprocess: boolean;
  config_record: string;
  deletePopupVisible = false;
  is_enabled: boolean;
  enabledisable_tracer: string;
  enabledisable_tracerdescription: string;
  enablePopupVisible: boolean;
  data_record: any;
  loadingVisible: boolean;
  spinnerMessage: string;
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
        { text: "Delete", action: 'delete_record', icon: 'fa fa-trash' }
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
  ) {


      this.ClinicalTrialConfigFrm = new FormGroup({
        id: new FormControl('', Validators.compose([])),
        name: new FormControl('', Validators.compose([Validators.required])),
        description: new FormControl('', Validators.compose([Validators.required])),
        is_enabled: new FormControl('', Validators.compose([])),
        contact_person: new FormControl('', Validators.compose([])),
        tpin_no: new FormControl('', Validators.compose([])),
        tin_no: new FormControl('', Validators.compose([])),
        country_id: new FormControl('', Validators.compose([])),
        product_type_id: new FormControl('', Validators.compose([])),
        physical_address: new FormControl('', Validators.compose([])),
        postal_address: new FormControl('', Validators.compose([])),
        telephone: new FormControl('', Validators.compose([])),
        mobile_no: new FormControl('', Validators.compose([])),
        fax: new FormControl('', Validators.compose([])),
        website: new FormControl('', Validators.compose([])),
        
      });
    
  

  }

  ngOnInit() {
    this.fetchClinicalTrialConfigData();
    this. fetchproductTypeData();
    this.fetchcountryData();
    this.fetchregionData();
    this.fetchdistrictData();
    this.fetchClinicalTrialConfigurations();
    this.scrollToTop();
 
  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
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

  onAddClinicalTrialConfig() {
    this.ClinicalTrialConfigFrm.reset();
    this.onAddClinicalTrialConfiVisible = true;
  }

  fetchClinicalTrialConfigurations() {
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
            this.ClinicalTrialConfigData = this.data_record.data;
          }
          this.spinnerHide();
        },
        error => {
          this.spinnerHide();
        });
  }
  onFuncSaveClinicalTrialConfigData() {

    const formData = new FormData();
    const invalid = [];
    const controls = this.ClinicalTrialConfigFrm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        this.toastr.error('Fill In All Mandatory fields with (*), missing value on ' + name.replace('_id', ''), 'Alert');
        return;
      }
    }
    if (this.ClinicalTrialConfigFrm.invalid) {
      return;
    }
    this.spinnerShow('saving ' + this.parameter_name);
    this.configService.onSaveConfigurationDetailsDetails(this.table_name, this.ClinicalTrialConfigFrm.value, 'onsaveConfigData')
      .subscribe(
        response => {
          this.response = response;
          //the details 
          if (this.response.success) {
            this. fetchClinicalTrialConfigurations();
            this.onAddClinicalTrialConfiVisible = false;
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

  
  fetchClinicalTrialConfigData() {

    var data_submit = {
      'table_name': this.table_name
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          ;
          if (this.data_record.success) {
            this.ClinicalTrialConfigData = this.data_record.data;
          }

        },
        error => {

        });

  }

  fetchcountryData() {

    var data_submit = {
      'table_name': 'par_countries'
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.countryData = this.data_record.data
          }
        },
        error => {

        });

  }
  fetchregionData() {

    var data_submit = {
      'table_name': 'par_regions'
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.regionData = this.data_record.data
          }
        },
        error => {

        });

  }
  fetchdistrictData() {

    var data_submit = {
      'table_name': 'par_districts'
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.districtData = this.data_record.data
          }
        },
        error => {

        });

  }
  fetchproductTypeData() {

    var data_submit = {
      'table_name': 'par_regulated_productstypes'
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.productTypeData = this.data_record.data
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
    this.ClinicalTrialConfigFrm.patchValue(data.data);
    this.onAddClinicalTrialConfiVisible = true;
  }
  funcDeleteDetails(data) {
    this.ClinicalTrialConfigFrm.patchValue(data.data);
    this.config_record = data.data.name;
    this.deletePopupVisible = true;
  }

  funcEnableDisableRecord(data) {
    this.ClinicalTrialConfigFrm.patchValue(data.data);

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
    this.configService.onEnableConfigurationsDetails(this.ClinicalTrialConfigFrm.value, this.table_name, this.parameter_name)
      .subscribe(
        response => {
          this.spinner.hide();
          this.response = response;
          if (this.response.success) {
            this.fetchClinicalTrialConfigurations();
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
    this.configService.onDeleteConfigurationsDetails(this.ClinicalTrialConfigFrm.value, this.table_name, this.parameter_name)
      .subscribe(
        response => {
          this.spinner.hide();
          this.response = response;
          if (this.response.success) {
            this.fetchClinicalTrialConfigurations();
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
