import { ViewChild,  Directive } from '@angular/core';

import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { SpinnerVisibilityService } from 'ng-http-loader';

import { DxDataGridComponent } from 'devextreme-angular';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { UtilityService } from 'src/app/core-services/utilities/utility.service';
import { ImportExportService } from '../../services/import-export.service';
import { AuthenticationService } from 'src/app/core-services/authentication/authentication.service';
import { ConfigurationsService } from 'src/app/core-services/configurations/configurations.service';

@Directive({
  selector: '[appSharedImpexpApplicationClass]' // Add a unique selector here
})
export class SharedImpexpApplicationClass {
  //ImportexportService
  //dms 
  @ViewChild(DxDataGridComponent)
  appuploaded_document_id: number;
  trader_id: number;
  mistrader_id: number;
  permit_id: any;
  dataGrid: DxDataGridComponent;
  productApplicationProcessingData: any;
  isPreviewApplicationProcessing: boolean = false;
  deviceTypeData: any;
  data_record: any;
  
  product_resp: any; confirmDataParam: any;
  applicationGeneraldetailsfrm: FormGroup;
  documentUploadfrm: FormGroup;
  permitProductsFrm: FormGroup;
  regulatedProductsPermitData: any;

  sectionsData: any;
  zoneData: any;
  permit_product_id: number;
  isUploadedInvoiceProductsWin: boolean;
  documentMenuItems = [
    {
      text: "Document(s) Action",
      icon: 'menu',
      items: [
        { text: "Preview/Download Document", action: 'download', icon: 'fa fa-download', },
        { text: "Update Document", action: 'update', icon: 'fa fa-upload', },
        { text: "Delete Document", action: 'delete', icon: 'fa fa-trash-o' },
        { text: "Preview Previous Versions", action: 'version', icon: 'fa fa-upload', },
      ]
    }
  ];
  documentVersionMenuItems = [
    {
      text: "Document(s) Action",
      icon: 'menu',
      items: [
        { text: "Preview/Download Document", action: 'versiondownload', icon: 'fa fa-download' }
      ]
    }
  ];

  appDocumentsUploadData: any = {};
  appDocumentsUploadRequirement: any = {};
  appDocumentsVersionsUploadData: any = {};


  application_details: any;
  status_id: number;
  regulatory_subfunction_id: number;
  process_title: string;;
  regulated_productstype_id: number;
  application_id: number;
  application_code: number;
  tracking_no: string;
  status_name: string;
  regulatory_function_id: number = 4;

  app_route: any;
  applicationTypeData: any;
  applicationCategoryData: any;
  applicationTypeCategoryData: any;
  permitReasonData: any;
  portOfEntryExitData: any;
  payingCurrencyData: any;
  consigneeOptionsData: any;
  modeOfTransportData: any;

  termscheckbox: boolean = false;
  app_resp: any;
  consignee_options_id: number;
  consignee_options_check: boolean = true;

  isPermitproductsPopupVisible: boolean = false;
  isDocumentUploadPopupVisible: boolean = false;

  loading: boolean = true;
  terms_conditions: any;

  countries: any;
  regions: any;
  districts: any;

  senderReceiverData: any = {};
  ispremisesSearchWinVisible: boolean = false;
  issenderreceiverSearchWinVisible: boolean = false;
  issenderreceiverAddWinVisible: boolean = false;
  registered_premisesData: any = {};
  permitReceiverSenderFrm: FormGroup;
  productGeneraldetailsfrm: FormGroup;

  consignee_sendertitle: string;
  checkifsenderreceiver: boolean;

  document_previewurl: any;
  isDocumentPreviewDownloadwin: boolean = false;
  isDocumentVersionPreviewDownloadwin: boolean = false;
  documentsVersionsUploadData: any;
  documentsUploadData: any;
  documentsUploadRequirementData: any;

