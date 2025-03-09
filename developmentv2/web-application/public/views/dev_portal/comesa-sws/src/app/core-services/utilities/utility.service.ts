import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthenticationService } from '../authentication/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { AppSettings } from 'src/app/app-settings';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  application_details: any;
  app_resp: any;
  baseUrl: any;
  trader_id: number;
  mistrader_id: number;
  email_address: string;
  config: any;
  constructor(private http: HttpClient, private authService: AuthenticationService, private sanitizer: DomSanitizer, public toastr: ToastrService, public spinner: SpinnerVisibilityService) {
    if (this.authService.getUserDetails()) {
      let user = this.authService.getUserDetails();
      this.trader_id = user.trader_id;
      this.email_address = user.email_address;
    }
    else {
      this.trader_id;
      this.mistrader_id;
      this.email_address;
    }
    this.baseUrl = AppSettings.base_url + '/api/utilities';
  }

  onCelIsEnabledDisabled(e) {
    
    if(e.rowType === "data" && (e.column.dataField === "is_enabled")) {
      let is_enabled =e.data.is_enabled;
    
       if(is_enabled){
          
          e.cellElement.style.color = 'white';
          e.cellElement.style.backgroundColor = '#64B0F2';  
        
        }else{
          
          e.cellElement.style.color = 'white';
          e.cellElement.style.backgroundColor = '#FF5D48';  
      
        }
    }
}

onCellCountriesPrepared(e) {
    
  if(e.rowType === "data" && (e.column.dataField === "is_partner_state" || e.column.dataField === "is_tracer_item")) {
    let is_partner_state =e.data.is_partner_state;
    let is_tracer_item =e.data.is_tracer_item;

     if(is_partner_state || is_tracer_item){
        
        e.cellElement.style.color = 'white';
        e.cellElement.style.backgroundColor = '#64B0F2';  
      
      }else{
        
        e.cellElement.style.color = 'white';
        e.cellElement.style.backgroundColor = '#FF5D48';  
    
      }
  }
  
  if(e.rowType === "data" && (e.column.dataField === "is_enabled")) {
    let is_enabled =e.data.is_enabled;
  
     if(is_enabled){
        
        e.cellElement.style.color = 'white';
        e.cellElement.style.backgroundColor = '#64B0F2';  
      
      }else{
        
        e.cellElement.style.color = 'white';
        e.cellElement.style.backgroundColor = '#FF5D48';  
    
      }
  }


}
returnReportIframe(report_url){
  let iframe = '<iframe class="w-100 h-100" style="height:650px !important" src="'+report_url+'" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>Data</iframe>';
  let text = this.sanitizer.bypassSecurityTrustHtml(iframe);
  return text;
  
}

returnFixedHeightReportIframe(report_url,height){
  let iframe = '<iframe class="w-100 h-100" style="height:"'+height+'" !important" src="'+report_url+'" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>Data</iframe>';
  let text = this.sanitizer.bypassSecurityTrustHtml(iframe);
  return text;
}
returnReportIframeFill(report_url){
  let iframe = '<iframe class="col-lg-12 row" style="height:750px !important" src="'+report_url+'" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>Data</iframe>';
  let text = this.sanitizer.bypassSecurityTrustHtml(iframe);
  return text;
  
}

