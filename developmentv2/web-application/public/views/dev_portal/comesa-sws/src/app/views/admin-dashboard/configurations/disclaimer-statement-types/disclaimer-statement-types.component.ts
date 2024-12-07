import { Component, OnInit } from '@angular/core';
import { AppmenuService } from 'src/app/services/appmenu.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-disclaimer-statement-types',
  templateUrl: './disclaimer-statement-types.component.html',
  styleUrl: './disclaimer-statement-types.component.css'
})
export class DisclaimerStatementTypesComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'par_disclaimer_types';
    this.parameter_name = "disclaimer_types";
  }
  ngOnInit() {
    // other initializations

  }
}
