
import { Component } from '@angular/core';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ToastrService } from 'ngx-toastr';
import { AuditTrailManagementService } from 'src/app/services/audit-trail-management/audit-trail-management.service';
import { ConfigurationsService } from 'src/app/services/configurations/configurations.service';
import { ReportsService } from 'src/app/services/reports/reports.service';
import { UtilityService } from 'src/app/services/utilities/utility.service';

@Component({
  selector: 'app-syslogs-usersaccess',
  templateUrl: './syslogs-usersaccess.component.html',
  styleUrl: './syslogs-usersaccess.component.css'
})
export class SyslogsUsersaccessComponent {

  table_name: string;
  parameter_name: string;
  resetcolumns: string;
  AuditTrailData: any[] = [];
  data_record: any;
  emailData:any;
  LogoutOnData:any;
  LoginOnData:any;
  IpData:any;
  submitted = false;
  loading = false;
  hasReadpermissions: boolean;
  show_advancesearch: boolean;
  data_value: string;
  response: any;
  showTabPanel: boolean = false;
  tabPanelPopupVisible: boolean = false;
  loadingVisible: boolean;
  spinnerMessage: string;

  constructor(
    public toastr: ToastrService,
    private auditService: AuditTrailManagementService,
    public configService: ConfigurationsService,
    public utilityService: UtilityService,
    public modalService: NgxSmartModalService,
    private reportingAnalytics: ReportsService,
  ){
    this.table_name = '';
  }

  ngOnInit(): void {
    this.getAuditUserAccessInfo();
  }

  getAuditUserAccessInfo(){
    this.spinnerShow('Loading Users Access System Logs...........');

    var data_submit = {
      'table_name': this.table_name,
    }
    this.auditService.onLoadAuditTrailDataUrl(data_submit, 'getUserAccessLogsInfo')
      .subscribe(
        data => {
          
          this.data_record = data;
          if (this.data_record.success) {
            this.AuditTrailData = this.data_record.data;
          }
          this.spinnerHide();
        },
      );
  }

  spinnerShow(spinnerMessage) {
    this.loadingVisible = true;
    this.spinnerMessage = spinnerMessage;
  }
  spinnerHide() {
    this.loadingVisible = false;
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

  onCellPrepared(e) {
    this.utilityService.onCellCountriesPrepared(e);
  }

  onExporting(e: DxDataGridTypes.ExportingEvent) {
   
    if(e.format == 'pdf'){
        this.reportingAnalytics.onExportingPDF(e)
    }
    else{
      this.reportingAnalytics.onExportingExcelData(e)
    }
    
  }

}