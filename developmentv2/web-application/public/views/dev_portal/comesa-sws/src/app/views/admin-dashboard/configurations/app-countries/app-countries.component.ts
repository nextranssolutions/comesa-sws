import { Component, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ToastrService } from 'ngx-toastr';
import { AppSettings } from 'src/app/app-settings';
// import { AuthService } from 'src/app/services/auth.service';
import { AppmenuService } from 'src/app/services/appmenu.service';
// import { ConfigurationServiceService } from 'src/app/services/configurations/configuration-service.service';
import { UtilityService } from 'src/app/services/utilities/utility.service';



@Component({
  selector: 'app-app-countries',
  templateUrl: './app-countries.component.html',
  styleUrls: ['./app-countries.component.css']
})
export class AppCountriesComponent {
  table_name:string;
  parameter_name:string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'par_countries';
    this.parameter_name = "country_details";
  }

  ngOnInit() {
    // other initializations

  }

}
