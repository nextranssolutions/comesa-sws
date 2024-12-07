import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettings } from 'src/app/app-settings';
import { catchError, map } from 'rxjs/operators';

import { DomSanitizer } from '@angular/platform-browser';
import { AuthenticationService } from '../authentication/authentication.service';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TasksallocationManagementService {
  base_url: string;

  private baseUrl;
  information: any;
  data: any;
  key: string = 'kPJks1MrdXE03n8H';
  uploadUrl: string;

  application_details: any;
  constructor(private HttpClient: HttpClient, private http: HttpClient, private sanitizer: DomSanitizer, private authService: AuthenticationService) {
    this.baseUrl = AppSettings.base_url + '/api/taskallocationmanagement';
  }
  getApplicationDetail() {
    return this.application_details;
  }
  setApplicationDetail(data: any[]) {
    this.application_details = data;
  }
  onLoadServicesDataset(data) {
    data.table_name = btoa(data.table_name);

    this.information = {
      params: data,
      headers: { 'Accept': 'application/json' }
    };

    return this.HttpClient.get(this.baseUrl + '/onLoadTasksAllocationConfig', this.information)
      .pipe(map(navigations => {
        return <any>navigations;
      }));
  }

  onLoadTasksAllocationConfig(data) {
    data.table_name = btoa(data.table_name);
    this.information = {
      params: data,
      headers: { 'Accept': 'application/json' }
    };

    return this.HttpClient.get(this.baseUrl + '/onLoadTasksAllocationConfig', this.information)
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


  onLoadTasksAllocationDataUrl(data, action_url) {
    data.table_name = btoa(data.table_name);
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

  onLoadExpertsClaimsRegisterStatusCounters() {

    const loggedInUserId = localStorage.getItem('id');
    const account_type_id = localStorage.getItem('account_type_id');
    const member_state_id = localStorage.getItem('member_state_id');

    this.information = {
      params: { loggedInUserId: loggedInUserId, account_type_id: account_type_id, member_state_id: member_state_id },
      headers: { 'Accept': 'application/json' }
    };
    return this.HttpClient.get(this.baseUrl + '/onLoadExpertsClaimsRegisterStatusCounters', this.information)
      .pipe(map(data => {
        return <any>data;
      }));

  }
  
  onLoadClaimsRequestsRegisterCounters() {

    const loggedInUserId = localStorage.getItem('id');
    const account_type_id = localStorage.getItem('account_type_id');
    const member_state_id = localStorage.getItem('member_state_id');

    this.information = {
      params: { user_profile_id: loggedInUserId, account_type_id: account_type_id, member_state_id: member_state_id },
      headers: { 'Accept': 'application/json' }
    };
    return this.HttpClient.get(this.baseUrl + '/onLoadClaimsRequestsRegisterCounters', this.information)
      .pipe(map(data => {
        return <any>data;
      }));

  }
  onLoadExpertsTasksAllocationStatusCounters() {

    const loggedInUserId = localStorage.getItem('id');
    const account_type_id = localStorage.getItem('account_type_id');
    const member_state_id = localStorage.getItem('member_state_id');

    this.information = {
      params: { user_profile_id: loggedInUserId, account_type_id: account_type_id, member_state_id: member_state_id },
      headers: { 'Accept': 'application/json' }
    };
    return this.HttpClient.get(this.baseUrl + '/onLoadExpertsTasksAllocationStatusCounters', this.information)
      .pipe(map(data => {
        return <any>data;
      }));

  }
  onLoadTasksAllocationStatusCounters() {

    const loggedInUserId = localStorage.getItem('id');
    const account_type_id = localStorage.getItem('account_type_id');
    const member_state_id = localStorage.getItem('member_state_id');

    this.information = {
      params: { loggedInUserId: loggedInUserId, account_type_id: account_type_id, member_state_id: member_state_id },
      headers: { 'Accept': 'application/json' }
    };
    return this.HttpClient.get(this.baseUrl + '/onLoadTasksAllocationStatusCounters', this.information)
      .pipe(map(data => {
        return <any>data;
      }));

  }

  onSaveTasksAllocationSDetails(table_name, data, action_url) {
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

  onDeleteTasksAllocationDetails(dataForm, table_name, title) {
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
    return this.http.post(this.baseUrl + '/onDeleteTasksAllocationDetails', dataForm, this.information)
      .pipe(map(data => {
        return data;
      }));
  }
}