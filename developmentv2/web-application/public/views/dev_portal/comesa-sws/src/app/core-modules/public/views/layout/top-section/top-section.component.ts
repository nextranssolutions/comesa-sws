import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { AuthenticationService } from 'src/app/core-services/authentication/authentication.service';
import { LanguagesService } from 'src/app/core-services/languages/languages.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CountryISO } from 'ngx-intl-tel-input-gg';
import { AppSettings } from 'src/app/app-settings';
import { ValidationCallbackData } from 'devextreme/common';
import { DxValidatorComponent } from 'devextreme-angular';
import { DxTextBoxTypes } from 'devextreme-angular/ui/text-box';
import { UserManagementService } from 'src/app/core-services/user-management/user-management.service';
import { ToastrService } from 'ngx-toastr';
import { OtpService } from 'src/app/core-services/otp/otp.service';
import { DxButtonTypes } from 'devextreme-angular/ui/button';
import { ConfigurationsService } from 'src/app/core-services/configurations/configurations.service';
import { PublicDashboardService } from 'src/app/core-services/public-dashboard/public-dashboard.service';
import { DomSanitizer,SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-top-section',
  templateUrl: './top-section.component.html',
  styleUrls: ['./top-section.component.css'],
})
export class TopSectionComponent {
  @ViewChild('targetValidator', { static: false })
  validator: DxValidatorComponent;
  printiframeUrl:any;
  phonePattern = /^[+]?(\d[\d\-()\s]{7,}\d)$/;
  phoneRules: DxTextBoxTypes.Properties['maskRules'] = {
    X: /[\d]/,
  };
  printReportTitle: string;
  isPrintReportVisible: boolean = false;
  helpdeskUrl: any;
  loading = false;
  auth_response: any;
  isLoggedIn: boolean;
  dashboard_name: string;
  dashboard_link: any;
  email: string;
  password: string;
  message: string;
  guideline_option_id: number = 1;
  success: boolean;
  Countries: any;
  traderAccountTypeData: any;
  system_title: string = AppSettings.system_title;
  signUpFrm: FormGroup;
  termscheckbox: boolean;
  base_url: string = AppSettings.base_url;
  data_record: any;
  loadingVisible: boolean;
  spinnerMessage: string;
  response: any;
  dashboard_type_id: number;
  phoneForm: FormGroup;
  selectedCountry: string = '';
  signInFrm: FormGroup;
  forgotPasswordFrm: FormGroup;
  phoneMaskInvalidMessage: string = '';
  
  is_otpdisabled: boolean = true;
  preferredCountries: CountryISO[] = [
    CountryISO.Kenya,
    CountryISO.UnitedStates,
    CountryISO.UnitedKingdom,
  ];
  decryptedPayload: any;
  translations: any;
  userData: any;
  userFirstName: string = '';
  process_id: number;
  systems_functionality_id: number;
  // Popup visibility
  isSignupPopupVisible = false;
  isSigninPopupVisible = false;
  islostpassword: boolean;
  tokenRequestCount: number = 0;
  // Form data
  passwordMode: DxTextBoxTypes.TextBoxType = 'password';
  passwordButton: DxButtonTypes.Properties = {
    icon: 'eyeopen',
    stylingMode: 'text',
    onClick: () => {
      this.passwordMode = this.passwordMode === 'text' ? 'password' : 'text';
    },
  };
  languageData:any;
  constructor(
    public translate: TranslateService,
    public authService: AuthenticationService,
    private translationService: LanguagesService,
    private router: Router,
    private spinner: SpinnerVisibilityService,
    private userservice: UserManagementService,
    public toastr: ToastrService,
    private otpservice: OtpService,
    private configService: ConfigurationsService,
    public publicService:PublicDashboardService,
    private cdr: ChangeDetectorRef
  ) {
    this.spinner.hide();
    translate.addLangs([
      'English',
      'French',
      'Swahili',
      'Arabic',
      'Portuguese',
    ]);
  }

