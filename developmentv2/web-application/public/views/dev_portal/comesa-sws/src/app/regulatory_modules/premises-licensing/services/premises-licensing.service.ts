import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { AppSettings } from 'src/app/app-settings';
import { AuthenticationService } from 'src/app/core-services/authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class PremisesLicensingService {

  trader_id: number;
  mistrader_id: number;
  email_address: string;
  config: any;
  premisesapp_details: any;
  baseUrl: any;
  constructor(private authService: AuthenticationService, private myRoute: Router, private http: HttpClient, private httpClient: HttpClient) {
    this.baseUrl = AppSettings.base_url + '/api/premises_licensing';
    let user = this.authService.getUserDetails();
    this.trader_id = user.trader_id;
    this.mistrader_id = user.mistrader_id;
    this.email_address = user.email_address;


  }
  onPremisesApplicationLoading(filter_params) {
    var headers = new HttpHeaders({
      "Accept": "application/json",
      "Authorization": 'Bearer ' + this.authService.getAccessToken(),
    });
    // filter_params.trader_id = this.trader_id;
    this.config = {
      params: filter_params,
      headers: headers
    };
    return this.httpClient.get(this.baseUrl + '/getPremisesApplicationLoading', this.config)
      .pipe(map(data => {

        return <any>data;

      }));
  }

  onPremisesArchivedApplicationLoading() {
    var headers = new HttpHeaders({
      "Accept": "application/json",
      "Authorization": 'Bearer ' + this.authService.getAccessToken(),
    });
    this.config = {
      params: { trader_id: this.trader_id },
      headers: headers
    };
    return this.httpClient.get(this.baseUrl + '/getPremisesArchivedApplicationLoading', this.config)
      .pipe(map(data => {

        return <any>data;

      }));
  }
  onLoadPersonnelInformations() {
    var headers = new HttpHeaders({
      "Accept": "application/json",
      "Authorization": 'Bearer ' + this.authService.getAccessToken(),
    });

    this.config = {
      headers: headers,
      params: { mistrader_id: this.mistrader_id }
    };

    return this.httpClient.get(this.baseUrl + '/getPersonnelInformations', this.config)
      .pipe(map(data => {
        return <any>data;
      }));

  }
  onLoadPersonnerQualifationsDetails(personnel_id) {
    var headers = new HttpHeaders({
      "Accept": "application/json",
      "Authorization": 'Bearer ' + this.authService.getAccessToken(),
    });
    this.config = {
      headers: headers,
      params: { personnel_id: personnel_id }
    };

    return this.httpClient.get(this.baseUrl + '/getPersonnelQualifications', this.config)
      .pipe(map(data => {
        return <any>data;
      }));

  }
  onLoadRegisteredPremises(params) {
    var headers = new HttpHeaders({
      "Accept": "application/json",
      "Authorization": 'Bearer ' + this.authService.getAccessToken(),
    });
    params.mistrader_id = this.mistrader_id;
    this.config = {
      headers: headers,
      params: params
    };
    return this.httpClient.get(this.baseUrl + '/getTradersRegisteredPremises', this.config)
      .pipe(map(data => {
        return <any>data;
      }));
  }

  onLoadActiveRegisteredPremises(params) {
    var headers = new HttpHeaders({
      "Accept": "application/json",
      "Authorization": 'Bearer ' + this.authService.getAccessToken(),
    });
    params.mistrader_id = this.mistrader_id;
    this.config = {
      headers: headers,
      params: params
    };
    return this.httpClient.get(this.baseUrl + '/getSpecificTradersRegisteredPremises', this.config)
      .pipe(map(data => {
        return <any>data;
      }));
  }

  onCheckPendingPremisesRenewal(premise_target_id) {
    var headers = new HttpHeaders({
      "Accept": "application/json",
      "Authorization": 'Bearer ' + this.authService.getAccessToken(),
    });
    this.config = {
      headers: headers,
      params: { premise_target_id: premise_target_id }
    };

    return this.httpClient.get(this.baseUrl + '/checkPendingPremisesRenewal', this.config)
      .pipe(map(data => {
        return <any>data;
      }));
  }
  getPremisesApplicationDetail() {
    return this.premisesapp_details;
  }
  setPremisesApplicationDetail(data: any[]) {
    this.premisesapp_details = data;
  }

  onSavePremisesApplication(premisesData, action_url) {
    let data_header = {
      headers: { 'Accept': 'application/json', "Authorization": "Bearer " + this.authService.getAccessToken() }
    };

    return this.http.post(this.baseUrl + '/'+action_url, premisesData, data_header)
      .pipe(map(data => {
        return data;
      }));
  }
  onSaveRenPremisesApplication(premise_id, premisesData, tracking_no) {


    let data_header = {
      params: { premise_id: premise_id, tracking_no: tracking_no, 'trader_id': this.trader_id, 'trader_email': this.email_address },

      headers: { 'Accept': 'application/json', "Authorization": "Bearer " + this.authService.getAccessToken() }
    };

    return this.http.post(this.baseUrl + '/' + 'onSaveRenPremisesApplication', premisesData, data_header)
      .pipe(map(data => {
        return data;
      }));
  }
  onSavePremisesOtherDetails(premise_id, premisesOtherData) {


    let data_header = {
      params: { 'trader_id': this.trader_id, 'email_address': this.email_address, premise_id: premise_id },

      headers: { 'Accept': 'application/json', "Authorization": "Bearer " + this.authService.getAccessToken() }
    };

    return this.http.post(this.baseUrl + '/' + 'onSavePremisesOtherDetails', premisesOtherData, data_header)
      .pipe(map(data => {
        return data;
      }));


  }
  onSavePremisesAmmendmentsRequest(premise_id, premisesOtherData) {

    let data_header = {
      params: { 'trader_id': this.trader_id, 'email_address': this.email_address, premise_id: premise_id },

      headers: { 'Accept': 'application/json', "Authorization": "Bearer " + this.authService.getAccessToken() }
    };

    return this.http.post(this.baseUrl + '/' + 'onSavePremisesAmmendmentsRequest', premisesOtherData, data_header)
      .pipe(map(data => {
        return data;
      }));
  }




  onSavePersonnelDetails(personnelData) {

    let data_header = {
      params: { 'trader_id': this.trader_id, 'traderemail_address': this.email_address, 'mistrader_id': this.mistrader_id },

      headers: { 'Accept': 'application/json', "Authorization": "Bearer " + this.authService.getAccessToken() }
    };

    return this.http.post(this.baseUrl + '/' + 'onSavePersonnelDetails', personnelData, data_header)
      .pipe(map(data => {
        return data;
      }));
  }
  onSavePremisesPersonnelDetails(personnelData, premise_id) {

    let data_header = {
      params: { 'trader_id': this.trader_id, 'traderemail_address': this.email_address, 'mistrader_id': this.mistrader_id, premise_id: premise_id },

      headers: { 'Accept': 'application/json', "Authorization": "Bearer " + this.authService.getAccessToken() }
    };

    return this.http.post(this.baseUrl + '/' + 'onSavePremisesPersonnel', personnelData, data_header)
      .pipe(map(data => {
        return data;
      }));
  }
  onSavePremisesStoreLocationDetails(personnelData, premise_id) {

    let data_header = {
      params: { 'trader_id': this.trader_id, 'traderemail_address': this.email_address, 'mistrader_id': this.mistrader_id, premise_id: premise_id },

      headers: { 'Accept': 'application/json', "Authorization": "Bearer " + this.authService.getAccessToken() }
    };

    return this.http.post(this.baseUrl + '/' + 'onSavePremisesStoreLocationDetails', personnelData, data_header)
      .pipe(map(data => {
        return data;
      }));
  }

  onSavePersonnelQualification(qualificationData) {

    let data_header = {
      params: { 'trader_id': this.trader_id, 'traderemail_address': this.email_address, 'mistrader_id': this.mistrader_id },

      headers: { 'Accept': 'application/json', "Authorization": "Bearer " + this.authService.getAccessToken() }
    };

    return this.http.post(this.baseUrl + '/' + 'onSavePersonnelQualification', qualificationData, data_header)
      .pipe(map(data => {
        return data;
      }));
  }
  onLoadPremisesOtherDetails(premise_id) {
    var headers = new HttpHeaders({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });

    this.config = {
      params: { premise_id: premise_id },
      headers: headers
    };
    return this.httpClient.get(this.baseUrl + '/getPremisesOtherDetails', this.config)
      .pipe(map(data => {
        return <any>data;
      }));
  }
  getpremisesApplicationDetails(application_id) {
    var headers = new HttpHeaders({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });

    this.config = {
      params: { application_id: application_id },
      headers: headers
    };
    return this.httpClient.get(this.baseUrl + '/getpremisesApplicationDetails', this.config)
      .pipe(map(data => {
        return <any>data;
      }));
  }

  onLoadPremisesPersonnelDetails(premise_id) {
    var headers = new HttpHeaders({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    this.config = {
      params: { premise_id: premise_id },
      headers: headers
    };
    return this.httpClient.get(this.baseUrl + '/getPremisesPersonnelDetails', this.config)
      .pipe(map(data => {
        return <any>data;
      }));
  }

  onLoadPremisesStoreLocationDetails(premise_id) {
    var headers = new HttpHeaders({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    this.config = {
      params: { premise_id: premise_id },
      headers: headers
    };
    return this.httpClient.get(this.baseUrl + '/getPremisesStoreLocationDetails', this.config)
      .pipe(map(data => {
        return <any>data;
      }));
  }

  onLoadpremAmmendementsRequests(premise_id) {
    var headers = new HttpHeaders({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    this.config = {
      params: { premise_id: premise_id },
      headers: headers
    };
    return this.httpClient.get(this.baseUrl + '/getPremisesAmmendementsRequest', this.config)
      .pipe(map(data => {
        return <any>data;
      }));
  }

  onLoadPremisesCounterDetails() {
    let user = this.authService.getUserDetails();
    var headers = new HttpHeaders({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    this.config = {
      params: { trader_id: user.trader_id },
      headers: headers
    };
    return this.httpClient.get(this.baseUrl + '/getPremisesCounterDetails', this.config)
      .pipe(map(data => {
        return <any>data;
      }));
  }


  onPremisesApplicationSubmit(premise_id, tracking_no) {

    let data_header = {
      params: { 'trader_id': this.trader_id, 'traderemail_address': this.email_address, 'premise_id': premise_id, 'tracking_no': tracking_no },

      headers: { 'Accept': 'application/json', "Authorization": "Bearer " + this.authService.getAccessToken() }
    };

    return this.http.post(this.baseUrl + '/' + 'onNewPremisesApplicationSubmit', '', data_header)
      .pipe(map(data => {
        return data;
      }));
  }


  onDeletePremisesDetails(record_id, table_name, apppremises_id, title) {

    let data_header = {
      params: { 'trader_id': this.trader_id, 'email_address': this.email_address, record_id: record_id, premise_id: apppremises_id, table_name: table_name, title: title },

      headers: { 'Accept': 'application/json', "Authorization": "Bearer " + this.authService.getAccessToken() }
    };

    return this.http.post(this.baseUrl + '/' + 'onDeletePremisesDetails', '', data_header)
      .pipe(map(data => {
        return data;
      }));
  }
  onValidatePremisesOtherdetails(premise_id, table_name, title) {

    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),

      'X-Requested-With': 'XMLHttpRequest'
    });

    this.config = {
      params: { 'trader_id': this.trader_id, 'trader_email': this.email_address, premise_id: premise_id, table_name: table_name, title: title },
      headers: headers
    };
    return this.httpClient.get(this.baseUrl + '/onValidatePremisesOtherdetails', this.config)
      .pipe(map(data => {
        return <any>data;
      }));

  }
  onSavePremisesProductLineDetails(manufacturing_site_id,premisesOtherData){
    var headers = new HttpHeaders({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });
    let user = this.authService.getUserDetails();
    return this.http.post(this.baseUrl + '/onSaveGmpProductLinedetails', premisesOtherData, { params: { 'trader_id': this.trader_id, 'email_address': this.email_address,manufacturing_site_id:manufacturing_site_id }, headers: headers })
      .pipe(map(data => {
        return data;
      }));
  }
  getPremisesDataDetails(data,path){

    var headers = new HttpHeaders({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.getAccessToken(),
    });

    this.config = {
      params: data,
      headers: headers
    };
    return this.httpClient.get(AppSettings.base_url + path, this.config)
      .pipe(map(data => {
        return <any>data;
      }));
  }
}
