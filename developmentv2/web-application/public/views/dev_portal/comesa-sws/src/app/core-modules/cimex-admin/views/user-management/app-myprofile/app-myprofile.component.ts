import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DxTabPanelTypes } from 'devextreme-angular/ui/tab-panel';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/core-services/authentication/authentication.service';
import { UserManagementService } from 'src/app/core-services/user-management/user-management.service';


@Component({
  selector: 'demo-app',
  templateUrl: './app-myprofile.component.html',
  styleUrls: ['./app-myprofile.component.css'],
})

export class AppMyprofileComponent {
  userAccountFrm: FormGroup;
  spinnerMessage: string;
  loadingVisible: boolean;
  is_readonly: boolean = true;
  parameter_name: string;
  response: any;
  data_record: any;
  userAccountTypeData: any;
  Countries: any;
  memberStatesData: any;
  dashboard_type_id: number;
  is_secretariat: boolean;
  has_memberstate_defination: boolean;
  Institutions: any;
  secretariatDepartmentsData: any;
  InstitutionDepartments: any;
  instituionTypeData: any;
 
  userTitles: any;
  IdentificationTypeData: any;
  isContentScrolled = false;
  isDataChanged = false;
  isLoading = true;
  organisationDepartmentData: any;
  organisationData:any;
  organisationTypeData:any;

  userGroupData: any;
  appRegulatoryFunctionData: any;
  appNavigationMenusPermisData: any;
  workflowPermissionData: any;

  tabsPositions: DxTabPanelTypes.Position[] = [
    'left', 'top', 'right', 'bottom',
  ];
  tabsPosition: DxTabPanelTypes.Position = this.tabsPositions[1];
  stylingModes: DxTabPanelTypes.TabsStyle[] = ['primary', 'secondary'];
  stylingMode: DxTabPanelTypes.TabsStyle = this.stylingModes[0];
  constructor(
    // private dataService: DataService, 
    public toastr: ToastrService,
    private userManagementService: UserManagementService,
    public userservice: UserManagementService,
    private AuthService: AuthenticationService
  ) {
    this.userAccountFrm = new FormGroup({
      user_title_id: new FormControl('', Validators.compose([Validators.required])),
      account_type_id: new FormControl('', Validators.compose([Validators.required])),
      country_of_origin_id: new FormControl('', Validators.compose([])),
      partner_state_id: new FormControl('', Validators.compose([])),
      organisation_type_id: new FormControl('', Validators.compose([])),
      organisation_id: new FormControl('', Validators.compose([])),
      organisation_department_id: new FormControl('', Validators.compose([])),
      registration_number: new FormControl('', Validators.compose([])),
      secretariat_department_id: new FormControl('', Validators.compose([])),
      user_group_id: new FormControl('', Validators.compose([])),
      id: new FormControl('', Validators.compose([])),
      identification_type_id: new FormControl('', Validators.compose([Validators.required])),
      identification_number: new FormControl('', Validators.compose([Validators.required])),
      first_name: new FormControl('', Validators.compose([Validators.required])),
      other_names: new FormControl('', Validators.compose([Validators.required])),
      email_address: new FormControl('', Validators.compose([Validators.required])),
      phone_number: new FormControl('', Validators.compose([Validators.required])),
    });

  }

  ngOnInit() {

    this.onLoadAccountTypesData();
    this.fetchUserCountryOfOrigin();
    // this.onLoadinstituionTypeData();
    this.onLoadpartnerStatesData();
    this.fetchUserTitles()

    this.onLoadIdentificationTypeData();
    this.onLoadsecreraitetDepartemData();
    this.spinnerHide();

    this.onGetSingleUserProfileDetails();
    this.onGetUsergroupInformation();
    this.onGetappRegulatoryFunctionPermissionData();
    this.onGetappNavigationMenusPermisData();
    this.onGetUsersworkflowPermissionData();
    this.onLoadorganisationTypeData();
    // this.onLoadorganisationData();
    this.onLoadorganisationDepartmentData();
  }


  onGetUsergroupInformation() {
    var data_submit = {
      'table_name': 'usr_users_groups'
    }
    this.spinnerShow('Loading');
    this.userservice.onGetUserInformation(data_submit, 'onGetUsergroupInformation')
      .subscribe(
        data => {
          this.data_record = data;

          if (this.data_record.success) {
            this.userGroupData = this.data_record.data;
          }
          this.spinnerHide()
        },
        error => {

          this.spinnerHide()
        });
  }

  onGetappRegulatoryFunctionPermissionData() {
    var data_submit = {
      'table_name': 'usr_users_groups'
    }
    this.spinnerShow('Loading');
    this.userservice.onGetUserInformation(data_submit, 'onGetappRegulatoryFunctionPermissionData')
      .subscribe(
        data => {
          this.data_record = data;

          if (this.data_record.success) {
            this.appRegulatoryFunctionData = this.data_record.data;
          }
          this.spinnerHide()
        },
        error => {

          this.spinnerHide()
        });
  }

  onGetappNavigationMenusPermisData() {
    var data_submit = {
      'table_name': 'usr_users_groups'
    }
    this.spinnerShow('Loading');
    this.userservice.onGetUserInformation(data_submit, 'onGetappNavigationMenusPermisData')
      .subscribe(
        data => {
          this.data_record = data;

          if (this.data_record.success) {
            this.appNavigationMenusPermisData = this.data_record.data;
          }
          this.spinnerHide()
        },
        error => {

          this.spinnerHide()
        });
  }

