import { Component, Input, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ToastrService } from 'ngx-toastr';
import { ConfigurationsService } from 'src/app/core-services/configurations/configurations.service';
import { ReportsService } from 'src/app/core-services/reports/reports.service';
import { UtilityService } from 'src/app/core-services/utilities/utility.service';

@Component({
  selector: 'app-shared-dms',

  templateUrl: './shared-dms.component.html',
  styleUrl: './shared-dms.component.css'
})
export class SharedDmsComponent {
  @Input() table_name: string;
  @Input() parameter_name: string;
  hasReadpermissions: boolean;
  createNewDataFrm: FormGroup;
  onAddNewConfiVisible: boolean;
  NewConfigData: any;
  siteIdData: any;
  documentTypeIdData: any;
  documentRequirementIdData: any;
  productTypeIdData: any;
  prodClassIdData: any;
  importexportIdData: any;
  premiseTypeData: any;
  pharmaceuticalLicenseIdData: any;
  pharmaceuticalLicenseTypeIdData: any;
  gmpTypeIdData: any;
  sopIdData: any;
  nodeRefData: any;
  isMandatoryData: any;
  organisationData: any;
  isDmsSideRoot: any;
  nodeNameData: any;
  regulatoryFunctionIdData: any;
  regulatorySubFunctionIdData: any;
  processIdData: any;
  show_advancesearch: boolean;
  isnewprocess: boolean;
  config_record: string;
  deletePopupVisible = false;
  is_enabled: boolean;
  enabledisable_tracer: string;
  enabledisable_tracerdescription: string;
  enablePopupVisible: boolean;
  data_record: any;
  loadingVisible: boolean;
  spinnerMessage: string;
  response: any;
  regStatusOptions = [
    { value: true, text: 'Yes' },
    { value: false, text: 'No' },
  ];

  loading = false;

  actionsMenuItems = [
    {
      text: "Action",
      icon: 'menu',
      items: [
        //  { text: "View", action: 'view_record', icon: 'fa fa-eye' },
        { text: "Edit", action: 'edit_record', icon: 'fa fa-edit' },
        { text: "Delete", action: 'delete_record', icon: 'fa fa-trash' },
        { text: "Enable/Disable", action: 'enable_record', icon: 'fa fa-check' },
      ]
    }
  ];


  constructor(
    private spinner: SpinnerVisibilityService,
    private router: Router,
    public toastr: ToastrService,
    public viewRef: ViewContainerRef,
    public translate: TranslateService,
    public utilityService: UtilityService,
    public reportingAnalytics: ReportsService,
    public configService: ConfigurationsService,
  ) {


      this.createNewDataFrm = new FormGroup({
        id: new FormControl('', Validators.compose([])),
        name: new FormControl('', Validators.compose([Validators.required])),
        description: new FormControl('', Validators.compose([Validators.required])),
        is_enabled: new FormControl('', Validators.compose([])),
        // product_type_id: new FormControl('', Validators.compose([])),
        document_no: new FormControl('', Validators.compose([])),
        code: new FormControl('', Validators.compose([])),
        organisation_id: new FormControl('', Validators.compose([Validators.required]))
        
      });
    
  

  }

  ngOnInit() {
    this.fetchNewConfigData();
    this.fetchSiteIdData();
    this.fetchDocumentTypeIdData();
    this.fetchDocumentRequirementIdData();
    this.fetchNodeRefData();
    this.fetchRegulatoryFunctionIdData();
    // this.fetchRegulatorySubFunctionIdData();
    this.fetchNewConfigurations();
    this.fetchSideRoot();
    this.fetchNodeNameData();
    this.fetchProductTypeIdData();
    this.fetchProdClassData();
    this.fetchImportexportIdData();
    this.fetchPremiseTypeData();
    this.fetchPharmaceuticalLicenseIdData();
    this.fetchPharmaceuticalLicenseTypeIdData();
    this.fetchGmpTypeIdData();
    // this.fetchSopIdData();
    this.fetchorganisationData();

    }

    spinnerShow(spinnerMessage) {
      this.loadingVisible = true;
      this.spinnerMessage = spinnerMessage;
    }
    spinnerHide() {
      this.loadingVisible = false;
    }
  
  resetcolumns(resetcolumns: any) {
    throw new Error('Method not implemented.');
  }

  onCellPrepared(e) {
    this.utilityService.onCellCountriesPrepared(e);
  }

  onAddNewConfig() {
    this.createNewDataFrm.reset();
    this.onAddNewConfiVisible = true;
  }

