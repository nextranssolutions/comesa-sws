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
  
  funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width / 100;
  }
  funcpopHeight(percentage_height) {
    return window.innerHeight * percentage_height / 100;
  }
}
