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
  selector: 'app-sharedhscodes-configurations',
  templateUrl: './sharedhscodes-configurations.component.html',
  styleUrl: './sharedhscodes-configurations.component.css'
})
export class SharedhscodesConfigurationsComponent {
  @Input() table_name: string;
  @Input() parameter_name: string;
  hasReadpermissions: boolean;
  createNewDataFrm: FormGroup;
  onAddNewConfiVisible: boolean;
  NewConfigData: any[] = [];
  chapterDefinationData: any[] = [];
  headingDefinationData: any[] = [];
  subHeadingDefinationData: any[] = [];
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


    this.createNewDataFrm = new FormGroup({
      id: new FormControl('', Validators.compose([])),
      name: new FormControl('', Validators.compose([Validators.required])),
      description: new FormControl('', Validators.compose([Validators.required])),
      is_enabled: new FormControl('', Validators.compose([])),
      hscode: new FormControl('', Validators.compose([])),
      chapters_defination_id: new FormControl('', Validators.compose([])),
      heading_definations_id: new FormControl('', Validators.compose([])),
      subheading_definations_id: new FormControl('', Validators.compose([])),
      tariff_code: new FormControl('', Validators.compose([])),
      country_code: new FormControl('', Validators.compose([])),
      tariff_rate: new FormControl('', Validators.compose([])),
      code: new FormControl('', Validators.compose([])),
    });



  }

  ngOnInit() {
    this.fetchNewConfigData();
    this.fetchChapterDefinationData();
    this.fetchNewConfigurations();
    this.fetchHeadingDefinationData();
    this.fetchSubHeadingDefinationData()
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
            this.fetchNewConfigurations();
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


  fetchNewConfigData() {

    var data_submit = {
      'table_name': this.table_name
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          ;
          if (this.data_record.success) {
            this.NewConfigData = this.data_record.data;
          }

        },
        error => {

        });

  }

  fetchChapterDefinationData() {
    var data_submit = {
      'table_name': 'par_hscodechapters_defination'
    }

    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.chapterDefinationData = this.data_record.data
          }
        },
        error => {

        });
  }

  fetchHeadingDefinationData() {

    var data_submit = {
      'table_name': 'par_hscodesheading_definations'
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.headingDefinationData = this.data_record.data
          }
        },
        error => {

        });
  }

  fetchSubHeadingDefinationData() {

    var data_submit = {
      'table_name': 'par_hscodessubheading_defination'
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.subHeadingDefinationData = this.data_record.data
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

