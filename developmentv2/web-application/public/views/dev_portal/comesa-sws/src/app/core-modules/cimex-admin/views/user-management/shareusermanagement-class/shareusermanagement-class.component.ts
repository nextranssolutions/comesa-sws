import { Component, Directive, OnInit, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppSettings } from 'src/app/app-settings';
import { ToastrService } from 'ngx-toastr';
import { UserManagementService } from 'src/app/core-services/user-management/user-management.service';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core-services/authentication/authentication.service';
import { UtilityService } from 'src/app/core-services/utilities/utility.service';

import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import { ReportsService } from 'src/app/core-services/reports/reports.service';
import { ExpressionOfInterestManagementService } from 'src/app/core-services/expresion-of-interest-management/expression-of-interest-management.service';

@Directive({
  selector: '[appShareusermanagementClass]' // ✅ Use attribute selector for directives
})
export class ShareusermanagementClassComponent {
  userAccountFrm: FormGroup;
  userAccountRolesData:any;
  loadingVisible: boolean;
  spinnerMessage: string;
  table_name: string;
  parameter_name: string;
  seeprofile: boolean;
  approvalPopupVisible: boolean;
  active_accounts: number = 0;
  rejected_accounts: number = 0;
  pending_verification: number = 0;
  pending_approval: number = 0;
  user_information_id: number;
  addPopupVisible: boolean;
  ActiveUserAccountss: any;
  application_code: number;
  data_record: any;
  deletePopupVisible: boolean;
  config_record: string;
  response: any;
  loading: boolean;
  UserTitleData: any;
  ActiveUserAccounts: any;
  AccountTypeData: any;
  CountriesData: any;
  IdentificationTypeData: any;
  secretariatDepartmentsData: any;
  is_eacsecretariat: boolean;
  is_super_admin: boolean;
  instituionTypeData: any;
  has_partnerstate_defination: boolean;
  dashboard_type_id: number;
  partnerStatesData: any;
  userAccountTypeData: any;
  organisationDepartmentsdata: any;
  expertSelectionAndAppointmentForm: FormGroup;
  secretariateAccountss: any;
  institutionsData: any;
  IdentificationType: any;
  Countries: any;
  userTitles: any;
  is_readonly: boolean = true;
  appointPopupVisible: boolean;
  usergroupPopupVisible: boolean;
  show_advancesearch: boolean;
  alluserGroupData: any;
  accountStatuseData: any;
  organisationData: any;
  usrapprovalPopupVisible: boolean;
  decision_description: string;
  appworkflow_status_id: number;
  user_group_id: number;
  usrrejectionPopupVisible: boolean;
  apiUserAccounts: any;
  user_group_data: any;
  externalUsersData: any;
  userGroupId: number;
  systemUserGroupsData:any;
  permitActiveExpertAccountsMenuItems = [
    {
      text: "Action",
      icon: 'menu',
      items: [
        { text: "Edit/Preview User Account", action: 'edit_record', icon: 'fa fa-edit' },
        { text: "Disable/Reject User Account", action: 'disable_useraccount', icon: 'fa fa-trash' },
    
      ]
    }
  ];

