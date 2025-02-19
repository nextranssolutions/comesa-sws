import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ConfigurationsService } from 'src/app/core-services/configurations/configurations.service';
import { WokflowManagementService } from 'src/app/core-services/workflow-management/wokflow-management.service';

@Component({
  selector: 'app-unifiedapp-dashboard',
  templateUrl: './unifiedapp-dashboard.component.html',
  styleUrl: './unifiedapp-dashboard.component.css',
})
export class UnifiedappDashboardComponent {
  data_record: any;
  regulatory_functionsdata: any;
  user_group_data: any;
  userGroupId: number;
  loadingVisible: boolean;
  spinnerMessage: string;
  constructor(
    public config: ConfigurationsService,
    private router: Router,
    public workflowService: WokflowManagementService,
    private spinner: SpinnerVisibilityService,
  ) {
    this.onLoadRegulatoryFunctions();
  }
  ngInit() {}
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

  spinnerShow(spinnerMessage) {
    this.loadingVisible = true;
    this.spinnerMessage = spinnerMessage;
  }
  spinnerHide() {
    this.loadingVisible = false;
  }
}
