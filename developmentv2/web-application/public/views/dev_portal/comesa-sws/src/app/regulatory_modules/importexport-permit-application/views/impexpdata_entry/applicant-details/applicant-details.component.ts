import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import CustomStore from 'devextreme/data/custom_store';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ToastrService } from 'ngx-toastr';
import { AppSettings } from 'src/app/app-settings';
import { AuthenticationService } from 'src/app/core-services/authentication/authentication.service';
import { ConfigurationsService } from 'src/app/core-services/configurations/configurations.service';
import { ReportsService } from 'src/app/core-services/reports/reports.service';
import { UserManagementService } from 'src/app/core-services/user-management/user-management.service';

@Component({
  selector: 'app-applicant-details',
<<<<<<< HEAD
  
=======
>>>>>>> 587b9122227c62257eb6c413d0e0c3b2bc074c97
  templateUrl: './applicant-details.component.html',
  styleUrl: './applicant-details.component.css'
})
export class ApplicantDetailsComponent {
<<<<<<< HEAD
   @Input() applicantDetailsForm: FormGroup;
    @Input() userAccountFrm: FormGroup;
    countriesData: any;
    traderAccountsDetailsData: any = {};
    regionsData: any;
    districtsData: any;
    applicantData: any;
    traderCategoryData: any;
    traderAccountTypeData: any;
    userAccountTypeData: any;
    accountStatusData: any;
    configData: any;
    data_record: any;
    response: any;
    is_local_agent: boolean;
    isRegistrantDetailsWinshow: boolean = false;
    addTraderPopupVisible: boolean;
    addPopupVisible: boolean;
    is_readonly: boolean = true;
    applicantDetailsSet: any = false;
    regulatory_subfunction_id: number;
    trader_title: string;
    table_name: string;
    country_id: number;
    region_id: number;
  
    constructor(
      public configService: ConfigurationsService,
      public authService: AuthenticationService,
      public httpClient: HttpClient,
      public userservice: UserManagementService,
      public toastr: ToastrService,
       private reportingAnalytics: ReportsService,
      private spinner: SpinnerVisibilityService,
    ) {
      this.onLoadCountriesData();
  
      if (this.regulatory_subfunction_id == 5) {
        this.applicantDetailsSet = false;
=======
  @Input() applicantDetailsForm: FormGroup;
  @Input() userAccountFrm: FormGroup;
  applicationGeneraldetailsfrm: FormGroup;

  countriesData: any;
  subcribe: any;
  traderAccountsDetailsData: any = {};
  regionsData: any;
  districtsData: any;
  applicationsOptionsData: any;
  applicantData: any;
  traderCategoryData: any;
  traderAccountTypeData: any;
  userAccountTypeData: any;
  accountStatusData: any;
  configData: any;
  data_record: any;
  response: any;
  is_local_agent: boolean;
  isRegistrantDetailsWinshow: boolean = false;
  addTraderPopupVisible: boolean;
  addPopupVisible: boolean;
  is_readonly: boolean = true;
  applicantDetailsSet: any = false;
  regulatory_subfunction_id: number;
  trader_title: string;
  table_name: string;
  country_id: number;
  auth_response: any;
  region_id: number;
  selectedApplicationOption: any = null;
  showSearchButton: boolean = false;
  showHiddenFields: boolean = false;
  application_options_id: number;

  constructor(
    public configService: ConfigurationsService,
    public authService: AuthenticationService,
    public httpClient: HttpClient,
    public userservice: UserManagementService,
    public toastr: ToastrService,
    private reportingAnalytics: ReportsService,
    private spinner: SpinnerVisibilityService,
  ) {
    this.onLoadCountriesData();

    if (this.regulatory_subfunction_id == 5) {
      this.applicantDetailsSet = false;
    }
    else {
      this.applicantDetailsSet = false;
    }

    this.table_name = 'tra_trader_account';
  }

  ngOnInit() {
    this.onLoadRegions(this.country_id);
    this.onLoadDistrictsData(this.region_id);
    this.onLoadAccountTypesData();
    this.onGetSingleUserProfileDetails()
    this.fetchTraderCategoryData()
    this.onLoadTraderAccountTypesData();
    this.fetchAccountStatusData();
    this.onLoadApplicationOptions();
  }


  onCoutryCboSelect($event) {
    this.onLoadRegions($event.selectedItem.id);
  }

  onAddTraderAccountsClick() {
    this.is_readonly = false;
    this.addTraderPopupVisible = true;
    this.userAccountFrm.reset();
  }

  fetchAccountStatusData() {
    var data_submit = {
      'table_name': 'par_workflow_status'
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.accountStatusData = this.data_record.data;
          }
        },
        error => {

        });
  }

