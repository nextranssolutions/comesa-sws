import { Component, Input, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ToastrService } from 'ngx-toastr';
import { PublicDashboardService } from 'src/app/services/public-dashboard/public-dashboard.service';
import { ReportsService } from 'src/app/services/reports/reports.service';
import { UtilityService } from 'src/app/services/utilities/utility.service';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import { EncryptionService } from 'src/app/services/encryption/encryption.service';
@Component({
  selector: 'app-knowledge-center',
  templateUrl: './knowledge-center.component.html',
  styleUrl: './knowledge-center.component.css'
})
export class KnowledgeCenterComponent {
  @Input() is_readonly: boolean;
  ecredResourceCounter:number;
  knowledgeCenterCounter:number;
  openExpertsPublications:number;
  show_advancesearch: boolean;
  archivedKnowldgeCenterInfo: number = 0;
  publishedKnowldgeCenterInfo: number = 0;
  requestforAdditionInfoKnowldgeCenter: number = 0;
  openPendingPublishingKnowldgeCenterInfo: number = 0;
  queriedKnowldgeCenterInfo: number = 0;

  data_record: any;
  data_resp: any;
  knowledgeCenterData: any[] = [];
  loadingVisible: boolean;
  hasReadpermissions: boolean;
  spinnerMessage: string;
  publication_management_id: number;
  table_name: string;
  parameter_name: string;
  decryptedPayload:any;

  constructor(
    private spinner: SpinnerVisibilityService,
    private router: Router,
    public toastr: ToastrService,
    public viewRef: ViewContainerRef,
    public utilityService: UtilityService,
    private publicservice: PublicDashboardService,
    public reportingAnalytics: ReportsService,
    private encryptionService: EncryptionService
  ) {
    this.table_name = 'tra_knowledgecenter_management';
    this.parameter_name = "knowledge_center";
  }

  ngOnInit() {
    this.onLoadKnowledgeCenterData()
  }
  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scrolling for better UX
    });
  }
  funcRedirectToKnowledgeCenterManagement() {
    this.data_resp = {
      process_id: 15,
      app_refence_no: ''
    }
    this.publicservice.setApplicationDetail(this.data_resp);
    // this.router.navigate(['/admin-ecres/app-knowledge-centerinfo']);
    //this.scrollToTop();
  }

  onLoadKnowledgeCenterData(appworkflow_status_id = 0) {
    this.spinnerShow('Loading Information ...........');

    var data_submit = {
      'table_name': this.table_name,
      'appworkflow_status_id': 3
    }
    this.publicservice.onLoadInformationSharingDataUrl(data_submit, 'onLoadKnowledgeCenterManagementData')
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.knowledgeCenterData = this.decryptedPayload;
          }
          this.spinnerHide();
        },
        error => {
          
          this.spinnerHide();
        });
  }

  spinnerShow(spinnerMessage) {
    this.loadingVisible = true;
    this.spinnerMessage = spinnerMessage;
  }
  spinnerHide() {
    this.loadingVisible = false;
  }

  funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width / 100;
  }
  funcpopHeight(percentage_height) {
    return window.innerHeight * percentage_height / 100;
  }

  onCellPrepared(e) {

    if (e.rowType === "data" && e.column.dataField === "appworkflow_status_id") {
      let appworkflow_status_id = e.data.appworkflow_status_id;

      if (appworkflow_status_id == 1) {

        e.cellElement.style.color = 'white';
        e.cellElement.style.backgroundColor = '#0000FF';

      } else if (appworkflow_status_id == 3) {
        e.cellElement.style.color = 'white';
        e.cellElement.style.backgroundColor = '#FF0000';

      } else if (appworkflow_status_id == 2) {
        e.cellElement.style.color = 'white';
        e.cellElement.style.backgroundColor = '#008000';
      } else if (appworkflow_status_id == 5) {
        e.cellElement.style.color = 'white';
        e.cellElement.style.backgroundColor = '#FFFF8F';
      } else {
        e.cellElement.style.color = 'white';
        e.cellElement.style.backgroundColor = '#D3D3D3';
      }
    }
  }

  funcInfActionClick(e, data) {
    var action_btn = e.itemData;
    if (action_btn.action === 'edit_record') {
      this.funcPreviewKnowledgeCenterInfo(data.data);
    }
  }

  funcPreviewKnowledgeCenterInfo(data) {
    this.publicservice.setApplicationDetail(data);
    // this.router.navigate(['./admin-ecres/app-knowledge-centerinfo']);
    //this.scrollToTop();
  }

  singleApplicationActionColClick(data) {
    this.funcActionsProcess(data.action, data);
  }
  funcActionsProcess(action_btn, data) {
    if (action_btn === 'edit_record') {
      this.is_readonly = true;
      this.funcPreviewKnowledgeCenterInfo(data);
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

