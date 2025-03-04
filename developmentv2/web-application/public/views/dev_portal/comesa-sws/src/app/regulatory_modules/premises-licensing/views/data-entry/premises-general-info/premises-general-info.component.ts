import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ToastrService } from 'ngx-toastr';
import { ConfigurationsService } from 'src/app/core-services/configurations/configurations.service';
import { DocumentManagementService } from 'src/app/core-services/document-management/document-management.service';
import { PremisesLicensingService } from '../../../services/premises-licensing.service';
import { UtilityService } from 'src/app/core-services/utilities/utility.service';
import { AuthenticationService } from 'src/app/core-services/authentication/authentication.service';

@Component({
  selector: 'app-premises-general-info',
  templateUrl: './premises-general-info.component.html',
  styleUrl: './premises-general-info.component.css'
})
export class PremisesGeneralInfoComponent {

  @Input() premisesGeneraldetailsfrm: FormGroup;
  
  productTypesData: any;
  premisesTypeData: any;
  countries: any;
  regions: any;
  districts: any;
  businessTypesData: any;
  businessScaleData: any;
  businessCategoryData: any;
  zoneData: any;
  confirmDataParam: any;
  regulatory_subfunction_id: number;
  regulatory_function_id: number;
  application_code: number;
  tra_premise_id: number;
  registered_id: number;

  isReadOnlyTraderasContact: boolean;
  is_readonly: boolean;
  payingCurrencyData: any;
  fastTrackOptionsData: boolean;
  region_id: number;
  country_id: number;
  personnel_type_id: number;
  personnel_informationData: any;
  isPersonnelPopupVisible: boolean;
  regulated_productstype_id: number;
  businessTypeDetailsData: any;
  business_type_id: number;
  isaddNewPremisesPersonnelDetails: boolean = false;
  isDisabledVehicleReg: boolean;
  @Output() businessTypeEvent = new EventEmitter();
  @Output() sectionsCboSelectEvent = new EventEmitter();

  newPremisesPersonnelDetailsFrm: FormGroup;
  app_resp: any;
  businesstypeCategoriesData: any;
  isSectionHidden: boolean = false;
  sectorsData: any;
  premisesvariationTypeData: any;
  district_id: number;
  cellsData: any;
  sector_id: number;
  hasPremisesVariations: boolean;
  registeringOrganisationData: any;
data_record: any;
  initcaparesponsefrm: FormGroup
  has_otherregisteringorganisation: boolean = false
  constructor(public cdr: ChangeDetectorRef, public dmsService: DocumentManagementService, public fb: FormBuilder, public spinner: SpinnerVisibilityService, public configService: ConfigurationsService, public appService: PremisesLicensingService, public router: Router, public formBuilder: FormBuilder, public config: ConfigurationsService,  public toastr: ToastrService, public authService: AuthenticationService, public utilityService: UtilityService) {


    this.initcaparesponsefrm = new FormGroup({
      deficiencies: new FormControl('', Validators.compose([Validators.required])),
      deficiency_references: new FormControl('', Validators.compose([])),
      root_causeanalysis: new FormControl('', Validators.compose([])),
      corrective_actions: new FormControl('', Validators.compose([Validators.required])),
      corrective_actionssteps: new FormControl('', Validators.compose([])),
      completion_date: new FormControl('', Validators.compose([Validators.required])),
      application_code: new FormControl('', Validators.compose([])),
      id: new FormControl('', Validators.compose([])),
      inspection_capa_id: new FormControl('', Validators.compose([]))
    });
  }

