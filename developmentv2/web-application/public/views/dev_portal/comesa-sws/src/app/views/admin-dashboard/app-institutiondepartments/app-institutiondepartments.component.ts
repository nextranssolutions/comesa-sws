import { Component, OnInit } from '@angular/core';
import { AppmenuService } from 'src/app/services/appmenu.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-app-institutiondepartments',
  templateUrl: './app-institutiondepartments.component.html',
  styleUrls: ['./app-institutiondepartments.component.css']
})
export class AppInstitutionDepartments {
  table_name:string;
  parameter_name:string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'par_institutions_department';
    this.parameter_name = "institution_departments";
  }

  ngOnInit() {
    // other initializations

  }
}
