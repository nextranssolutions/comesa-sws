
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DxButtonTypes } from 'devextreme-angular/ui/button';
import { DxTextBoxTypes } from 'devextreme-angular/ui/text-box';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/core-services/authentication/authentication.service';
import { LanguagesService } from 'src/app/core-services/languages/languages.service';
import { UserManagementService } from 'src/app/core-services/user-management/user-management.service';


@Component({
  selector: 'app-top-unisection',
  templateUrl: './top-unisection.component.html',
  styleUrl: './top-unisection.component.css'
})
export class TopUnisectionComponent {
  dashboard_type_id: number = 2;
  process_id: number = 0;
  systems_functionality_id: number;
  is_closablewin: boolean = true;
  userGroupName: string = '';
  userFirstName: string = '';
  userCountryOfOrigin: string = '';
  userOtherNames: string = '';
  userEmail: string = '';
  isLoggedIn: any;
  loadingVisible: boolean;
  spinnerMessage: string;
  translations: any;
  response: any;
  data_record: any;
  is_readonly: boolean = true;
  changePaswordWFrm: FormGroup;
  userAccountFrm: FormGroup;
  is_changepasswordwin: boolean;
  userAccountTypeData: any;
  is_viewprofilewin: boolean;
  passwordMode: DxTextBoxTypes.TextBoxType = 'password';
  passwordButton: DxButtonTypes.Properties = {
    icon: 'eyeopen',
    stylingMode: 'text',
    onClick: () => {
      this.passwordMode = this.passwordMode === 'text' ? 'password' : 'text';
    },
  };

