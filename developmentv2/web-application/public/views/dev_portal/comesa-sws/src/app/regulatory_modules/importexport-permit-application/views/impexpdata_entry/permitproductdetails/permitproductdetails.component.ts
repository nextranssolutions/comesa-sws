import { Component, OnInit, ViewChild, ViewContainerRef, Inject, Input, EventEmitter, Output } from '@angular/core';

import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { DxDataGridComponent } from 'devextreme-angular';

import CustomStore from 'devextreme/data/custom_store';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AppSettings } from 'src/app/app-settings';
import { lastValueFrom } from 'rxjs';

import DataSource from 'devextreme/data/data_source';
import { DocumentManagementService } from 'src/app/core-services/document-management/document-management.service';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/core-services/authentication/authentication.service';
import { ConfigurationsService } from 'src/app/core-services/configurations/configurations.service';
import { ImportExportService } from '../../../services/import-export.service';
import { UtilityService } from 'src/app/core-services/utilities/utility.service';

@Component({
  selector: 'app-permitproductdetails',
  templateUrl: './permitproductdetails.component.html',
  styleUrl: './permitproductdetails.component.css'
})
export class PermitproductdetailsComponent implements OnInit {
  @Input() productGeneraldetailsfrm: FormGroup;
  @Input() permitProductsFrm: FormGroup;
  @Input() applicationGeneraldetailsfrm: FormGroup;
  @Input() permitProductsData: any;
  requireUnitPackData: boolean = false;
  isprodnextdisable: boolean;
  device_type_visible: boolean;
  status_id: any;
  response_data: any;
  configData: any;
  permitUploadedProductsData: any;
  trader_id: number;
  mistrader_id: number;
  dataGrid: DxDataGridComponent; printiframeUrl: any;
  isPermitproductsPopupVisible: boolean;
  isApprovedVisaproductsPopupVisible: boolean;
  registeredProductsData: any = {};
  approvedVisaProducts: any = {};
  isPermitproductsAddPopupVisible: boolean;
  confirmDataParam: any;
  unitOfMeasureData: any;
  premisesOtherDetailsRows: any;
  is_regulatedproducts: boolean;
  productCategoryData: any = {};
  deviceTypeData: any;
  packagingUnitsData: any;
  siUnitsData: any;
  weightsUnitData: any;
  currencyData: any;
  classificationData: any;
  commonNamesData: any;
  application_code: number;
  enabled_newproductadd: boolean;
  regulatory_subfunction_id: number;
  tracking_no: string;
  isReadOnly: boolean = false;
  isDosageReadOnly: boolean;
  dosageFormsData: any;
  regulatory_function_id: number;
  regulated_productstype_id: number;
  producttype_defination_id: number;
  proforma_currency_id: number;
  countries: any;
  loadingVisible: boolean;
  manufacturersData: any = {};
  isManufacturerSitePopupVisible: boolean = false;
  isproductManufacturerModalShow: boolean;
  isnewmanufacturerModalShow: boolean = false;
  addproductCommonNameModal: boolean;
  addProductParamsdetailsfrm: FormGroup;
  isFoodPermitProducts: boolean;
  isnewproductAddWinVisible: boolean;
  loading: boolean;
  enabled_productadd: boolean;
  isPermitVisaLicProductsAddPopupVisible: boolean;
  region: any;
  districts: any;
  app_resp: any;
  permit_product_id: number;
  regions: any;
  mis_url: string = AppSettings.mis_url;
  isInvoiceProductsUploadVisable: boolean;
  isApprovedVisaProductsUploadVisable: boolean;
  isProductCategoryPopupVisible: boolean;
  isUploadedInvoiceProductsWin: boolean;
  enabled_uploadproductadd: boolean;
  isreadOnlyProducts: boolean;
  isMedicinesProduct: boolean;
  permitProductMenuItems = [
    {
      text: "Action",
      icon: 'menu',
      items: [
        { text: "Preview/Edit Record", action: 'edit_record', icon: 'fa fa-edit' },
        { text: "Delete Record", action: 'delete_record', icon: 'fa fa-trash' }
      ]
    }
  ];
  permitApprovedVisaProductMenuItems = [
    {
      text: "Action",
      icon: 'menu',
      items: [
        { text: "Update Batch and Manufacturing Date(s)", action: 'edit_record', icon: 'fa fa-edit' },
        //{ text: "Delete Record", action: 'delete_record', icon: 'fa fa-trash' }
      ]
    }
  ];
  isVisaProductReadOnly: boolean;
  isVisaPackSizeProductReadOnly: boolean;
  consignee_sendertitle: string;
  manufacturerFrm: FormGroup;
  issenderreceiverSearchWinVisible: boolean;
  issenderreceiverAddWinVisible: boolean;
  storageConditionsData: any;
  product_resp: any;
  spinnerMessage: string;
  countryData: any;
  is_visaapplication: boolean;
  commonNameData: any;
  filesToUpload: Array<File> = [];
  printReportTitle: string;
  isPrintReportVisible: boolean = false;
  document_previewurl: any;
  data_record: any;
  isDocumentPreviewDownloadwin: boolean = false;
  is_brandreadonly: boolean = true;
  common_name_title: string = 'Common Name';
  productSubCategoryData: any;
  application_status_id: any;
  weightUnitData: any;
  document_type_id: number = 25;
  @Output() premitProductIdEvent = new EventEmitter();
  invoiceProductsUploadFrm: FormGroup;
  is_rawpackagingproduct_type: boolean;
  productnametitle: string;
  ammendReadOnly: boolean;
  constructor(private utilityService: UtilityService, private dmsService: DocumentManagementService, public fb: FormBuilder, public spinner: SpinnerVisibilityService, public configService: ConfigurationsService, public appService: ImportExportService, public router: Router, public formBuilder: FormBuilder, public config: ConfigurationsService, public toastr: ToastrService, public authService: AuthenticationService, public httpClient: HttpClient) {
    this.invoiceProductsUploadFrm = this.formBuilder.group({
      file: null,
      description: null,
      currency_id: null
    });

    this.manufacturerFrm = new FormGroup({
      id: new FormControl('', Validators.compose([])),
      name: new FormControl('', Validators.compose([Validators.required])),
      country_id: new FormControl('', Validators.compose([Validators.required])),
      region_id: new FormControl('', Validators.compose([])),
      district_id: new FormControl('', Validators.compose([])),
      email_address: new FormControl('', Validators.compose([])),
      postal_address: new FormControl('', Validators.compose([])),
      telephone_no: new FormControl('', Validators.compose([])),
      mobile_no: new FormControl('', Validators.compose([])),
      physical_address: new FormControl('', Validators.compose([]))
    });
    if (this.regulated_productstype_id == 2 || this.regulated_productstype_id == 7) {
      this.requireUnitPackData = true;
      this.isFoodPermitProducts = false;
      this.common_name_title = 'Generic Name';
    }
    else if (this.regulated_productstype_id == 1) {

      this.isFoodPermitProducts = true;
      this.requireUnitPackData = false;
    }
    else {

      this.isFoodPermitProducts = false;
      this.requireUnitPackData = false;
    }
    if (this.regulatory_subfunction_id == 78) {
      this.enabled_productadd = true;
      this.is_visaapplication = false;
    }
    else if (this.regulatory_subfunction_id == 81) {
      this.enabled_productadd = true;
      this.is_visaapplication = false;
    }

    else if (this.regulatory_subfunction_id == 82) {
      this.enabled_productadd = false;
      this.is_visaapplication = false;

    }
    else {
      this.enabled_productadd = true;
      this.is_visaapplication = true;
    }
    if (this.regulated_productstype_id == 2 || this.regulated_productstype_id == 7) {
      if (this.regulatory_subfunction_id != 83) {
        this.isDosageReadOnly = true;
      }

    }
    let user = this.authService.getUserDetails();
    this.trader_id = user.trader_id;
    this.mistrader_id = user.mistrader_id;
    this.addProductParamsdetailsfrm = new FormGroup({
      name: new FormControl('', Validators.compose([Validators.required])),
      description: new FormControl('', Validators.compose([Validators.required])),
      regulated_productstype_id: new FormControl('', Validators.compose([Validators.required])),
      tablename: new FormControl('', Validators.compose([Validators.required]))

    });
    //check the product types definations 
    this.is_rawpackagingproduct_type = false;
    this.productnametitle = "Product Name";
    
    if (this.producttype_defination_id == 2) {
      this.is_rawpackagingproduct_type = true;
      this.productnametitle = "Item Name";

    }

    if (this.regulatory_subfunction_id == 79 || this.regulatory_subfunction_id == 85) {
      this.ammendReadOnly = true;
    }
    else {
      this.ammendReadOnly = false;
    }


  }
  ngOnInit(): void {

    this.onLoadConfirmationData()
    this.onLoadcommonNameData();
    this.onLoaddosageForms();

    this.onLoadPermitProductsData();
    this.onLoadUnitOfMeasureData();
    this.onLoadproductPurposeData();
    this.onLoadCountryData();
    this.onLoadWeightData();
    this.onLoadStorageConditions();
    this.onLoadCurrencyData();
  }


