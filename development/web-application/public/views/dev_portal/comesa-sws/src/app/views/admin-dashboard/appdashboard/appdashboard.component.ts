import { Component, ViewContainerRef, HostListener } from '@angular/core';
import { ToastrService } from 'ngx-toastr'; import { DashbordManagementService } from 'src/app/services/dashboard-management/dashbord-management.service';
import { UtilityService } from 'src/app/services/utilities/utility.service';
import { DxTabPanelTypes } from 'devextreme-angular/ui/tab-panel';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import { ReportsService } from 'src/app/services/reports/reports.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-appdashboard',
  templateUrl: './appdashboard.component.html',
  styleUrls: ['./appdashboard.component.css']
})
export class AppdashboardComponent {
  data_record: any;
  completedtasksTasksdetailsData:any;
  finalisedAsignmentsData: any;
  expertsProfile: number = 0;
  show_advancesearch: boolean;
  activeExpressionOfInterest: number = 0;
  currentassignmentManagement: number = 0;
  healthCommoditiesCount: number = 0;

  activeAsignmentsData: any;
  loadingVisible: boolean;
  spinnerMessage: string;

  table_name: string;
  reminderNotificationData: any;
  tabsPositions: DxTabPanelTypes.Position[] = [
    'left', 'top', 'right', 'bottom',
  ];
  tabsPosition: DxTabPanelTypes.Position = this.tabsPositions[0];
  stylingModes: DxTabPanelTypes.TabsStyle[] = ['primary', 'secondary'];
  stylingMode: DxTabPanelTypes.TabsStyle = this.stylingModes[0];
  screenWidth: any;
  isViewCompletedTasksDetails:boolean;

  constructor(
    private reportingAnalytics: ReportsService,
    public toastr: ToastrService,
    public viewRef: ViewContainerRef,
    public utilityService: UtilityService,private router: Router,
    private dashboardService: DashbordManagementService,
    public translate: TranslateService,
    // private http: HttpClient,
  ) {
    this.onGetAdminactiveTasksAsignmentsData();
    this.onGetfinalisedAsignmentsData();
    this.checkScreenSize();

  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.screenWidth = window.innerWidth;
    this.checkScreenSize();
  }

  checkScreenSize(): void {
    if (this.screenWidth < 768) {
      this.tabsPosition = 'top';
    } else {
      this.tabsPosition = 'left';
    }
  }

  getTranslation(key: string): string {
    let translation: string = '';
    this.translate.get(key).subscribe((res: string) => {
      translation = res;
    });
    return translation;
  }

  translateMenuItems(contextMenu: any[]): any[] {
    return contextMenu.map(item => {
        return {
            ...item,
            text: this.getTranslation(item.text)
        };
    });
}
  onFuncAddNewEvent() {

  }
  spinnerShow(spinnerMessage) {
    this.loadingVisible = true;
    this.spinnerMessage = spinnerMessage;
  }
  spinnerHide() {
    this.loadingVisible = false;
  }

  onAdvanceProductRegistrySearch(e) {
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

  onActivatetheAdvanceSearch(e) {

    this.show_advancesearch = e.value;

  }


  onGetAdminactiveTasksAsignmentsData(appworkflow_status_id = 0) {
    this.spinnerShow('Loading Active Tasks Assignment ...........');
    var data_submit = {
      'table_name': this.table_name,
      'appworkflow_status_id': appworkflow_status_id,
      'is_completed': 0
    }
    this.dashboardService.onGetDashboardProcessInformation(data_submit, 'onGetAdminactiveTasksAsignmentsData')
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.activeAsignmentsData = this.data_record.data;

          }
          this.spinnerHide();
        },
        error => {

        });
  }
  onGetfinalisedAsignmentsData(appworkflow_status_id = 0) {
    this.spinnerShow('Loading Completed Tasks Assignment ...........');
    var data_submit = {
      'table_name': this.table_name,
      'appworkflow_status_id': appworkflow_status_id,
      'is_completed': 1
    }
    this.dashboardService.onGetDashboardProcessInformation(data_submit, 'onGetAdminFinalisedTasksAsignmentsData')
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.finalisedAsignmentsData = this.data_record.data;
          }
          this.spinnerHide();
        },
        error => {

        });
  }

  singleApplicationActionColClick(data) {

    this.router.navigate(['./admin-ecres/'+data.routerlink]);

  }

  onViewCompletedTasksDetails(data){
    //load data 
    this.spinnerShow('Loading Completed Tasks Assignment ...........');
    var data_submit = {
      'table_name': this.table_name,
      'process_id': data.process_id,
      'current_stage_id': data.current_stage_id,
      'is_completed': 1
    }
    this.dashboardService.onGetDashboardProcessInformation(data_submit, 'onLoadUserCompletedTasksDetails')
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.completedtasksTasksdetailsData = this.data_record.data;
          }
          this.isViewCompletedTasksDetails= true;

          this.spinnerHide();
        },
        error => {

        });

  }
  funcActionsProcess(action_btn, data) {
    if (action_btn === 'edit_record') {
      // this.funcEditDetails(data);
    }

  }

  onExporting(e: DxDataGridTypes.ExportingEvent) {

    if (e.format == 'pdf') {
      this.reportingAnalytics.onExportingPDF(e)
    }
    else {
      this.reportingAnalytics.onExportingExcelData(e)
    }
  }
  funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width / 100;
  }
  funcpopHeight(percentage_height) {
    return window.innerHeight * percentage_height / 100;
  }
}
