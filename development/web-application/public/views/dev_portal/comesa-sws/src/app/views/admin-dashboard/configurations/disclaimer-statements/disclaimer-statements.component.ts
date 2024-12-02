
import { Component, OnInit } from '@angular/core';
import { AppmenuService } from 'src/app/services/appmenu.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-disclaimer-statements',
  templateUrl: './disclaimer-statements.component.html',
  styleUrl: './disclaimer-statements.component.css'
})
export class DisclaimerStatementsComponent{
  table_name: string;
  parameter_name: string;
  resetcolumns: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'par_disclaimer_statements';
    this.parameter_name = "disclaimer_statements";
    this.resetcolumns = 'iso_acyronym';
  }
  ngOnInit() {
    // other initializations

  }
}