  permitProductsData: any;
  permitUploadedProductsData: any;
  registeredProductsData: any = {};
  commonNamesData: any;
  productCategoryData: any;
  devicesTypeData: any;
  device_type_visible: boolean = false;
  import_typecategory_visible: boolean = false;
  isPermitproductsAddPopupVisible: boolean = false;
  currencyData: any;
  weightsUnitData: any;
  packagingUnitsData: any;
  siUnitsData: any;
  classificationData: any;
  quantity: number = 100;
  unit_price: number;
  isnewproductAddWinVisible: boolean = false;
  enabled_newproductadd: boolean = false;
  showProductAddOption: boolean = false;
  is_regulatedproducts: boolean = false;
  proforma_currency_id: number;
  isInitalQueryResponseFrmVisible: boolean = false;
  initqueryresponsefrm: FormGroup;
  applicationPreckingQueriesData: any;
  query_sectioncheck: string;
  onApplicationSubmissionFrm: FormGroup;
  permitProductsCategoryData: any;
  has_invoicegeneration: boolean;
  app_routing: any;
  isprodnextdisable: boolean = true;

  filesToUpload: Array<File> = [];
  producttype_defination_id: number;
  constructor(private configService:ConfigurationsService, public utilityService: UtilityService, public fb: FormBuilder, 
    public spinner: SpinnerVisibilityService, public appService: ImportExportService, public router: Router, 
    public formBuilder: FormBuilder, public toastr: ToastrService, public authService: AuthenticationService, public httpClient: HttpClient) {
    //form 
    let user = this.authService.getUserDetails();

    this.trader_id = user.trader_id;
    this.mistrader_id = user.mistrader_id;
    this.application_details = localStorage.getItem('application_details');
   console.log("ApplicationDetails:",this.application_details)
    this.application_details = JSON.parse(this.application_details);
  
    if(this.application_details) {

      this.regulatory_subfunction_id = this.application_details.regulatory_subfunction_id;
      this.process_title = this.application_details.process_title;
      this.regulated_productstype_id = this.application_details.regulated_productstype_id;

      this.application_id = this.application_details.application_id;
      this.tracking_no = this.application_details.tracking_no;

      this.status_name = this.application_details.status_name;
      this.status_id = this.application_details.application_status_id;
      this.application_code = this.application_details.application_code;
      this.proforma_currency_id = this.application_details.proforma_currency_id;
      this.producttype_defination_id = this.application_details.producttype_defination_id;


    }
    this.funcREturnApplicationDashboardROute();
    if (this.regulatory_subfunction_id == 49) {
    this.applicationGeneraldetailsfrm = this.formBuilder.group({});

    }
    else {

    this.applicationGeneraldetailsfrm = this.formBuilder.group({});

    }


    this.onApplicationSubmissionFrm = new FormGroup({
      paying_currency_id: new FormControl('', Validators.compose([])),
      submission_comments: new FormControl('', Validators.compose([]))
    });

    this.permitReceiverSenderFrm = new FormGroup({
      name: new FormControl('', Validators.compose([Validators.required])),
      country_id: new FormControl('', Validators.compose([Validators.required])),
      region_id: new FormControl('', Validators.compose([])),
      district_id: new FormControl('', Validators.compose([])),
      email_address: new FormControl('', Validators.compose([Validators.required])),
      postal_address: new FormControl('', Validators.compose([])),
      telephone_no: new FormControl('', Validators.compose([])),
      mobile_no: new FormControl('', Validators.compose([])),
      physical_address: new FormControl('', Validators.compose([Validators.required])),
      tin_no: new FormControl('', Validators.compose([]))
    });

    this.documentUploadfrm = this.fb.group({
      file: null,
      document_requirement_id: [null, Validators.required],
      node_ref: null,
      id: null,
      description: [null]
    });
    if (this.regulatory_subfunction_id == 49 || this.regulatory_subfunction_id == 84) {
      this.permitProductsFrm = this.fb.group({
        brand_name: new FormControl('', Validators.compose([Validators.required])),
        product_category_id: new FormControl('', Validators.compose([])),
        product_batch_no: new FormControl('', Validators.compose([])),
        product_strength: new FormControl('', Validators.compose([])),
        product_manufacturing_date: new FormControl('', Validators.compose([])),
        product_expiry_date: new FormControl('', Validators.compose([])),
        country_oforigin_id: new FormControl('', Validators.compose([])),
        unit_price: new FormControl(this.quantity, Validators.compose([])),
        currency_id: new FormControl('', Validators.compose([Validators.required])),
        packaging_unit_id: new FormControl('', Validators.compose([])),
        quantity: new FormControl(this.quantity, Validators.compose([])),
        laboratory_no: new FormControl('', Validators.compose([])),
        regulated_prodpermit_id: new FormControl('', Validators.compose([])),
        prodcertificate_no: new FormControl('', Validators.compose([])),
        product_id: new FormControl('', Validators.compose([])),
        unitpack_unit_id: new FormControl('', Validators.compose([])),
        unitpack_size: new FormControl('', Validators.compose([])),
        visa_quantity: new FormControl('', Validators.compose([])),
        total_weight: new FormControl('', Validators.compose([])),
        weights_units_id: new FormControl('', Validators.compose([])),
        id: new FormControl('', Validators.compose([])),
        device_type_id: new FormControl('', Validators.compose([])),
        is_regulated_product: new FormControl('', Validators.compose([])),
        productphysical_description: new FormControl('', Validators.compose([])),
        common_name_id: new FormControl('', Validators.compose([])),
        manufacturer_id: new FormControl('', Validators.compose([])),
        manufacturer_name: new FormControl('', Validators.compose([])),
        product_subcategory_id: new FormControl('', Validators.compose([])),
        productclassification_id: new FormControl('', Validators.compose([])),
        productdosage_id: new FormControl('', Validators.compose([])),
        consignment_quantity: new FormControl('', Validators.compose([Validators.required])),
        approvedvisa_product_id: new FormControl('', Validators.compose([])),
        approvedlicense_product_id: new FormControl('', Validators.compose([])),
        licensebalance_quantity: new FormControl('', Validators.compose([])),
        certificate_of_conformity: null,

      });


    } else if (this.regulatory_subfunction_id == 83) {
      if (this.producttype_defination_id == 2) {
        this.permitProductsFrm = this.fb.group({
          brand_name: new FormControl('', Validators.compose([Validators.required])),
          product_category_id: new FormControl('', Validators.compose([])),
          product_batch_no: new FormControl('', Validators.compose([])),
          product_strength: new FormControl('', Validators.compose([])),
          product_manufacturing_date: new FormControl('', Validators.compose([])),
          product_expiry_date: new FormControl('', Validators.compose([])),
          country_oforigin_id: new FormControl('', Validators.compose([Validators.required])),
          unit_price: new FormControl(this.quantity, Validators.compose([Validators.required])),
          currency_id: new FormControl('', Validators.compose([Validators.required])),
          packaging_unit_id: new FormControl('', Validators.compose([])),
          quantity: new FormControl(this.quantity, Validators.compose([Validators.required])),
          laboratory_no: new FormControl('', Validators.compose([])),
          regulated_prodpermit_id: new FormControl('', Validators.compose([])),
          prodcertificate_no: new FormControl('', Validators.compose([])),
          product_id: new FormControl('', Validators.compose([])),
          unitpack_unit_id: new FormControl('', Validators.compose([])),
          unitpack_size: new FormControl('', Validators.compose([Validators.required])),
          visa_quantity: new FormControl('', Validators.compose([])),
          total_weight: new FormControl('', Validators.compose([])),
          weights_units_id: new FormControl('', Validators.compose([])),
          id: new FormControl('', Validators.compose([])),
          device_type_id: new FormControl('', Validators.compose([])),
          is_regulated_product: new FormControl('', Validators.compose([])),
          productphysical_description: new FormControl('', Validators.compose([])),
          common_name_id: new FormControl('', Validators.compose([])),
          manufacturer_id: new FormControl('', Validators.compose([])),
          manufacturer_name: new FormControl('', Validators.compose([Validators.required])),
          product_subcategory_id: new FormControl('', Validators.compose([])),
          productclassification_id: new FormControl('', Validators.compose([])),
          productdosage_id: new FormControl('', Validators.compose([])),
          consignment_quantity: new FormControl('', Validators.compose([])),
          approvedvisa_product_id: new FormControl('', Validators.compose([])),
          approvedlicense_product_id: new FormControl('', Validators.compose([])),
          licensebalance_quantity: new FormControl('', Validators.compose([])),
          dosage_form_id: new FormControl('', Validators.compose([])),
          certificate_of_conformity: null
        });


      }
      else {

        this.permitProductsFrm = this.fb.group({
          brand_name: new FormControl('', Validators.compose([Validators.required])),
          product_category_id: new FormControl('', Validators.compose([])),
          product_batch_no: new FormControl('', Validators.compose([])),
          product_strength: new FormControl('', Validators.compose([Validators.required])),
          product_manufacturing_date: new FormControl('', Validators.compose([])),
          product_expiry_date: new FormControl('', Validators.compose([])),
          country_oforigin_id: new FormControl('', Validators.compose([Validators.required])),
          unit_price: new FormControl(this.quantity, Validators.compose([Validators.required])),
          currency_id: new FormControl('', Validators.compose([Validators.required])),
          packaging_unit_id: new FormControl('', Validators.compose([])),
          quantity: new FormControl(this.quantity, Validators.compose([Validators.required])),
          laboratory_no: new FormControl('', Validators.compose([])),
          regulated_prodpermit_id: new FormControl('', Validators.compose([])),
          prodcertificate_no: new FormControl('', Validators.compose([])),
          product_id: new FormControl('', Validators.compose([])),
          unitpack_unit_id: new FormControl('', Validators.compose([])),
          unitpack_size: new FormControl('', Validators.compose([Validators.required])),
          visa_quantity: new FormControl('', Validators.compose([])),
          total_weight: new FormControl('', Validators.compose([])),
          weights_units_id: new FormControl('', Validators.compose([])),
          id: new FormControl('', Validators.compose([])),
          device_type_id: new FormControl('', Validators.compose([])),
          is_regulated_product: new FormControl('', Validators.compose([])),
          productphysical_description: new FormControl('', Validators.compose([])),
          common_name_id: new FormControl('', Validators.compose([Validators.required])),
          manufacturer_id: new FormControl('', Validators.compose([])),
          manufacturer_name: new FormControl('', Validators.compose([Validators.required])),
          product_subcategory_id: new FormControl('', Validators.compose([])),
          productclassification_id: new FormControl('', Validators.compose([Validators.required])),
          productdosage_id: new FormControl('', Validators.compose([])),
          consignment_quantity: new FormControl('', Validators.compose([])),
          approvedvisa_product_id: new FormControl('', Validators.compose([])),
          approvedlicense_product_id: new FormControl('', Validators.compose([])),
          licensebalance_quantity: new FormControl('', Validators.compose([])),
          dosage_form_id: new FormControl('', Validators.compose([Validators.required])),
          certificate_of_conformity: null
        });


      }



    }
    else {

      this.permitProductsFrm = this.fb.group({
        brand_name: new FormControl('', Validators.compose([Validators.required])),
        product_category_id: new FormControl('', Validators.compose([])),
        product_batch_no: new FormControl('', Validators.compose([])),
        product_strength: new FormControl('', Validators.compose([])),
        product_manufacturing_date: new FormControl('', Validators.compose([])),
        product_expiry_date: new FormControl('', Validators.compose([])),
        country_oforigin_id: new FormControl('', Validators.compose([Validators.required])),
        unit_price: new FormControl(this.quantity, Validators.compose([Validators.required])),
        currency_id: new FormControl('', Validators.compose([Validators.required])),
        packaging_unit_id: new FormControl('', Validators.compose([Validators.required])),
        quantity: new FormControl(this.quantity, Validators.compose([Validators.required])),
        laboratory_no: new FormControl('', Validators.compose([])),
        regulated_prodpermit_id: new FormControl('', Validators.compose([])),
        prodcertificate_no: new FormControl('', Validators.compose([])),
        product_id: new FormControl('', Validators.compose([])),
        unitpack_unit_id: new FormControl('', Validators.compose([])),
        unitpack_size: new FormControl('', Validators.compose([])),
        visa_quantity: new FormControl('', Validators.compose([])),
        total_weight: new FormControl('', Validators.compose([])),
        weights_units_id: new FormControl('', Validators.compose([])),
        id: new FormControl('', Validators.compose([])),
        device_type_id: new FormControl('', Validators.compose([])),
        is_regulated_product: new FormControl('', Validators.compose([])),
        productphysical_description: new FormControl('', Validators.compose([])),
        common_name_id: new FormControl('', Validators.compose([])),
        manufacturer_id: new FormControl('', Validators.compose([])),
        manufacturer_name: new FormControl('', Validators.compose([Validators.required])),
        product_subcategory_id: new FormControl('', Validators.compose([])),
        productclassification_id: new FormControl('', Validators.compose([])),
        productdosage_id: new FormControl('', Validators.compose([])),
        consignment_quantity: new FormControl('', Validators.compose([])),
        approvedvisa_product_id: new FormControl('', Validators.compose([])),
        approvedlicense_product_id: new FormControl('', Validators.compose([])),
        licensebalance_quantity: new FormControl('', Validators.compose([])),
        dosage_form_id: new FormControl('', Validators.compose([])),
        certificate_of_conformity: null
      });
      if (this.regulated_productstype_id == 2 || this.regulated_productstype_id == 7) {
        this.permitProductsFrm.addControl('dosage_form_id', new FormControl('', Validators.required));
      }
      if (this.regulated_productstype_id != 4 && this.regulated_productstype_id != 18) {
        this.permitProductsFrm.addControl('product_batch_no', new FormControl('', Validators.required));
      }
      if (this.regulatory_subfunction_id != 12 && this.regulatory_subfunction_id != 83) {
        //  this.permitProductsFrm.addControl('product_batch_no',new FormControl('', Validators.required));
      }
    }
    if ((this.regulated_productstype_id == 2 || this.regulated_productstype_id == 7)) {
      this.permitProductsFrm.addControl('common_name_id', new FormControl('', Validators.required));
    }

    this.productGeneraldetailsfrm = new FormGroup({
      regulated_productstype_id: new FormControl('', Validators.compose([])),
      common_name_id: new FormControl('', Validators.compose([])),
      classification_id: new FormControl('', Validators.compose([Validators.required])),
      brand_name: new FormControl('', Validators.compose([Validators.required])),
      physical_description: new FormControl('', Validators.compose([Validators.required])),
      product_category_id: new FormControl('', Validators.compose([Validators.required]))
    });

    this.initqueryresponsefrm = new FormGroup({
      queries_remarks: new FormControl('', Validators.compose([Validators.required])),
      response_txt: new FormControl('', Validators.compose([Validators.required])),
      id: new FormControl('', Validators.compose([])),
      query_id: new FormControl('', Validators.compose([]))
    });
    if (this.regulatory_subfunction_id == 12 || this.regulatory_subfunction_id == 81) {

      this.enabled_newproductadd = true;

    } else if (this.regulatory_subfunction_id == 82 || this.regulatory_subfunction_id == 78) {

      this.enabled_newproductadd = false;

    } else {

      this.enabled_newproductadd = false;

    }

    if (this.status_id < 1) {
      this.status_name = "New"
    }


    if (this.regulated_productstype_id == 4) {
      this.device_type_visible = true;
    }

    this.import_typecategory_visible = true;


    this.funcReloadQueriesDetails();
    /*  if(this.regulatory_subfunction_id == 13 || this.regulatory_subfunction_id == 14 || this.regulatory_subfunction_id == 15){
        this.applicationGeneraldetailsfrm.get('premises_name').setValidators([]);
        this.applicationGeneraldetailsfrm.get('premise_id').setValidators([]);
      }
      else{
         this.applicationGeneraldetailsfrm.get('premises_name').setValidators([Validators.required]);
         this.applicationGeneraldetailsfrm.get('premise_id').setValidators([Validators.required]);
      }
      */

    if (this.regulatory_subfunction_id == 78 || this.regulatory_subfunction_id == 82 || this.regulatory_subfunction_id == 81) {

      this.applicationGeneraldetailsfrm.get('port_id')?.setValidators([Validators.required]);
      this.applicationGeneraldetailsfrm.get('mode_oftransport_id')?.setValidators([Validators.required]);
      this.has_invoicegeneration = true;
    }

  }
  funcAutoLoadedParamters() {
    
    if (this.application_details) {
      this.applicationGeneraldetailsfrm.patchValue(this.application_details);
    }

  }
 
