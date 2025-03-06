import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettings } from 'src/app/app-settings';
import { map } from 'rxjs/operators';
import { EncryptionService } from '../encryption/encryption.service';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthenticationService } from '../authentication/authentication.service';
@Injectable({
  providedIn: 'root'
})
export class ServiceAdmnistrationService {
  onLoadTransactionPermitTemplatesDetails: any;
  onLoadTransactionRestrictionProhibitions(data_submit: { table_name: string; }) {
    throw new Error('Method not implemented.');
  }
  base_url: string;

  private baseUrl;
  system: any;
  data: any;
  key: string = 'kPJks1MrdXE03n8H';

  application_details: any;
  constructor(private HttpClient: HttpClient, private http: HttpClient, private sanitizer: DomSanitizer, private authService: AuthenticationService, private encryptionService: EncryptionService) {
    this.baseUrl = AppSettings.base_url + '/api/sysadministration';
  }
  getApplicationDetail() {
    return this.application_details;
  }
  setApplicationDetail(data: any[]) {
    this.application_details = data;
  }
  onLoadServicesDataset(module_id) {

    this.system = {
      params: { module_id: module_id },
      headers: { 'Accept': 'application/json' }
    };
    return this.HttpClient.get(this.baseUrl + '/getOrganisationServices', this.system)
      .pipe(map(navigations => {

        return navigations;
      }));
  }

