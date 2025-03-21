import { Component, ViewContainerRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ToastrService } from 'ngx-toastr';
import { ConfigurationsService } from 'src/app/core-services/configurations/configurations.service';
import { ServiceAdmnistrationService } from 'src/app/core-services/system-admnistration/system-admnistration.service';
import { UtilityService } from 'src/app/core-services/utilities/utility.service';

@Component({
  selector: 'app-restrictions-prohibitions',
  templateUrl: './restrictions-prohibitions.component.html',
  styleUrl: './restrictions-prohibitions.component.css'
})
export class RestrictionsProhibitionsComponent {
  table_name: string = 'tra_restrictions_prohibitions';
  parameter_name: string = 'restrictions_prohibitions';
  show_advancesearch: boolean;
  resetcolumns = 'resetcolumns,routerLink';
  is_enabled: boolean;
  data_record: any;
  action_url: string;
  showWizard = false;
  chapterDefinationData: any;
  subHeadingDefinationData: any;
  permitOperationsData: any;
  HeadingDefinationData: any;
  response: any;
  config_record: string;
  deletePopupVisible = false;
  enabledisable_permit_type: string;
  enabledisable_permit_typedescription: string;
  enablePopupVisible: boolean;
  loading = false;

  restrictionProhibitionDetails: any;
  restrictionProhibitionPopupVisible: boolean = false;
  createNewDataFrm: FormGroup;
  loadingVisible: boolean;
  spinnerMessage: string;
  regStatusOptions = [
    { value: true, text: 'Yes' },
    { value: false, text: 'No' },
  ];

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


    constructor(
        private spinner: SpinnerVisibilityService,
        private router: Router,
        public toastr: ToastrService,
        public viewRef: ViewContainerRef,
        public utilityService: UtilityService,
        public configService: ConfigurationsService,
        private admnistrationService: ServiceAdmnistrationService,
       
      ) {
    
        this.createNewDataFrm = new FormGroup({
          id: new FormControl('', Validators.compose([])),
          name: new FormControl('', Validators.compose([])),
          description: new FormControl('', Validators.compose([])),
          restrictions_accesslinks: new FormControl('', Validators.compose([])),
          chapters_defination_id: new FormControl('', Validators.compose([])),
          heading_defination_id: new FormControl('', Validators.compose([])),
          subheading_defination_id: new FormControl('', Validators.compose([])),
          permit_operations_id: new FormControl('', Validators.compose([])),
          code: new FormControl('', Validators.compose([])),
          is_enabled: new FormControl('', Validators.compose([]))
        });
      }

      
    ngOnInit() {
      this.fetchrestrictionProhibitionDetails();
      this.fetchChapterDefinationData();
      this.fetchHeadingDefinationData();
      this.fetchSubHeadingDefinationData();
      this.fetchPermitOperationsData()
      this.spinnerShow('Loading ' + this.parameter_name);
    }

      onCellPrepared(e) {
        this.utilityService.onCellCountriesPrepared(e);
      }

  onAddNewRestrictionPohibition() {
    this.createNewDataFrm.reset();
    this.restrictionProhibitionPopupVisible = true;
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

  

 fetchrestrictionProhibitionDetails() {
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
            this.restrictionProhibitionDetails = this.data_record.data;
          }
          this.spinnerHide();
        },
        error => {
          this.spinnerHide();
        });
  }

  fetchChapterDefinationData() {
  
    var data_submit = {
      'table_name': 'par_hscodechapters_defination',
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.chapterDefinationData = this.data_record.data;
          }
        },
        error => {
        });
  }

  fetchHeadingDefinationData() {
  
    var data_submit = {
      'table_name': 'par_hscodesheading_definations',
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.HeadingDefinationData = this.data_record.data;
          }
        },
        error => {
        });
  }

  fetchSubHeadingDefinationData() {
  
    var data_submit = {
      'table_name': 'par_hscodessubheading_defination',
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.subHeadingDefinationData = this.data_record.data;
          }
        },
        error => {
        });
  }

  
  fetchPermitOperationsData() {
  
    var data_submit = {
      'table_name': 'par_operation_type',
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.permitOperationsData = this.data_record.data;
          }
        },
        error => {
        });
        this.spinnerHide();
  }

  funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width / 100;
  }
  funcpopHeight(percentage_height) {
    return window.innerHeight * percentage_height / 100;
  }
  finishFunction() {

  }

  spinnerShow(spinnerMessage) {
    this.loadingVisible = true;
    this.spinnerMessage = spinnerMessage;
  }
  spinnerHide() {
    this.loadingVisible = false;
  }

  onUpdateRestrictions() {

    this.showWizard = true;
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

    this.admnistrationService.onSaveSystemAdministrationDetails(this.table_name, this.createNewDataFrm.value, 'onsaveSysAdminData')
      .subscribe(
        response => {
          this.response = response;

          if (this.response.success) {
            this.fetchrestrictionProhibitionDetails();
            this.restrictionProhibitionPopupVisible = false;
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
        }
      );
}

onDeleteSystemAdministrationDetails() {

  this.admnistrationService.onDeleteSystemAdministrationDetails(this.createNewDataFrm.value, this.table_name, this.parameter_name)
    .subscribe(
      response => {

        this.response = response;
        if (this.response.success) {
          this.fetchrestrictionProhibitionDetails();
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

iniateEnableDisableRecord() {

  this.spinnerShow('Saving_details');
  this.admnistrationService.onEnablePermitTypeDetails(this.createNewDataFrm.value, this.table_name, this.parameter_name)
    .subscribe(
      response => {
        this.spinner.hide();
        this.response = response;
        if (this.response.success) {
          this.fetchrestrictionProhibitionDetails();
          this.restrictionProhibitionPopupVisible = false;
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


funcEditDetails(data) {
  this.createNewDataFrm.patchValue(data.data);
  this.restrictionProhibitionPopupVisible = true;
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
}
