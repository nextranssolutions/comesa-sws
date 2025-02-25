import { Component } from '@angular/core';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ToastrService } from 'ngx-toastr';
import { ReportsService } from 'src/app/core-services/reports/reports.service';
import { UtilityService } from 'src/app/core-services/utilities/utility.service';

@Component({
  selector: 'app-portal-processtransition',
  templateUrl: './portal-processtransition.component.html',
  styleUrl: './portal-processtransition.component.css'
})
export class PortalProcesstransitionComponent {
parameter_name:string= "portal_process_transition";
  
  spinnerMessage: string;
  show_advancesearch: boolean;
  loadingVisible = false;

   constructor(
      private spinner: SpinnerVisibilityService,
      // private router: Router,
       //public toastr: ToastrService,
       //public viewRef: ViewContainerRef,
       //public translate: TranslateService,
       //public workflowService: WokflowManagementService,
      public utilityService: UtilityService, 
      // 
      public reportingAnalytics: ReportsService,
    ) 
    {
  
  
    }

  onCellPrepared(e) {
    this.utilityService.onCellCountriesPrepared(e);
  }

   onExporting(e: DxDataGridTypes.ExportingEvent) {
  
      if (e.format == 'pdf') {
        this.reportingAnalytics.onExportingPDF(e)
      }
      else {
        this.reportingAnalytics.onExportingExcelData(e)
      }
    }


    onAdvancePortalProcesstransitionSearch(e){
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
  spinnerShow(spinnerMessage) {
    this.loadingVisible = true;
    this.spinnerMessage = spinnerMessage;
  }
  spinnerHide() {
    this.loadingVisible = false;
  }
}