  getSafeUrl(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url)
  }
  onLoadAppSubmissionGuidelines(sub_module_id, section_id) {
    var headers = new HttpHeaders({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    this.system = {
      params: { sub_module_id: sub_module_id, section_id: section_id },
      headers: headers
    };
    return this.HttpClient.get(this.baseUrl + '/getAppSubmissionGuidelines', this.system)
      .pipe(map(data => {
        return <any>data;
      }));
  }

  onEnablePermitTypeDetails(dataForm, table_name, title) {
    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    const loggedInUserId = localStorage.getItem('id');
    const loggedInUserName = localStorage.getItem('first_name');
    this.system= {
      params: { 'user_id': loggedInUserId, 'user_name': loggedInUserName, table_name: table_name },

      headers: { 'Accept': 'application/json', "Authorization": "Bearer " + this.authService.getAccessToken(), }
    };
    return this.http.post(this.baseUrl + '/onEnablePermitTypeDetails', dataForm, this.system)
      .pipe(map(data => {
        return data;
      }));
  }

  onLoadDataUrl(data, action_url) {
    data.table_name = btoa(data.table_name);
    // data.table_name = this.encryptionService.OnEncryptData(data.table_name)
    // const loggedInUserId = localStorage.getItem('id');
    // data.user_id = loggedInUserId;
    this.system = {
      params: data,
      headers: { 'Accept': 'application/json' }
    };
    return this.HttpClient.get(this.baseUrl + '/' + action_url, this.system)
      .pipe(map(data => {
        return <any>data;
      }));
  }

  onLoadSystemAdministrationData(data) {
    data.table_name = btoa(data.table_name);
    this.system = {
      params: data,
      headers: { 'Accept': 'application/json' }
    };

    return this.HttpClient.get(this.baseUrl + '/onLoadSystemAdministrationData', this.system)
      .pipe(map(data => {
        return <any>data;
      }));
  }
  

  onLoadTransactionPermitTypeData(data) {
    data.table_name = btoa(data.table_name);
    this.system = {
      params: data,
      headers: { 'Accept': 'application/json' }
    };

    return this.HttpClient.get(this.baseUrl + '/onLoadTransactionPermitTypeData', this.system)
      .pipe(map(data => {
        return <any>data;
      }));
  }

  onLoadTransactionProductRegistryDetails(data) {
    data.table_name = btoa(data.table_name);
    this.system = {
      params: data,
      headers: { 'Accept': 'application/json' }
    };

    return this.HttpClient.get(this.baseUrl + '/onLoadTransactionProductRegistryDetails', this.system)
      .pipe(map(data => {
        return <any>data;
      }));
  }
 
  onLoadSystemGuideline(data) {
    data.table_name = btoa(data.table_name);
    this.system = {
      params: data,
      headers: { 'Accept': 'application/json' }
    };

    return this.HttpClient.get(this.baseUrl + '/onLoadSystemGuideline', this.system)
      .pipe(map(data => {
        return <any>data;
      }));
  }
  onSaveSystemAdministrationDetails(table_name, data, action_url) {
    if (data.guidelines) {
      let guidelines_data = data.guidelines;

      data.guidelines = btoa(guidelines_data)
    }
    const loggedInUserId = localStorage.getItem('id');
    const loggedInUserName = localStorage.getItem('first_name');
    this.system = {
      params: { 'user_id': loggedInUserId, 'user_name': loggedInUserName, table_name: table_name },

      headers: { 'Accept': 'application/json' }
    };

    return this.http.post(this.baseUrl + '/' + action_url, data, this.system)
      .pipe(map(data => {
        return data;
      }));
  }
  onSavingUserNavigationPermissions(table_name, data, post_data, action_url) {
    const loggedInUserId = localStorage.getItem('id');
    const loggedInUserName = localStorage.getItem('first_name');
    this.system = {
      params: { 'user_id': loggedInUserId, 'user_name': loggedInUserName, table_name: table_name, 'permission_data': post_data },

      headers: { 'Accept': 'application/json' }
    };

    return this.http.post(this.baseUrl + '/' + action_url, data, this.system)
      .pipe(map(data => {
        return data;
      }));
  }



  onDeleteSystemAdministrationDetails(dataForm, table_name, title) {
    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    const loggedInUserId = localStorage.getItem('id');
    const loggedInUserName = localStorage.getItem('first_name');
    this.system = {
      params: { 'user_id': loggedInUserId, 'user_name': loggedInUserName, table_name: table_name },

      headers: { 'Accept': 'application/json', "Authorization": "Bearer " + this.authService.getAccessToken(), }
    };
    return this.http.post(this.baseUrl + '/onDeleteConfigData', dataForm, this.system)
      .pipe(map(data => {
        return data;
      }));
  }

  onDeleteConfigData(dataForm, table_name, title) {
    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    const loggedInUserId = localStorage.getItem('id');
    const loggedInUserName = localStorage.getItem('first_name');
    this.system = {
      params: { 'user_id': loggedInUserId, 'user_name': loggedInUserName, table_name: table_name },

      headers: { 'Accept': 'application/json', "Authorization": "Bearer " + this.authService.getAccessToken(), }
    };
    return this.http.post(this.baseUrl + '/onDeleteConfigData', dataForm, this.system)
      .pipe(map(data => {
        return data;
      }));
  }


  getAppUserGroupNavigationMenus(user_group_id, account_type_id) {

    this.system = {
      headers: { 'Accept': 'application/json' },
      params: { user_group_id: user_group_id, account_type_id: account_type_id }
    };

    return this.HttpClient.get(this.baseUrl + '/getAppUserGroupNavigationMenus', this.system)
      .pipe(map(data => {
        return <any>data;
      }));
  }
  getAppUserGroupWorkflowPermission(user_group_id) {

    this.system = {
      headers: { 'Accept': 'application/json' },
      params: { user_group_id: user_group_id }
    };

    return this.HttpClient.get(this.baseUrl + '/getAppUserGroupWorkflowPermission', this.system)
      .pipe(map(data => {
        return <any>data;
      }));
  }

  getAppUserGroupRegulatoryFunctions(user_group_id) {

    this.system = {
      headers: { 'Accept': 'application/json' },
      params: { user_group_id: user_group_id }
    };

    return this.HttpClient.get(this.baseUrl + '/getAppUserGroupRegulatoryFunctions', this.system)
      .pipe(map(data => {
        return <any>data;
      }));
  }
  getAppUserGroupUsers(user_group_id) {

    this.system = {
      headers: { 'Accept': 'application/json' },
      params: { user_group_id: user_group_id }
    };

    return this.HttpClient.get(this.baseUrl + '/getAppUserGroupUsers', this.system)
      .pipe(map(data => {
        return <any>data;
      }));
  }

  getAppHsCodes(permit_type_id) {

    this.system = {
      headers: { 'Accept': 'application/json' },
      params: { permit_type_id: permit_type_id }
    };

    return this.HttpClient.get(this.baseUrl + '/getAppHsCodes', this.system)
      .pipe(map(data => {
        return <any>data;
      }));
  }

  getAppPermitCertificateTemplate(permit_type_id) {

    this.system = {
      headers: { 'Accept': 'application/json' },
      params: { permit_type_id: permit_type_id }
    };

    return this.HttpClient.get(this.baseUrl + '/getAppPermitCertificateTemplate', this.system)
      .pipe(map(data => {
        return <any>data;
      }));
  }
}