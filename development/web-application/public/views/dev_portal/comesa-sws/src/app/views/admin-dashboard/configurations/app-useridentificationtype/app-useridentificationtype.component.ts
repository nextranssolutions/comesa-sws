import { Component, OnInit } from '@angular/core';
import { AppmenuService } from 'src/app/services/appmenu.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-app-useridentificationtype',
  templateUrl: './app-useridentificationtype.component.html',
  styleUrls: ['./app-useridentificationtype.component.css']
})
export class AppUserIdentificationType {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'usr_identification_type';
    this.parameter_name = "identification_type_details";
  }
  ngOnInit() {
    // other initializations

  }
}
