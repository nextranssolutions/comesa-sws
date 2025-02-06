import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reporting-and-analytics',
  templateUrl: './reporting-and-analytics.component.html',
  styleUrl: './reporting-and-analytics.component.css'
})
export class ReportingAndAnalyticsComponent {

  constructor(
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
