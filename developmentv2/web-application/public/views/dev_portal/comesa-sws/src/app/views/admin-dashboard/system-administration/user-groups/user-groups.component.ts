import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppmenuService } from 'src/app/services/appmenu.service';
import { DxButtonComponent, DxDataGridComponent } from 'devextreme-angular';
import notify from 'devextreme/ui/notify';
import { ToastrService } from 'ngx-toastr';
import CustomStore from 'devextreme/data/custom_store';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-user-groups',
  templateUrl: './user-groups.component.html',
  styleUrls: ['./user-groups.component.css']
})


export class UserGroupsComponent implements OnInit {
  table_name: string;
  parameter_name: string;
  resetcolumns: string;
  constructor(private userGroupsService: AppmenuService, public authService: AuthenticationService, public toastr: ToastrService) {
    this.resetcolumns = 'dashboard_type_id,resetcolumns,routerLink,has_partnerstate_defination';
    
    this.table_name = 'usr_users_groups';
    this.parameter_name = "user_group_navigation_permission";

  }
  ngOnInit(): void {
  }

}
