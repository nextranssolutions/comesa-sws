import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ConfigurationsService } from 'src/app/core-services/configurations/configurations.service';
import { ReportsService } from 'src/app/core-services/reports/reports.service';
import { UtilityService } from 'src/app/core-services/utilities/utility.service';
import { WokflowManagementService } from 'src/app/core-services/workflow-management/wokflow-management.service';

@Component({
  selector: 'app-unifiedapp-dashboard',
  templateUrl: './unifiedapp-dashboard.component.html',
  styleUrl: './unifiedapp-dashboard.component.css',
})
export class UnifiedappDashboardComponent {
  data_record: any;
  reminderNotificationData:any;
  pendingtasksTasksdetailsData:any;
  pendingAsignmentsData:any;
  
  regulatory_functionsdata: any;
  regulatory_function_id: number;
  regulatory_function: number;
  user_group_data: any;
  userGroupId: number;
  guidelineDetails: any;
  loadingVisible: boolean;
  spinnerMessage: string;
  show_advancesearch: boolean;
  refFunctionGuidelines: boolean;
  mycurrentAssignmentWin:boolean;
  
  constructor(
    public config: ConfigurationsService,
    private router: Router,
    public workflowService: WokflowManagementService,
    private spinner: SpinnerVisibilityService,
    public utilityService: UtilityService,
    private reportingAnalytics: ReportsService,

  ) {
    this.onLoadRegulatoryFunctions();
    // this.fetchWorkflowItemsDetails(this.regulatory_function_id);
  }
  ngInit() {
    
  }
  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Smooth scrolling for better UX
    });
  }
  onLoadRegulatoryFunctions() {
    this.spinnerShow('Loading...........');
    this.workflowService.getRegultoryFunctionUserAccess().subscribe(
      (data) => {
        this.data_record = data;
        if (this.data_record.success) {
          this.regulatory_functionsdata = this.data_record.data;
        }
        this.spinnerHide();
      },
      (error) => {
        this.spinnerHide();
      }
    );
  }
  onProceedToApplication(record) {
    console.log(record)
    localStorage.setItem('regulatory_function', JSON.stringify(record));
    this.router.navigate(['./../' + record.router_url]);
    this.scrollToTop();
  }

  fetchWorkflowItemsDetails(regulatory_function_id) {

    var data_submit = {
      'table_name': 'sys_regulatoryfunction_guidelines',
      regulatory_function_id: regulatory_function_id
    }
    this.workflowService.getWorkflowConfigs(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.guidelineDetails = this.data_record.data;
          }
  
        },
        error => {
  
        });
  
  }
  regulatoryFunctionGuidelines(rec){
    this.regulatory_function = rec.regulatory_function
    this.fetchWorkflowItemsDetails(this.regulatory_function)
   
    this.refFunctionGuidelines = true
  }

  funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width / 100;
  }
  funcpopHeight(percentage_height) {
    return window.innerHeight * percentage_height / 100;
  }

  spinnerShow(spinnerMessage) {
    this.loadingVisible = true;
    this.spinnerMessage = spinnerMessage;
  }
  spinnerHide() {
    this.loadingVisible = false;
  }

  onCellPrepared(e) {
    this.utilityService.onCellCountriesPrepared(e);
  }
  onViewPendingTasksDetails(data){

  }
   onExporting(e: DxDataGridTypes.ExportingEvent) {
  
      if (e.format == 'pdf') {
        this.reportingAnalytics.onExportingPDF(e)
      }
      else {
        this.reportingAnalytics.onExportingExcelData(e)
      }
  
    }
    onAdvanceProductRegistrySearch(e){
      e.toolbarOptions.items.unshift({
        location: 'after',
        widget: 'dxCheckBox',
        options: {
          icon: 'select',
          text: 'Show Advanced Search',
          value: this.show_advancesearch,
          onValueChanged: this.onActivatetheAdvanceSearch.bind(this)
        }
      });
    }
  
    onActivatetheAdvanceSearch(e){
  
      this.show_advancesearch =  e.value;
  
  }
}
