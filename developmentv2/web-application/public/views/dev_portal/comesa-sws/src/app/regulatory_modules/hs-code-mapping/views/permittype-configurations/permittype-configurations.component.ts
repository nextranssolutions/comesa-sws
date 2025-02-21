import { Component, HostListener, ViewContainerRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import { DxTabPanelTypes } from 'devextreme-angular/ui/tab-panel';
import { ToastrService } from 'ngx-toastr';
import { AppmenuService } from 'src/app/core-services/appmenu.service';
import { ReportsService } from 'src/app/core-services/reports/reports.service';
import { ServiceAdmnistrationService } from 'src/app/core-services/system-admnistration/system-admnistration.service';
import { UtilityService } from 'src/app/core-services/utilities/utility.service';
import { WokflowManagementService } from 'src/app/core-services/workflow-management/wokflow-management.service';

@Component({
  selector: 'app-permittype-configurations',
  templateUrl: './permittype-configurations.component.html',
  styleUrl: './permittype-configurations.component.css'
})
export class PermittypeConfigurationsComponent {

}