  constructor(public translate: TranslateService,
    public toastr: ToastrService,
    public AuthService: AuthenticationService,
    private translationService: LanguagesService,
    public userservice: UserManagementService,
    private router: Router,
  ) {

    this.changePaswordWFrm = new FormGroup({
      password: new FormControl('', Validators.compose([Validators.required])),
      new_password: new FormControl('', Validators.compose([Validators.required])),
      confirm_password: new FormControl('', Validators.compose([Validators.required]))
    });

    this.userAccountFrm = new FormGroup({
      id: new FormControl('', Validators.compose([])),
      user_title_id: new FormControl('', Validators.compose([])),
      identification_type_id: new FormControl('', Validators.compose([])),
      country_of_origin_id: new FormControl('', Validators.compose([])),
      institution_id: new FormControl('', Validators.compose([])),
      institution_department_id: new FormControl('', Validators.compose([])),
      user_status: new FormControl('', Validators.compose([])),
      email_address: new FormControl('', Validators.compose([])),
      first_name: new FormControl('', Validators.compose([])),
      surname: new FormControl('', Validators.compose([])),
      phone_number: new FormControl('', Validators.compose([Validators.required])),
      workflow_status_id: new FormControl('', Validators.compose([])),
      account_roles_id: new FormControl('', Validators.compose([])),
      last_login_time: new FormControl('', Validators.compose([])),
      account_type_id: new FormControl('', Validators.compose([])),
      directorate_id: new FormControl('', Validators.compose([])),
      identification_number: new FormControl('', Validators.compose([])),
      website: new FormControl('', Validators.compose([])),
      status_id: new FormControl('', Validators.compose([])),
      directorate_units: new FormControl('', Validators.compose([])),
      created_on: new FormControl('', Validators.compose([Validators.required])),
      postal_address: new FormControl('', Validators.compose([])),
      name: new FormControl('', Validators.compose([])),
    });

    this.selectionLanguage('English');
  }
  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scrolling for better UX
    });
  }
  switchLang(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const lang = selectElement.value;
    this.loadTranslations(lang);
  }

  switchClickLang(language: string): void {
    this.loadTranslations(language);
  }

  ngOnInit(): void {

    this.AuthService.getUserGroupName().subscribe((userGroupName: string) => {
      this.userGroupName = userGroupName;
    });

    this.AuthService.getUserFirstName().subscribe((userFirstName: string) => {
      this.userFirstName = userFirstName;
    });

    this.AuthService.getUserOtherNames().subscribe((userOtherNames: string) => {
      this.userOtherNames = userOtherNames;
    });

    this.AuthService.getUserEmailAddress().subscribe((userEmail: string) => {
      this.userEmail = userEmail;
    });

    this.onCheckUserPWDRequestDetails();

  }

  selectionLanguage(locale: string) {
    // this.translate.use(lang);
    this.translate.addLangs(['English', 'French', 'Swahili', 'Arabic', 'Portuguese']);
    //translation  
    this.spinnerShow('Loading system Language Translation')
    this.translationService.getTranslations(locale).subscribe(
      (translations) => {
        this.spinnerHide()
        this.translations = translations;
        this.translate.setTranslation(locale, translations, true);
        this.translate.use(locale);
      },
      (error) => {

      }
    );
  }

  funcViewUserProfiledetails() {
    this.is_viewprofilewin = true;
  }

  spinnerShow(spinnerMessage) {
    this.loadingVisible = true;
    this.spinnerMessage = spinnerMessage;
  }
  spinnerHide() {
    this.loadingVisible = false;
  }
  onFuncChangePassword() {
    this.is_changepasswordwin = true;
  }

  loadTranslations(locale: string) {
    this.translationService.getTranslations(locale).subscribe(
      (translations) => {
        this.translations = translations;
        this.translate.setTranslation(locale, translations, true);
        this.translate.use(locale);
      },
      (error) => {

      }
    );
  }

  funcUserLogOut() {
    this.spinnerShow('Logging Out');
    this.AuthService.funcUserLogOut();
  }

  funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width / 100;
  }

  funcpopHeight(percentage_height) {
    return window.innerHeight * percentage_height / 100;
  }
  onLoadAccountTypesData() {
    var data_submit = {
      'table_name': 'sys_account_types'
    }
    this.userservice.onLoadUserData(data_submit)
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
  onFuncChangePasswordRequest() {

    const formData = new FormData();
    const invalid = [];
    const controls = this.changePaswordWFrm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        this.toastr.error('Fill In All Mandatory fields with (*), missing value on ' + name.replace('_id', ''), 'Alert');
        return;
      }
    }
    if (this.changePaswordWFrm.invalid) {
      this.toastr.warning('Please fill in all required fields.', 'Warning');

      return;
    }
    let old_password = this.changePaswordWFrm.get('password')?.value;
    let new_password = this.changePaswordWFrm.get('new_password')?.value;
    let confirm_password = this.changePaswordWFrm.get('confirm_password')?.value;
    if (new_password != confirm_password) {

      this.toastr.warning('Password MistMatch.', 'Warning');

      return;
    }
    if (old_password == new_password || old_password == confirm_password) {
      this.toastr.error('Old Password cannot be your new password', 'Error', { timeOut: 10000 });
      return;
    }
    this.spinnerShow('Change User Password........');

    this.userservice.onsaveUserData('usr_users_information', this.changePaswordWFrm.value, 'onUserChangePassword').subscribe(
      (data) => {

        this.response = data;
        if (this.response.success) {
          this.toastr.success(this.response.message, 'Success');
          this.is_changepasswordwin = false;
          this.AuthService.funcUserLogOut();
        } else {
          this.toastr.error(this.response.message, 'Info');
        }

        this.spinnerHide()
      },
      (error) => {
        this.toastr.error('Password Update failed: ' + error.error.message, 'Error', { timeOut: 10000 });
        this.spinnerHide()
      }
    );

  }

  onCheckUserPWDRequestDetails() {
    const loggedInUserId = localStorage.getItem('id');
    const email_address = localStorage.getItem('email_address');
    this.spinnerShow('Validating User Account........');

    this.userservice.onsaveUserData('usr_users_information', { user_id: loggedInUserId, email_address: email_address }, 'onCheckUserPWDRequestDetails').subscribe(
      (data) => {
        this.response = data;
        if (this.response.success) {
          if (this.response.is_initiatepassword_change == 1) {
            this.toastr.info(this.response.message, 'Info');
            this.is_changepasswordwin = true;
            this.is_closablewin = false;
          }
        } else {
          this.toastr.success(this.response.message, 'Success');

        }

        this.spinnerHide()
      },
      (error) => {
        this.toastr.error('Registration failed: ' + error.error.message, 'Error', { timeOut: 10000 });
        this.spinnerHide()
      }
    );
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

    this.userservice.onUserAccountRegistration(this.userAccountFrm.value, 'onUpdateUserProfileInformation')
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
  
  switchTheme(theme: string) {
    const linkElement = document.getElementById('theme-link') as HTMLLinkElement;
    if (linkElement) {
      linkElement.href = theme === 'light'
        ? 'node_modules/devextreme/dist/css/dx.light.css'
        : 'node_modules/devextreme/dist/css/dx.dark.css';
    }
  }
}