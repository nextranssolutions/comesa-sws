import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigurationsService } from 'src/app/core-services/configurations/configurations.service';
import { PublicDashboardService } from 'src/app/core-services/public-dashboard/public-dashboard.service';

@Component({
  selector: 'app-search-procedures',
  templateUrl: './search-procedures.component.html',
  styleUrl: './search-procedures.component.css'
})
export class SearchProceduresComponent implements OnInit {
  data_record: any;
  operationTypeId: any;
  procedures: any[] = [];
  procedureData: any;
  loadingVisible: boolean;
  spinnerMessage: string;
  selectedProduct: string = '';
  searchQuery: string = '';
  searchText: string = ''; // Search text
  filteredProcedureData: any[] = [];
  selectedIndex: number = 0;
  searchForm: FormGroup;
  dynamicDataSource: any[] = [];
  productPlaceholder: any;
  productData: any;
  hsCodeData: any;
  criteriaData: any;
  operationTypeData: any;

  constructor(
    private route: ActivatedRoute,
    public configService: ConfigurationsService,
    public publicservice: PublicDashboardService,
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.searchForm = this.fb.group({
      searchByCriteria: [null],
      transactionType: [null],
      productType: [null],
    });
   }

  ngOnInit() {
    // Get parameters from the route
    this.route.queryParams.subscribe(params => {
      this.operationTypeId = params['operationTypeId'];
      this.selectedProduct = params['product'];

      // Load procedures based on selection
      // this.loadProcedures();
      this.onLoadProcedureData()
    });
    this.onLoadProductData();
    this.onLoadHsCodeData();
    this.onLoadSearchCriteriaData();
    this.onLoadOperationTypeData();
  }

  // onLoadProcedureData() {
  //   var data_submit = {
  //     table_name: 'tra_importexport_proceduredetails',

  //   };
  //   this.configService.onLoadConfigurationData(data_submit).subscribe(
  //     (data) => {
  //       this.data_record = data;
  //       if (this.data_record.success) {

  //         this.procedureData = this.data_record.data;
  //       }
  //     },
  //     (error) => { }
  //   );
  // }

  // onLoadProcedureData() {
  //   this.spinnerShow('Loading...........');

  //   var data_submit = {
  //     table_name: 'tra_importexport_proceduredetails',
  //   }
  //   this.publicservice.onLoadInformationSharingDataUrl(data_submit, 'onLoadProcedureDetails')
  //     .subscribe(
  //       data => {
  //         this.data_record = data;
  //         if (this.data_record.success) {
  //           this.procedureData = this.data_record.data;
  //         }
  //         this.spinnerHide();
  //       },
  //       error => {

  //         this.spinnerHide();
  //       });
  // }

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

  onLoadHsCodeData() {
    var data_submit = {
      table_name: 'tra_hscodesproducts_registry',
      // is_enabled: true,
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

  onLoadProcedureData() {
    const data_submit = { table_name: 'tra_importexport_proceduredetails' };

    this.publicservice.onLoadInformationSharingDataUrl(data_submit, 'onLoadProcedureDetails')
      .subscribe(
        data => {
          if (data.success) {
            this.procedureData = data.data;
            this.filteredProcedureData = [...this.procedureData]; // Initialize filtered data
          }
        },
        error => {
          console.error('Error loading procedures:', error);
        }
      );
  }

  onSearch() {
    this.filteredProcedureData = this.procedureData.filter(procedure =>
      procedure.procedure_categories.toLowerCase().includes(this.searchText.toLowerCase()) ||
      procedure.procedure_description.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
  spinnerShow(spinnerMessage) {
    this.loadingVisible = true;
    this.spinnerMessage = spinnerMessage;
  }
  spinnerHide() {
    this.loadingVisible = false;
  }

}
