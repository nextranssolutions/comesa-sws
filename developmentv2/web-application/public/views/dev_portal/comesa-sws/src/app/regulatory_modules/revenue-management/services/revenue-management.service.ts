import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { map } from 'rxjs';
import { AppSettings } from 'src/app/app-settings';
import { AuthenticationService } from 'src/app/core-services/authentication/authentication.service';
import { EncryptionService } from 'src/app/core-services/encryption/encryption.service';

@Injectable({
  providedIn: 'root'
})
export class RevenueManagementService {

base_url: string;
  private baseUrl;
  config: any;
  data: any;
  key: string = 'kPJks1MrdXE03n8H';

  application_details: any;
  constructor(
    private HttpClient: HttpClient, 
    private http: HttpClient, 
    private sanitizer: DomSanitizer, 
    private authService: AuthenticationService, 
    private encryptionService: EncryptionService
  ) {
    this.baseUrl = AppSettings.base_url + '/api/revenuemanagement';
  }
  getApplicationDetail() {
    return this.application_details;
  }
  setApplicationDetail(data: any[]) {
    this.application_details = data;
  }


  onEnableConfigurationsDetails(dataForm, table_name, title) {
    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    const loggedInUserId = localStorage.getItem('id');
    const loggedInUserName = localStorage.getItem('first_name');
    this.config = {
      params: { 'user_id': loggedInUserId, 'user_name': loggedInUserName, table_name: table_name },

      headers: { 'Accept': 'application/json', "Authorization": "Bearer " + this.authService.getAccessToken(), }
    };
    return this.http.post(this.baseUrl + '/onEnableConfigurationsDetails', dataForm, this.config)
      .pipe(map(data => {
        return data;
      }));
  }

  getSafeUrl(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url)
  }

  onLoadConfigurationData(data, action_url = 'onLoadConfigurationData') {
    data.table_name = btoa(data.table_name);
    // data.table_name=this.encryptionService.OnEncryptData(data.table_name)
    this.config = {
      params: data,
      headers: { 'Accept': 'application/json' }
    };

    return this.HttpClient.get(this.baseUrl + '/' + action_url, this.config)
      .pipe(map(data => {
        return <any>data;
      }));
  }

  getAppRegulatoryFunctionFeeConfig(data, action_url = 'getAppRegulatoryFunctionFeeConfig') {
    data.table_name = btoa(data.table_name);
    // data.table_name=this.encryptionService.OnEncryptData(data.table_name)
    this.config = {
      params: data,
      headers: { 'Accept': 'application/json' }
    };

    return this.HttpClient.get(this.baseUrl + '/' + action_url, this.config)
      .pipe(map(data => {
        return <any>data;
      }));
  }

  getFeesChargesConfigurations(data, action_url = 'getFeesChargesConfigurations') {
    data.table_name = btoa(data.table_name);
    // data.table_name=this.encryptionService.OnEncryptData(data.table_name)
    this.config = {
      params: data,
      headers: { 'Accept': 'application/json' }
    };

    return this.HttpClient.get(this.baseUrl + '/' + action_url, this.config)
      .pipe(map(data => {
        return <any>data;
      }));
  }

  onLoadApplicationtablsList(data, action_url = 'onLoadApplicationtablsList') {
    data.table_name = btoa(data.table_name);
    // data.table_name=this.encryptionService.OnEncryptData(data.table_name)
    this.config = {
      params: data,
      headers: { 'Accept': 'application/json' }
    };

    return this.HttpClient.get(this.baseUrl + '/' + action_url, this.config)
      .pipe(map(data => {
        return <any>data;
      }));
  }



  onSaveConfigurationDetailsDetails(table_name, data, action_url) {
    const loggedInUserId = localStorage.getItem('id');
    const loggedInUserName = localStorage.getItem('first_name');
    this.config = {
      params: { 'user_id': loggedInUserId, 'user_name': loggedInUserName, table_name: table_name },

      headers: { 'Accept': 'application/json' }
    };

    return this.http.post(this.baseUrl + '/' + action_url, data, this.config)
      .pipe(map(data => {
        return data;
      }));
  }

  onDeleteConfigurationsDetails(dataForm, table_name, title) {
    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    const loggedInUserId = localStorage.getItem('id');
    const loggedInUserName = localStorage.getItem('first_name');
    this.config = {
      params: { 'user_id': loggedInUserId, 'user_name': loggedInUserName, table_name: table_name },

      headers: { 'Accept': 'application/json', "Authorization": "Bearer " + this.authService.getAccessToken(), }
    };
    return this.http.post(this.baseUrl + '/onDeleteConfigurationsDetails', dataForm, this.config)
      .pipe(map(data => {
        return data;
      }));
    }

}

