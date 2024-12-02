import { Component, ViewContainerRef } from '@angular/core';

import { Router } from '@angular/router';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ToastrService } from 'ngx-toastr';
import { AppSettings } from 'src/app/app-settings';
import { AppmenuService } from 'src/app/services/appmenu.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-app-cities',
  templateUrl: './app-cities.component.html',
  styleUrls: ['./app-cities.component.css']
})
export class AppCitiesComponent {

  table_name:string;
  parameter_name:string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'par_cities';
    this.parameter_name = "country's_cities_provinces";
  }

  ngOnInit() {
    // other initializations

  }
  
  }
  