  ngOnInit() {
    // this.onBusinessTypesLoad(this.regulated_productstype_id);
    // this.onregisteringOrganisationDataLod();
    this.is_readonly = false;
    if (this.regulatory_subfunction_id != 1) {
      this.is_readonly = false;
    }
    this.hasPremisesVariations = false;
    if (this.regulatory_subfunction_id == 3) {
      this.hasPremisesVariations = true;

    }
    // this.onLoadpremisesvariationTypeData();

    if (!this.application_code) {
      //  this.premisesGeneraldetailsfrm.get('zone_id').setValue(2);
      this.premisesGeneraldetailsfrm.get('country_id')?.setValue(36);
    }
    this.onLoadprodProductTypeData();
    this.onLoadcurrencyData();
    this.onLoadZoneData();
    this.onLoadCountries();
    this.onLoadContactPerson();
  }
  onCoutryCboSelect($event) {

    this.country_id = $event.selectedItem.id;

    this.onLoadRegions(this.country_id);

  }
  onLoadRegions(country_id) {

    var data = {
      table_name: 'par_regions',
      country_id: country_id
    };
    this.config.onLoadConfigurationData(data)
      //.pipe(first())
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.regions = this.data_record.data;
          }
          else {
            this.toastr.error(this.data_record.message, 'Alert!');
          }
          this.spinner.hide();
        });
  } onBusinesTypeCboSelect($event) {
    this.business_type_id = $event.value;
    this.onBusinessTypesDetailsLoad(this.business_type_id);
    this.businessTypeEvent.emit(this.business_type_id);
  }
  onREgOrganisationCboSelect($event) {

    let is_other_config = $event.selectedItem.is_other_config;
    if (is_other_config == 1) {
      this.has_otherregisteringorganisation = true;

    }
    else {

      this.has_otherregisteringorganisation = false;

    }


  }
  onCategoriesDataCboSelect($event) {

    this.business_type_id = $event.value;

  }

  onBusinessTypesDetailsLoad(business_type_id) {

    var data = {
      table_name: 'par_business_type_details',
      business_type_id: business_type_id
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.businessTypeDetailsData = data;
        },
        error => {
          return false
        });
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
          this.data_record = data;
          if (this.data_record.success) {
            this.districts = this.data_record.data;
          }
          else {
            this.toastr.error(this.data_record.message, 'Alert!');
          }
          this.spinner.hide();
        });
  }
  onLoadSectors(district_id) {
    var data = {
      table_name: 'par_sectors',
      district_id: district_id
    };
    this.config.onLoadConfigurationData(data)
      //.pipe(first())
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.sectorsData = this.data_record.data;
          }
          else {
            this.toastr.error(this.data_record.message, 'Alert!');
          }
          this.spinner.hide();
        });
  }
  // onLoadpremisesvariationTypeData() {
  //   var data = {
  //     table_name: 'par_premisesvariation_types'
  //   };
  //   this.config.onLoadConfigurationData(data)
  //     //.pipe(first())
  //     .subscribe(
  //       data => {
  //         this.premisesvariationTypeData = data
  //       },
  //       error => {
  //         return false;
  //       });
  // }

  onLoadCells(sector_id) {
    var data = {
      table_name: 'par_cells',
      sector_id: sector_id
    };
    this.config.onLoadConfigurationData(data)
      //.pipe(first())
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.cellsData = this.data_record.data;
          }
          else {
            this.toastr.error(this.data_record.message, 'Alert!');
          }
          this.spinner.hide();
        });
  }

  onRegionsCboSelect($event) {
    this.region_id = $event.selectedItem.id;

    this.onLoadDistricts(this.region_id);

  }

  oDistrictsCboSelect($event) {
    this.district_id = $event.selectedItem.id;

    // this.onLoadSectors(this.district_id);

  }
  oSectorsCboSelect($event) {
    this.sector_id = $event.selectedItem.id;

    this.onLoadCells(this.sector_id);

  }


  onTraderasContactpersnChange($event) {
    if ($event.selectedItem && $event.selectedItem.id === 1) {
      this.isReadOnlyTraderasContact = true;
    } else {
      this.isReadOnlyTraderasContact = false;
    }
  }
  
 onPersonnelSearchDetails(personnel_type_id) {
    this.personnel_type_id = personnel_type_id;
    this.appService.onLoadPersonnelInformations()
      .subscribe(
        data_response => {
          this.personnel_informationData = data_response.data;

          this.isPersonnelPopupVisible = true;
        },
        error => {
          return false
        });

  } onPremisesPerGridToolbar(e, is_readonly) {
    this.functDataGridToolbar(e, this.funAddNewPremisesPersonnelDetails, 'Add Personnel', is_readonly);
  }
  funAddNewPremisesPersonnelDetails() {
    this.isaddNewPremisesPersonnelDetails = true;
  }
  functDataGridToolbar(e, funcBtn, btn_title, is_readonly = false) {
    e.toolbarOptions.items.unshift({
      location: 'before',
      widget: 'dxButton',
      options: {
        text: btn_title,
        type: 'default',
        icon: 'fa fa-plus',
        disabled: is_readonly,
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
  } refreshDataGrid() {
    //this.dataGrid.instance.refresh();
  }
  onPremisesTypeSelect($event) {

    if ($event.value == 1) {

      this.isDisabledVehicleReg = true;
    }
    else {
      this.isDisabledVehicleReg = false;

    }
  }
  onSectionsCboSelect($event) {
    this.onBusinessTypesLoad($event.value)
    this.regulated_productstype_id = $event.value;
    // this. OnLoadBusinesstypeCategories($event.value);
    this.sectionsCboSelectEvent.emit(this.regulated_productstype_id);

  }

  onBusinessTypesLoad(regulated_productstype_id) {

    var data = {
      table_name: 'par_business_types',
      regulated_productstype_id: regulated_productstype_id
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.businessTypesData = this.data_record.data;
          }
          else {
            this.toastr.error(this.data_record.message, 'Alert!');
          }
          this.spinner.hide();
        });
  }
  OnLoadBusinesstypeCategories(regulated_productstype_id) {

    var data = {
      table_name: 'par_businesstype_categories',
      regulated_productstype_id: regulated_productstype_id
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.businesstypeCategoriesData = data;
        },
        error => {
          return false
        });
  }
  // onregisteringOrganisationDataLod() {

  //   var data = {
  //     table_name: 'par_registering_organisations'
  //   };
  //   this.config.onLoadConfigurationData(data)
  //     .subscribe(
  //       data => {
  //         this.registeringOrganisationData = data;
  //       },
  //       error => {
  //         return false
  //       });
  // }

  funcSelectPremisePersonnel(data) {
    this.premisesGeneraldetailsfrm.patchValue({ contact_person_id: data.data.id, contact_person: data.data.name })

    this.isPersonnelPopupVisible = false;

  } onSaveNewPremisesPersonnelDetails() {
    //    this.spinner.show();
    let table_name;
    table_name = 'tra_personnel_information';
    let name = this.newPremisesPersonnelDetailsFrm.get('name')?.value;
    let email_address = this.newPremisesPersonnelDetailsFrm.get('email_address')?.value;
    let telephone_no = this.newPremisesPersonnelDetailsFrm.get('telephone_no')?.value;
    let postal_address = this.newPremisesPersonnelDetailsFrm.get('postal_address')?.value;

    this.utilityService.onAddPersonnDetails(table_name, this.newPremisesPersonnelDetailsFrm.value)
      .subscribe(
        response => {
          this.app_resp = response;
          //the details 
          if (this.app_resp.success) {

            this.toastr.success(this.app_resp.message, 'Response');

            this.premisesGeneraldetailsfrm.patchValue({ contact_person_id: this.app_resp.record_id, contact_person: name })

            this.isaddNewPremisesPersonnelDetails = false;
            this.isPersonnelPopupVisible = false;
          } else {
            this.toastr.error(this.app_resp.message, 'Alert');
          }
          this.spinner.hide();
        },
        error => {
          this.toastr.error('Error Occurred', 'Alert');
        });
  } funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width / 100;
  }
  onLoadprodProductTypeData() {
    var data = {
      table_name: 'par_premises_types'
    };
    this.configService.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.productTypesData = this.data_record.data;
          }
          else {
            this.toastr.error(this.data_record.message, 'Alert!');
          }
          this.spinner.hide();
        });
  }
  onLoadcurrencyData() {
    var data = {
      table_name: 'par_currencies'
    };
    this.configService.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.payingCurrencyData = this.data_record.data;
          }
          else {
            this.toastr.error(this.data_record.message, 'Alert!');
          }
          this.spinner.hide();
        });
  }

  onLoadZoneData() {
    var data = {
      table_name: 'par_zones'
    };
    this.configService.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.zoneData = this.data_record.data;
          }
          else {
            this.toastr.error(this.data_record.message, 'Alert!');
          }
          this.spinner.hide();
        });
  }

  onLoadCountries() {
    var data = {
      table_name: 'par_countries'
    };
    this.configService.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.countries = this.data_record.data;
          }
          else {
            this.toastr.error(this.data_record.message, 'Alert!');
          }
          this.spinner.hide();
        });
  }

  onLoadContactPerson() {
    var data = {
      table_name: 'tra_trader_account'
    };
    this.configService.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.confirmDataParam = this.data_record.data;
          }
          else {
            this.toastr.error(this.data_record.message, 'Alert!');
          }
          this.spinner.hide();
        });
  }
}
