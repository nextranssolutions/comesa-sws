import { Component, ViewContainerRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ToastrService } from 'ngx-toastr';
import { ConfigurationsService } from 'src/app/core-services/configurations/configurations.service';
import { ServiceAdmnistrationService } from 'src/app/core-services/system-admnistration/system-admnistration.service';
import { UtilityService } from 'src/app/core-services/utilities/utility.service';

@Component({
  selector: 'app-paymentintegration-setup',
  templateUrl: './paymentintegration-setup.component.html',
  styleUrl: './paymentintegration-setup.component.css'
})
export class PaymentintegrationSetupComponent {
table_name: string = 'tra_payment_integration';
  parameter_name: string = 'payment_integration';
  show_advancesearch: boolean;
  resetcolumns = 'resetcolumns,routerLink';
  is_enabled: boolean;
  data_record: any;
  action_url: string;
  showWizard = false;
  response: any;
  payRemittanceData: any;
  payIntegrationData: any;
  config_record: string;
  deletePopupVisible = false;
  enabledisable_permit_type: string;
  enabledisable_permit_typedescription: string;
  enablePopupVisible: boolean;
  loading = false;

  PaymentIntegrationDetails: any;
  createNewDataFrm: FormGroup;
  PaymentIntegrationPopupVisible: boolean = false;
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
        { text: "Edit Payment Integration", action: 'edit_record', icon: 'fa fa-edit' },
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
          paymentremittance_options_id: new FormControl('', Validators.compose([])),
          paymentintegrationtype_id: new FormControl('', Validators.compose([])),
          signed_fields_name: new FormControl('', Validators.compose([])),
          payment_url: new FormControl('', Validators.compose([])),
          name: new FormControl('', Validators.compose([])),
          description: new FormControl('', Validators.compose([])),
          code: new FormControl('', Validators.compose([])),
          is_enabled: new FormControl('', Validators.compose([]))
        });
      }

      
    ngOnInit() {
      this.fetchPaymentIntegrationDetails();
      this.fetchPayRemittanceData();
      this.fetchPayIntegrationData();
      this.spinnerShow('Loading ' + this.parameter_name);
    }

      onCellPrepared(e) {
        this.utilityService.onCellCountriesPrepared(e);
      }

    onAddNewPaymentIntegrationSetup() {
    this.createNewDataFrm.reset();
    this.PaymentIntegrationPopupVisible = true;
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

fetchPaymentIntegrationDetails() {
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
            this.PaymentIntegrationDetails = this.data_record.data;
          }
          this.spinnerHide();
        },
        error => {
          this.spinnerHide();
        });
  }

  fetchPayRemittanceData() {

    var data_submit = {
      'table_name': 'par_paymentremittance_options'
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.payRemittanceData = this.data_record.data
          }
        },
        error => {

        });
  }
    
  fetchPayIntegrationData(){

    var data_submit = {
      'table_name': 'par_paymentintegration_types'
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.payIntegrationData = this.data_record.data
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

  spinnerShow(spinnerMessage) {
    this.loadingVisible = true;
    this.spinnerMessage = spinnerMessage;
  }
  spinnerHide() {
    this.loadingVisible = false;
  }

  onUpdatePaymentIntegration() {

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
            this.fetchPaymentIntegrationDetails();
            this.PaymentIntegrationPopupVisible = false;
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
          this.fetchPaymentIntegrationDetails();
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
          this.fetchPaymentIntegrationDetails();
          
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
  this.PaymentIntegrationPopupVisible = true;
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
