
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettings } from 'src/app/app-settings';
import { map } from 'rxjs/operators';

import { DomSanitizer } from '@angular/platform-browser';
import { AuthenticationService } from '../authentication/authentication.service';
import { Observable } from 'rxjs';
import { EncryptionService } from '../encryption/encryption.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationsService {

  base_url: string;
  private baseUrl;
  config: any;
  data: any;
  key: string = 'kPJks1MrdXE03n8H';

  application_details: any;
  constructor(private HttpClient: HttpClient, private http: HttpClient, private sanitizer: DomSanitizer, private authService: AuthenticationService, private encryptionService: EncryptionService) {
    this.baseUrl = AppSettings.base_url + '/api/configurations';
  }
  getApplicationDetail() {
    return this.application_details;
  }
  setApplicationDetail(data: any[]) {
    this.application_details = data;
  }
  onLoadServicesDataset(module_id) {

    this.config = {
      params: { module_id: module_id },
      headers: { 'Accept': 'application/json' }
    };
    return this.HttpClient.get(this.baseUrl + '/getOrganisationServices', this.config)
      .pipe(map(navigations => {

        return navigations;
      }));
  }
  funcFetchPublicDetailsCounter() {

    this.config = {
      headers: { 'Accept': 'application/json' }
    };
    return this.HttpClient.get(this.baseUrl + '/funcFetchPublicDetailsCounter', this.config)
      .pipe(map(navigations => {

        return navigations;
      }));

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
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    
  }
  onLoadAppSubmissionGuidelines(sub_module_id, section_id) {
    var headers = new HttpHeaders({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    this.config = {
      params: { sub_module_id: sub_module_id, section_id: section_id },
      headers: headers
    };
    return this.HttpClient.get(this.baseUrl + '/getAppSubmissionGuidelines', this.config)
      .pipe(map(data => {
        return <any>data;
      }));
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

  

  onLoadTranslationManagement(data) {
    data.table_name = btoa(data.table_name);

    this.config = {
      params: data,
      headers: { 'Accept': 'application/json' }
    };

    return this.HttpClient.get(this.baseUrl + '/onLoadTranslationManagement', this.config)
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

  onSavingLanguageTranslationManagement(table_name, data, post_data, action_url) {
    const loggedInUserId = localStorage.getItem('id');
    const loggedInUserName = localStorage.getItem('first_name');
    this.config = {
      params: { 'user_id': loggedInUserId, 'user_name': loggedInUserName, table_name: table_name, 'permission_data': post_data },

      headers: { 'Accept': 'application/json' }
    };

    return this.http.post(this.baseUrl + '/' + action_url, data, this.config)
      .pipe(map(data => {
        return data;
      }));
  }
  returnReportIframe(report_url){
    let iframe = '<iframe class="w-100 h-100" style="height:650px !important" src="'+report_url+'" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>Data</iframe>';
    return iframe;
    
  }
  
  returnFixedHeightReportIframe(report_url,height){
    let iframe = '<iframe class="w-100 h-100" style="height:"'+height+'" !important" src="'+report_url+'" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>Data</iframe>';
    return iframe;
    
  }
  returnReportIframeFill(report_url){
    let iframe = '<iframe class="col-lg-12 row" style="height:750px !important" src="'+report_url+'" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>Data</iframe>';
    return iframe;
    
  }
  getSectionUniformApplicationProcesWithValidation(regulatory_subfunction_id, status_id, regulated_productstype_id= null,prodclass_category_id= null,reg_id=null,reg_iddefination=null,appsubmissions_type_id=null) {
    
    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    this.config = {
      params: { status_id: status_id, regulatory_subfunction_id: regulatory_subfunction_id,regulated_productstype_id:regulated_productstype_id,prodclass_category_id:prodclass_category_id,reg_id:reg_id,reg_iddefination:reg_iddefination,appsubmissions_type_id:appsubmissions_type_id},
      headers: headers
    };
    return this.HttpClient.get(this.baseUrl + '/getSectionUniformApplicationProcesWithValidation', this.config)
      .pipe(map(data => {
        return <any>data;
      }));
  } 
  getSectionUniformApplicationProces(regulatory_subfunction_id, status_id, permit_type_id= 0 ) {
    
    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    this.config = {
      params: { regulatory_subfunction_id:regulatory_subfunction_id, status_id:status_id, permit_type_id:permit_type_id},
      headers: headers
    };
    return this.HttpClient.get(this.baseUrl + '/getUniformSectionApplicationProcess', this.config)
      .pipe(map(data => {
        return <any>data;
      }));
  } 
  getApplicantUniformApplicationProces(regulatory_subfunction_id, status_id, permit_type_id= 0 ) {
    
    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    this.config = {
      params: { regulatory_subfunction_id:regulatory_subfunction_id, status_id:status_id, permit_type_id:permit_type_id},
      headers: headers
    };
    return this.HttpClient.get(this.baseUrl + '/getApplicantUniformApplicationProces', this.config)
      .pipe(map(data => {
        return <any>data;
      }));
  } 
  getSectionUniformApplication(regulatory_subfunction_id,applicationsubmission_type_id=0) {
    
    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    this.config = {
      params: { regulatory_subfunction_id: regulatory_subfunction_id, applicationsubmission_type_id:applicationsubmission_type_id},
      headers: headers
    };
    return this.HttpClient.get(this.baseUrl + '/getUniformSectionApplicationProcess', this.config)
      .pipe(map(data => {
        return <any>data;
      }));
  } 
}