  fetchNewConfigurations() {
    this.spinnerShow('Loading...........');
    var data_submit = {
      'table_name': this.table_name
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            // this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.NewConfigData = this.data_record.data;
          }
          this.spinnerHide();
        },
        error => {
          this.spinnerHide();
        });
  }
  onFuncSaveNewConfigData() {

    const formData = new FormData();
    const invalid = [];
    const controls = this.createNewDataFrm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        this.toastr.error('Fill In All Mandatory fields with (*), missing value on ' + name.replace('_id', ''), 'Alert');
        return;
      }
    }
    if (this.createNewDataFrm.invalid) {
      return;
    }
    this.spinnerShow('saving ' + this.parameter_name);
    this.configService.onSaveConfigurationDetailsDetails(this.table_name, this.createNewDataFrm.value, 'onsaveConfigData')
      .subscribe(
        response => {
          this.response = response;
          //the details 
          if (this.response.success) {
            this. fetchNewConfigurations();
            this.onAddNewConfiVisible = false;
            this.toastr.success(this.response.message, 'Response');

          } else {
            this.toastr.error(this.response.message, 'Alert');
          }
          this.spinnerHide();
        },
        error => {
          this.toastr.error('Error Occurred', 'Alert');
          this.spinnerHide();
        });
  }

  
  fetchNewConfigData() {

    var data_submit = {
      'table_name': this.table_name
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          ;
          if (this.data_record.success) {
            this.NewConfigData = this.data_record.data;
          }

        },
        error => {

        });

  }

  fetchSiteIdData() {

    var data_submit = {
      'table_name': 'dms_dmsdocument_sites'
    }
    this.configService.onLoadConfigurationData(data_submit)
        .subscribe(
          data => {
            this.data_record = data;
            
            if (this.data_record.success) {
              this.siteIdData = this.data_record.data;
              ;
            }
          });

  }

  // fetchSiteIdData() {
  //   const data_submit1 = { 'table_name': 'dms_dmsdocument_sites' };
  //   const data_submit2 = { 'table_name': 'tra_nonstructured_docdefination' }; // Replace with your second table's name
  
  //   // Fetch data for the first table
  //   this.configService.onLoadConfigurationData(data_submit1)
  //     .subscribe(data1 => {
  //       if (data1.success) {
  //         const siteIdData1 = data1.data;
  
  //         // Fetch data for the second table
  //         this.configService.onLoadConfigurationData(data_submit2)
  //           .subscribe(data2 => {
  //             if (data2.success) {
  //               const siteIdData2 = data2.data;
  
  //               // Combine data from both tables (you can merge or concatenate based on your requirements)
  //               this.siteIdData = [...siteIdData1, ...siteIdData2]; // Concatenate arrays
  
  //               // If needed, you can further process the data to ensure no duplicates
  //               // this.siteIdData = [...new Set([...siteIdData1, ...siteIdData2])]; // Remove duplicates (if any)
  //             }
  //           });
  //       }
  //     });
  // }
  

  fetchDocumentTypeIdData() {

    var data_submit = {
      'table_name': 'par_document_types'
    }
    this.configService.onLoadConfigurationData(data_submit)
        .subscribe(
          data => {
            this.data_record = data;
            
            if (this.data_record.success) {
              this.documentTypeIdData = this.data_record.data;
              ;
            }
          });

  }

  fetchDocumentRequirementIdData() {

    var data_submit = {
      'table_name': 'dms_document_requirements'
    }
    this.configService.onLoadConfigurationData(data_submit)
        .subscribe(
          data => {
            this.data_record = data;
            
            if (this.data_record.success) {
              this.documentRequirementIdData = this.data_record.data;
              ;
            }
          });

  }

  fetchProductTypeIdData() {

    var data_submit = {
      'table_name': 'par_regulated_productstypes'
    }
    this.configService.onLoadConfigurationData(data_submit)
        .subscribe(
          data => {
            this.data_record = data;
            
            if (this.data_record.success) {
              this.productTypeIdData = this.data_record.data;
              ;
            }
          });

  }

  fetchNodeRefData() {

    var data_submit = {
      'table_name': 'dms_sites_repository_defination'
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.nodeRefData = this.data_record.data
          }
        },
        error => {

        });

  }

  
  fetchSideRoot() {
    
    var data_submit = {
      'table_name': 'dms_sites_repository_defination'
    }
    this.configService.onLoadConfigurationData(data_submit)
    .subscribe(
      data => {
        this.data_record = data;
        if (this.data_record.success) {
          this.isDmsSideRoot = this.data_record.data
          }
        },
        error => {
          
        });
        
      }
      

  fetchNodeNameData() {

    var data_submit = {
      'table_name': 'tra_nonstructured_docdefination'
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.nodeNameData = this.data_record.data
          }
        },
        error => {

        });

  }
  onRegulatoryFunctionChange($event) {
    if ($event.selectedItem) {
      let regulatory_function = $event.selectedItem;
      this.fetchRegulatorySubFunctionIdData(regulatory_function.id)
    }
  }


  fetchRegulatoryFunctionIdData() {

    var data_submit = {
      'table_name': 'par_regulatory_functions'
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.regulatoryFunctionIdData = this.data_record.data
          }
        },
        error => {

        });

  }

  fetchRegulatorySubFunctionIdData(regulatory_function_id) {

    var data_submit = {
      'table_name': 'par_regulatory_subfunctions',
      regulatory_function_id: regulatory_function_id
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.regulatorySubFunctionIdData = this.data_record.data
          }
        },
        error => {

        });

  }
  
  fetchRegulatoryProcessIdData() {

    var data_submit = {
      'table_name': 'par_process_classifications'
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.processIdData = this.data_record.data
          }
        },
        error => {

        });

  }

  fetchProdClassData() {

    var data_submit = {
      'table_name': 'par_prodclass_categories'
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.prodClassIdData = this.data_record.data
          }
        },
        error => {

        });

  }

  fetchImportexportIdData() {

    var data_submit = {
      'table_name': 'par_importexport_permittypes'
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.importexportIdData = this.data_record.data
          }
        },
        error => {

        });

  }

  fetchPremiseTypeData() {

    var data_submit = {
      'table_name': 'par_premises_types'
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.premiseTypeData = this.data_record.data
          }
        },
        error => {

        });

  }

  fetchPharmaceuticalLicenseIdData() {

    var data_submit = {
      'table_name': 'tra_pharmaceutical_licenses'
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.pharmaceuticalLicenseIdData = this.data_record.data
          }
        },
        error => {

        });

  }

  fetchPharmaceuticalLicenseTypeIdData() {

    var data_submit = {
      'table_name': 'par_pharmaceuticallicense_types'
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.pharmaceuticalLicenseTypeIdData = this.data_record.data
          }
        },
        error => {

        });

  }

  fetchGmpTypeIdData() {

    var data_submit = {
      'table_name': 'par_pharmaceuticallicense_types'
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.gmpTypeIdData = this.data_record.data
          }
        },
        error => {

        });

  }

  fetchSopIdData() {

    var data_submit = {
      'table_name': 'par_sop_masterlist'
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.sopIdData = this.data_record.data
          }
        },
        error => {
        });
  }
  fetchorganisationData() {

    var data_submit = {
      'table_name': 'tra_organisation_information'
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.organisationData = this.data_record.data
          }
        },
        error => {
        });
  }
  
  funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width / 100;
  }

  funcpopHeight(percentage_height) {
    return window.innerHeight * percentage_height / 100;
  }
  finishFunction() {

  }

  funcEditDetails(data) {
    this.createNewDataFrm.patchValue(data.data);
    this.onAddNewConfiVisible = true;
  }
  funcDeleteDetails(data) {
    this.createNewDataFrm.patchValue(data.data);
    this.config_record = data.data.name;
    this.deletePopupVisible = true;
  }

  funcEnableDisableRecord(data) {
    this.createNewDataFrm.patchValue(data.data);

    this.config_record = data.data.name;
    this.is_enabled = data.data.is_enabled;
    if (this.is_enabled) {
      this.enabledisable_tracer = "disable_configuration_item";
      this.enabledisable_tracerdescription = "are_you_sure_you_want_to_disableconfigurationitem";

    }
    else {
      this.enabledisable_tracer = "enable_configuration_item";
      this.enabledisable_tracerdescription = "are_you_sure_you_want_to_enableconfigurationitem";
    }

    this.enablePopupVisible = true;
  }
  funcActionColClick(e, data) {
    var action_btn = e.itemData;
    if (action_btn.action === 'edit_record') {
      this.funcEditDetails(data);
    } else if (action_btn.action === 'delete_record') {
      this.funcDeleteDetails(data);
    } else if (action_btn.action === 'enable_record') {
      this.funcEnableDisableRecord(data);
    } else if (action_btn.action === 'block_record') {
      this.funcDeleteDetails(data);
    }
  }

  iniateEnableDisableRecord() {

    this.spinnerShow('Saving_details');
    this.configService.onEnableConfigurationsDetails(this.createNewDataFrm.value, this.table_name, this.parameter_name)
      .subscribe(
        response => {
          this.spinner.hide();
          this.response = response;
          if (this.response.success) {
            this.fetchNewConfigurations();
            this.enablePopupVisible = false;
            this.toastr.success(this.response.message, 'Response');
            this.deletePopupVisible = false;
          }
          else {
            this.toastr.success(this.response.message, 'Response');
          }
          this.spinnerHide();
        },
        error => {
          this.loading = false;
          this.spinnerHide();
        });
  }

  
  onAdvanceProductRegistrySearch(e) {
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

  onDeleteConfigurationsDetails() {
    this.spinnerShow('deleting ' + this.parameter_name);
    this.configService.onDeleteConfigurationsDetails(this.createNewDataFrm.value, this.table_name, this.parameter_name)
      .subscribe(
        response => {
          this.spinner.hide();
          this.response = response;
          if (this.response.success) {
            this.fetchNewConfigurations();
            this.toastr.success(this.response.message, 'Response');
            this.deletePopupVisible = false;
          }
          else {

            this.toastr.success(this.response.message, 'Response');

          }
          this.spinnerHide();

        },
        error => {
          this.loading = false;
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
}
