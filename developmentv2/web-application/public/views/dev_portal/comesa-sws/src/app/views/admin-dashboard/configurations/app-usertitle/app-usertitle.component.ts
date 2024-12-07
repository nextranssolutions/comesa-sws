import { Component, OnInit } from '@angular/core';
import { AppmenuService } from 'src/app/services/appmenu.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-app-usertitle',
  templateUrl: './app-usertitle.component.html',
  styleUrls: ['./app-usertitle.component.css']
})
export class AppUserTitle {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'usr_users_title';
    this.parameter_name = "user_title_details";
  }
  ngOnInit() {
    // other initializations

  }
}