  ngOnInit() {
    this.authService.checkAuthenticationState();
    this.loadTranslations(this.translate.currentLang || 'English');

    this.signUpFrm = new FormGroup({
      traderaccount_type_id: new FormControl('', Validators.compose([])),
      country_of_origin_id: new FormControl('', Validators.compose([])),
      name: new FormControl('', Validators.compose([])),
      email_address: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.email])
      ),
      phone_number: new FormControl('', Validators.compose([])),
      otp_value: new FormControl('', Validators.compose([Validators.required])),
    });

    this.forgotPasswordFrm = new FormGroup({
      email_address: new FormControl(
        '',
        Validators.compose([Validators.required])
      )
    });

    this.signInFrm = new FormGroup({
      email_address: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      password: new FormControl('', Validators.compose([Validators.required])),
      otp_value: new FormControl('', Validators.compose([])),
    });

    this.fetchUserCountryOfOrigin();
    this.onLoadTraderAccountTypeData();
    this.onLoadLanguageDataList();
  }

  onCountrySelection($event) {
    if ($event.selectedItem) {
      let country_data = $event.selectedItem,
        country_code = '+' + country_data.phonecode;
      this.signUpFrm.get('phone_number')?.setValue(country_code);
    }
  }

  onLoadTraderAccountTypeData() {
    var data_submit = {
      table_name: 'par_traderaccount_types',
      is_enabled: true,
    };
    this.configService.onLoadConfigurationData(data_submit).subscribe(
      (data) => {
        this.data_record = data;
        if (this.data_record.success) {
          // this.decryptedPayload = this.encryptionService.OnDecryptData(
          //   this.data_record.data
          // );
          this.traderAccountTypeData = this.data_record.data;
        }
      },
      (error) => {}
    );
  }

  fetchUserCountryOfOrigin() {
    var data_submit = {
      table_name: 'par_countries',
    };
    this.configService.onLoadConfigurationData(data_submit).subscribe(
      (data) => {
        this.data_record = data;
        if (this.data_record.success) {
          // this.decryptedPayload = this.encryptionService.OnDecryptData(
          //   this.data_record.data
          // );
          this.Countries = this.data_record.data;
        }
      },
      (error) => {}
    );
  }

  funcLostPassord() {
    this.islostpassword = true;
    this.isSigninPopupVisible = false;
  }
  onFuncRecoverPasswordRequest() {
    const summation = this.forgotPasswordFrm.get('sum_input')?.value;

    const formData = new FormData();
    const invalid = [];
    const controls = this.forgotPasswordFrm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        this.toastr.error(
          'Fill In All Mandatory fields with (*), missing value on ' +
            name.replace('_id', ''),
          'Alert'
        );
        return;
      }
    }
    if (this.forgotPasswordFrm.invalid) {
      this.toastr.warning('Please fill in all required fields.', 'Warning');

      return;
    }

    this.loading = true;
    this.spinnerShow('User Login........');

    this.userservice
      .onUserAccountRegistration(
        this.forgotPasswordFrm.value,
        'onUserPasswordRequestRecovery'
      )
      .subscribe(
        (data) => {
          this.response = data;
          if (this.response.success) {
            // Inform the user about association with a sidebar group
            this.toastr.info(this.response.message, 'Info');
            this.islostpassword = false;
          } else {
            this.toastr.success(this.response.message, 'Success');
          }

          this.spinnerHide();
        },
        (error) => {
          this.toastr.error(
            'Registration failed: ' + error.error.message,
            'Error',
            { timeOut: 10000 }
          );
          this.spinnerHide();
        }
      );
    //
  }
  funcpopWidth(percentage_width) {
    return (window.innerWidth * percentage_width) / 100;
  }
  funcpopHeight(percentage_width) {
    return (window.innerHeight * percentage_width) / 100;
  }
  submitSignup() {
    const isOptionalFields = true;
    const controls = this.signUpFrm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        this.toastr.error(
          'Fill In All Mandatory fields with (*), missing value on ' +
            name.replace('_id', ''),
          'Alert'
        );
        return;
      }
    }

    this.spinnerShow('Creating Account...........');

    if (this.signUpFrm.valid) {
      this.userservice
        .onUserAccountRegistration(
          this.signUpFrm.value,
          'onUserAccountRegistration'
        )
        .subscribe(
          (data) => {
            this.response = data;
            if (this.response.success) {
              this.toastr.info(this.response.message, 'Info');
              this.isSignupPopupVisible = false;
              // this.router.navigate(['/public/index']);
              this.isSigninPopupVisible = true;
              this.scrollToTop();
            } else {
              this.toastr.success(this.response.message, 'Success');
            }

            this.spinnerHide();
          },
          (error) => {
            this.toastr.error(
              'Registration failed: ' + error.error.message,
              'Error',
              { timeOut: 10000 }
            );
            this.spinnerHide();
          }
        );
    } else {
      // Handle invalid form or fields
      this.toastr.warning('Please fill in all required fields.', 'Warning');
      this.spinnerHide();
    }
  }
  onOtpRequest() {
    const emailControl = this.signInFrm.get('email_address');
    this.authService.requestToken();
    this.tokenRequestCount = this.authService.getTokenRequestCount();

    if (!emailControl || emailControl.invalid) {
      this.toastr.error('Please fill in a valid email address.', 'Error');
      return;
    }
    // ;
    this.spinnerShow('Requesting OTP...');

    this.otpservice
      .onUserLoginOtpRequest(this.signInFrm.value, 'requestLoginOtp')
      .subscribe(
        (data) => {
          // ;
          this.response = data;
          if (this.response.success) {
            this.toastr.info(this.response.message, 'Info');
            this.is_otpdisabled = false;
          } else {
            this.toastr.error(this.response.message, 'Error');
          }
          this.spinnerHide();
        },
        (error) => {
          this.toastr.error(
            'Failed to request OTP: ' +
              (error.error?.message || 'Unknown error'),
            'Error'
          );
          this.spinnerHide();
        }
      );
  }
  onSignUpOtpRequest() {
    const emailControl = this.signUpFrm.get('email_address');

    if (!emailControl || emailControl.invalid) {
      this.toastr.error('Please fill in a valid email address.', 'Error');
      return;
    }

    this.spinnerShow('Requesting OTP...');

    this.otpservice
      .onUserOtpRequest(this.signUpFrm.value, 'requestOtp')
      .subscribe(
        (data) => {
          this.response = data;
          if (this.response.success) {
            this.toastr.info(this.response.message, 'Info');
            this.is_otpdisabled = false;
          } else {
            this.toastr.error(this.response.message, 'Error');
          }
          this.spinnerHide();
        },
        (error) => {
          this.toastr.error(
            'Failed to request OTP: ' +
              (error.error?.message || 'Unknown error'),
            'Error'
          );
          this.spinnerHide();
        }
      );
  }
 
  onSignIn() {
    // Clear localStorage before logging in
    localStorage.clear();

    this.email = this.signInFrm.get('email_address')?.value;
    this.password = this.signInFrm.get('password')?.value;
    const otp_value = this.signInFrm.get('otp_value')?.value;
    const controls = this.signInFrm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        this.toastr.error(
          'Fill In All Mandatory fields with (*), missing value on ' +
            name.replace('_id', ''),
          'Alert'
        );
        return;
      }
    }
    if (this.signInFrm.invalid) {
      return;
    }

    this.loading = true;
    this.spinnerShow('User Login........');
    this.authService
      .login(btoa(this.email), btoa(this.password), otp_value)

      .subscribe((response) => {
        this.auth_response = response;
        this.message = this.auth_response.message;
        this.success = this.auth_response.success;

        if (this.success) {
          let access_token = this.auth_response.access_token;
          let isLoggedIn = this.auth_response.isLoggedIn;
          if (access_token != '' && isLoggedIn) {
            this.toastr.success(this.message, 'Success!');
            // this.isLoggedIn = this.auth_response.isLoggedIn;
            this.isSigninPopupVisible = false;
            this.dashboard_name = this.auth_response.dashboard_name;
            this.dashboard_link = this.auth_response.dashboard_link;

            const token = this.auth_response.authorisation.token;
            this.authService.storeToken(token);
            this.authService.isLoggedIn = isLoggedIn;
            localStorage.setItem('isLoggedIn', this.auth_response.isLoggedIn);
            localStorage.setItem('user', JSON.stringify(this.auth_response));
            localStorage.setItem('trader_data', JSON.stringify(this.auth_response.trader_data));
            localStorage.setItem('token', this.auth_response.authorisation.token);
            localStorage.setItem('id', this.auth_response.id);
            localStorage.setItem('first_name', this.auth_response.first_name);
            localStorage.setItem('account_type_id', this.auth_response.account_type_id);
            localStorage.setItem('usr_loggedin_id', this.auth_response.usr_loggedin_id);

            localStorage.setItem('dashboard_link', this.auth_response.dashboard_link);
            localStorage.setItem(
              'dashboard_name',
              this.auth_response.dashboard_name
            );
            this.isLoggedIn = true;
            this.cdr.detectChanges();
            this.router.navigate([this.dashboard_link]);
            this.scrollToTop();
          } else {
            this.toastr.error(this.message, 'Alert!');
          }
          this.spinnerHide();
        } else {
          this.spinnerHide();
          this.toastr.error(this.message, 'Alert!');
        }
        this.spinnerHide();
      });
    //this.router.navigate(['/online-services']);
    //this.scrollToTop();
  }

  openSignupPopup() {
    this.isSigninPopupVisible = false;
    this.isSignupPopupVisible = true;
  }

  openSigninPopup() {
    this.isSignupPopupVisible = false;
    this.islostpassword = false;
    this.isSigninPopupVisible = true;
  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Smooth scrolling for better UX
    });
  }

  selectionLanguage(locale: string) {
    this.translationService.getTranslations(locale).subscribe(
      (translations) => {
        this.translations = translations;
        this.translate.setTranslation(locale, translations, true);
        this.translate.use(locale);
      },
      (error) => {}
    );
  }

  switchLang(event: Event, language: string): void {
    event.preventDefault();
    this.loadTranslations(language);
  }

  loadTranslations(locale: string) {
    this.translationService.getTranslations(locale).subscribe(
      (translations) => {
        this.translations = translations;
        this.translate.setTranslation(locale, translations, true);
        this.translate.use(locale);
      },
      (error) => {}
    );
  }

  funcRedirectToDashboard() {
    this.userData = localStorage.getItem('user');
    let user_data = JSON.parse(this.userData);
    console.log(user_data);
    this.router.navigate([user_data.dashboard_link]);
    this.scrollToTop();
  }

  funcUserLogOut() {
    // this.spinnerShow('Logging Out');
    this.authService.funcUserLogOut();
  }

  spinnerShow(spinnerMessage) {
    this.loadingVisible = true;
    this.spinnerMessage = spinnerMessage;
  }

  spinnerHide() {
    this.loadingVisible = false;
  }
  funcRedirectToHelpDesk(){
    this.helpdeskUrl  = AppSettings.help_deskurl
    this.printReportTitle = 'Help Desk';
    this.isPrintReportVisible = true;
  }
  onLoadLanguageDataList() {
    var data_submit = {
      'table_name': 'par_system_languages',
      is_enabled: true
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.languageData = this.data_record.data;
          }
        },
        error => {

        });
  }
}
