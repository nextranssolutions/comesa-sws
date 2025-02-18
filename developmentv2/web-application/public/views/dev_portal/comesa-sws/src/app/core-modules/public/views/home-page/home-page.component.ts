import { Component, ViewContainerRef } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { DxButtonTypes } from 'devextreme-angular/ui/button';
import { DxTextBoxTypes } from 'devextreme-angular/ui/text-box';
import { ToastrService } from 'ngx-toastr';
import { AppSettings } from 'src/app/app-settings';
import { AuthenticationService } from 'src/app/core-services/authentication/authentication.service';
import { ConfigurationsService } from 'src/app/core-services/configurations/configurations.service';
import { DashbordManagementService } from 'src/app/core-services/dashboard-management/dashbord-management.service';
import { EncryptionService } from 'src/app/core-services/encryption/encryption.service';
import { PublicDashboardService } from 'src/app/core-services/public-dashboard/public-dashboard.service';
import { UserManagementService } from 'src/app/core-services/user-management/user-management.service';

@Component({
  selector: 'app-home-page',

  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {
  system_title: string = AppSettings.system_title;

  iconPosition: any = 'top';
  searchCriteriaForm: FormGroup;
  submitted = false;
  loading = false;
  message: string;
  success: boolean;
  email_address: string;
  islostpassword: boolean;
  isSignIn: boolean = true;
  forgotPasswordFrm: FormGroup;
  siteKey: any = AppSettings.siteKey;
  mis_url: string = AppSettings.mis_url;
  isLoggedIn: boolean;
  userGroupName: string = ''; // Initialize with an empty string or default value
  userFirstName: string = '';
  userCountryOfOrigin: string = '';
  auth_response: any;
  loadingVisible: boolean;
  spinnerMessage: string;
  dashboard_link: any;
  dashboard_name: string;
  userData: any;
  productData: any;
  response: any;
  encryptedPayload: any;
  decryptedPayload: any;
  productPlaceholder: any;
  passwordMode: DxTextBoxTypes.TextBoxType = 'password';
  passwordButton: DxButtonTypes.Properties = {
    icon: 'eyeopen',
    stylingMode: 'text',
    onClick: () => {
      this.passwordMode = this.passwordMode === 'text' ? 'password' : 'text';
    },
  };

  slideshowDelay = 3000;

  valueChanged(e) {
    this.slideshowDelay = e.value ? 2000 : 0;
  }
  hsCodeData: any;
  operationTypeData: any;
  criteriaData: any;
  regulatoryFunctionData: any;
  private baseUrl;
  dynamicDataSource: any[] = [];
  slides_information: any;
  searchForm: FormGroup;
  operationTypeId: any;
  selectedProduct: any;

  constructor(
    private router: Router,
    public authService: AuthenticationService,
    public userservice: UserManagementService,
    public dashboardService: DashbordManagementService,
    public toastr: ToastrService,
    public publicservice: PublicDashboardService,
    private configService: ConfigurationsService,
    public viewRef: ViewContainerRef,
    public encryptionService: EncryptionService,
    private fb: FormBuilder
  ) {
    const base_url = AppSettings.base_url;
  }

  ngOnInit() {
    this.searchCriteriaForm = new FormGroup({
      id: new FormControl('', Validators.compose([])),
      search_criteria_id: new FormControl('', Validators.compose([])),
      dynamic_type_id: new FormControl('', Validators.compose([])),
      operation_type_id: new FormControl('', Validators.compose([])),
    });

    this.searchForm = this.fb.group({
      searchByCriteria: [null],
      transactionType: [null],
      productType: [null],
    });

    // this.onLoadcountriesData();
    this.onLoadregulatoryFunctionData();
    this.onLoadSlides_information();
    this.onLoadSearchCriteriaData();
    this.onLoadOperationTypeData();
    this.onLoadProductData();
    this.onLoadHsCodeData();
  }
  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Smooth scrolling for better UX
    });
  }

  onSearchCriteriaChange(event: any) {
    const selectedId = event.value; // Use 'value' instead of 'selectedItem.id'

    if (selectedId === 1) {
      this.dynamicDataSource = this.productData;
      this.productPlaceholder = 'Type of Product';
    } else if (selectedId === 2) {
      this.dynamicDataSource = this.hsCodeData;
      this.productPlaceholder = 'Enter HS Code';
    } else {
      this.dynamicDataSource = [];
      this.productPlaceholder = 'Select Type';
    }
  }

  // onCountrySelection($event) {
  //   if ($event.selectedItem) {
  //     let country_data = $event.selectedItem,
  //     dynamic_type_id = '+' + country_data.phonecode;
  //     this.searchCriteriaForm.get('dynamic_type_id')?.setValue(name);
  //   }
  // }

  onSearchProduct() {
    this.operationTypeId = this.searchForm.value.transactionType; // Get selected operation type ID
    this.selectedProduct = this.searchForm.value.productType; // Get selected product

    if (!this.operationTypeId || !this.selectedProduct) {
      alert('Please select both operation type and product.');
      return;
    }

    // Navigate to the procedures page with query parameters
    this.router.navigate(['/public/search-procedures'], { 
      queryParams: { 
        operationTypeId: this.operationTypeId, 
        product: this.selectedProduct 
      } 
    });
  }
  onLoadSearchCriteriaData() {
    var data_submit = {
      table_name: 'par_searchby_criteria',
      is_enabled: true,
    };
    this.configService.onLoadConfigurationData(data_submit).subscribe(
      (data) => {
        this.data_record = data;
        if (this.data_record.success) {
          // this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
          // this.countriesData = this.decryptedPayload;
          this.criteriaData = this.data_record.data;
        }
      },
      (error) => { }
    );
  }

  onLoadOperationTypeData() {
    var data_submit = {
      table_name: 'par_operation_type',
      is_enabled: true,
    };
    this.configService.onLoadConfigurationData(data_submit).subscribe(
      (data) => {
        this.data_record = data;
        if (this.data_record.success) {
          // this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
          // this.countriesData = this.decryptedPayload;
          this.operationTypeData = this.data_record.data;
        }
      },
      (error) => { }
    );
  }

  onLoadHsCodeData() {
    var data_submit = {
      table_name: 'tra_hscodesproducts_registry',
      is_enabled: true,
    };
    this.configService.onLoadConfigurationData(data_submit).subscribe(
      (data) => {
        this.data_record = data;
        if (this.data_record.success) {
          // this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
          // this.countriesData = this.decryptedPayload;
          this.hsCodeData = this.data_record.data;
        }
      },
      (error) => { }
    );
  }

  onLoadProductData() {
    var data_submit = {
      table_name: 'par_products',
      is_enabled: true,
    };
    this.configService.onLoadConfigurationData(data_submit).subscribe(
      (data) => {
        this.data_record = data;
        if (this.data_record.success) {
          // this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
          // this.countriesData = this.decryptedPayload;
          this.productData = this.data_record.data;
        }
      },
      (error) => { }
    );
  }
  onLoadregulatoryFunctionData() {
    var data_submit = {
      table_name: 'par_regulatory_functions',
    };
    this.configService.onLoadConfigurationData(data_submit).subscribe(
      (data) => {
        this.data_record = data;
        if (this.data_record.success) {
          // this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
          // this.regulatoryFunctionData = this.decryptedPayload;
          this.regulatoryFunctionData = this.data_record.data;
        }
      },
      (error) => { }
    );
  }
  onLoadSlides_information() {
    this.spinnerShow('');
    var data_submit = {
      table_name: 'not_slides_informations',
      is_enabled: true,
    };
    this.configService.onLoadConfigurationData(data_submit).subscribe(
      (data) => {
        this.data_record = data;
        if (this.data_record.success) {
          // this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
          // this.slides_information = this.decryptedPayload;
          this.slides_information = this.data_record.data;
        }
      },
      (error) => { }
    );
  }

  // LOGIN METHOD LOGIC START
  data_record: any;
  countriesData: any;
  onLoadcountriesData() {
    var data_submit = {
      table_name: 'par_countries',
    };
    this.configService.onLoadConfigurationData(data_submit).subscribe(
      (data) => {
        this.data_record = data;
        if (this.data_record.success) {
          // this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
          // this.countriesData = this.decryptedPayload;
          this.countriesData = this.data_record.data;
        }
      },
      (error) => { }
    );
  }

  funcpopWidth(percentage_width) {
    return (window.innerWidth * percentage_width) / 100;
  }

  spinnerShow(spinnerMessage) {
    this.loadingVisible = true;
    this.spinnerMessage = spinnerMessage;
  }
  spinnerHide() {
    this.loadingVisible = false;
  }

  onAutoLoadConfigurationItems() {
    this.onLoadregulatoryFunctionData();

    this.onLoadcountriesData();
  }
}