  constructor(
    private spinner: SpinnerVisibilityService,
    private router: Router,
    private AuthService: AuthenticationService,
    public toastr: ToastrService,
    public viewRef: ViewContainerRef,
    public utilityService: UtilityService,
    private userManagementService: UserManagementService,
    private userservice: UserManagementService,
    private reportingAnalytics: ReportsService,
    private eoiService: ExpressionOfInterestManagementService
  ) {

    this.userAccountFrm = new FormGroup({
      id: new FormControl('', Validators.compose([])),
      user_title_id: new FormControl('', Validators.compose([Validators.required])),
      account_type_id: new FormControl('', Validators.compose([Validators.required])),
      country_of_origin_id: new FormControl('', Validators.compose([])),
      account_roles_id: new FormControl('', Validators.compose([Validators.required])),
      organisation_id: new FormControl('', Validators.compose([Validators.required])),
      organisation_department_id: new FormControl('', Validators.compose([])),
      user_groups_ids: new FormControl('', Validators.compose([])),
      identification_type_id: new FormControl('', Validators.compose([Validators.required])),
      identification_number: new FormControl('', Validators.compose([Validators.required])),
      first_name: new FormControl('', Validators.compose([Validators.required])),
      other_names: new FormControl('', Validators.compose([Validators.required])),
      email_address: new FormControl('', Validators.compose([Validators.required])),
      phone_number: new FormControl('', Validators.compose([])),
    });

    this.onLoadAccountTypesData();
    this.fetchUserTitles()
    this.fetchUserIdentificationType();
    this.onloadUserTitleData();
    this.onLoadAccountTypeData();
    this.onLoadCountries();
    this.onLoadIdentificationTypeData();
    // this.onLoadsecreraitetDepartemData();
    this.spinnerHide();
    this.onLoadaccountStatuseData();

    this.onLoadorganisationData();
    this.onLoaduserAccountRolesData();

  }
  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scrolling for better UX
    });
  }
  onActionEditDetails() {
    this.is_readonly = false;
  }
  
  onLoaduserAccountRolesData() {
    var data_submit = {
      'table_name': 'usr_usersaccount_roles'
    }
    this.userManagementService.onLoadUserData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.userAccountRolesData = this.data_record.data;
          }
        },
        error => {

        });
  }
  onLoadaccountStatuseData() {
    var data_submit = {
      'table_name': 'wf_appworkflow_statuses'
    }
    this.userManagementService.onLoadUserData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.accountStatuseData = this.data_record.data;
          }
        },
        error => {

        });
  }
  onLoadorganisationData() {
    var data_submit = {
      'table_name': 'tra_organisation_information'
    }
    this.userManagementService.onLoadUserData(data_submit)
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
  
  onLoadAllUserGroups(account_type_id) {
    var data_submit = {
      'table_name': 'usr_users_groups',
      'account_type_id':account_type_id,
      is_default_usergroup: true
    }
    this.userManagementService.onLoadUserData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.systemUserGroupsData = this.data_record.data;
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

  // onLoadsecreraitetDepartemData() {
  //   var data_submit = {
  //     'table_name': 'par_secretariat_departments'
  //   }
  //   this.userManagementService.onLoadUserData(data_submit)
  //     .subscribe(
  //       data => {
  //         this.data_record = data;
  //         if (this.data_record.success) {
  //           this.secretariatDepartmentsData = this.data_record.data;
  //         }
  //       },
  //       error => {

  //       });
  // }

  fetchUserTitles() {
    var data_submit = {
      'table_name': 'usr_users_title'
    }
    this.userManagementService.onLoadUserData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.userTitles = this.data_record.data;
          }
        },
        error => {

        });
  }
  onLoadpartnerStatesData() {
    var data_submit = {
      'table_name': 'par_countries',
      'is_member_state': true
    }
    this.userManagementService.onLoadUserData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.partnerStatesData = this.data_record.data;
          }
        },
        error => {

        });
  }
  fetchUserCountryOfOrigin() {
    var data_submit = {
      'table_name': 'par_countries'
    }
    this.userManagementService.onLoadUserData(data_submit)
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
  // onLoadinstituionTypeData() {
  //   var data_submit = {
  //     'table_name': 'par_institutions_types'
  //   }
  //   this.userManagementService.onLoadUserData(data_submit)
  //     .subscribe(
  //       data => {
  //         this.data_record = data;
  //         if (this.data_record.success) {
  //           this.instituionTypeData = this.data_record.data;
  //         }
  //       },
  //       error => {

  //       });
  // }
  fetchUserIdentificationType() {
    var data_submit = {
      'table_name': 'usr_identification_type'
    }
    this.userManagementService.onLoadUserData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.IdentificationType = this.data_record.data;
          }
        },
        error => {

        });
  }
  onLoadAccountTypesData() {
    var data_submit = {
      'table_name': 'sys_account_types'
    }
    this.userManagementService.onLoadUserData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.userAccountTypeData = this.data_record.data;
          }
        },
        error => {

        });
  }
  //onPatnerStateSelection
  onAccountTypeSelection($event) {

    if ($event.selectedItem) {

      let account_type = $event.selectedItem;
      this.onLoadAllUserGroups(account_type.id)
      this.dashboard_type_id = account_type.dashboard_type_id;

    } else {
      this.dashboard_type_id = 0;
    }

  }
 
   onLoadorganisationDepartmentsdata(organisation_id) {
     var data_submit = {
       'table_name': 'par_organisation_departments',
       'organisation_id': organisation_id
     }
     this.userManagementService.onLoadUserData(data_submit)
       .subscribe(
         data => {
           this.data_record = data;
           if (this.data_record.success) {
             this.organisationDepartmentsdata = this.data_record.data;
           }
         },
         error => {

         });
   }

  
  onOrganisationSelectionChange($event) {
     
     if ($event.selectedItem) {

      let organisation = $event.selectedItem;
    
      this.onLoadorganisationDepartmentsdata(organisation.id)

     }
   }
  

  onAddActiveUserAccountsClick() {
    this.is_readonly = false;
    this.addPopupVisible = true;
    this.userAccountFrm.reset();
  }

  onLoadIdentificationTypeData() {

    var data_submit = {
      'table_name': 'usr_identification_type'
    }
    this.userManagementService.onLoadUserData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;

          if (this.data_record.success) {
            this.IdentificationTypeData = this.data_record.data;
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
  onLoadCountries() {

    var data_submit = {
      'table_name': 'par_countries',
      is_enabled: true,
    }
    this.userManagementService.onLoadUserData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;

          if (this.data_record.success) {
            this.CountriesData = this.data_record.data;
          }

        },
        error => {

        });

  }
  onLoadAccountTypeData() {

    var data_submit = {
      'table_name': 'sys_account_types'
    }
    this.userManagementService.onLoadUserData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;

          if (this.data_record.success) {
            this.AccountTypeData = this.data_record.data;
          }

        },
        error => {

        });

  }
  onloadUserTitleData() {

    var data_submit = {
      'table_name': 'usr_users_title'
    }
    this.userManagementService.onLoadUserData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;

          if (this.data_record.success) {
            this.UserTitleData = this.data_record.data;
          }

        },
        error => {

        });

  }

  fetchUserDetails(appworkflow_status_id = 0, user_group_id = 0) {
    this.spinnerShow('Loading Active Users ...........');

    var data_submit = {
      'table_name': 'usr_users_information',
      'appworkflow_status_id': appworkflow_status_id,
      'user_group_id': user_group_id,
    }
    this.userManagementService.onGetUserInformation(data_submit, 'onGetUserInformation')
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.ActiveUserAccounts = this.data_record.data;
          }
          this.spinnerHide();
        },
        error => {

        });

  }

  fetchApiUserDetails(appworkflow_status_id = 0, is_eacsecretariat = true) {
    this.spinnerShow('Loading Active Users ...........');

    var data_submit = {
      'table_name': 'usr_api_users',
      // 'appworkflow_status_id': appworkflow_status_id,
      // is_eacsecretariat: is_eacsecretariat
    }
    this.userManagementService.onGetUserInformation(data_submit, 'onGetApiUserInformation')
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.apiUserAccounts = this.data_record.data;
          }
          this.spinnerHide();
        },
        error => {

        });

  }

  fetchExternalUserDetails(appworkflow_status_id = 0, is_eacsecretariat = true) {
    this.spinnerShow('Loading Active Users ...........');

    var data_submit = {
      'table_name': 'usr_external_users',
      // 'appworkflow_status_id': appworkflow_status_id,
      // is_eacsecretariat: is_eacsecretariat
    }
    this.userManagementService.onGetUserInformation(data_submit, 'onGetExternalUserInformation')
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.externalUsersData = this.data_record.data;
          }
          this.spinnerHide();
        },
        error => {

        });

  }


  permitActiveUserAccountsActionColClick(e, data) {
    var action_btn = e.itemData;
    if (action_btn.action === 'edit_record') {
      this.is_readonly = true;

      this.funcEditDetails(data);
    } else if (action_btn.action === 'view_profile') {
      this.is_readonly = true;
      this.funcprofileDetails(data);
    } else if (action_btn.action === 'approve_useraccount') {

      this.decision_description = 'Approve User Account ';
      this.funcApprovaUserData(data, 2);
    } else if (action_btn.action === 'appoint_expert') {
      this.decision_description = 'Appoint Expert Account ';
      this.funcappointExpert(data, 9);
    } else if (action_btn.action === 'disable_useraccount') {
      this.decision_description = 'Reject/Disable User Account ';
      this.funcRejectUserData(data, 3);
    }
    
  }


  funcApprovaUserData(data, decision_id) {
    this.userAccountFrm.patchValue(data.data);
    this.config_record = data.data.name;
    this.appworkflow_status_id = decision_id;
    this.usrapprovalPopupVisible = true;

  }

  funcRejectUserData(data, decision_id) {
    this.userAccountFrm.patchValue(data.data);
    this.config_record = data.data.name;
    this.appworkflow_status_id = decision_id;
    this.usrrejectionPopupVisible = true;
  }

  funcappointExpert(data, decision_id) {
    this.userAccountFrm.patchValue(data.data);
    this.config_record = data.data.name;
    this.appworkflow_status_id = decision_id;
    this.appointPopupVisible = true;
  }
  onPopupHidden() {
    this.fetchUserDetails(0, this.user_group_id);
  }

  funcEditDetails(data) {
    this.userAccountFrm.patchValue(data.data);
    this.addPopupVisible = true;
  }
  funcDeleteDetails(data) {
    this.userAccountFrm.patchValue(data.data);
    this.config_record = data.data.name;
    this.deletePopupVisible = true;
  }

  funcprofileDetails(data) {
    this.userAccountFrm.patchValue(data.data);
    this.seeprofile = true;
  }



  onCancelPopupClick() {
    this.approvalPopupVisible = false;
  }


  onDeleteUserData() {
    this.spinner.show();
    this.userManagementService.onDeleteUserData(this.userAccountFrm.value, this.table_name, this.parameter_name)
      .subscribe(
        response => {
          this.spinner.hide();
          this.response = response;
          if (this.response.success) {
            this.fetchUserDetails(0, this.user_group_id);
            this.toastr.success(this.response.message, 'Response');
          }
          else {

            this.toastr.success(this.response.message, 'Response');

          }

        },
        error => {
          this.loading = false;
        });

  }

  onUserAccountApproval() {
    this.spinnerShow(this.decision_description + ' User Account.......................... ');

    this.userManagementService.onUserAccountApproval(this.userAccountFrm.value, this.appworkflow_status_id, this.decision_description)
      .subscribe(
        response => {
          this.spinner.hide();
          this.response = response;
          if (this.response.success) {
            this.fetchUserDetails(0, this.user_group_id);
            this.usrapprovalPopupVisible = false;
            this.toastr.success(this.response.message, 'Response');
          }
          else {

            this.toastr.success(this.response.message, 'Response');

          }
          this.spinnerHide();
        },
        error => {
          this.loading = false;
        });

  }

  onUserAccountRejection() {
    this.spinnerShow(this.decision_description + ' User Account.......................... ');

    this.userManagementService.onUserAccountRejection(this.userAccountFrm.value, this.appworkflow_status_id, this.decision_description)
      .subscribe(
        response => {

          this.response = response;
          if (this.response.success) {
            this.fetchUserDetails(0, this.user_group_id);
            this.usrrejectionPopupVisible = false;
            this.toastr.success(this.response.message, 'Response');
          }
          else {

            this.toastr.success(this.response.message, 'Response');

          }
          this.spinnerHide();
        },
        error => {
          this.loading = false;
        });

  }
  onsaveActiveUserAccountsDetails() {
    const formData = new FormData();
    const invalid = [];
    const controls = this.userAccountFrm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        this.toastr.error('Fill In All Mandatory fields with (*), missing value on ' + name.replace('_id', ''), 'Alert');
        return;
      }
    }
    if (this.userAccountFrm.invalid) {
      return;
    }
    this.spinnerShow('');
    this.userservice.onUserAccountRegistration(this.userAccountFrm.value, 'onsaveUserRegistrationData')
      .subscribe(
        response => {
          this.response = response;
          //the details 
          if (this.response.success) {
            this.fetchUserDetails(0, this.user_group_id);
            this.addPopupVisible = false;
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

  onCellPrepared(e) {
    this.onCellUserAccountPrepared(e);
  }
  onCellUserAccountPrepared(e) {
    if (e.rowType === "data" && e.column.dataField === "user_group_id") {
      let user_group_id = e.data.user_group_id;

      if (user_group_id < 1) {

        e.cellElement.style.color = 'white';
        e.cellElement.style.backgroundColor = '#FF0000';

      } else {

        e.cellElement.style.color = 'white';
        e.cellElement.style.backgroundColor = '#008000';

      }
    }
    if (e.rowType === "data" && e.column.dataField === "appworkflow_status_id") {
      let appworkflow_status_id = e.data.appworkflow_status_id;

      if (appworkflow_status_id == 1) {

        e.cellElement.style.color = 'white';
        e.cellElement.style.backgroundColor = '#0000FF';

      } else if (appworkflow_status_id == 3) {

        e.cellElement.style.color = 'white';
        e.cellElement.style.backgroundColor = '#FF0000';

      } else if (appworkflow_status_id == 2) {

        e.cellElement.style.color = 'white';
        e.cellElement.style.backgroundColor = '#008000';

      } else {

        e.cellElement.style.color = 'white';
        e.cellElement.style.backgroundColor = '#808080';

      }
    }



  }
  onCountrySelection($event) {
    if ($event.selectedItem) {
      let country_data = $event.selectedItem,
        country_code = '+' + country_data.phonecode;
      this.userAccountFrm.get('phone_number')?.setValue(country_code);
    }
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