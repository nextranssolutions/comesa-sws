import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import CustomStore from 'devextreme/data/custom_store';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ToastrService } from 'ngx-toastr';
import { AppSettings } from 'src/app/app-settings';
import { AuthenticationService } from 'src/app/core-services/authentication/authentication.service';
import { ConfigurationsService } from 'src/app/core-services/configurations/configurations.service';
import { ReportsService } from 'src/app/core-services/reports/reports.service';
import { UserManagementService } from 'src/app/core-services/user-management/user-management.service';

@Component({
  selector: 'app-applicantdetails',
  templateUrl: './applicantdetails.component.html',
  styleUrl: './applicantdetails.component.css'
})
export class ApplicantdetailsComponent implements OnInit {
  @Input() applicantDetailsForm: FormGroup;
  @Input() userApplicantAccountFrm: FormGroup;

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
    this.userApplicantAccountFrm.reset();
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
        if (this.data_record.success) {
          this.districtsData = this.data_record.data;
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
    this.applicantDetailsForm.get('id')?.patchValue(record)

    this.isRegistrantDetailsWinshow = false;
  }


  funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width / 100;
  }

  funcpopHeight(percentage_height) {
    return window.innerHeight * percentage_height / 100;
  }

  onsaveTraderAccountsDetails() {
    const formData = new FormData();
    const invalid = [];
    const controls = this.userApplicantAccountFrm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        this.toastr.error('Fill In All Mandatory fields with (*), missing value on ' + name.replace('_id', ''), 'Alert');
        return;
      }
    }
    if (this.userApplicantAccountFrm.invalid) {
      return;
    }
    this.spinner.show();
    this.userservice.onsaveUserData(this.table_name, this.userApplicantAccountFrm.value, 'onsaveTraderData')
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
}
