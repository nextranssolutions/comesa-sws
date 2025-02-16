import { Component, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ToastrService } from 'ngx-toastr';
import { ReportsService } from 'src/app/core-services/reports/reports.service';
import { UtilityService } from 'src/app/core-services/utilities/utility.service';

@Component({
  selector: 'app-producthscode-information',
 
  templateUrl: './producthscode-information.component.html',
  styleUrl: './producthscode-information.component.css'
})
export class ProducthscodeInformationComponent {
  show_advancesearch: boolean;
        spinnerMessage: string;
        loadingVisible: boolean;
        productHscodeData: any[] = [];
      
      
        constructor(
          private spinner: SpinnerVisibilityService,
          private router: Router,
          public toastr: ToastrService,
          public viewRef: ViewContainerRef,
          public utilityService: UtilityService,
      
          public reportingAnalytics: ReportsService,
      
        ) {
      
        }
      
        ngOnInit() {
          this.onLoadProductHscodeData()
        }
      
      
      
        onLoadProductHscodeData(){
          
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
