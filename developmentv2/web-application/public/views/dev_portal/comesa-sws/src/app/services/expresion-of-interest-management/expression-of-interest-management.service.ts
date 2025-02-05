import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettings } from 'src/app/app-settings';
import { catchError, map } from 'rxjs/operators';

import { DomSanitizer } from '@angular/platform-browser';
import { AuthenticationService } from '../authentication/authentication.service';
import { throwError } from 'rxjs';
import { EncryptionService } from '../encryption/encryption.service';
@Injectable({
  providedIn: 'root'
})
export class ExpressionOfInterestManagementService {
  base_url: string;

  private baseUrl;
  information: any;
  data: any;
  // key: string = 'kPJks1MrdXE03n8H';
  uploadUrl: string;

  application_details: any;
  constructor(private HttpClient: HttpClient, private http: HttpClient, private sanitizer: DomSanitizer, private authService: AuthenticationService, private encryptionService: EncryptionService) {
    this.baseUrl = AppSettings.base_url + '/api/expressionofinterest';
  }
  getApplicationDetail() {
    return this.application_details;
  }
  // setApplicationDetail(data: any[]) {
  //   this.application_details = data;
  //   ;
  // }

  setApplicationDetail(data: any[]) {
    this.application_details = data;
    // ;
    return this.application_details;  // Ensure to return the data here.
  }
  

  onLoadServicesDataset(data) {
    data.table_name = btoa(data.table_name);

    this.information = {
      params: data,
      headers: { 'Accept': 'application/json' }
    };

    return this.HttpClient.get(this.baseUrl + '/onLoadExpressionOfInterestConfig', this.information)
      .pipe(map(navigations => {
        return <any>navigations;
      }));
  }

