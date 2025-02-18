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
  selector: 'app-producthscode-information',

  templateUrl: './producthscode-information.component.html',
  styleUrl: './producthscode-information.component.css'
})
export class ProducthscodeInformationComponent {
  show_advancesearch: boolean;
  spinnerMessage: string;
  loadingVisible: boolean;
  productHscodeData: any[] = [];
  procedureData: any[] = [];
  data_record: any;
  selectedProduct: string = '';
  searchQuery: string = '';
  searchText: string = ''; // Search text
  filteredProcedureData: any[] = [];
  hscodeData: any[] = [];
  iconPosition: any = "top";
  selectedSubheadingId: number;
  subheading_definations_id: number;  selectedTabIndex = 0;
  iconPosition: any = 'top';
  productChapterData: any;
  productCategoryData: any;
  productSubcategoryData: any;

  searchProcedureFrm: FormGroup;

  table_name: string;

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
    this.table_name = 'tra_hscodesproducts_registry'
    this.searchProcedureFrm = new FormGroup({
      hscodechapters: new FormControl('', Validators.compose([])),
      hscodesheading: new FormControl('', Validators.compose([])),
      hscodessubheading: new FormControl('', Validators.compose([])),
    });
  }

  ngOnInit() {
    this.onLoadProductHscodeData();
    this.onLoadproductChapterData();
    this.onLoadproductCategoryData();
    this.onLoadproductSubCategoryData();


    let searchproceduredetails = this.publicservice.getApplicationDetail();
    if (searchproceduredetails) {
      this.searchProcedureFrm.patchValue(searchproceduredetails);
      this.selectedTabIndex = searchproceduredetails.selectedTabIndex;
      this.onGetFilteredData();
    }
    else {
      this.onGetFilteredData();
    }
    this.onLoadProcedureData();
  }


  onLoadProductHscodeData() {
    this.spinnerShow('Loading...........');

    var data_submit = {
      table_name: this.table_name,
    }
    this.publicservice.onLoadInformationSharingDataUrl(data_submit, 'onLoadHSCodesProductsRegistry')
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.productHscodeData = this.data_record.data;
            this.onLoadHSCodes(this.subheading_definations_id)
          }
          this.spinnerHide();
        },
        error => {

          this.spinnerHide();
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

  funcProcedureClick(e) {
    //add logic
    let tab_index = e.itemIndex;

    if (tab_index == 1 || tab_index == 2) {

    }
  }

  onGetFilteredData() {
    this.spinnerShow('Loading...');

    const data_submit = {
      table_name: this.table_name,

    };

    this.publicservice.onLoadInformationSharingDataUrl(data_submit, 'onLoadProcedureDetails')
      .subscribe(
        (data) => {
          this.data_record = data;
          if (this.data_record.success) {
            this.productHscodeData = this.data_record.data;
          }
          this.spinnerHide();
        }, error => {

          this.spinnerHide();
        });

  }

  onLoadHSCodes(subheading_definations_id) {
    this.spinnerShow('Loading...........');

    var data_submit = {
      table_name: 'tra_hscodesproducts_registry',
      hscodessubheading_defination_id: subheading_definations_id
    };

    this.publicservice.onLoadInformationSharingDataUrl(data_submit, 'onLoadHSCodesProductsRegistry')
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.hscodeData = this.data_record.data;
            this.filterHSCodesBySubheading(subheading_definations_id);
          }
          this.spinnerHide();
        },
        error => {
          this.spinnerHide();
        }
      );
}

filterHSCodesBySubheading(subheading_definations_id) {
  // Filter the HS codes based on the selected subheading
  this.hscodeData = this.hscodeData.filter(hscode => hscode.subheading_definations_id === subheading_definations_id);
}


  // onLoadProcedureData() {
  //   const data_submit = { table_name: 'tra_importexport_proceduredetails' };

  //   this.publicservice.onLoadInformationSharingDataUrl(data_submit, 'onLoadProcedureDetails')
  //     .subscribe(
  //       data => {
  //         if (data.success) {
  //           this.procedureData = data.data;
  //           this.filteredProcedureData = [...this.procedureData]; // Initialize filtered data
  //         }
  //       },
  //       error => {
  //         console.error('Error loading procedures:', error);
  //       }
  //     );
  // }

  // onSearch() {
  //   this.filteredProcedureData = this.procedureData.filter(procedure =>
  //     procedure.procedure_categories.toLowerCase().includes(this.searchText.toLowerCase()) ||
  //     procedure.procedure_description.toLowerCase().includes(this.searchText.toLowerCase())
  //   );
  // }
  onLoadProcedureData() {
    const data_submit = { table_name: 'tra_importexport_proceduredetails' };
  
    this.publicservice.onLoadInformationSharingDataUrl(data_submit, 'onLoadProcedureDetails')
      .subscribe(
        data => {
          if (data.success) {
            this.procedureData = data.data;
            
            // Filter procedures based on the selected subheading_definations_id
            this.filteredProcedureData = this.procedureData.filter(procedure =>
              procedure.subheading_definations_id === this.selectedSubheadingId
            );
          }
        },
        error => {
          console.error('Error loading procedures:', error);
        }
      );
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
