
import { Component, OnInit, ViewChild, ViewContainerRef, Inject, Input, EventEmitter, Output } from '@angular/core';

import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { SpinnerVisibilityService } from 'ng-http-loader';

import { DxDataGridComponent } from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AppSettings } from 'src/app/app-settings';
import { UtilityService } from 'src/app/core-services/utilities/utility.service';
import { ConfigurationsService } from 'src/app/core-services/configurations/configurations.service';
import { ImportExportService } from '../../../services/import-export.service';
import { AuthenticationService } from 'src/app/core-services/authentication/authentication.service';

import { PremisesLicensingService } from 'src/app/regulatory_modules/premises-licensing/services/premises-licensing.service';

@Component({
  selector: 'app-permitgeneraldetails',
  templateUrl: './permitgeneraldetails.component.html',
  styleUrl: './permitgeneraldetails.component.css'
})
export class PermitgeneraldetailsComponent implements OnInit {
  @Input() applicationGeneraldetailsfrm: FormGroup;
  @Input() permitReceiverSenderFrm: FormGroup;
  @Input() applicantDetailsForm: FormGroup;
  today: Date = new Date();
  configData: any;
  regulatedProdTypeData: any;
  regulatedSubfunctionData: any;
  producttypeDefinationData: any;
  data_record: any;
  has_declaration_statuses: boolean;
  premises_title: string;
  applicationTypeData: any;
  portTypeData: any;
  applicationCategoryData: any;
  regulatory_subfunction_id: any;
  applicationTypeCategoryData: any;
  permitReasonData: any;
  portOfEntryExitData: any;
  payingCurrencyData: any;
  modeOfTransportData: any;
  permitTypeData: any;
  currencyData: any;
  consigneeOptionsData: any;
  consignee_options_check: any;
  zoneData: any;
  regulatory_function_id: any;
  permit_category_id: any;
  application_code: any;
  ispremisesSearchWinVisible: any;
  transportModeData: any;
  countryData: any;
  invoiceTypeData: any;
  registered_premisesData: any = {};
  issenderreceiverSearchWinVisible: any;
  consignee_sendertitle: any;
  issenderreceiverAddWinVisible: any;

  countries: any;
  regions: any;
  districts: any;
  product_type_id: number;
  deviceTypeData: any;
  permitProductsCategoryData: any;

  proforma_currency_id: number;
  @Output() onProformaInvoiceEvent = new EventEmitter();

