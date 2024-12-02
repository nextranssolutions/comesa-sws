import { Component, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { AppmenuService } from 'src/app/services/appmenu.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
// import * as XLSX from 'xlsx';
import { DxSelectBoxComponent } from 'devextreme-angular';

@Component({
  selector: 'app-genericnames',
  templateUrl: './app-genericnames.component.html',
  styleUrls: ['./app-genericnames.component.css']
})
export class AppGenericnamesComponent implements OnInit {
  table_name:string;
  parameter_name:string;
  constructor(
  ) {
    this.table_name = 'par_generic_names';
    this.parameter_name = "generic_names_details";
  }
  
  ngOnInit() {
    // other initializations

  }
}
