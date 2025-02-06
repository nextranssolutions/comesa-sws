import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettings } from 'src/app/app-settings';
import { map } from 'rxjs/operators';

import { DomSanitizer } from '@angular/platform-browser';
import { AuthenticationService } from '../authentication/authentication.service';
@Injectable({
  providedIn: 'root'
})
export class ExpertsprofileserviceService {
  base_url: string;

  private baseUrl;
  information: any;
  data:any;
  key:string= 'kPJks1MrdXE03n8H';

  application_details: any;
  constructor(private HttpClient: HttpClient, private http: HttpClient,private sanitizer:DomSanitizer,private authService: AuthenticationService) { 
      this.baseUrl = AppSettings.base_url + '/api/expertsprofile';
  }
  getApplicationDetail() {
    return this.application_details;
  }
  setApplicationDetail(data: any[]) {
    this.application_details = data;
  }
  
  getSafeUrl(url) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(url)
  }
  
  onSaveExpertProfileDetails(table_name,data,action_url){
    const loggedInUserId = localStorage.getItem('id');
    const loggedInUserName = localStorage.getItem('first_name');
    this.information = {
      params: { 'user_id': loggedInUserId, 'user_name': loggedInUserName,table_name:table_name },

      headers: { 'Accept': 'application/json' }
    };

    return this.http.post(this.baseUrl + '/'+action_url, data,this.information)
      .pipe(map(data => {
        return data;
      }));
  }
  

  onDeleteExpertProfileDetails(dataForm,table_name,title){
    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    const loggedInUserId = localStorage.getItem('id');
    const loggedInUserName = localStorage.getItem('first_name');
    this.information = {
      params: { 'user_id': loggedInUserId, 'user_name': loggedInUserName,table_name:table_name },

      headers: { 'Accept': 'application/json',"Authorization": "Bearer " + this.authService.getAccessToken(), }
    };
    return this.http.post(this.baseUrl + '/onDeleteExpertProfileDetails', dataForm, this.information)
      .pipe(map(data => {
        return data;
      }));
  }
  onDeleteExpertsInformationData(dataForm,table_name,action_url,title){
    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    const loggedInUserId = localStorage.getItem('id');
    const loggedInUserName = localStorage.getItem('first_name');
    this.information = {
      params: {'title':title, 'user_id': loggedInUserId, 'user_name': loggedInUserName,table_name:table_name },

      headers: { 'Accept': 'application/json',"Authorization": "Bearer " + this.authService.getAccessToken(), }
    };
    return this.http.post(this.baseUrl + '/'+action_url, dataForm, this.information)
      .pipe(map(data => {
        return data;
      }));
  }
  //
  onLoadExpertsConfigData(data) {
    data.table_name = btoa(data.table_name);
    this.information = {
      params: data,
      headers: { 'Accept': 'application/json' }
    };

    return this.HttpClient.get(this.baseUrl + '/onLoadExpertsConfigData', this.information)
      .pipe(map(data => {
        return <any>data;
      }));
  }

  onLoadExpertsProfileDataUrl(data, action_url) {
    data.table_name = btoa(data.table_name);
    this.information = {
      params: data,
      headers: { 'Accept': 'application/json' }
    };
    return this.HttpClient.get(this.baseUrl + '/' + action_url, this.information)
      .pipe(map(data => {
        return <any>data;
      }));
  }

  onGetExpertsProfileInformation(data, action_url) {
    data.table_name = btoa(data.table_name);
    const loggedInUserId = localStorage.getItem('id');
    data.user_information_id = loggedInUserId; 
    this.information = {
      params: data,
      headers: { 'Accept': 'application/json' }
    };
    return this.HttpClient.get(this.baseUrl + '/' + action_url, this.information)
      .pipe(map(data => {
        return <any>data;
      }));
  }

  onExpertsAccountApproval(dataForm, appworkflow_status_id, decision_description) {
    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    const loggedInUserId = localStorage.getItem('id');
    const loggedInUserName = localStorage.getItem('first_name');
    this.information = {
      params: { 'loggedInUserId': loggedInUserId, 'appworkflow_status_id': appworkflow_status_id, 'user_name': loggedInUserName, decision_description: decision_description },
      headers: { 'Accept': 'application/json', "Authorization": "Bearer " + this.authService.getAccessToken(), }
    };
    return this.http.post(this.baseUrl + '/onExpertsAccountApproval', dataForm, this.information)
      .pipe(map(data => {
        return data;
      }));
  }
  
  
  onLoadExpertsEvaluationPerformanceCounter() {
    const loggedInUserId = localStorage.getItem('id');
    const account_type_id = localStorage.getItem('account_type_id');
    const member_state_id = localStorage.getItem('member_state_id');
    this.information = {
      params: { loggedInUserId: loggedInUserId, account_type_id: account_type_id,member_state_id:member_state_id },
      headers: { 'Accept': 'application/json' }
    };
    return this.HttpClient.get(this.baseUrl + '/onLoadExpertsEvaluationPerformanceCounter', this.information)
      .pipe(map(data => {
        return <any>data;
      }));
  }

  onLoadPerformanceEvalStatusCounters() {
    const loggedInUserId = localStorage.getItem('id');
    const account_type_id = localStorage.getItem('account_type_id');
    const member_state_id = localStorage.getItem('member_state_id');
    this.information = {
      params: { loggedInUserId: loggedInUserId, account_type_id: account_type_id,member_state_id:member_state_id },
      headers: { 'Accept': 'application/json' }
    };
    return this.HttpClient.get(this.baseUrl + '/onLoadExpertsPerformanceEvalSummaryRegisterData', this.information)
      .pipe(map(data => {
        return <any>data;
      }));
  }
  
  onLoadExpertsProfilesStatusCounters() {
    const loggedInUserId = localStorage.getItem('id');
    const account_type_id = localStorage.getItem('account_type_id');
    // const member_state_id = localStorage.getItem('member_state_id');
    this.information = {
      params: { loggedInUserId: loggedInUserId, account_type_id: account_type_id, },
      headers: { 'Accept': 'application/json' }
    };
    return this.HttpClient.get(this.baseUrl + '/onLoadExpertsProfilesStatusCounters', this.information)
      .pipe(map(data => {
        return <any>data;
      }));
  }
  
  onLoadExpertsRegistrationStatusCounters() {
    const loggedInUserId = localStorage.getItem('id');
    const account_type_id = localStorage.getItem('account_type_id');
    const member_state_id = localStorage.getItem('member_state_id');
    this.information = {
      params: { loggedInUserId: loggedInUserId, account_type_id: account_type_id,member_state_id:member_state_id },
      headers: { 'Accept': 'application/json' }
    };
    return this.HttpClient.get(this.baseUrl + '/onLoadExpertsRegistrationStatusCounters', this.information)
      .pipe(map(data => {
        return <any>data;
      }));
  }
  onLoadEoiMyApplicationsCounters() {
    const loggedInUserId = localStorage.getItem('id');
    const account_type_id = localStorage.getItem('account_type_id');
    const member_state_id = localStorage.getItem('member_state_id');
    this.information = {
      params: { loggedInUserId: loggedInUserId, account_type_id: account_type_id,member_state_id:member_state_id },
      headers: { 'Accept': 'application/json' }
    };
    return this.HttpClient.get(this.baseUrl + '/onLoadEoiMyApplicationsCounters', this.information)
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

  getUserInformation() {
    const loggedInUserId = localStorage.getItem('id');
    this.information = {
      params: { loggedInUserId: loggedInUserId},
      headers: { 'Accept': 'application/json' }
    };
    return this.HttpClient.get(this.baseUrl + '/getUserInformation', this.information)
      .pipe(map(data => {
        return <any>data;
      }));
  }
  getProcessessFilteredUsers(workflow_stage_id) {
    const loggedInUserId = localStorage.getItem('id');
    this.information = {
      params: { loggedInUserId: loggedInUserId, 'workflow_stage_id':workflow_stage_id},
      headers: { 'Accept': 'application/json' }
    };
    return this.HttpClient.get(this.baseUrl + '/getProcessessFilteredUsers', this.information)
      .pipe(map(data => {
        return <any>data;
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

  onsendStocklvlUploadedDetails(table_name, data, action_url)
  {
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
  onSyncSaveExpertsUploadedDetails(main_table_name: string, formData: FormData, action_url: string) {
    const loggedInUserId = localStorage.getItem('id');
    const loggedInUserName = localStorage.getItem('first_name');
  
    // Append user details and main_table_name to the form data
    formData.append('user_id', loggedInUserId || '');
    formData.append('user_name', loggedInUserName || '');
    formData.append('main_table_name', main_table_name);
  
    const headers = new HttpHeaders({ 'Accept': 'application/json' });
  
    return this.http.post(`${this.baseUrl}/${action_url}`, formData, { headers })
      .pipe(map(response => response));
  }
}
