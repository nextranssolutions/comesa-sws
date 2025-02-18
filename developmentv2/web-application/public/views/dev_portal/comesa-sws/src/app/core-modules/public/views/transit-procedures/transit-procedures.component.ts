import { Component, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ToastrService } from 'ngx-toastr';
import { ConfigurationsService } from 'src/app/core-services/configurations/configurations.service';
import { PublicDashboardService } from 'src/app/core-services/public-dashboard/public-dashboard.service';
import { ReportsService } from 'src/app/core-services/reports/reports.service';
import { UtilityService } from 'src/app/core-services/utilities/utility.service';

@Component({
  selector: 'app-transit-procedures',

  templateUrl: './transit-procedures.component.html',
  styleUrl: './transit-procedures.component.css'
})
export class TransitProceduresComponent {
  show_advancesearch: boolean;
  spinnerMessage: string;
  loadingVisible: boolean;
  transitProcedureData: any[] = [];
  data_record: any;
  table_name: string;
  selectedTabIndex = 0;
  iconPosition: any = 'top';
  searchProcedureFrm: FormGroup;
  productChapterData: any;
  productSubcategoryData: any;
  productCategoryData: any;
  operation_type_id: number; // default operation type id for transit

  constructor(
    private spinner: SpinnerVisibilityService,
    private router: Router,
    public toastr: ToastrService,
    public viewRef: ViewContainerRef,
    public utilityService: UtilityService,
    public publicservice: PublicDashboardService,
    public reportingAnalytics: ReportsService,
    private configService: ConfigurationsService,

  ) {
    this.table_name = 'tra_importexport_proceduredetails'
    this.searchProcedureFrm = new FormGroup({
      hscodechapters: new FormControl('', Validators.compose([])),
      hscodesheading: new FormControl('', Validators.compose([])),
      hscodessubheading: new FormControl('', Validators.compose([])),
    });
  }

  ngOnInit() {
    this.onLoadTransitProcedureData(this.operation_type_id);
    this.onLoadproductChapterData();
    this.onLoadproductCategoryData();
    this.onLoadproductSubCategoryData();
    let searchproceduredetails = this.publicservice.getApplicationDetail();
    if (searchproceduredetails) {
      this.searchProcedureFrm.patchValue(searchproceduredetails);
      this.selectedTabIndex = searchproceduredetails.selectedTabIndex;
      this.onLoadTransitProcedureData(this.operation_type_id);
    }
    
  }

  onLoadTransitProcedureData(operation_type_id) {
    this.spinnerShow('Loading...');
  
    const data_submit = {
      table_name: this.table_name,
      'operation_type_id': 3
    };
  
    this.publicservice.onLoadInformationSharingDataUrl(data_submit, 'onLoadProcedureDetails')
      .subscribe(
        (data) => {
          this.data_record = data;
          if (this.data_record.success) {
            this.transitProcedureData = this.data_record.data;
          }
          this.spinnerHide();
        }, error => {

          this.spinnerHide();
        });
    
  }


  onLoadproductSubCategoryData() {

    var data_submit = {
      'table_name': 'par_hscodessubheading_defination'
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.productSubcategoryData = this.data_record.data;
          }
        },
        error => {

        });

  }

  onLoadproductCategoryData() {

    var data_submit = {
      'table_name': 'par_hscodesheading_definations'
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.productCategoryData = this.data_record.data;
          }
        },
        error => {

        });

  }

  onLoadproductChapterData() {

    var data_submit = {
      'table_name': 'par_hscodechapters_defination'
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.productChapterData = this.data_record.data;
          }
        },
        error => {

        });

  }



  funcProcedureClick(e) {
    //add logic
    let tab_index = e.itemIndex;

    if (tab_index == 1 || tab_index == 2) {

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