  onLoadExpressionOfInterestConfig(data) {
    data.table_name = btoa(data.table_name);
    this.information = {
      params: data,
      headers: { 'Accept': 'application/json' }
    };

    return this.HttpClient.get(this.baseUrl + '/onLoadExpressionOfInterestConfig', this.information)
      .pipe(map(data => {
        return <any>data;
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
    this.information = {
      params: { sub_module_id: sub_module_id, section_id: section_id },
      headers: headers
    };
    return this.HttpClient.get(this.baseUrl + '/getAppSubmissionGuidelines', this.information)
      .pipe(map(data => {
        return <any>data;
      }));
  }


  onLoadExpressionOfInterestDataUrl(data, action_url) {
    data.table_name = btoa(data.table_name);
    data.table_name=this.encryptionService.OnEncryptData(data.table_name)
    const loggedInUserId = localStorage.getItem('id');
    data.user_id =loggedInUserId;
    this.information = {
      params: data,
      headers: { 'Accept': 'application/json' }
    };
    return this.HttpClient.get(this.baseUrl + '/' + action_url, this.information)
      .pipe(map(data => {
        return <any>data;
      }));
  }

  
  onLoadExpressionTargetsCounter() {

    const loggedInUserId = localStorage.getItem('id');
    const account_type_id = localStorage.getItem('account_type_id');
    const member_state_id = localStorage.getItem('member_state_id');

    this.information = {
      params: { loggedInUserId: loggedInUserId, account_type_id: account_type_id, member_state_id: member_state_id },
      headers: { 'Accept': 'application/json' }
    };
    return this.HttpClient.get(this.baseUrl + '/onLoadExpressionTargetsCounter', this.information)
      .pipe(map(data => {
        return <any>data;
      }));

  }
  onLoadWorkfAllocationRegisterCounters() {

    const loggedInUserId = localStorage.getItem('id');
    const account_type_id = localStorage.getItem('account_type_id');
    const member_state_id = localStorage.getItem('member_state_id');

    this.information = {
      params: { loggedInUserId: loggedInUserId, account_type_id: account_type_id, member_state_id: member_state_id },
      headers: { 'Accept': 'application/json' }
    };
    return this.HttpClient.get(this.baseUrl + '/onLoadWorkfAllocationRegisterCounters', this.information)
      .pipe(map(data => {
        return <any>data;
      }));

  }
  onLoadExpressionOfInterestStatusCounters() {

    const loggedInUserId = localStorage.getItem('id');
    const account_type_id = localStorage.getItem('account_type_id');
    const member_state_id = localStorage.getItem('member_state_id');

    this.information = {
      params: { loggedInUserId: loggedInUserId, account_type_id: account_type_id },
      headers: { 'Accept': 'application/json' }
    };
    return this.HttpClient.get(this.baseUrl + '/onLoadExpressionOfInterestStatusCounters', this.information)
      .pipe(map(data => {
        return <any>data;
      }));

  }

  onLoadEOIEvaluationStatusCounters() {

    const loggedInUserId = localStorage.getItem('id');
    const account_type_id = localStorage.getItem('account_type_id');
    const member_state_id = localStorage.getItem('member_state_id');

    this.information = {
      params: { loggedInUserId: loggedInUserId, account_type_id: account_type_id },
      headers: { 'Accept': 'application/json' }
    };
    return this.HttpClient.get(this.baseUrl + '/onLoadEOIEvaluationStatusCounters', this.information)
      .pipe(map(data => {
        return <any>data;
      }));

  }

  onLoadNumbreofExpressionApplication() {

    const loggedInUserId = localStorage.getItem('id');
    const account_type_id = localStorage.getItem('account_type_id');
    const member_state_id = localStorage.getItem('member_state_id');

    this.information = {
      params: { loggedInUserId: loggedInUserId, account_type_id: account_type_id, member_state_id: member_state_id },
      headers: { 'Accept': 'application/json' }
    };
    return this.HttpClient.get(this.baseUrl + '/onLoadNumbreofExpressionApplication', this.information)
      .pipe(map(data => {
        return <any>data;
      }));

  }
  

  onSaveExpressionOfInterestSDetails(table_name, data, action_url) {
    const loggedInUserId = localStorage.getItem('id');
    const loggedInUserName = localStorage.getItem('first_name');
    this.information = {
      params: { 'user_id': loggedInUserId, 'user_name': loggedInUserName, table_name: table_name },
      headers: { 'Accept': 'application/json' }
    };
    return this.http.post(this.baseUrl + '/' + action_url, data, this.information)
      .pipe(map(data => {
        return data;
      }));
  }

  uploadApplicationDMSDocument(uploadData, application_code, action_url) {

    const loggedInUserId = localStorage.getItem('id');
    const loggedInUserName = localStorage.getItem('first_name');
    this.information = {
      params: { 'user_id': loggedInUserId, 'user_name': loggedInUserName, application_code: application_code },

      headers: { 'Accept': 'application/json', "Authorization": "Bearer " + this.authService.getAccessToken(), }
    };

    return this.http.post(this.uploadUrl + '/' + action_url, uploadData, this.information)
      .pipe(map(data => {
        return data;
      }));
  }

  onDeleteExpressionOfInterestDetails(dataForm, table_name, title) {
    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    const loggedInUserId = localStorage.getItem('id');
    const loggedInUserName = localStorage.getItem('first_name');
    this.information = {
      params: { 'user_id': loggedInUserId, 'user_name': loggedInUserName, table_name: table_name },

      headers: { 'Accept': 'application/json', "Authorization": "Bearer " + this.authService.getAccessToken(), }
    };
    return this.http.post(this.baseUrl + '/onDeleteExpressionOfInterestDetails', dataForm, this.information)
      .pipe(map(data => {
        return data;
      }));
  }
  
  onSavingexpertEvaluationChecklistDetails(table_name,data,post_data,action_url){
    const loggedInUserId = localStorage.getItem('id');
    const loggedInUserName = localStorage.getItem('first_name');
    this.information = {
      params: { 'user_id': loggedInUserId, 'user_name': loggedInUserName,table_name:table_name, 'experts_data': post_data},

      headers: { 'Accept': 'application/json' }
    };

    return this.http.post(this.baseUrl + '/'+action_url, data,this.information)
      .pipe(map(data => {
        return data;
      }));
  }

}