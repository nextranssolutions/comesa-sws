import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfigurationsService } from 'src/app/core-services/configurations/configurations.service';
import { PublicDashboardService } from 'src/app/core-services/public-dashboard/public-dashboard.service';

@Component({
  selector: 'app-search-procedures',
  templateUrl: './search-procedures.component.html',
  styleUrl: './search-procedures.component.css'
})
export class SearchProceduresComponent implements OnInit{
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
  constructor(
    private route: ActivatedRoute,
    public configService: ConfigurationsService,
    public publicservice: PublicDashboardService
  ) {}

  ngOnInit() {
    // Get parameters from the route
    this.route.queryParams.subscribe(params => {
      this.operationTypeId = params['operationTypeId'];
      this.selectedProduct = params['product'];

      // Load procedures based on selection
      // this.loadProcedures();
      this.onLoadProcedureData()
    });
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
  loadProcedures() {
    // Mock procedure data (replace with API call)
    this.procedures = [
      { id: 1, title: 'Procedure 1', description: 'Step-by-step guide for procedure 1.' },
      { id: 2, title: 'Procedure 2', description: 'Step-by-step guide for procedure 2.' },
      { id: 3, title: 'Procedure 3', description: 'Step-by-step guide for procedure 3.' }
    ];
  }
}