  onLoadTraderAccountTypesData() {
    var data_submit = {
      'table_name': 'par_traderaccount_types'
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;

          if (this.data_record.success) {
            this.traderAccountTypeData = this.data_record.data;
          }
        },
        error => {

        });
  }
  fetchTraderCategoryData() {
    var data_submit = {
      'table_name': 'par_trader_categories'
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.traderCategoryData = this.data_record.data;
          }
        },
        error => {

        });
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

  onGetSingleUserProfileDetails() {

    var data_submit = {
      'table_name': 'tra_trader_account'
    }

    this.userservice.onGetSingleUserProfileDetails(data_submit)
      .subscribe(
        data => {

          this.data_record = data;

          if (this.data_record.success) {
            this.userAccountFrm.patchValue(this.data_record.data)
          }
        },
        error => {

        });
  }

  onLoadCountriesData() {

    var data_submit = {
      table_name: 'par_countries',
    };
    this.configService.onLoadConfigurationData(data_submit).subscribe(
      (data) => {
        this.data_record = data;
        if (this.data_record.success) {
          this.countriesData = data.data;
        }
      },
      error => {
        return false;
      });
  }

  onRegionsCboSelect($event) {

    this.onLoadDistrictsData($event.selectedItem.id);

  }
  onLoadRegions(country_id) {

    var data_submit = {
      table_name: 'par_regions',
      country_id: country_id
    };
    this.configService.onLoadConfigurationData(data_submit).subscribe(
      (data) => {
        this.data_record = data;
        if (this.data_record.success) {
          this.regionsData = this.data_record.data;
        }
      },
      error => {
        return false
      });
  }

  onLoadApplicationOptions() {

    var data_submit = {
      table_name: 'par_application_options',

    };
    this.configService.onLoadConfigurationData(data_submit).subscribe(
      (data) => {
        this.data_record = data;
        if (this.data_record.success) {
          this.applicationsOptionsData = this.data_record.data;
        }
      },
      error => {
        return false
      });
  }


  onLoadDistrictsData(region_id) {
    var data_submit = {
      table_name: 'par_districts',
      region_id: region_id
    };
    this.configService.onLoadConfigurationData(data_submit).subscribe(

      (data) => {
        this.data_record = data;
        if (this.data_record.success) {
          this.districtsData = this.data_record.data;
        }
      },
      error => {
        return false;
      });
  }

  onSearchConsignorName(is_local_agent) {
    this.isRegistrantDetailsWinshow = true;
    if (is_local_agent == 1) {
      this.is_local_agent = is_local_agent;
      this.trader_title = 'applicant details';
    }
    else {
      this.is_local_agent = is_local_agent;
      this.trader_title = 'import/export_applicant';
    }
    let me = this;
    this.traderAccountsDetailsData.store = new CustomStore({
      load: function (loadOptions: any) {
        var params = '?';
        params += 'skip=' + loadOptions.skip;
        params += '&take=' + loadOptions.take;//searchValue
        var headers = new HttpHeaders({
          "Accept": "application/json",
          "Authorization": "Bearer " + me.authService.getAccessToken(),
        });

        me.configData = {
          headers: headers,
          params: { skip: loadOptions.skip, take: loadOptions.take, searchValue: loadOptions.filter, is_local_agent: is_local_agent }
        };
        return me.httpClient.get(AppSettings.base_url + '/api/import-export/getTraderInformationDetails', me.configData)
          .toPromise()
          .then((data: any) => {
            return {
              data: data.data,
              totalCount: data.totalCount
            }
          })
          .catch(error => { throw 'Data Loading Error' });

>>>>>>> 587b9122227c62257eb6c413d0e0c3b2bc074c97
      }
      else {
        this.applicantDetailsSet = false;
      }
  
      this.table_name = 'tra_trader_account';
    }
  
    ngOnInit() {
      this.onLoadRegions(this.country_id);
      this.onLoadDistrictsData(this.region_id);
      this.onLoadAccountTypesData();
      this.onGetSingleUserProfileDetails()
      this.fetchTraderCategoryData()
      this.onLoadTraderAccountTypesData();
      this.fetchAccountStatusData();
    }
  
  
    onCoutryCboSelect($event) {
      this.onLoadRegions($event.selectedItem.id);
    }
  
    onAddTraderAccountsClick() {
      this.is_readonly = false;
      this.addTraderPopupVisible = true;
      this.userAccountFrm.reset();
    }
  
    fetchAccountStatusData() {
      var data_submit = {
        'table_name': 'par_workflow_status'
      }
      this.configService.onLoadConfigurationData(data_submit)
        .subscribe(
          data => {
            this.data_record = data;
            if (this.data_record.success) {
              this.accountStatusData = this.data_record.data;
            }
          },
          error => {
  
          });
    }
  
    onLoadTraderAccountTypesData() {
      var data_submit = {
        'table_name': 'par_traderaccount_types'
      }
      this.configService.onLoadConfigurationData(data_submit)
        .subscribe(
          data => {
            this.data_record = data;
  
            if (this.data_record.success) {
              this.traderAccountTypeData = this.data_record.data;
            }
          },
          error => {
  
          });
    }
    fetchTraderCategoryData() {
      var data_submit = {
        'table_name': 'par_trader_categories'
      }
      this.configService.onLoadConfigurationData(data_submit)
        .subscribe(
          data => {
            this.data_record = data;
            if (this.data_record.success) {
              this.traderCategoryData = this.data_record.data;
            }
          },
          error => {
  
          });
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
  
    onGetSingleUserProfileDetails() {
  
      var data_submit = {
        'table_name': 'tra_trader_account'
      }
  
      this.userservice.onGetSingleUserProfileDetails(data_submit)
        .subscribe(
          data => {
  
            this.data_record = data;
  
            if (this.data_record.success) {
              this.userAccountFrm.patchValue(this.data_record.data)
            }
          },
          error => {
  
          });
    }
  
    onLoadCountriesData() {
  
      var data_submit = {
        table_name: 'par_countries',
      };
      this.configService.onLoadConfigurationData(data_submit).subscribe(
        (data) => {
          this.data_record = data;
          if (this.data_record.success) {
            this.countriesData = data.data;
          }
        },
        error => {
          return false;
        });
    }
  
    onRegionsCboSelect($event) {
  
      this.onLoadDistrictsData($event.selectedItem.id);
  
    }
    onLoadRegions(country_id) {
  
      var data_submit = {
        table_name: 'par_regions',
        country_id: country_id
      };
      this.configService.onLoadConfigurationData(data_submit).subscribe(
        (data) => {
          this.data_record = data;
          if (this.data_record.success) {
            this.regionsData = this.data_record.data;
          }
        },
        error => {
          return false
        });
    }
  
  
    onLoadDistrictsData(region_id) {
      var data_submit = {
        table_name: 'par_districts',
        region_id: region_id
      };
      this.configService.onLoadConfigurationData(data_submit).subscribe(
  
          (data) => {
            this.data_record = data;
            if(this.data_record.success) {
              this.districtsData =this.data_record.data;
            } 
          },
          error => {
            return false;
          });
    }
  
    onSearchApplicantName(is_local_agent) {
      this.isRegistrantDetailsWinshow = true;
      if (is_local_agent == 1) {
        this.is_local_agent = is_local_agent;
        this.trader_title = 'applicant details';
      }
      else {
        this.is_local_agent = is_local_agent;
        this.trader_title = 'import/export_applicant';
      }
      let me = this;
      this.traderAccountsDetailsData.store = new CustomStore({
        load: function (loadOptions: any) {
          var params = '?';
          params += 'skip=' + loadOptions.skip;
          params += '&take=' + loadOptions.take;//searchValue
          var headers = new HttpHeaders({
            "Accept": "application/json",
            "Authorization": "Bearer " + me.authService.getAccessToken(),
          });
  
          me.configData = {
            headers: headers,
            params: { skip: loadOptions.skip, take: loadOptions.take, searchValue: loadOptions.filter, is_local_agent: is_local_agent }
          };
          return me.httpClient.get(AppSettings.base_url + '/api/import-export/getTraderInformationDetails', me.configData)
            .toPromise()
            .then((data: any) => {
              return {
                data: data.data,
                totalCount: data.totalCount
              }
            })
            .catch(error => { throw 'Data Loading Error' });
  
        }
      });
  
    }
  
    funcSelectTraderDetails(data) {
      let record = data.data;
      console.log('record', record);
  
      this.applicantDetailsForm.get('applicant_name')?.setValue(record.applicant_name);
      this.applicantDetailsForm.get('region_name')?.setValue(record.region_name);
      this.applicantDetailsForm.get('district_name')?.setValue(record.district_name);
      this.applicantDetailsForm.get('email_address')?.setValue(record.email_address);
      this.applicantDetailsForm.get('country_id')?.setValue(record.country_id);
      this.applicantDetailsForm.get('region_id')?.setValue(record.region_id);
      this.applicantDetailsForm.get('district_id')?.setValue(record.district_id); 
      this.applicantDetailsForm.get('telephone_no')?.setValue(record.telephone_no);
      this.applicantDetailsForm.get('physical_address')?.setValue(record.physical_address); 
  
      this.isRegistrantDetailsWinshow = false;
  }
<<<<<<< HEAD
  
  
    funcpopWidth(percentage_width) {
      return window.innerWidth * percentage_width / 100;
    }
  
    funcpopHeight(percentage_height) {
      return window.innerHeight * percentage_height / 100;
    }
  
    onsaveTraderAccountsDetails() {
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
=======


  funcSelectTraderDetails(data) {
    let record = data.data;
    this.applicantDetailsForm.get('id')?.setValue(record.id);
    this.applicantDetailsForm.get('applicant_name')?.setValue(record.applicant_name);
    this.applicantDetailsForm.get('region_name')?.setValue(record.region_name);
    this.applicantDetailsForm.get('district_name')?.setValue(record.district_name);
    this.applicantDetailsForm.get('email_address')?.setValue(record.email_address);
    this.applicantDetailsForm.get('country_id')?.setValue(record.country_id);
    this.applicantDetailsForm.get('region_id')?.setValue(record.region_id);
    this.applicantDetailsForm.get('telephone_no')?.setValue(record.telephone_no);
    this.applicantDetailsForm.get('district_id')?.setValue(record.district_id);
    this.applicantDetailsForm.get('physical_address')?.setValue(record.physical_address);
    this.applicantDetailsForm.get('application_options_id')?.setValue(record.application_options_id);

    this.isRegistrantDetailsWinshow = false;
  }


  funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width / 100;
  }

  funcpopHeight(percentage_height) {
    return window.innerHeight * percentage_height / 100;
  }

  onsaveConsignorAccountsDetails() {
    const formData = new FormData();
    const invalid = [];
    const controls = this.userAccountFrm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        this.toastr.error('Fill In All Mandatory fields with (*), missing value on ' + name.replace('_id', ''), 'Alert');
>>>>>>> 587b9122227c62257eb6c413d0e0c3b2bc074c97
        return;
      }
      this.spinner.show();
      this.userservice.onsaveUserData(this.table_name, this.userAccountFrm.value, 'onsaveTraderData')
        .subscribe(
          response => {
            this.response = response;
            //the details 
            if (this.response.success) {
              this.onSearchApplicantName(1);
              this.addPopupVisible = false;
              this.toastr.success(this.response.message, 'Response');
  
            } else {
              this.toastr.error(this.response.message, 'Alert');
            }
            this.spinner.hide();
          },
          error => {
            this.toastr.error('Error Occurred', 'Alert');
            this.spinner.hide();
          });
    }
<<<<<<< HEAD
=======
    if (this.userAccountFrm.invalid) {
      return;
    }
    this.spinner.show();
    this.userservice.onsaveUserData(this.table_name, this.userAccountFrm.value, 'onSaveUniformApplicantDataset')
      .subscribe(
        response => {
          this.response = response;
          //the details 
          if (this.response.success) {
            this.onSearchConsignorName(1);
            this.addPopupVisible = false;
            this.toastr.success(this.response.message, 'Response');

          } else {
            this.toastr.error(this.response.message, 'Alert');
          }
          this.spinner.hide();
        },
        error => {
          this.toastr.error('Error Occurred', 'Alert');
          this.spinner.hide();
        });
  }

  applicant_id: any;
  onApplicationOptionChange(event: any) {
    const selectedId = event.value; // Get the selected option ID
    this.application_options_id = selectedId; // Store it for use in the template

    if (selectedId === 1) {
      this.showHiddenFields = true;
      this.showSearchButton = true;
      this.applicantDetailsSet = true; // Make applicant_name read-only
      // this.applicantDetailsForm.reset();
    } else if (selectedId === 2) {
      this.showHiddenFields = true;
      this.showSearchButton = false;
      this.applicantDetailsSet = false; // Make applicant_name editable
      this.patchApplicantDetailsFromLocalStorage(); // Patch details from localStorage
      // this.applicantDetailsForm.reset();
    }
  }



  patchApplicantDetailsFromLocalStorage() {
    const storedTraderData = localStorage.getItem('trader_data');
    console.log(storedTraderData)

    if (storedTraderData) {
      const traderData = JSON.parse(storedTraderData);
      console.log(traderData);

      this.applicantDetailsForm.patchValue({
        id: traderData.id,
        applicant_name: traderData.name,
        email_address: traderData.email_address,
        country_id: traderData.country_id,
        region_id: traderData.region_id,
        district_id: traderData.district_id,
        telephone_no: traderData.telephone_no,
        physical_address: traderData.physical_address,
        application_options_id: traderData.application_options_id
      });

      this.applicationGeneraldetailsfrm.patchValue({
        applicant_id: traderData.id,
        application_options_id: traderData.application_options_id
        
      });
      
    }
  }

>>>>>>> 587b9122227c62257eb6c413d0e0c3b2bc074c97
}
