import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettings } from 'src/app/app-settings';
import { map } from 'rxjs/operators';

import { DomSanitizer } from '@angular/platform-browser';
import { AuthenticationService } from '../authentication/authentication.service';
@Injectable({
  providedIn: 'root'
})
export class WokflowManagementService {
  base_url: string;
  userData: any;
  private baseUrl;
  workflow: any;
  data: any;
  key: string = 'kPJks1MrdXE03n8H';
  userGroupId: number;
  application_details: any;
  config: any;
  constructor(private HttpClient: HttpClient, private http: HttpClient, private sanitizer: DomSanitizer, private authService: AuthenticationService) {
    this.baseUrl = AppSettings.base_url + '/api/workflow';

    this.base_url = AppSettings.base_url;
    this.userData = localStorage.getItem('user');
    this.userData = JSON.parse(this.userData);
  }
  getApplicationDetail() {
    return this.application_details;
  }
  setApplicationDetail(data: any[]) {
    this.application_details = data;
  }

  onLoadWorkflowData(data) {
    data.table_name = btoa(data.table_name);
    this.workflow = {
      params: data,
      headers: { 'Accept': 'application/json' }
    };

    return this.HttpClient.get(this.baseUrl + '/onLoadWorkflowData', this.workflow)
      .pipe(map(data => {
            return <any>data;
      }));
  }

  onLoadServicesDataset(module_id) {

    this.workflow = {
      params: { module_id: module_id },
      headers: { 'Accept': 'application/json' }
    };
    return this.HttpClient.get(this.baseUrl + '/getOrganisationServices', this.workflow)
      .pipe(map(navigations => {

        return navigations;
      }));
  }
  funcFetchPublicDetailsCounter() {
    this.workflow = {
      headers: { 'Accept': 'application/json' }
    };
    return this.HttpClient.get(this.baseUrl + '/funcFetchPublicDetailsCounter', this.workflow)
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
    this.workflow = {
      params: { sub_module_id: sub_module_id, section_id: section_id },
      headers: headers
    };
    return this.HttpClient.get(this.baseUrl + '/getAppSubmissionGuidelines', this.workflow)
      .pipe(map(data => {
        return <any>data;
      }));
  }

  
  getallNavigationItems(level_no) {
    this.workflow = {
      headers: { 'Accept': 'application/json' },
      params:{level:level_no}
    };

    return this.HttpClient.get(this.baseUrl + '/getAllNavigationItems', this.workflow)
      .pipe(map(data => {
        return <any>data;
      }));
  }
  getAppNavigationMenus() {
    this.workflow = {
      headers: { 'Accept': 'application/json' }
    };

    return this.HttpClient.get(this.baseUrl + '/getAppNavigationMenus', this.workflow)
      .pipe(map(data => {
        return <any>data;
      }));
  }
  getWorkflowConfigs(data) {
    data.table_name = btoa(data.table_name);
    this.workflow = {
      params: data,
      headers: { 'Accept': 'application/json' }
    };

    return this.HttpClient.get(this.baseUrl + '/getWorkflowConfigs', this.workflow)
      .pipe(map(data => {
        return <any>data;
      }));
  } getWorkflowConfigsUrl(data,action_url) {
    data.table_name = btoa(data.table_name);
    this.workflow = {
      params: data,
      headers: { 'Accept': 'application/json' }
    };

    return this.HttpClient.get(this.baseUrl + '/'+ action_url, this.workflow)
      .pipe(map(data => {
        return <any>data;
      }));
  }
  onSaveWorkflowDetailsDetails(table_name, data, action_url) {
    const loggedInUserId = localStorage.getItem('id');
    const loggedInUserName = localStorage.getItem('first_name');
    this.workflow = {
      params: { 'user_id': loggedInUserId, 'user_name': loggedInUserName, table_name: table_name },

      headers: { 'Accept': 'application/json' }
    };

    return this.http.post(this.baseUrl + '/' + action_url, data, this.workflow)
      .pipe(map(data => {
        return data;
      }));
  }


  onSaveImageInformation(table_name, data, action_url) {
    const loggedInUserId = localStorage.getItem('id');
    const loggedInUserName = localStorage.getItem('first_name');
    this.workflow = {
      params: { 'user_id': loggedInUserId, 'user_name': loggedInUserName, table_name: table_name },
      headers: { 'Accept': 'application/json' }
    };
    return this.http.post(this.baseUrl + '/' + action_url, data, this.workflow)
      .pipe(map(data => {
        return data;
      }));
  }
  onDeleteWorkflowsDetails(dataForm, table_name, title) {
    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    const loggedInUserId = localStorage.getItem('id');
    const loggedInUserName = localStorage.getItem('first_name');
    this.workflow = {
      params: { 'user_id': loggedInUserId, 'user_name': loggedInUserName, table_name: table_name },

      headers: { 'Accept': 'application/json', "Authorization": "Bearer " + this.authService.getAccessToken(), }
    };
    return this.http.post(this.baseUrl + '/onDeleteWorkflowsDetails', dataForm, this.workflow)
      .pipe(map(data => {
        return data;
      }));
  }
  getUserNavigationItems(navigation_type_id) {

    this.userGroupId = this.userData.user_group_id;
    
    this.config = {
      headers: { 'Accept': 'application/json' },
      params: { userGroupId: this.userGroupId, navigation_type_id:navigation_type_id },
    };

    return this.http.get(this.baseUrl + '/getUserNavigationItems', this.config)
      .pipe(map(navigations => {

        return navigations;
      }));


  }
}