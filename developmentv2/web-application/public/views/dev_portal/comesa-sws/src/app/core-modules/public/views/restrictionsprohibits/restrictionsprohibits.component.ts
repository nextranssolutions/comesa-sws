import { Component, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ToastrService } from 'ngx-toastr';
import { PublicDashboardService } from 'src/app/core-services/public-dashboard/public-dashboard.service';
import { ReportsService } from 'src/app/core-services/reports/reports.service';
import { UtilityService } from 'src/app/core-services/utilities/utility.service';

@Component({
  selector: 'app-restrictionsprohibits',

  templateUrl: './restrictionsprohibits.component.html',
  styleUrl: './restrictionsprohibits.component.css'
})
export class RestrictionsprohibitsComponent {
  show_advancesearch: boolean;
          spinnerMessage: string;
          loadingVisible: boolean;
          restrictionsData: any[] = [];
          table_name: string;
          data_record: any;
          constructor(
            private spinner: SpinnerVisibilityService,
            private router: Router,
            public toastr: ToastrService,
            public viewRef: ViewContainerRef,
            public utilityService: UtilityService,
            public publicservice: PublicDashboardService,
            public reportingAnalytics: ReportsService,
        
          ) {
            this.table_name = 'tra_restrictions_prohibitions';
          }
        
          ngOnInit() {
            this.onLoadRestrictionsData()
          }
        
          onLoadRestrictionsData() {
            this.spinnerShow('Loading...');
          
            const data_submit = {
              table_name: this.table_name,
              // 'operation_type_id': 3
            };
          
            this.publicservice.onLoadInformationSharingDataUrl(data_submit, 'onLoadRestrictionsProhibitions')
              .subscribe(
                (data) => {
                  this.data_record = data;
                  if (this.data_record.success) {
                    this.restrictionsData = this.data_record.data;
                  }
                  this.spinnerHide();
                }, error => {
        
                  this.spinnerHide();
                });
            
          }
          onExporting(e: DxDataGridTypes.ExportingEvent) {
        
            if (e.format == 'pdf') {
              this.reportingAnalytics.onExportingPDF(e)
            }
            else {
              this.reportingAnalytics.onExportingExcelData(e)
            }
        
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
        
          onAdvanceSearch(e) {
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
        
          spinnerShow(spinnerMessage) {
            this.loadingVisible = true;
            this.spinnerMessage = spinnerMessage;
          }
          spinnerHide() {
            this.loadingVisible = false;
          }
}