  onProductCategoryCboSelect($event) {

    this.onLoadproductSubCategory($event.selectedItem.id);

  }
  onLoadproductSubCategory(product_category_id) {
    var data = {
      table_name: 'par_subproduct_categories',
      product_category_id: product_category_id
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.productSubCategoryData = data;
        });
  }


  onLoadConfirmationData() {
    var data = {
      table_name: 'par_confirmations',
    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.confirmDataParam = this.data_record.data;

          }
        });
  }

  onLoadUnitOfMeasureData() {
    var data = {
      table_name: 'par_unit_of_measure',
    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.unitOfMeasureData = this.data_record.data;

          }
        });
  }

  productPurposeData: any;
  onLoadproductPurposeData() {
    var data = {
      table_name: 'par_permit_product_purposes',
    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.productPurposeData = this.data_record.data;

          }
        });
  }

  onLoadCurrencyData() {
    var data = {
      table_name: 'par_currencies',
    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.currencyData = this.data_record.data;

          }
        });
  }

  onLoadStorageConditions() {
    var data = {
      table_name: 'par_storage_conditions',
    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.storageConditionsData = this.data_record.data;

          }
        });
  }

  onLoadCountryData() {
    var data = {
      table_name: 'par_countries',
    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.countries = this.data_record.data;

          }
        });
  }
  onLoadWeightData() {
    var data = {
      table_name: 'par_si_units',
    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.weightUnitData = this.data_record.data;

          }
        });
  }
  onAddNewGenericDetails() {


    this.addproductCommonNameModal = true;
  } onLoaddosageForms() {
    var data = {
      table_name: 'par_dosage_forms'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          // this.dosageFormsData = data;
          this.dosageFormsData = new DataSource({
            paginate: true,
            pageSize: 200,
            store: {
              type: "array",
              data: data,
              key: "id"
            }
          });
        });
  }
  funcPermitsProductPreviewedit(data) {
    this.permitProductsFrm.patchValue(data);
    //load the personnel qualifiations
    //  this.permitProductsFrm.get('currency_id')?.setValue(this.proforma_currency_id);
    this.permit_product_id = data.id;
    this.premitProductIdEvent.emit(this.permit_product_id);

    this.isPermitproductsPopupVisible = true;

  }

  funcpopHeight(percentage_height) {
    return window.innerHeight * percentage_height / 100;
  }
  funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width / 100;
  }
  permitProductsActionColClick(e, data) {
    var action_btn = e.itemData;
    if (action_btn.action === 'edit_record') {
      this.funcPermitsProductPreviewedit(data.data);
      // this.funcVisaLisPermitsProductPreviewedit(data);
    }
    else if (action_btn.action == 'delete_record') {
      this.funcDeletePermitsProducts(data.data);
    }
  }
  funcSelectApprovedVisaProduct(data) {
    this.isVisaProductReadOnly = true;
    if (this.regulated_productstype_id == 2 || this.regulated_productstype_id == 4 || this.regulated_productstype_id == 7) {
      this.isVisaPackSizeProductReadOnly = true;
    }
    // this.isVisaPackSizeProductReadOnly = false;
    this.permitProductsFrm.reset();
    let permitprod_recommendation_id = data.permitprod_recommendation_id;
    let visabalance_quantity = data.visabalance_quantity;


    if (permitprod_recommendation_id == 4 || permitprod_recommendation_id == 3) {
      this.toastr.success('The selected product is not accepted for Importation as a result of ' + data.permitprod_recommendation_remarks, 'Alert');
      return;
    }
    if (visabalance_quantity == 0 || visabalance_quantity < 0) {
      this.toastr.success('The Approved Visa Product Quantity has been depleted.', 'Alert');
      return;
    }
    this.permitProductsFrm.patchValue(data);
    this.permit_product_id = data.id;
    this.premitProductIdEvent.emit(this.permit_product_id);
    //  this.isPermitproductsAddPopupVisible = true;
    this.isPermitVisaLicProductsAddPopupVisible = true;
    if (this.regulated_productstype_id == 2 || this.regulated_productstype_id == 7) {

      this.isMedicinesProduct = true;
    } else {
      this.isMedicinesProduct = false;
    }

  }
  funcREmoveProductDetails(data) {
    this.funcDeletePermitsProducts(data);

  }
  funcUpdateLicenseVisaprod(data) {
    this.funcVisaLisPermitsProductPreviewedit(data);

  } funcVisaLisPermitsProductPreviewedit(data) {

    this.permitProductsFrm.patchValue(data);
    //load the personnel qualifiations
    // this.permitProductsFrm.get('currency_id')?.setValue(this.proforma_currency_id);
    this.isPermitVisaLicProductsAddPopupVisible = true;
    this.isVisaProductReadOnly = true;

    if (this.regulated_productstype_id == 2 || this.regulated_productstype_id == 7) {

      this.isMedicinesProduct = true;
    } else {
      this.isMedicinesProduct = false;
    }

  }
  funcDeletePermitsProducts(app_data) {

    let record_id = app_data.id;
    /*
    this.modalServ.openDialog(this.viewRef, {
      title: 'Do you want remove the selected Permit Product with ' + app_data.brand_name + '?',
      childComponent: '',
      settings: {
        closeButtonClass: 'fa fa-close'
      },
      actionButtons: [{
        text: 'Yes',
        buttonClass: 'btn btn-danger',
        onAction: () => new Promise((resolve: any, reject: any) => {
          this.spinner.show();
          this.appService.onDeletePermitProductsDetails(record_id, 'wb_permits_products', this.application_code, 'Permit products Details')
            .subscribe(
              response => {
 
                this.spinner.hide();
                let response_data = response.json();
                if (response_data.success) {
 
                  this.onLoadPermitProductsData(this.application_code);
                  this.toastr.success(response_data.message, 'Response');
                }
                else {
 
                  this.toastr.success(response_data.message, 'Response');
 
                }
 
              },
              error => {
                this.loading = false;
              });
          resolve();
        })
      }, {
        text: 'no',
        buttonClass: 'btn btn-default',
        onAction: () => new Promise((resolve: any) => {
          resolve();
        })
      }
      ]
    });
*/
  }



  onLoadPermitProductsData(filter_params = { application_status_id: this.application_status_id }) {
    this.spinnerShow('Loading Information...........');
    this.appService.getPermitsOtherDetails(filter_params, 'getApplicantPermitProductsDetails')
      .subscribe(
        data => {

          this.data_record = data;
          // console.log(this.data_record);
          if (this.data_record.success) {
            this.permitProductsData = this.data_record.data;
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
  // onLoadPermitProductsData(application_code) {
  //   this.spinner.show();
  //   this.appService.getPermitsOtherDetails({ 'application_code': application_code }, 'getPermitProductsDetails')
  //     .subscribe(
  //       data => {
  //         if (data.success) {

  //           this.permitProductsData = data.data;
  //           if (this.permitProductsData.length > 0) {
  //             this.isprodnextdisable = false;
  //           }
  //           else {
  //             this.isprodnextdisable = true;
  //           }

  //         }
  //         else {
  //           this.toastr.success(data.message, 'Alert');
  //         }
  //         this.spinner.hide();
  //       },
  //       error => {
  //         return false
  //       });
  // }
  onRegisteredProductGridToolbar(e) {
    if (this.regulated_productstype_id == 2 || this.regulated_productstype_id == 7) {
      if (this.regulatory_subfunction_id == 81 || this.regulatory_subfunction_id == 83) {
        this.enabled_newproductadd = true;
      } else {
        this.enabled_newproductadd = false;

      }
    }
    e.toolbarOptions.items.unshift({
      location: 'before',
      widget: 'dxButton',
      options: {
        text: 'Add New Products',
        type: 'default',
        icon: 'fa fa-plus',
        visible: this.enabled_newproductadd,
        onClick: this.funAddNewPermitProducts.bind(this)
      }
    }, {
      location: 'after',
      widget: 'dxButton',
      options: {
        icon: 'refresh',
        onClick: this.refreshDataGrid.bind(this)
      }
    });

  } refreshDataGrid() {
    //  this.dataGrid.instance.refresh();
  }
  funAddNewPermitProducts() {

    this.permitProductsFrm.reset();
    this.isPermitproductsAddPopupVisible = true;
    this.is_brandreadonly = false;
  }

  funcSelectRegisteredProduct(data) {
    this.permitProductsFrm.reset();
    
    let validitystatus_id = data.data.validity_status_id;
    let retentionstatus_id = data.data.retentionstatus_id;

    if (this.regulatory_subfunction_id == 12 || this.regulatory_subfunction_id == 81 || this.regulatory_subfunction_id == 14 || this.regulatory_subfunction_id == 83) {

      this.permitProductsFrm.get('currency_id')?.setValue(this.proforma_currency_id);
      this.isPermitproductsAddPopupVisible = true;
      this.permitProductsFrm.get('product_id')?.setValue(data.data.product_id);
      this.permitProductsFrm.get('brand_name')?.setValue(data.data.brand_name);

      this.permitProductsFrm.get('product_strength')?.setValue(data.data.product_strength);
      this.permitProductsFrm.get('common_name_id')?.setValue(data.data.common_name_id);
      this.permitProductsFrm.get('prodcertificate_no')?.setValue(data.data.certificate_no);
      this.permitProductsFrm.get('product_category_id')?.setValue(data.data.product_category_id);
      this.permitProductsFrm.get('productphysical_description')?.setValue(data.data.productphysical_description);
      this.permitProductsFrm.get('manufacturer_name')?.setValue(data.data.manufacturer_name);
      this.permitProductsFrm.get('manufacturer_id')?.setValue(data.data.manufacturer_id);
      this.permitProductsFrm.get('country_oforigin_id')?.setValue(data.data.country_oforigin_id);
      if (this.regulated_productstype_id == 2 || this.regulated_productstype_id == 7) {
        if (this.regulatory_subfunction_id == 81) {
          this.isreadOnlyProducts = false;

        }
        else {
          this.isreadOnlyProducts = true;
          if (data.data.dosage_form_id > 0) {
            this.isReadOnly = true;

          }

        }



      }
      else {

        this.isreadOnlyProducts = true;
      }
      this.toastr.success('Product Selection', 'The following product has been selected: ' + data.data.brand_name);

    }
    else {
      //validate the datasets
      if (validitystatus_id != 2) {
        this.toastr.error('Product Registration Alert', 'The product must be registered, confirm the registration status or submit Permit as a special case application.');
        return;

      } else if (retentionstatus_id == 2) {
        this.toastr.error('Product Retention Payment Alert', 'The selected product has a pending retention payment, pay the pending retention or contact Authority for further guidelines.');
        return;
      }
      else {
        this.permitProductsFrm.get('currency_id')?.setValue(this.proforma_currency_id);
        this.isPermitproductsAddPopupVisible = true;
        this.permitProductsFrm.get('product_id')?.setValue(data.data.product_id);
        this.permitProductsFrm.get('brand_name')?.setValue(data.data.brand_name);

        this.permitProductsFrm.get('prodcertificate_no')?.setValue(data.data.certificate_no);

        this.permitProductsFrm.get('product_strength')?.setValue(data.data.product_strength);
        this.permitProductsFrm.get('productphysical_description')?.setValue(data.data.productphysical_description);


        this.permitProductsFrm.get('common_name_id')?.setValue(data.data.common_name_id);
        this.permitProductsFrm.get('product_category_id')?.setValue(data.data.product_category_id);

        this.permitProductsFrm.get('manufacturer_name')?.setValue(data.data.manufacturer_name);
        this.permitProductsFrm.get('manufacturer_id')?.setValue(data.data.manufacturer_id);
        this.permitProductsFrm.get('country_oforigin_id')?.setValue(data.data.country_oforigin_id);

        this.toastr.success('Product Selection', 'The following product has been selected: ' + data.data.brand_name);

      }
    }
  }
  onLoadcommonNameData() {
    var data = {
      table_name: 'par_common_names',

    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.commonNameData = new DataSource({
            paginate: true,
            pageSize: 200,
            store: {
              type: "array",
              data: data,
              key: "id"
            }
          });
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
  } onSaveNewGenericDetails() {
    this.addProductParamsdetailsfrm.get('tablename')?.setValue('par_common_names')
    this.addProductParamsdetailsfrm.get('regulated_productstype_id')?.setValue(this.regulated_productstype_id);
    this.utilityService.onsaveApplicationUniformDetails('', this.addProductParamsdetailsfrm.value, 'onsaveProductConfigData')
      .subscribe(
        response => {
          this.product_resp = response;
          //the details 
          if (this.product_resp.success) {
            this.onLoadcommonNameData();

            this.addproductCommonNameModal = false;
            this.permitProductsFrm.get('common_name_id')?.setValue(this.product_resp.record_id);

            this.toastr.success(this.product_resp.message, 'Response');

          } else {
            this.toastr.error(this.product_resp.message, 'Alert');
          }
          this.spinner.hide();
        },
        error => {
          this.toastr.error('Error Occurred', 'Alert');
        });

  }
  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

  funcDownloadUploadedDocuments(data) {

    this.premitProductIdEvent.emit(data.id);
    this.isDocumentPreviewDownloadwin = true;

  }
  private prepareIMPSave(): any {
    let input = new FormData();
    const files: Array<File> = this.filesToUpload;
    // input.append('file', this.uploadpaymentdetailsfrm.get('file')?.value);
    for (let i = 0; i < files.length; i++) {
      input.append("file", files[i], files[i]['name']);
    }
    input.append('brand_name', this.permitProductsFrm.get('brand_name')?.value);
    input.append('product_category_id', this.permitProductsFrm.get('product_category_id')?.value);
    input.append('product_batch_no', this.permitProductsFrm.get('product_batch_no')?.value);
    input.append('product_strength', this.permitProductsFrm.get('product_strength')?.value);
    input.append('product_manufacturing_date', this.permitProductsFrm.get('product_manufacturing_date')?.value);
    input.append('product_expiry_date', this.permitProductsFrm.get('product_expiry_date')?.value);
    input.append('country_oforigin_id', this.permitProductsFrm.get('country_oforigin_id')?.value);


    input.append('unit_price', this.permitProductsFrm.get('unit_price')?.value);
    input.append('currency_id', this.permitProductsFrm.get('currency_id')?.value);
    input.append('packaging_unit_id', this.permitProductsFrm.get('packaging_unit_id')?.value);
    input.append('quantity', this.permitProductsFrm.get('quantity')?.value);
    input.append('laboratory_no', this.permitProductsFrm.get('laboratory_no')?.value);
    input.append('regulated_prodpermit_id', this.permitProductsFrm.get('regulated_prodpermit_id')?.value);
    input.append('prodcertificate_no', this.permitProductsFrm.get('prodcertificate_no')?.value);
    input.append('product_id', this.permitProductsFrm.get('product_id')?.value);
    input.append('unitpack_unit_id', this.permitProductsFrm.get('unitpack_unit_id')?.value);
    input.append('unitpack_size', this.permitProductsFrm.get('unitpack_size')?.value);
    input.append('visa_quantity', this.permitProductsFrm.get('visa_quantity')?.value);
    input.append('total_weight', this.permitProductsFrm.get('total_weight')?.value);
    input.append('weights_units_id', this.permitProductsFrm.get('weights_units_id')?.value);
    input.append('id', this.permitProductsFrm.get('id')?.value);
    input.append('device_type_id', this.permitProductsFrm.get('device_type_id')?.value);
    input.append('is_regulated_product', this.permitProductsFrm.get('is_regulated_product')?.value);
    input.append('productphysical_description', this.permitProductsFrm.get('productphysical_description')?.value);
    input.append('common_name_id', this.permitProductsFrm.get('common_name_id')?.value);
    input.append('manufacturer_id', this.permitProductsFrm.get('manufacturer_id')?.value);
    input.append('manufacturer_name', this.permitProductsFrm.get('manufacturer_name')?.value);
    return input;
  }

  onsavePermitProductdetails() {
    //validate the visa Quoantity
    if (this.regulatory_subfunction_id == 82) {
      let visa_quantity = this.permitProductsFrm.get('visa_quantity')?.value;
      let quantity = this.permitProductsFrm.get('quantity')?.value;
      let product_id = this.permitProductsFrm.get('id')?.value;
      if (product_id < 0) {
        if (quantity > visa_quantity) {
          this.toastr.error("The product's quantities should be equal or less that the Visa Application Product Details. Visa Product Quantity is " + visa_quantity, 'Alert');
          return;
        }
      }
    }
    const invalid = [];
    const controls = this.permitProductsFrm.controls;

    for (const name in controls) {
      if (controls[name].invalid) {
        this.toastr.error('Fill In All Mandatory fields with (*), missing value on ' + name.replace('_id', ''), 'Alert');
        return;
      }
    }

    if (this.permitProductsFrm.invalid) {
      return;
    }
    this.spinner.show();
    this.appService.onsavePermitProductdetails(this.application_code, this.permitProductsFrm.value, this.tracking_no, 'onSaveApplicantPermitProductsDetails')
      .subscribe(
        response => {
          this.app_resp = response;
          //the details 
          this.spinner.hide();

          if (this.app_resp.success) {
            // this.permitProductsFrm.reset();
            this.isPermitproductsAddPopupVisible = false;
            this.isPermitproductsPopupVisible = false;
            this.isPermitVisaLicProductsAddPopupVisible = false;
            this.onLoadPermitProductsData();
            this.permit_product_id = this.app_resp.record_id;
            this.isPermitVisaLicProductsAddPopupVisible = false;
            this.premitProductIdEvent.emit(this.permit_product_id);

            this.toastr.success(this.app_resp.message, 'Response');
          } else {
            this.toastr.error(this.app_resp.message, 'Alert');
          }
        },
        error => {
          this.loading = false;
          this.spinner.hide();

        });
  }

  onupdatePermitProductdetails() {
    if (this.permitProductsFrm.invalid) {
      return;
    }
    this.spinner.show();
    this.appService.onsavePermitProductdetails(this.application_code, this.permitProductsFrm.value, this.tracking_no, 'savePermitProductdetails')
      .subscribe(
        response => {
          this.app_resp = response;
          //the details 
          this.spinner.hide();

          if (this.app_resp.success) {

            this.onLoadPermitProductsData();
            this.toastr.success(this.app_resp.message, 'Response');
            this.isPermitproductsAddPopupVisible = false;

          } else {
            this.toastr.error(this.app_resp.message, 'Alert');
          }
        },
        error => {
          this.loading = false;
        });
  }
  onPermitVisaLicenseProductGridToolbar(e) {


    //regulatory_subfunction_id
    e.toolbarOptions.items.unshift({
      location: 'before',
      widget: 'dxButton',
      options: {
        text: 'Add Visa(Approved) Products',
        type: 'default',
        icon: 'fa fa-plus',
        onClick: this.funAddApprovedVisaPermitProducts.bind(this)

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
  onApprovedVisaProductGridToolbar(e) {


    //regulatory_subfunction_id
    e.toolbarOptions.items.unshift({
      location: 'before',
      widget: 'dxButton',
      options: {
        text: 'Download Upload Form(Template)',
        type: 'default',
        icon: 'fa fa-upload',
        onClick: this.funcDownloadApprovVisaProductsProducts.bind(this)

      }
    }, {
      location: 'before',
      widget: 'dxButton',
      options: {
        text: 'Upload Products',
        type: 'default',
        icon: 'fa fa-upload',
        onClick: this.funcUploadApprovVisaProductsProducts.bind(this)
      }
    });

  }

  funcUploadOptionProducts() {

    this.onpermitUploadedProductsData();

  }
  funcDownloadOptionProducts() {

    let report_url = this.mis_url + 'reports/onDownloadImportInvoiceProductstemplate?application_code=' + this.application_code + '&regulatory_subfunction_id=' + this.regulatory_subfunction_id + '&regulated_productstype_id=' + this.regulated_productstype_id;
    this.funcGenerateRrp(report_url, "Download Invoice Template");

  }
  funcDownloadApprovVisaProductsProducts() {

    let report_url = this.mis_url + 'reports/funcDownloadApprovVisaProductsProducts?application_code=' + this.application_code + '&regulatory_subfunction_id=' + this.regulatory_subfunction_id + '&regulated_productstype_id=' + this.regulated_productstype_id;
    this.funcGenerateRrp(report_url, "Download Invoice Template");

  }

  funcGenerateRrp(report_url, title) {

    this.printiframeUrl = this.configService.returnReportIframe(report_url);
    this.printReportTitle = title;
    this.isPrintReportVisible = true;

  }
  funcSynchronisedUploadedProducts() {
    if (this.permitUploadedProductsData.length == 0) {
      this.toastr.success('No Uploaded Invoice Products Found', 'Response');

      return;
    }
    /*
    this.modalServ.openDialog(this.viewRef, {
      title: 'Do you want to syncronise/Save the uploaded Products()',
      childComponent: '',
      settings: {
        closeButtonClass: 'fa fa-close'
      },
      actionButtons: [{
        text: 'Yes',
        buttonClass: 'btn btn-danger',
        onAction: () => new Promise((resolve: any, reject: any) => {
          this.spinner.show();
          this.appService.onSynchronisedUploadedProducts('wb_uploadpermits_products', this.application_code, 'Permit products Details')
            .subscribe(
              response => {
 
                this.spinner.hide();
                let response_data = response.json();
                if (response_data.success) {
                  this.onLoadpermitUploadedProductsData(this.application_code);
                  this.isUploadedInvoiceProductsWin = false;
 
                  this.onLoadPermitProductsData(this.application_code);
                  this.toastr.success(response_data.message, 'Response');
                }
                else {
                  this.isUploadedInvoiceProductsWin = false;
 
                  this.toastr.success(response_data.message, 'Response');
 
                }
 
              },
              error => {
                this.loading = false;
              });
          resolve();
        })
      }, {
        text: 'no',
        buttonClass: 'btn btn-default',
        onAction: () => new Promise((resolve: any) => {
          this.isUploadedInvoiceProductsWin = true;
 
          resolve();
        })
      }
      ]
    });
*/

  }
  funcClearUploadedProducts() {
    if (this.permitUploadedProductsData.length == 0) {
      this.toastr.success('No Uploaded Invoice Products Found', 'Response');

      return;
    }
    /*
        this.modalServ.openDialog(this.viewRef, {
          title: 'Do you want remove the uploaded Products()',
          childComponent: '',
          settings: {
            closeButtonClass: 'fa fa-close'
          },
          actionButtons: [{
            text: 'Yes',
            buttonClass: 'btn btn-danger',
            onAction: () => new Promise((resolve: any, reject: any) => {
              this.spinner.show();
              this.appService.onDeletePermitUploadedProductsDetails('wb_uploadpermits_products', this.application_code, 'Permit products Details')
                .subscribe(
                  response => {
    
                    this.spinner.hide();
                    let response_data = response.json();
                    if (response_data.success) {
                      this.onLoadpermitUploadedProductsData(this.application_code);
                      this.toastr.success(response_data.message, 'Response');
                    }
                    else {
    
                      this.toastr.success(response_data.message, 'Response');
    
                    }
    
                  },
                  error => {
                    this.loading = false;
                  });
              resolve();
            })
          }, {
            text: 'no',
            buttonClass: 'btn btn-default',
            onAction: () => new Promise((resolve: any) => {
              this.isUploadedInvoiceProductsWin = true;
              resolve();
            })
          }
          ]
        });
    */

  }
  funcUploadOptionProductsWin() {

    this.isInvoiceProductsUploadVisable = true;

  }
  funcUploadApprovVisaProductsProducts() {

    this.isApprovedVisaProductsUploadVisable = true;

  }

  onPermitUploadProductGridToolbar(e) {

    //regulatory_subfunction_id
    e.toolbarOptions.items.unshift({
      location: 'before',
      widget: 'dxButton',
      options: {
        text: 'Download Upload Form(Template)',
        type: 'default',
        icon: 'fa fa-upload',
        onClick: this.funcDownloadOptionProducts.bind(this)

      }
    }, {
      location: 'before',
      widget: 'dxButton',
      options: {
        text: 'Upload Products',
        type: 'default',
        icon: 'fa fa-upload',
        onClick: this.funcUploadOptionProductsWin.bind(this)
      }
    }, {
      location: 'before',
      widget: 'dxButton',
      options: {
        text: 'Synchronised Validated Products',
        type: 'success',
        icon: 'fa fa-upload',
        onClick: this.funcSynchronisedUploadedProducts.bind(this)
      }
    }, {
      location: 'after',
      widget: 'dxButton',
      options: {
        text: 'Clear Uploaded Products',
        type: 'danger',
        icon: 'fa fa-upload',
        onClick: this.funcClearUploadedProducts.bind(this)
      }
    }, {
      location: 'after',
      widget: 'dxButton',
      options: {
        icon: 'refresh',
        onClick: this.onpermitUploadedProductsData.bind(this)
      }
    });

  }
  onpermitUploadedProductsData() {
    this.onLoadpermitUploadedProductsData(this.application_code);
  }

  onLoadpermitUploadedProductsData(application_code) {
    this.spinner.show();
    this.appService.getPermitsOtherDetails({ 'application_code': application_code }, 'getPermitUploadedProductsDetails')
      .subscribe(
        data => {
          if (data.success) {
            this.permitUploadedProductsData = data.data;
            if (this.permitUploadedProductsData.length > 0) {
              this.isprodnextdisable = false;
            }
            else {
              this.isprodnextdisable = true;
            }

            this.isUploadedInvoiceProductsWin = true;;

          }
          else {
            this.toastr.success(data.message, 'Alert');
          }
          this.spinner.hide();
        },
        error => {
          return false
        });
  }
  onPermitProductGridToolbar(e) {
    // if (this.regulated_productstype_id == 2 || this.regulated_productstype_id == 7) {

    //   this.enabled_uploadproductadd = false;
    // }
    // else {

    //   this.enabled_uploadproductadd = true;
    // }
    // if (this.regulatory_subfunction_id == 78) {
    //   this.enabled_uploadproductadd = false;
    // }
    //regulatory_subfunction_id
    e.toolbarOptions.items.unshift({
      location: 'before',
      widget: 'dxButton',
      options: {
        text: 'Add Permit Products',
        type: 'default',
        icon: 'fa fa-plus',
        visible: this.enabled_productadd,
        onClick: this.funAddPermitProducts.bind(this)

      }
    }, {
      location: 'before',
      widget: 'dxButton',
      options: {
        text: 'Upload Permit Products(Templated Option)',
        type: 'success',
        icon: 'fa fa-upload',
        visible: this.enabled_uploadproductadd,
        onClick: this.onpermitUploadedProductsData.bind(this)
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
  funAddPermitProducts() {
    //reset the permit form
    this.permitProductsFrm.reset();

    this.isPermitproductsPopupVisible = true;
    // this.OnReloadPermitProducts();
  }
  funUploadPermitProducts() {

    this.OnReloadPermitProducts();
    this.isPermitproductsPopupVisible = true;

  }

  funAddApprovedVisaPermitProducts() {
    this.spinner.show();
    this.appService.getPermitsOtherDetails({ 'application_code': this.application_code }, 'getApprrovedVisaProducts')
      .subscribe(
        data => {
          if (data.success) {

            this.approvedVisaProducts = data.data;
            this.isApprovedVisaproductsPopupVisible = true;

          }
          else {
            this.toastr.success(data.message, 'Alert');
          }
          this.spinner.hide();
        },
        error => {
          return false
        });


  }

  OnReloadPermitProducts() {
    let me = this;

    if (!this.registeredProductsData) {
        this.registeredProductsData = {};  // Initialize it if it's undefined
    }

    this.registeredProductsData.store = new CustomStore({
      load: function (loadOptions: any) {
        let params = '?';
        params += 'skip=' + (loadOptions.skip || 0);
        params += '&take=' + (loadOptions.take || 10);  // Default values
        
        let headers = new HttpHeaders({
          "Accept": "application/json",
          "Authorization": "Bearer " + me.authService.getAccessToken(),
        });

        me.configData = {
          headers: headers,
          params: {
            skip: loadOptions.skip, 
            take: loadOptions.take, 
            searchValue: loadOptions.filter,
            table_name: 'registered_products',
            regulatory_function_id: me.regulatory_function_id,
            regulatory_subfunction_id: me.regulatory_subfunction_id,
            regulated_productstype_id: me.regulated_productstype_id,
            trader_id: me.trader_id,
            mistrader_id: me.mistrader_id
          }
        };

        return me.httpClient.get(AppSettings.base_url + 'api/import-export/getRegisteredNonRegisteredProducts', me.configData)
          .toPromise()
          .then((data: any) => {
            return {
              data: data.data,
              totalCount: data.totalCount
            };
          })
          .catch(error => {
            throw 'Data Loading Error';
          });
      }
    });
}


  onAddNewProductinformation() {

    if (this.productGeneraldetailsfrm.invalid) {
      return;
    }
    this.productGeneraldetailsfrm.get('regulated_productstype_id')?.setValue(this.regulated_productstype_id);
    let brand_name = this.productGeneraldetailsfrm.get('brand_name')?.value;
    this.spinner.show();
    this.appService.onAddNewProductinformation(this.productGeneraldetailsfrm.value, 'onAddNewProductinformation')
      .subscribe(
        response => {
          this.product_resp = response;

          if (this.product_resp.success) {

            //reload prodct details
            this.isnewproductAddWinVisible = false;
            this.OnReloadPermitProducts();
            this.permitProductsFrm.get('currency_id')?.setValue(this.proforma_currency_id);
            this.isPermitproductsAddPopupVisible = true;
            this.permitProductsFrm.get('brand_name')?.setValue(brand_name);
            this.permitProductsFrm.get('product_id')?.setValue(this.product_resp.record_id);

            this.toastr.success(this.product_resp.message, 'Response');
          } else {
            this.toastr.error(this.product_resp.message, 'Alert');
          }
          this.spinner.hide();
        },
        error => {
          this.loading = false;
        });
  }

  onAddManufacturerDetails() {
    this.spinner.show();
    let manufacturer_name = this.manufacturerFrm.get('name')?.value;

    this.appService.onAddManufacturingSite('tra_manufacturer_info', this.manufacturerFrm.value, 'saveManufacturerDetails')
      .subscribe({
        next: (response) => {
          this.product_resp = response;

          if (this.product_resp.success) {
            this.isnewmanufacturerModalShow = false;
            this.isproductManufacturerModalShow = false;

            let manufacturer_id = this.product_resp.record_id; // Ensure API sends this value

            if (manufacturer_id) {
              this.permitProductsFrm.patchValue({
                manufacturer_name: manufacturer_name,
                manufacturer_id: manufacturer_id
              });

              this.isManufacturerSitePopupVisible = false;
              this.toastr.success(this.product_resp.message, 'Success');
            } else {
              this.toastr.warning('Manufacturer saved, but ID not returned.', 'Warning');
            }
          } else {
            this.toastr.error(this.product_resp.message, 'Alert');
          }
        },
        error: (error) => {
          console.error('Error Occurred:', error);
          this.toastr.error('An error occurred while saving manufacturer details.', 'Error');
        },
        complete: () => {
          this.spinner.hide();
        }
      });
  }

  funcSearchManufacturingSite() {
    this.isManufacturerSitePopupVisible = true;
    const me = this;

    this.manufacturersData.store = new CustomStore({
      load: async function (loadOptions: any) {
      // console.log(loadOptions);

        // Extract pagination parameters safely
        const skip = loadOptions.skip ?? 0;
        const take = loadOptions.take ?? 50;

        // Extract search filter properly
        let searchValue = '';
        if (Array.isArray(loadOptions.filter) && loadOptions.filter.length > 0) {
          searchValue = loadOptions.filter[2] || ''; // Adjust index based on actual filter structure
        }

        // Set up request headers
        const headers = new HttpHeaders({
          "Accept": "application/json",
          "Authorization": "Bearer " + me.authService.getAccessToken(),
        });

        // API request configuration
        const configData = {
          headers,
          params: { skip, take, searchValue },
        };

        try {
          const response: any = await lastValueFrom(
            me.httpClient.get(AppSettings.base_url + '/api/import-export/onLoadManufacturingSitesDetails', configData)
          );

          return {
            data: response.data || [],
            totalCount: response.totalCount || 0
          };
        } catch (error) {
          console.error('Data Loading Error', error);
          throw 'Data Loading Error';
        }
      }
    });
  }

  onsearchProductCategory() {

    this.isProductCategoryPopupVisible = true;
    var me = this;


    this.productCategoryData.store = new CustomStore({
      load: function (loadOptions: any) {
        // console.log(loadOptions)
        var params = '?';
        params += 'skip=' + loadOptions.skip;
        params += '&take=' + loadOptions.take;//searchValue
        var headers = new HttpHeaders({
          "Accept": "application/json",
          "Authorization": "Bearer " + me.authService.getAccessToken(),
        });

        me.configData = {
          headers: headers,
          params: { skip: loadOptions.skip, take: loadOptions.take, searchValue: loadOptions.filter }
        };
        return me.httpClient.get(AppSettings.base_url + '/api/import-export/onGetRegulatedProductCategory', me.configData)
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

  funcAddManufacturerSite() {
    this.isnewmanufacturerModalShow = true;
    this.manufacturerFrm.reset();
  }

  funcProductCategory() {

  }
  funcSelectManufacturer(data) {
    let data_resp = data.data;
    this.permitProductsFrm.patchValue({ manufacturer_name: data_resp.manufacturer_name, manufacturer_id: data_resp.manufacturer_id, country_oforigin_id: data_resp.country_id });

    this.isManufacturerSitePopupVisible = false;

  }

  // funcSelectProductCategory(data) {
  //   let data_resp = data.data;
  //   this.permitProductsFrm.patchValue({ regulated_product_category: data_resp.regulated_product_category, regulated_product_category_id: data_resp.regulated_product_category_id, });

  //   this.isProductCategoryPopupVisible = false;
  // }

  funcSelectProductCategory(data) {
    let data_resp = data.data;

    // Prioritize values in order: hscodessubheading -> hscodesheading -> hscodechapters
    let selectedCategory = data_resp.hscodessubheading ||
      data_resp.hscodesheading ||
      data_resp.hscodechapters || '';

    // Patch the form with selected values
    this.permitProductsFrm.patchValue({
      regulated_product_category: selectedCategory,
      regulated_product_category_id: data_resp.regulated_product_category_id
    });

    // Close the popup
    this.isProductCategoryPopupVisible = false;
  }

  onManufacturerPreparing(e) {
    this.functDataGridToolbar(e, this.funcAddManufacturerSite, 'Manufacturers');
  }
  // onProductCategoryPreparing(e) {
  //   this.functDataGridToolbar(e, this.funcProductCategory, 'product_category');
  // } 


  onCoutryCboSelect($event) {


    this.onLoadRegions($event.selectedItem.id);

  } onLoadRegions(country_id) {

    var data = {
      table_name: 'par_regions',
      country_id: country_id
    };
    this.config.onLoadConfigurationData(data)
      //.pipe(first())
      .subscribe(
        data => {

          this.regions = data;
        },
        error => {
          return false
        });
  }
  onRegionsCboSelect($event) {

    this.onLoadDistricts($event.selectedItem.id);

  }
  onLoadDistricts(region_id) {
    var data = {
      table_name: 'par_districts',
      region_id: region_id
    };
    this.config.onLoadConfigurationData(data)
      //.pipe(first())
      .subscribe(
        data => {
          this.districts = data
        },
        error => {
          return false;
        });
  }
  onPermitsProductsTabCLick(e: any) {

    console.log(e.itemIndex);

  }
  onVisaProductCellPrepared(e) {
    if (e.rowType === "data" && e.column.dataField === "status_name") {
      let visabalance_quantity = e.data.visabalance_quantity;

      if (visabalance_quantity > 0) {
        e.cellElement.style.color = 'white';
        e.cellElement.style.backgroundColor = '#64B0F2';
      }
      else {
        e.cellElement.style.color = 'white';
        e.cellElement.style.backgroundColor = '#FF5D48';

      }
    }
    if (e.rowType === "data" && e.column.dataField === "permitprod_recommendation") {
      let permitprod_recommendation_id = e.data.permitprod_recommendation_id;
      if (permitprod_recommendation_id == 3 || permitprod_recommendation_id == 4) {
        e.cellElement.style.color = 'white';
        e.cellElement.style.backgroundColor = '#F14236';
      }
      else {
        e.cellElement.style.color = 'white';
        e.cellElement.style.backgroundColor = '#259745';

      }
    }

  }


  public prepareUploadSave(): any {
    let input = new FormData();
    const files: Array<File> = this.filesToUpload;
    // input.append('file', this.uploadpaymentdetailsfrm.get('file')?.value);
    for (let i = 0; i < files.length; i++) {
      input.append("file", files[i], files[i]['name']);
    }

    input.append('description', this.invoiceProductsUploadFrm.get('description')?.value);
    input.append('currency_id', this.invoiceProductsUploadFrm.get('currency_id')?.value);

    return input;
  }

  onunInvoiceProductsUpload() {
    if (this.invoiceProductsUploadFrm.get('currency_id')?.value == '') {
      this.toastr.error('Select Invoice Products Currency', 'Error');
      return;
    }
    const uploadData = this.prepareUploadSave();
    this.spinner.show();
    this.dmsService.uploadApplicationDMSDocument(uploadData, this.regulatory_function_id, this.regulatory_subfunction_id, '', this.application_code, '', 'onunInvoiceProductsUpload')
      //.pipe(first())
      .subscribe(
        response => {
          this.spinner.hide();
          this.response_data = response;

          if (this.response_data.success) {

            this.onLoadpermitUploadedProductsData(this.application_code);
            this.isInvoiceProductsUploadVisable = false;

            this.toastr.success(this.response_data.message, 'Response');

          }
          else {
            this.toastr.error(this.response_data.message, 'Response');

          }

        },
        error => {
          this.spinner.hide();
          this.toastr.success('Error occurred', 'Response');

        });
  }

  onApprovedVisaProductsUpload() {

    const uploadData = this.prepareUploadSave();
    this.spinner.show();
    this.dmsService.uploadApplicationDMSDocument(uploadData, this.regulatory_function_id, this.regulatory_subfunction_id, '', this.application_code, '', 'onApprovedVisaProductsUpload')
      //.pipe(first())
      .subscribe(
        response => {
          this.spinner.hide();
          this.response_data = response;

          if (this.response_data.success) {

            this.onLoadPermitProductsData();

            this.isApprovedVisaProductsUploadVisable = false;
            this.isApprovedVisaproductsPopupVisible = false;
            this.toastr.success(this.response_data.message, 'Response');
          }
          else {
            this.toastr.error(this.response_data.message, 'Response');

          }

        },
        error => {
          this.spinner.hide();
          this.toastr.success('Error occurred', 'Response');

        });
  }

  showConsignmentDetails: boolean = false; // Initialize

  toggleDetailsVisibility(event: any): void {
    this.showConsignmentDetails = event.value === 1; // Show only if the selected value is 1 (Yes)
  }


}
