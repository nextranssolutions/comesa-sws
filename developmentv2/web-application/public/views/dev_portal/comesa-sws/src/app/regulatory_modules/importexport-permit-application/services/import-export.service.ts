import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/core-services/authentication/authentication.service';
import { AppSettings } from 'src/app/app-settings';

@Injectable({
  providedIn: 'root'
})
export class ImportExportService {
  trader_id: number;
  mistrader_id: number;
  email_address: string;
  config: any;
  application_details: any;
  baseUrl: any;
  constructor(private authService: AuthenticationService,private http: HttpClient, private myRoute: Router, private httpClient: HttpClient) {
    let user = this.authService.getUserDetails();

    this.baseUrl = AppSettings.base_url + '/api/permits';
    this.trader_id = user.trader_id;
    this.mistrader_id = user.mistrader_id;
    this.email_address = user.email_address;

  }
  // onSavePermitApplication(application_id, permitData, tracking_no, action_url, uploadData = '') {

  //   let data_header = {
  //     // params: { application_id: application_id, tracking_no: tracking_no, 'trader_id': this.trader_id, 'trader_email': this.email_address },

  //     headers: { 'Accept': 'application/json', "Authorization": "Bearer " + this.authService.getAccessToken() }
  //   };

  //   return this.httpClient.post(this.baseUrl + '/' + action_url, permitData, data_header)
  //     .pipe(map(data => {
  //       return data;
  //     }));
  // }