  onGetUsersworkflowPermissionData() {
    var data_submit = {
      'table_name': 'usr_users_groups'
    }
    this.spinnerShow('Loading');
    this.userservice.onGetUserInformation(data_submit, 'onGetUsersworkflowPermissionData')
      .subscribe(
        data => {
          this.data_record = data;

          if (this.data_record.success) {
            this.workflowPermissionData = this.data_record.data;
          }
          this.spinnerHide()
        },
        error => {

          this.spinnerHide()
        });
  }

  onGetSingleUserProfileDetails() {

    var data_submit = {
      'table_name': 'usr_users_information'
    }
    this.spinnerShow('Loading user Profile Details');

    this.userservice.onGetSingleUserProfileDetails(data_submit)
      .subscribe(
        data => {
          this.data_record = data;

          if (this.data_record.success) {
            this.userAccountFrm.patchValue(this.data_record.data)
          }
          this.spinnerHide()
        },
        error => {

          this.spinnerHide()
        });

  }

  onActionEditDetails() {
    this.is_readonly = false;
  }


  spinnerShow(spinnerMessage) {
    this.loadingVisible = true;
    this.spinnerMessage = spinnerMessage;
  }
  spinnerHide() {
    this.loadingVisible = false;
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

  onLoadpartnerStatesData() {
    var data_submit = {
      'table_name': 'par_countries',
      'is_partner_state': true
    }
    this.userManagementService.onLoadUserData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.memberStatesData = this.data_record.data;
          }
        },
        error => {

        });
  }

  onAccountTypeSelection($event) {

    if ($event.selectedItem) {

      let account_type = $event.selectedItem;

      this.dashboard_type_id = account_type.dashboard_type_id;
      this.has_memberstate_defination = account_type.has_memberstate_defination;
      this.is_secretariat = account_type.is_secretariat;

    } else {
      this.dashboard_type_id = 0;
      this.has_memberstate_defination = false;
      this.is_secretariat = false;
    }

    if (!this.has_memberstate_defination) {
      this.userAccountFrm.get('institution_id')?.clearValidators();
      this.userAccountFrm.get('institution_department_id')?.clearValidators();
      this.userAccountFrm.get('institution_type_id')?.clearValidators();
    }
    else {
      this.userAccountFrm.get('institution_id')?.setValidators([Validators.required]); // Add any other validators you need
      this.userAccountFrm.get('institution_department_id')?.setValidators([Validators.required]); // Add any other validators you need
      this.userAccountFrm.get('institution_type_id')?.setValidators([Validators.required]);
    }
  }

  onMemberStateChange(member_state_id) {
    let institution_type_id = this.userAccountFrm.get('institution_type_id')?.value;

    this.onLoadInstitutions(institution_type_id, member_state_id);

  }

  onInstitutionTypeChange(organisation_type_id) {
    let partner_state_id = this.userAccountFrm.get('partner_state_id')?.value;

    this.onLoadInstitutions(organisation_type_id, partner_state_id);
  }
  onLoadInstitutions(organisation_type_id, partner_state_id) {
    this.spinnerShow('Loading Institutions Details');
    var data_submit = {
      'table_name': 'tra_organisation_information',
      'organisation_type_id': organisation_type_id,
      'partner_state_id': partner_state_id
    }
    this.userManagementService.onLoadUserData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.organisationData = this.data_record.data;
          }
          this.spinnerHide();
        },
        error => {

          this.spinnerHide();
        });
  }

  onInstitutionChange(institution_id) {

    this.onLoadInstitutionDepartments(institution_id);

  }
  onLoadInstitutionDepartments(institution_id) {
    var data_submit = {
      'table_name': 'par_institutions_department',
      'institution_id': institution_id
    }
    this.userManagementService.onLoadUserData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.InstitutionDepartments = this.data_record.data;
          }
        },
        error => {

        });
  }

  onLoadsecreraitetDepartemData() {
    var data_submit = {
      'table_name': 'par_secretariat_departments'
    }
    this.userManagementService.onLoadUserData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.secretariatDepartmentsData = this.data_record.data;
          }
        },
        error => {

        });
  }

  onLoadinstituionTypeData() {
    var data_submit = {
      'table_name': 'par_institutions_types'
    }
    this.userManagementService.onLoadUserData(data_submit)
      .subscribe(
        data => {

          this.data_record = data;
          if (this.data_record.success) {
            this.instituionTypeData = this.data_record.data;
          }
        },
        error => {

        });
  }
  onLoadorganisationTypeData() {
    var data_submit = {
      'table_name': 'par_organisation_types'
    }
    this.userManagementService.onLoadUserData(data_submit)
      .subscribe(
        data => {

          this.data_record = data;
          if (this.data_record.success) {
            this.organisationTypeData = this.data_record.data;
          }
        },
        error => {

        });
  }

  onLoadorganisationDepartmentData() {
    var data_submit = {
      'table_name': 'par_organisation_departments'
    }
    this.userManagementService.onLoadUserData(data_submit)
      .subscribe(
        data => {

          this.data_record = data;
          if (this.data_record.success) {
            this.organisationDepartmentData = this.data_record.data;
          }
        },
        error => {

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
    this.spinnerShow('Updating User details');

    this.userManagementService.onUserAccountRegistration(this.userAccountFrm.value, 'onUpdateUserProfileInformation')
      .subscribe(
        response => {
          this.response = response;
          //the details 
          if (this.response.success) {
            this.toastr.success(this.response.message, 'Response');

          } else {
            this.toastr.error(this.response.message, 'Alert');
          }
          this.spinnerHide()
        },
        error => {
          this.toastr.error('Error Occurred', 'Alert');
          this.spinnerHide()
        });
  }

  scroll({ reachedTop = false }) {
    this.isContentScrolled = !reachedTop;
  }


}
