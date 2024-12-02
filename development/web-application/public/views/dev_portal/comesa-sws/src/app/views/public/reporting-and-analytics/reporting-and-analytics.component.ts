import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';




@Component({
  selector: 'app-reporting-and-analytics',
  templateUrl: './reporting-and-analytics.component.html',
  styleUrl: './reporting-and-analytics.component.css'
})
export class ReportingAndAnalyticsComponent {

  constructor(
    private spinner: SpinnerVisibilityService,
    private router: Router,
    private AuthService: AuthService,
    public toastr: ToastrService,
    // private http: HttpClient,
  ) {
  }


  // GROUPING BY PARTNER STATE
  selectedGroupField: string = 'eac_state_id'; 
  gridColumns: any[] = [ /* Define your grid columns here */ ];
  groupingOptions: any = { autoExpandAll: true, groupColumns: [this.selectedGroupField] };

  // Handle changes in the dropdown selection
  onGroupFieldChanged(event: any): void {
    this.selectedGroupField = event.value;
    this.groupingOptions.groupColumns = [this.selectedGroupField];
  }


  // functions to query record specific to main data

  getFilteredData(data: any[], mainItemId: any): any[] {
    // Filter the data based on the relationship with the main item
    return data.filter(item => item.masterItemId === mainItemId);
  }
  
 

  ngOnInit() {
  }

}