  device_type_visible: boolean = false;
  import_typecategory_visible: boolean = false;
  consignee_options_id: number;
  senderReceiverData: any = {};
  checkifsenderreceiver: boolean;
  isconsigneeSearchWinVisible: boolean;
  consigneeReceiverData: any = {};
  dataGrid: DxDataGridComponent;
  app_resp: any;
  isReadOnly: boolean;
  hide_visalicensedetails: boolean = false;
  invoice_title: string;
  has_registred_outlet: boolean = false;
  showreason_fornonregister_outlet: boolean = false;
  confirmDataParam: any;
  is_licensepermit: boolean = false;
  consignor_title: string = 'Consignor(Supplier/Receiver)';
  importerexporter_title: string = 'Import/Exporter'
  eligibleImportersData: any;
  eligibleImportersDocTypes: any;
  filesToUpload: Array<File> = [];
  showsupporting_document: boolean;
  has_submittedpremisesapp: boolean;
  processData: any;
  title: string;
  router_link: string;
  premisesapp_details: any;
  app_route: any;
  maxDate: any;
  trader_id: number;
  mistrader_id: number;
  applicant_id: number;
  premise_title: string = 'Premises(Licensed Outlet(s))';
  ammendReadOnly: boolean;
  loadingVisible: boolean;
  spinnerMessage: string;
  registration_process_action: string;
  select_registration_section_process: string;
  constructor(
    public utilityService: UtilityService, public premappService: PremisesLicensingService, 
    public fb: FormBuilder, public spinner: SpinnerVisibilityService, 
    public configService: ConfigurationsService, public appService: ImportExportService,
    public router: Router, public formBuilder: FormBuilder, public config: ConfigurationsService, 
    public toastr: ToastrService, public authService: AuthenticationService, public httpClient: HttpClient
  ) {
  }
  ngOnInit() {

    this.maxDate = new Date();

    let user_details = this.authService.getUserDetails();
    // this.applicant_id = user_details.trader_id;
    this.trader_id = user_details.trader_id;


    this.onLoadEligibleImportersData;
    // this.onLoadeligibleImportersDocTypes();
    this.onLoadconfirmDataParm();
    this.onLoadmodeofTransportData();
    this.onLoadapplicationTypeData();
    this.onLoadportTypeData();
    this.onLoadpermitTypeData();
    this.onLoadportOfEntryExitData();
    this.onLoadmodeOfTransportData();
    this.onLoadcountryData();
    this.onLoadinvoiceTypeData();
    this.onLoadcurrencyData();
    this.onLoadpermitProductsCategoryData(this.permit_category_id);
    this.onLoadproducttypeDefinationData();
    // this.onsavePermitReceiverSender();
    this.onLoadRegulatedSubfunctionData();
    this.onLoadApplicationCategoryData();
    this.onLoadZoneData();

    if (this.product_type_id == 4) {
      this.device_type_visible = true;
    }
    this.import_typecategory_visible = false;
    if (this.regulatory_subfunction_id == 13 || this.regulatory_subfunction_id == 15) {
      // this.import_typecategory_visible = true;
    }

    if (this.regulatory_subfunction_id == 78 || this.regulatory_subfunction_id == 82 || this.regulatory_subfunction_id == 12) {

      this.consignor_title = 'Consignor(Supplier)';

    }
    else {

      this.consignor_title = 'Consignor(Receiver)';

    }

    if (this.regulatory_subfunction_id == 79 || this.regulatory_subfunction_id == 85) {
      this.ammendReadOnly = true;
    }
    else {
      this.ammendReadOnly = false;
    }
  }
  onApplicationCategorySelection($event) {
    let permit_category_id = $event.selectedItem.id;
    this.onLoadpermitProductsCategoryData(permit_category_id);
  }
  onProductTypesDefinationSelection($event) {
    let producttype_defination_id = $event.selectedItem.id;
    this.onLoadapplicationCategoryData(producttype_defination_id);

  }
  onLoadapplicationCategoryData(producttype_defination_id) {
    var data = {
      table_name: 'par_importexport_permittypes',
      producttype_defination_id: producttype_defination_id,
      regulatory_subfunction_id: this.regulatory_subfunction_id
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.data_record = data;

          if (this.data_record.success) {
            this.applicationCategoryData = this.data_record.data;
            ;
          }
        });
  }


  onLoadpermitProductsCategoryData(permit_category_id) {
    var data = {
      table_name: 'par_product_categories',
      permit_category_id: permit_category_id
    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {

          this.data_record = data;

          if (this.data_record.success) {
            this.permitProductsCategoryData = this.data_record.data;

          }
        });
  }

  onLoadeligibleImportersDocTypes() {

    var data = {
      table_name: ' par_eligible_importersdoctypes'
    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.data_record = data;

          if (this.data_record.success) {
            this.eligibleImportersDocTypes = this.data_record.data;
            ;
          }
        });
  }

  onconsigneeOptionsChange($event) {
    this.consignee_options_id = $event.selectedItem.id;
    if (this.consignee_options_id == 1) {
      this.consignee_options_check = true;
    }
    else {
      this.consignee_options_check = false;
    }

  }
  onhaveSubmittedutlets4Inspection($event) {
    let has_submitted_outlets = $event.selectedItem.id;

    if (has_submitted_outlets == 1) {
      this.has_registred_outlet = true;
      this.showreason_fornonregister_outlet = false;
      this.applicationGeneraldetailsfrm.get('premises_name')?.setValidators([Validators.required]);
      this.applicationGeneraldetailsfrm.get('premise_id')?.setValidators([Validators.required]);
    }
    else {
    }

  }

  onhaveRegOutletsChange($event) {
    let has_registered_outlets = $event.selectedItem.id;

    if (has_registered_outlets == 1) {
      this.has_registred_outlet = true;
      this.showsupporting_document = false;
      this.showreason_fornonregister_outlet = false;
      this.has_submittedpremisesapp = false;
      this.applicationGeneraldetailsfrm.get('premises_name')?.setValidators([Validators.required]);
      this.applicationGeneraldetailsfrm.get('premise_id')?.setValidators([Validators.required]);

      this.applicationGeneraldetailsfrm.get('eligible_importerscategory_id')?.setValidators([]);
      this.applicationGeneraldetailsfrm.get('eligible_importersdoctype_id')?.setValidators([]);
    }
    else {

      this.applicationGeneraldetailsfrm.get('premises_name')?.setValidators([]);
      this.applicationGeneraldetailsfrm.get('premise_id')?.setValidators([]);

      this.applicationGeneraldetailsfrm.get('eligible_importerscategory_id')?.setValidators([]);
      this.applicationGeneraldetailsfrm.get('eligible_importersdoctype_id')?.setValidators([]);

      this.has_registred_outlet = false;
      this.showreason_fornonregister_outlet = true;


    }

  }

  onChangeImporterCategory($event) {
    let is_non_eligibleimporter = $event.selectedItem.is_non_eligibleimporter;
    if (is_non_eligibleimporter == 1) {
      this.has_registred_outlet = true;
      this.showsupporting_document = false;

      this.has_submittedpremisesapp = true;
      this.applicationGeneraldetailsfrm.get('premises_name')?.setValidators([Validators.required]);
      this.applicationGeneraldetailsfrm.get('premise_id')?.setValidators([Validators.required]);
      this.toastr.error('The selected Importer Category is required to submit Premises Application before the Import Process.', 'Warning -Requirement');

    } else {

      this.has_submittedpremisesapp = false;
      this.showsupporting_document = true;
      this.has_registred_outlet = false;
      this.applicationGeneraldetailsfrm.get('premises_name')?.setValidators([]);
      this.applicationGeneraldetailsfrm.get('premise_id')?.setValidators([]);

    }

  }
  // let non_eligibleimporter = $event.selectedItem.non_eligibleimporter;
  onLoadconfirmDataParm() {
    var data = {
      table_name: 'par_confirmations',
    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.data_record = data;

          if (this.data_record.success) {
            this.confirmDataParam = this.data_record.data;
            ;
          }
        });
  }
  onLoadproducttypeDefinationData() {
    var data = {
      table_name: 'par_producttype_definations',
    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.data_record = data;

          if (this.data_record.success) {
            this.producttypeDefinationData = this.data_record.data;
          }
        });
  }

  onLoadRegulatedSubfunctionData() {
    var data = {
      table_name: 'par_regulatory_subfunctions',
    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          console.log(data.record);
          this.data_record = data;

          if (this.data_record.success) {
            this.regulatedSubfunctionData = this.data_record.data;

          }
        });
  }
  onLoadapplicationTypeData() {
    var data = {
      table_name: 'par_application_types',
      is_enabled: true,

    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          console.log(data.record);
          this.data_record = data;

          if (this.data_record.success) {
            this.applicationTypeData = this.data_record.data;

          }
        });
  }


  onLoadportOfEntryExitData() {
    var data = {
      table_name: 'par_entryexit_port',
      is_enabled: true,

    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          console.log(data.record);
          this.data_record = data;

          if (this.data_record.success) {
            this.portOfEntryExitData = this.data_record.data;

          }
        });
  }
  // 

  onLoadmodeOfTransportData() {
    var data = {
      table_name: 'par_transport_mode',
      is_enabled: true,

    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          console.log(data.record);
          this.data_record = data;

          if (this.data_record.success) {
            this.modeOfTransportData = this.data_record.data;

          }
        });
  }


  onLoadportTypeData() {
    var data = {
      table_name: 'par_port_type',
      is_enabled: true,

    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          console.log(data.record);
          this.data_record = data;

          if (this.data_record.success) {
            this.portTypeData = this.data_record.data;

          }
        });
  }

  // currencyData

  onLoadcurrencyData() {
    var data = {
      table_name: 'par_currencies',
      is_enabled: true,

    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          console.log(data.record);
          this.data_record = data;

          if (this.data_record.success) {
            this.currencyData = this.data_record.data;

          }
        });
  }

  // 

  onLoadmodeofTransportData() {
    var data = {
      table_name: 'par_mode_oftransport',
      is_enabled: true,

    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.data_record = data;

          if (this.data_record.success) {
            this.transportModeData = this.data_record.data;

          }
        });
  }


  onLoadcountryData() {
    var data = {
      table_name: 'par_countries',
      is_enabled: true,

    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.data_record = data;

          if (this.data_record.success) {
            this.countryData = this.data_record.data;

          }
        });
  }

  onLoadinvoiceTypeData() {
    var data = {
      table_name: 'par_invoice_types',
      is_enabled: true,

    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          console.log(data.record);
          this.data_record = data;

          if (this.data_record.success) {
            this.invoiceTypeData = this.data_record.data;

          }
        });
  }





  onLoadpermitTypeData() {
    var data = {
      table_name: 'tra_transactionpermit_types',
      // is_enabled: 1,

    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.data_record = data;

          if (this.data_record.success) {
            this.permitTypeData = this.data_record.data;

          }
        });
  }

  onLoadApplicationCategoryData() {
    var data = {
      table_name: 'par_importexport_permittypes',
    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.data_record = data;

          if (this.data_record.success) {
            this.applicationCategoryData = this.data_record.data;

          }
        },
        error => {
          // console.error("HTTP Error:", error); 
        }
      );
  }
  onLoadZoneData() {
    var data = {
      table_name: 'par_zones',
    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.data_record = data;

          if (this.data_record.success) {
            this.zoneData = this.data_record.data;
            ;
          }
        });
  }

  onLoadEligibleImportersData() {
    var data = {
      table_name: ' par_eligible_importerscategories',
      product_type_id: this.product_type_id
    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.data_record = data;

          if (this.data_record.success) {
            this.eligibleImportersData = this.data_record.data;
            ;
          }
        });
  }


  onProformaInvoiceCurrencyChange($event) {
    this.proforma_currency_id = $event.value;
    this.onProformaInvoiceEvent.emit(this.proforma_currency_id);
  }
  funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width / 100;
  }
  onsearchSenderreceiver() {
    this.consignee_sendertitle = this.consignor_title;
    this.checkifsenderreceiver = true;

    this.issenderreceiverSearchWinVisible = true;

    let me = this;
    this.senderReceiverData.store = new CustomStore({
      load: function (loadOptions: any) {
        console.log(loadOptions)
        var params = '?';
        params += 'skip=' + loadOptions.skip;
        params += '&take=' + loadOptions.take;//searchValue
        var headers = new HttpHeaders({
          "Accept": "application/json",
          "Authorization": "Bearer " + me.authService.getAccessToken(),
        });

        me.configData = {
          headers: headers,
          params: { skip: loadOptions.skip, take: loadOptions.take, searchValue: loadOptions.filter, table_name: 'tra_permitsenderreceiver_data' }
        };
        return me.httpClient.get(AppSettings.base_url + '/' + 'api/import-export/getSenderreceiversDetails', me.configData)
          .toPromise()
          .then((data: any) => {
            return {
              data: data.data,
              totalCount: data.totalCount
            }
          })
          .catch(error => { throw 'Data Loading Error' });
      }
    });

  }


  onsearchConsignee() {

    this.consignee_sendertitle = 'Consignee Details';
    this.checkifsenderreceiver = false;

    this.isconsigneeSearchWinVisible = true;
    let me = this;
    this.consigneeReceiverData.store = new CustomStore({
      load: function (loadOptions: any) {
        console.log(loadOptions)
        var params = '?';
        params += 'skip=' + loadOptions.skip;
        params += '&take=' + loadOptions.take;//searchValue
        var headers = new HttpHeaders({
          "Accept": "application/json",
          "Authorization": "Bearer " + me.authService.getAccessToken(),
        });

        me.configData = {
          headers: headers,
          params: { skip: loadOptions.skip, take: loadOptions.take, searchValue: loadOptions.filter, table_name: 'tra_consignee_data' }
        };
        return me.httpClient.get(AppSettings.base_url + '/' + 'getSenderreceiversDetails', me.configData)
          .toPromise()
          .then((data: any) => {
            return {
              data: data.data,
              totalCount: data.totalCount
            }
          })
          .catch(error => { throw 'Data Loading Error' });
      }
    });
  }

  onRegisteredPremisesSearch1() {

    this.premappService.onLoadRegisteredPremises({})
      .subscribe(
        data_response => {
          this.ispremisesSearchWinVisible = true;
          this.registered_premisesData = data_response.data;
        },
        error => {
          return false
        });
  }//23000
  onRegisteredPremisesSearch() {
    this.ispremisesSearchWinVisible = true;
    let me = this;
    this.registered_premisesData.store = new CustomStore({
      load: function (loadOptions: any) {
        console.log(loadOptions)
        var params = '?';
        params += 'skip=' + loadOptions.skip;
        params += '&take=' + loadOptions.take;
        var headers = new HttpHeaders({
          "Accept": "application/json",
          "Authorization": "Bearer " + me.authService.getAccessToken(),
        });

        me.configData = {
          headers: headers,
          params: { skip: loadOptions.skip, take: loadOptions.take, searchValue: loadOptions.filter, table_name: 'txn_premises_applications', trader_id: me.trader_id }
        };

        return me.httpClient.get(AppSettings.base_url + '/' + 'getTradersRegisteredPremises', me.configData)
          .toPromise()
          .then((data: any) => {
            return {
              data: data.data,
              totalCount: data.totalCount
            }
          })
          .catch(error => { throw 'Data Loading Error' });
      }
    });

  }

  nullFunc() {

  }
  onPremisesPerGridToolbar(e) {
    //this.functDataGridToolbar(e, this.nullFunc, '');
    e.toolbarOptions.items.unshift({
      location: 'after',
      widget: 'dxButton',
      options: {
        icon: 'refresh',
        onClick: this.refreshDataGrid.bind(this)
      }
    });

  }
  functDataGridToolbar(e, funcBtn, btn_title) {
    e.toolbarOptions.items.unshift({
      location: 'before',
      widget: 'dxButton',
      options: {
        text: btn_title,
        type: 'default',
        icon: 'fa fa-plus',
        onClick: funcBtn.bind(this)

      }
    }, {
      location: 'after',
      widget: 'dxButton',
      options: {
        icon: 'refresh',
        onClick: this.refreshDataGrid.bind(this)
      }
    });
  }
  refreshDataGrid() {
    this.dataGrid.instance.refresh();
  }

  funcSelectPremiseDetails(data) {
    //check if there any pending detail
    let status_id = data.data.validity_status_id;
    let has_registered_outlets = this.applicationGeneraldetailsfrm.get('has_registered_outlets')?.value;
    if (this.product_type_id == 2 || this.product_type_id == 4 || this.product_type_id == 7) {
      if (status_id == 2 && has_registered_outlets == 1) {
        this.applicationGeneraldetailsfrm.get('premise_id')?.setValue(data.data.premise_id);
        this.applicationGeneraldetailsfrm.get('premises_name')?.setValue(data.data.premises_name);
        this.ispremisesSearchWinVisible = false;
      }
      else {
        this.toastr.error('The selected premises has an inactive Validity Status. Current Status :' + data.data.status_name + '. Instatiate a premises renewal or contact Authority for further guidelines.', 'Alert');
      }

    } else {


      this.applicationGeneraldetailsfrm.get('premise_id')?.setValue(data.data.premise_id);
      this.applicationGeneraldetailsfrm.get('premises_name')?.setValue(data.data.premises_name);
      this.ispremisesSearchWinVisible = false;

    }


  }
  funcSelectReceiverSender(data) {
    if (this.checkifsenderreceiver) {
      this.applicationGeneraldetailsfrm.get('importer_exporter_id')?.setValue(data.data.id);
      this.applicationGeneraldetailsfrm.get('importer_exporter_name')?.setValue(data.data.name);
    } else {
      this.applicationGeneraldetailsfrm.get('importer_exporter_id')?.setValue(data.data.id);
      this.applicationGeneraldetailsfrm.get('importer_exporter_name')?.setValue(data.data.name);
    }
    this.issenderreceiverSearchWinVisible = false;
    this.isconsigneeSearchWinVisible = false;
  }



  onLoadDistricts(region_id) {
    var data = {
      table_name: 'par_districts',
      region_id: region_id
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.data_record = data;

          if (this.data_record.success) {
            this.districts = this.data_record.data;

          }
        });
  }
  onRegionsCboSelect($event) {

    this.onLoadDistricts($event.selectedItem.id);

  }
  onLoadRegions(country_id) {

    var data = {
      table_name: 'par_regions',
      country_id: country_id
    };
    this.config.onLoadConfigurationData(data)

      .subscribe(
        data => {
          this.data_record = data;

          if (this.data_record.success) {
            this.regions = this.data_record.data;

          }
        });
  }

  onCoutryCboSelect($event) {
    if ($event.selectedItem) {
      let country_data = $event.selectedItem,
        country_code = '+' + country_data.phonecode;
      this.permitReceiverSenderFrm.get('telephone_no')?.setValue(country_code);
    }

    this.onLoadRegions($event.selectedItem.id);

  }



  onsavePermitReceiverSender() {
    this.spinner.show();
    let table_name;
    if (this.checkifsenderreceiver) {
      table_name = 'tra_permitsenderreceiver_data';
    } else {
      table_name = 'tra_consignee_data';
    }
    let name = this.permitReceiverSenderFrm.get('name')?.value;
    this.appService.onAddPermitReceiverSender(table_name, this.permitReceiverSenderFrm.value, 'onSaveUniformApplicantDataset')
      .subscribe(
        response => {
          this.app_resp = response;
          //the details 
          if (this.app_resp.success) {
            this.issenderreceiverAddWinVisible = false;

            this.updateConsigneeReceiver(this.app_resp.record_id, name)
            this.toastr.success(this.app_resp.message, 'Response');

          } else {
            this.toastr.error(this.app_resp.message, 'Alert');
          }
          this.spinner.hide();
        },
        error => {
          this.toastr.error('Error Occurred', 'Alert');
        });
  }
  updateConsigneeReceiver(id, name) {
    if (this.checkifsenderreceiver) {
      this.applicationGeneraldetailsfrm.get('sender_receiver_id')?.setValue(id);
      this.applicationGeneraldetailsfrm.get('sender_receiver')?.setValue(name);
    } else {
      this.applicationGeneraldetailsfrm.get('consignee_id')?.setValue(id);
      this.applicationGeneraldetailsfrm.get('consignee_name')?.setValue(name);
    }
  }
  onsenderreceivePreparing(e) {
    this.functDataGridToolbar(e, this.funcsenderreceivedetails, 'Add Information');
  }
  funcsenderreceivedetails() {
    this.issenderreceiverSearchWinVisible = false;
    this.issenderreceiverAddWinVisible = true;
    this.permitReceiverSenderFrm.reset();

  }
  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;

  }

  onCellRegisteredPremisesPrepared(e) {
    if (e.rowType === "data" && e.column.dataField === "validity_status") {
      let application_status_id = e.data.validity_status_id;
      if (application_status_id == 1) {
        e.cellElement.style.color = 'black';
        e.cellElement.style.backgroundColor = '#ff0000';
      }
      else if (application_status_id == 2) {

        e.cellElement.style.color = 'white';
        e.cellElement.style.backgroundColor = '#3df14f';

      }
      else if (application_status_id == 3) {

        e.cellElement.style.color = 'white';
        e.cellElement.style.backgroundColor = '#c90076';

      } else {

        e.cellElement.style.color = 'white';
        e.cellElement.style.backgroundColor = '#f44336';

      }
    }
  }
}