  funcReloadQueriesDetails() {

    this.funcgetPreckingQueriesData();

  }
  funcgetPreckingQueriesData() {

    this.utilityService.getApplicationPreQueriesDetails(this.application_code, 'txn_importexport_applications', 'application_status_id', 'utilities/getApplicationQueriesData')
        .subscribe(
          data => {
            this.data_record = data;
            
            if (this.data_record.success) {
              this.applicationPreckingQueriesData = this.data_record.data;
              ;
            }
          });
  }

  onLoadGuidelines(regulatory_subfunction_id, regulated_productstype_id) {
    this.configService.onLoadAppSubmissionGuidelines(regulatory_subfunction_id, regulated_productstype_id)
      //.pipe(first())
      .subscribe(
        data => {
          this.terms_conditions = data.data;
        },
        error => {
          return false
        });
  }
  onApplicationDashboard() {
    this.app_route = this.funcREturnApplicationDashboardROute();

    this.router.navigate(this.app_route);
  }
  funcREturnApplicationDashboardROute() {
    if (this.regulatory_subfunction_id == 12) {
      this.app_routing = ['./online-services/importvisa-dashboard'];

    }
    else if (this.regulatory_subfunction_id == 78 || this.regulatory_subfunction_id == 82) {
      this.app_routing = ['./online-services/importlicense-dashboard'];

    } else if (this.regulatory_subfunction_id == 81) {
      this.app_routing = ['./online-services/exportlicense-dashboard'];

    }
    else {
      this.app_routing = ['./online-services/inspectionbookin-dashboard'];

    }
    return this.app_routing;

  }
  onSectionsCboSelect($event) {
    //this.onBusinessTypesLoad($event.value)
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
  funcValidatePermitDetails(validation_title, nextStep) {


    const invalid = [];
    const controls = this.applicationGeneraldetailsfrm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        this.toastr.error('Fill In All Mandatory fields with (*), missing value on ' + name.replace('_id', '') + ' and save permit application', 'Alert');
        return;
      }
    }
    if (this.applicationGeneraldetailsfrm.invalid) {
      //this.wizard.model.navigationMode.goToStep(nextStep);
      return;
    }

  }
  private prepareSavePermitDoc(): any {
    //let input = new FormData();
    let input = this.applicationGeneraldetailsfrm.value;
    const files: Array<File> = this.filesToUpload;
    // input.append('file', this.uploadpaymentdetailsfrm.get('file').value);
    for (let i = 0; i < files.length; i++) {
      input.append("file", files[i], files[i]['name']);
    }
    return input;
  }
  // onSaveImportExportApplication() {

  //   const invalid = [];
  //   const controls = this.applicationGeneraldetailsfrm.controls;
  //   for (const name in controls) {
  //     if (controls[name].invalid) {
  //       this.toastr.error('Fill In All Mandatory fields with (*), missing value on ' + name.replace('_id', ''), 'Alert');
  //       return;
  //     }
  //   }
  //   if (this.applicationGeneraldetailsfrm.invalid) {
  //     return;
  //   }
  //   const uploadData = this.prepareSavePermitDoc();

  //   this.spinner.show();
    
  //   this.appService.onSavePermitApplication(this.application_id, this.applicationGeneraldetailsfrm.value, this.tracking_no, 'saveImportExportApplication', uploadData)
  //     .subscribe(
  //       response => {
  //         this.app_resp = response;
  //         console.log(this.app_resp);
  //         //the details 
  //         this.spinner.hide();

  //         if (this.app_resp.success) {
  //           this.tracking_no = this.app_resp.tracking_no;
  //           this.application_id = this.app_resp.application_id;
  //           this.application_code = this.app_resp.application_code;
  //           this.toastr.success(this.app_resp.message, 'Response');
  //           //this.wizard.model.navigationMode.goToStep(1);
  //         } else {
  //           this.toastr.error(this.app_resp.message, 'Alert');
  //         }
  //       },
  //       error => {
  //         this.loading = false;
  //       });
  // }

  onSaveImportExportApplication() {

    const invalid = [];
    const controls = this.applicationGeneraldetailsfrm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        this.toastr.error('Fill In All Mandatory fields with (*), missing value on ' + name.replace('_id', ''), 'Alert');
        return;
      }
    }
    if (this.applicationGeneraldetailsfrm.invalid) {
      return;
    }
    const uploadData = this.prepareSavePermitDoc();

    this.spinner.show();
    // let registrant_details = this.applicationApplicantdetailsfrm.value;//applicant values
    this.applicationGeneraldetailsfrm.value['regulatory_subfunction_id'] = this.regulatory_subfunction_id;
    console.log(this.productGeneraldetailsfrm.value);
    this.spinner.show();
    this.appService.onSavePermitApplication(this.applicationGeneraldetailsfrm.value, uploadData, 'saveImportExportApplication')
      .subscribe(
        response => {
          this.product_resp = response;
          console.log(this.product_resp);
          if (this.product_resp.success) {
            this.tracking_no = this.product_resp.tracking_no;
            this.permit_id = this.product_resp.permit_id;
           
            this.application_code = this.product_resp.application_code;

            this.applicationGeneraldetailsfrm.patchValue({ permit_id: this.permit_id })
            this.toastr.success(this.product_resp.message, 'Response');


          } else {
            this.toastr.error(this.product_resp.message, 'Alert');
          }
          this.spinner.hide();
        },
        error => {
          this.loading = false;

          this.spinner.hide();
        });
  }


  onPermitsApplicationPrint() {


  }
  submissionsTermscheckbox(e) {

    this.termscheckbox = e.value;

  }

  onPermitsApplicationSubmit() {
    if (this.onApplicationSubmissionFrm.invalid) {
      this.toastr.error('Fill in all the submission details to proceed!!', 'Alert');
      return;
    }
    this.app_route = this.app_route = this.funcREturnApplicationDashboardROute();

   // this.utilityService.onPermitsApplicationSubmit(this.viewRef, this.application_code, this.tracking_no, 'txn_importexport_applications', this.app_route, this.onApplicationSubmissionFrm.value);

  }

  onApplicationDocumentToolbar(e) {
    this.functDataGridToolbar(e, this.funAddApplicationUploadDetails, 'Upload Document');

  }
  funAddApplicationUploadDetails() {
    this.isDocumentUploadPopupVisible = true;

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
  onPremisesPerGridToolbar(e) {
    this.functDataGridToolbar(e, this.nullFunc, '');
  }
  nullFunc() {

  }




  funcValidatePermitProductDetails(validation_title, nextStep) {

    this.spinner.show();
    this.appService.onfuncValidatePermitDetails(this.application_code, validation_title, 'wb_permits_products')
      .subscribe(
        response => {
          if (response.success) {
           // this.wizard.model.navigationMode.goToStep(nextStep);
          } else {
            this.toastr.error(response.message, 'Alert');
          }
          this.spinner.hide();
        },
        error => {
          this.toastr.error(error.message, 'Alert');
          this.spinner.hide();
        });
  }
  

  funcValidateApplicationQueryresponse(nextStep) {

    this.spinner.show();
    this.utilityService.funcValidateApplicationQueryresponse(this.application_code, 'txn_importexport_applications')
      .subscribe(
        response => {
          if (response.success) {
           // this.wizard.model.navigationMode.goToStep(nextStep);
          } else {
            this.toastr.error(response.message, 'Alert');
          }
          this.spinner.hide();
        },
        error => {
          this.toastr.error(error.message, 'Alert');
          this.spinner.hide();
        });
  }

  funcValidatePermitDocumentsDetails(nextStep) {
    this.utilityService.validateApplicationDocumentsQuerySubmission(this.application_code, this.status_id, 'txn_importexport_applications')
      .subscribe(
        response => {
          this.spinner.hide();
          let response_data = response;
          if (response_data.success) {
           // this.wizard.model.navigationMode.goToStep(nextStep);

          }
          else {

            this.toastr.error(response_data.message, 'Response');
          }

          this.spinner.hide();
        });


  }
  funcValidateStepDetails(validation_title, data, nextStep) {

    if (data.length != 0 && data.length) {
   //   this.wizard.model.navigationMode.goToStep(nextStep);
    }
    else {
      this.toastr.error(validation_title, 'Alert');
    }

  }
  funAddNewPermitProducts() {
    this.isnewproductAddWinVisible = true;
  }

  onSaveinitqueryresponse() {
    if (this.initqueryresponsefrm.invalid) {
      return;
    }

    //also get the premises ID onsaveApplicationCodeDetails(application_code, app_data, action_url)
    this.utilityService.onsaveApplicationCodeDetails(this.application_code, this.initqueryresponsefrm.value, 'onSavePrecheckingqueryresponse')
      .subscribe(
        response => {
          this.app_resp = response;
          if (this.app_resp.success) {
            this.toastr.success(this.app_resp.message, 'Response');
            this.funcReloadQueriesDetails();

          } else {
            this.toastr.error(this.app_resp.message, 'Alert');
          }
        },
        error => {
          this.toastr.error('Error occurred!!', 'Alert');
        });
  } funcInitQueryResponse(data) {

    // this.premisesPersonnelDetailsfrm.patchValue({personnel_id:data.data.personnel_id,id:data.data.id,start_date:data.data.start_date,end_date:data.data.end_date, personnel_name:data.data.personnel_name})
    this.initqueryresponsefrm.patchValue(data.data);
    this.query_sectioncheck = data.data.application_section;

    this.isInitalQueryResponseFrmVisible = true;

  }
  funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width / 100;
  }
  funcValidatePermitdetails(previous_step, direction) {
    const invalid = [];
    const controls = this.applicationGeneraldetailsfrm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        this.toastr.error('Fill In All Mandatory fields with (*), missing value on ' + name.replace('_id', ''), 'Alert');

        return;
      }
    }

  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scrolling for better UX
    });
  }

  funcValidateNavPermitProductDetails(nextStep, direction) {

    this.spinner.show();
    this.appService.onfuncValidatePermitDetails(this.application_code, 'Invoice Product details', 'wb_permits_products')
      .subscribe(
        response => {
          if (!response.success) {
            this.toastr.error('Add the Invoice Product details to proceed', 'Alert');
           // this.wizard.model.navigationMode.goToStep(nextStep);


            return;
          }
          this.spinner.hide();
        },
        error => {
          this.toastr.error(error.message, 'Alert');
          this.spinner.hide();
        });
  }
  

}