  onSavePermitApplication(permitData,registrant_details,action_url) {
    var headers = new HttpHeaders({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    let user = this.authService.getUserDetails();
    let registrant_data = JSON.stringify(registrant_details);
    console.log(permitData);
    return this.http.post(AppSettings.base_url + '/api/import-export/'+action_url, permitData, { headers: headers })
      .pipe(map(data => {
        return data;
      }));
  }

  onsavePermitProductdetails(application_code, permitData, tracking_no, action_url) {



    let data_header = {
      params: { application_code: application_code, tracking_no: tracking_no, 'trader_id': this.trader_id, 'trader_email': this.email_address },

      headers: { 'Accept': 'application/json', "Authorization": "Bearer " + this.authService.getAccessToken() }
    };

    return this.httpClient.post(this.baseUrl + '/' + action_url, permitData, data_header)
      .pipe(map(data => {
        return data;
      }));
  }

  onLoadApplicationCounterDetails(table_name) {
    let user = this.authService.getUserDetails();
    var headers = new HttpHeaders({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    this.config = {
      params: { trader_id: user.trader_id, table_name: table_name },
      headers: headers
    };
    return this.httpClient.get(AppSettings.base_url + 'getApplicationCounterDetails', this.config)
      .pipe(map(data => {
        return <any>data;
      }));
  } getApplicationDetail() {
    return this.application_details;
  }
  setApplicationDetail(data: any[]) {
    this.application_details = data;
  }

  onPermitApplicationLoading(action_url, filter_params) {

    var headers = new HttpHeaders({
      "Accept": "application/json",
      "Authorization": 'Bearer ' + this.authService.getAccessToken(),
    });

    filter_params.trader_id = this.trader_id;
    filter_params.mistrader_id = this.mistrader_id;

    this.config = {
      params: filter_params,
      headers: headers
    };

    return this.httpClient.get(AppSettings.base_url + action_url, this.config)
      .pipe(map(data => {

        return <any>data;

      }));
  }

  onPermitApplicationArchive(application_id, tracking_no) {

    let data_header = {
      params: { 'trader_id': this.trader_id, 'traderemail_address': this.email_address, 'application_id': application_id, 'tracking_no': tracking_no },

      headers: { 'Accept': 'application/json', "Authorization": "Bearer " + this.authService.getAccessToken() }
    };

    return this.httpClient.post(this.baseUrl + '/' + 'onPermitApplicationArchive', '', data_header)
      .pipe(map(data => {
        return data;
      }));

  }
  onfuncValidatePermitDetails(application_code, validation_title, table_name) {

    var headers = new HttpHeaders({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    //trader_id:  

    this.config = {
      params: { application_code: application_code, validation_title: validation_title, table_name: table_name },
      headers: headers
    };
    return this.httpClient.get(AppSettings.base_url + 'utilities/onfuncValidatePermitDetails', this.config)
      .pipe(map(data => {
        return <any>data;
      }));
  }
  getPermitOtherdetails(data, path) {

    var headers = new HttpHeaders({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    //trader_id:  
    data.trader_id = this.trader_id;
    data.mistrader_id = this.mistrader_id;
    this.config = {
      params: data,
      headers: headers
    };
    return this.httpClient.get(AppSettings.base_url + 'permits/' + path, this.config)
      .pipe(map(data => {
        return <any>data;
      }));
  }
  getPermitsOtherDetails(data, path) {

    var headers = new HttpHeaders({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    //trader_id:  
    data.trader_id = this.trader_id;
    data.mistrader_id = this.mistrader_id;

    this.config = {
      params: data,
      headers: headers
    };
    return this.httpClient.get(AppSettings.base_url + '' + path, this.config)
      .pipe(map(data => {
        return <any>data;
      }));
  }
  onAddPermitReceiverSender(table_name, data) {//tra_permitsenderreceiver_data

    let data_header = {
      params: { 'trader_id': this.trader_id, 'traderemail_address': this.email_address, table_name: table_name },

      headers: { 'Accept': 'application/json', "Authorization": "Bearer " + this.authService.getAccessToken() }
    };

    return this.httpClient.post(this.baseUrl + '/' + 'onAddUniformApplicantDataset', data, data_header)
      .pipe(map(data => {
        return data;
      }));
  }
  onAddNewProductinformation(productData, action_url) {//tra_permitsenderreceiver_data

    let data_header = {
      params: { 'trader_id': this.trader_id, 'email_address': this.email_address },

      headers: { 'Accept': 'application/json', "Authorization": "Bearer " + this.authService.getAccessToken() }
    };

    return this.httpClient.post(this.baseUrl + '/' + action_url, productData, data_header)
      .pipe(map(data => {
        return data;
      }));
  }
  onDeleteClinialREgistryDetails(record_id, table_name, application_id, title) {

    let data_header = {
      params: { 'trader_id': this.trader_id, 'email_address': this.email_address, record_id: record_id, application_id: application_id, table_name: table_name, title: title },

      headers: { 'Accept': 'application/json', "Authorization": "Bearer " + this.authService.getAccessToken() }
    };

    return this.httpClient.post(this.baseUrl + '/' + 'onDeleteClinicalRegistryDetails', '', data_header)
      .pipe(map(data => {
        return data;
      }));
  }

  onDeletePermitProductsDetails(record_id, table_name, application_code, title) {

    let data_header = {
      params: { 'trader_id': this.trader_id, 'email_address': this.email_address, record_id: record_id, application_code: application_code, table_name: table_name, title: title },

      headers: { 'Accept': 'application/json', "Authorization": "Bearer " + this.authService.getAccessToken() }
    };

    return this.httpClient.post(this.baseUrl + '/' + 'onDeletePermitdetails', '', data_header)
      .pipe(map(data => {
        return data;
      }));
  }
  onDeletePermitUploadedProductsDetails(table_name, application_code, title) {


    let data_header = {
      params: { 'trader_id': this.trader_id, 'email_address': this.email_address, application_code: application_code, table_name: table_name, title: title },

      headers: { 'Accept': 'application/json', "Authorization": "Bearer " + this.authService.getAccessToken() }
    };

    return this.httpClient.post(this.baseUrl + '/' + 'onDeletePermitUploadedProductsDetails', '', data_header)
      .pipe(map(data => {
        return data;
      }));
  }

  onSynchronisedUploadedProducts(table_name, application_code, title) {

    let data_header = {
      params: { 'trader_id': this.trader_id, 'email_address': this.email_address, application_code: application_code, table_name: table_name, title: title },

      headers: { 'Accept': 'application/json', "Authorization": "Bearer " + this.authService.getAccessToken() }
    };

    return this.httpClient.post(this.baseUrl + '/' + 'onSynchronisedUploadedProducts', '', data_header)
      .pipe(map(data => {
        return data;
      }));

  }

  onSaveClinicalStudySite(study_site_data, table_name, application_id) {//tra_permitsenderreceiver_data
    var headers = new HttpHeaders({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    let user = this.authService.getUserDetails();
    return this.httpClient.post(AppSettings.base_url + 'permits/onSaveClinicalStudySite', study_site_data, { params: { 'trader_id': this.trader_id, 'traderemail_address': this.email_address, table_name: table_name, application_id: application_id }, headers: headers })
      .pipe(map(data => {
        return data;
      }));
  }
  onsaveClinicaltrialOtherDetails(application_id, permitData, action_url) {

    var headers = new HttpHeaders({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    let user = this.authService.getUserDetails();
    return this.httpClient.post(AppSettings.base_url + 'permits/' + action_url, permitData, { params: { application_id: application_id, 'trader_id': this.trader_id, 'trader_email': this.email_address }, headers: headers })
      .pipe(map(data => {
        return data;
      }));
  }
  onsaveClinicaltrialAppCodeOtherDetails(application_code, permitData, action_url) {

    var headers = new HttpHeaders({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    let user = this.authService.getUserDetails();
    return this.httpClient.post(AppSettings.base_url + 'permits/' + action_url, permitData, { params: { application_code: application_code, 'trader_id': this.trader_id, 'trader_email': this.email_address }, headers: headers })
      .pipe(map(data => {
        return data;
      }));
  }

}