onLoadApplicationProcessingData(application_code) {
  var headers = new Headers({
    "Accept": "application/json",
    "Authorization": "Bearer " + this.authService.getAccessToken(),
  });
  this.config = {
    params: { application_code: application_code },
    headers: headers
  };
  return this.http.get(this.baseUrl + '/getApplicationProcessing', this.config)
    .pipe(map(data => {
      return <any>data;
    }));

}
onsaveApplicationUniformDetails(application_code, permitData, action_url) {


  let data_header = {
    params: { application_code: application_code, 'trader_id': this.trader_id, 'trader_email': this.email_address },

    headers: { 'Accept': 'application/json', "Authorization": "Bearer " + this.authService.getAccessToken() }
  };

  return this.http.post(this.baseUrl + '/' + 'onsaveApplicationUniformDetails', '', data_header)
    .pipe(map(data => {
      return data;
    }));
}
funcApplicationArchiceCall(viewRef, data, table_name, func_reload) {
  /*this.modalServ.openDialog(viewRef, {
    title: 'Do you want to submit the application to archive, Note the application will not be accessible from the active application?',
    childComponent: '',
    settings: {
      closeButtonClass: 'fa fa-close'
    },
    actionButtons: [{
      text: 'Yes',
      buttonClass: 'btn btn-danger',
      onAction: () => new Promise((resolve: any, reject: any) => {
        //this.spinner.show();
        this.onApplicationArchive(data.application_code, table_name)
          .subscribe(
            response => {
              this.app_resp = response;
              //the details 
              this.spinner.hide();

              if (this.app_resp.success) {
                this.toastr.success(this.app_resp.message, 'Response');

                func_reload();
              } else {
                this.toastr.error(this.app_resp.message, 'Alert');
              }
            },
            error => {
            });
        resolve();
      })
    }, {
      text: 'no',
      buttonClass: 'btn btn-default',
      onAction: () => new Promise((resolve: any) => {
        resolve();
      })
    }
    ]
  });
  */
}
funcApplicationRestoreArchiceCall(viewRef, data, table_name, func_reload) {
  /*this.modalServ.openDialog(viewRef, {
    title: 'Do you want to restore the application from archive, Note the application will now be accessible on the active application?',
    childComponent: '',
    settings: {
      closeButtonClass: 'fa fa-close'
    },
    actionButtons: [{
      text: 'Yes',
      buttonClass: 'btn btn-danger',
      onAction: () => new Promise((resolve: any, reject: any) => {
        //this.spinner.show();
        this.onApplicationArchive(data.application_code, table_name)
          .subscribe(
            response => {
              this.app_resp = response;
              //the details 
              this.spinner.hide();

              if (this.app_resp.success) {
                this.toastr.success(this.app_resp.message, 'Response');
                func_reload();
              } else {
                this.toastr.error(this.app_resp.message, 'Alert');
              }
            },
            error => {
            });
        resolve();
      })
    }, {
      text: 'no',
      buttonClass: 'btn btn-default',
      onAction: () => new Promise((resolve: any) => {
        resolve();
      })
    }
    ]
  });
  */
}
setApplicationDetail(data: any[]) {
  this.application_details = data;
}
funcValidateApplicationQueryresponse(application_code, table_name) {

  var headers = new HttpHeaders({
    "Accept": "application/json",
    "Authorization": "Bearer " + this.authService.getAccessToken(),
  });
  this.config = {
    params: { 'trader_id': this.trader_id, 'trader_email': this.email_address, application_code: application_code, table_name: table_name },
    headers: headers
  };
  return this.http.get(AppSettings.base_url + 'utilities/validateApplicationQueryresponse', this.config)
    .pipe(map(data => {
      return <any>data;
    }));
}
validateApplicationDocumentsQuerySubmission(application_code, status_id, table_name, prodclass_category_id = 0) {

  var headers = new HttpHeaders({
    "Accept": "application/json",
    "Authorization": "Bearer " + this.authService.getAccessToken(),
  });
  this.config = {
    params: { 'trader_id': this.trader_id, 'trader_email': this.email_address, application_code: application_code, status_id: status_id, table_name: table_name, prodclass_category_id: prodclass_category_id },
    headers: headers
  };
  return this.http.get(AppSettings.base_url + 'utilities/validateApplicationDocQuerySubmission', this.config)
    .pipe(map(data => {
      return <any>data;
    }));
}
getApplicationPreQueriesDetails(application_code, table_name, status_column, action_url) {
  var headers = new HttpHeaders({
    "Accept": "application/json",
    "Authorization": "Bearer " + this.authService.getAccessToken(),
  });
  this.config = {
    params: { application_code: application_code, table_name: table_name, status_column },
    headers: headers
  };
  return this.http.get(AppSettings.base_url + '/'+ action_url, this.config)
    .pipe(map(data => {
      return <any>data;
    }));

}
onsaveApplicationCodeDetails(application_code, app_data, action_url) {
  var headers = new HttpHeaders({
    "Accept": "application/json",
    "Authorization": "Bearer " + this.authService.getAccessToken(),
  });
  let user = this.authService.getUserDetails();
  return this.http.post(AppSettings.base_url + 'utilities/' + action_url, app_data, { params: { 'trader_id': this.trader_id, 'trader_email': this.email_address, application_code: application_code }, headers: headers })
    .pipe(map(data => {
      return data;
    }));
}
onsaveOgaApplicationCodeDetails(oga_application_code, app_data, action_url) {
  var headers = new HttpHeaders({
    "Accept": "application/json",
    "Authorization": "Bearer " + this.authService.getAccessToken(),
  });
  let user = this.authService.getUserDetails();
  return this.http.post(AppSettings.base_url + 'utilities/' + action_url, app_data, { params: { 'trader_id': this.trader_id, 'trader_email': this.email_address, oga_application_code: oga_application_code }, headers: headers })
    .pipe(map(data => {
      return data;
    }));
}
getApplicationPreRejectionDetails(application_code, table_name, status_column) {
  var headers = new Headers({
    "Accept": "application/json",
    "Authorization": "Bearer " + this.authService.getAccessToken(),
  });
  this.config = {
    params: { application_code: application_code, table_name: table_name, status_column },
    headers: headers
  };
  return this.http.get(this.baseUrl + '/getApplicationPreRejectionDetails', this.config)
    .pipe(map(data => {
      return <any>data;
    }));
}
onCellPrepared(e) {

  if (e.rowType === "data" && e.column.dataField === "status_name") {
    let application_status_id = e.data.application_status_id;


    if (application_status_id == 1) {
      e.cellElement.style.color = 'black';
      e.cellElement.style.backgroundColor = '#F1B53D';
    }
    else if (application_status_id == 10 || application_status_id == 33 || application_status_id == 26 || application_status_id == 39) {

      e.cellElement.style.color = 'white';
      e.cellElement.style.backgroundColor = '#64B0F2';

    } else if (application_status_id == 2 || application_status_id == 3) {

      e.cellElement.style.color = 'white';
      e.cellElement.style.backgroundColor = '#1BB99A';
    }
    else if (application_status_id == 11) {

      e.cellElement.style.color = 'white';
      e.cellElement.style.backgroundColor = '#FF5D48';

    } else if (application_status_id == 6 || application_status_id == 8 || application_status_id == 7 || application_status_id == 17) {

      e.cellElement.style.color = 'white';
      e.cellElement.style.backgroundColor = '#3DB9DC';

    }
    else {
      e.cellElement.style.color = 'black';
      e.cellElement.style.backgroundColor = '#ccc';


    }

  }
}
}
