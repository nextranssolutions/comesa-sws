import { Component, HostListener, Input, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ToastrService } from 'ngx-toastr';
import { InformationSharingService } from 'src/app/services/information-sharing/information-sharing.service';
import { UtilityService } from 'src/app/services/utilities/utility.service';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import { ReportsService } from 'src/app/services/reports/reports.service';
import { DxTabPanelTypes } from 'devextreme-angular/ui/tab-panel';
import { EncryptionService } from 'src/app/services/encryption/encryption.service';

@Component({
  selector: 'app-ecred-resourcesmanagement',
  templateUrl: './ecred-resourcesmanagement.component.html',
  styleUrl: './ecred-resourcesmanagement.component.css'
})
export class EcredResourcesmanagementComponent {

  @Input() application_code: number;
  @Input() process_id: number;
  @Input() document_type_id: number;
  @Input() appworkflow_status_id: number;
  @Input() is_readonly: boolean;
  dashboard_title:string ='E-CRES Resources Management';
  archivedSystemResources:number =0;
  publishedResources:number =0;
  requestforAdditionInfoPublications:number =0;
  openPendingPublishingResources:number =0;
  iconPosition: any = "top";
  table_name: string;
  resourceManagementForm: FormGroup;
  response: any;
  resource_data: any;
  data_record: any;
  confirmationData: any;
  app_reference_no: string;
  loadingVisible: boolean;
  isShowAppProcessSubmission: boolean;
  spinnerMessage: string;
  resource_id: number;
  selectedTabIndex = 0;
  resourceManagementData: any[] = [];
  dashboard_url:string ="/admin-ecres/app-ecredresource-dashboard";

  tabsPositions: DxTabPanelTypes.Position[] = [
    'left', 'top', 'right', 'bottom',
  ];
  tabsPosition: DxTabPanelTypes.Position = this.tabsPositions[0];
  stylingModes: DxTabPanelTypes.TabsStyle[] = ['primary', 'secondary'];
  stylingMode: DxTabPanelTypes.TabsStyle = this.stylingModes[0];
  screenWidth: number;
  decryptedPayload:any;
  constructor(
    private spinner: SpinnerVisibilityService,
    private router: Router,
    public toastr: ToastrService,
    public viewRef: ViewContainerRef,
    public utilityService: UtilityService,
    public modalService: NgxSmartModalService,
    private formBuilder: FormBuilder,
    private infoService: InformationSharingService,
    private reportingAnalytics: ReportsService,
    private encryptionService:EncryptionService
  ) {
    this.table_name = 'tra_resources_managementrepository';

     this.resourceManagementForm = this.formBuilder.group({
      id: new FormControl('', Validators.compose([])),
      resource_id: new FormControl('', Validators.compose([])),
      title: new FormControl('', Validators.compose([])),
      description: new FormControl('', Validators.compose([])),
      resource_type: new FormControl('', Validators.compose([])),
      resource_category: new FormControl('', Validators.compose([])),
      file_path: new FormControl('', Validators.compose([])),

      app_reference_no: new FormControl('', Validators.compose([])),
      appworkflow_status_id: new FormControl('', Validators.compose([])),
      application_code: new FormControl('', Validators.compose([])),
    });

    if (this.infoService.getApplicationDetail()) {
      this.resource_data = this.infoService.getApplicationDetail();
      this.app_reference_no = this.resource_data.app_reference_no;
      this.application_code = this.resource_data.application_code;
      this.resource_id = this.resource_data.resource_id;
      this.appworkflow_status_id = this.resource_data.appworkflow_status_id;
      this.process_id = this.resource_data.process_id;
      
      this.resourceManagementForm.patchValue(this.resource_data);
      
      this.onLoadResourceManagementData(this.resource_id);
    }
    else {

      this.router.navigate([this.dashboard_url]);
    } 


    this.checkScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void{
    this.screenWidth = window.innerWidth;
    this.checkScreenSize();
  }

  checkScreenSize(): void{
    if(this.screenWidth < 768){
      this.tabsPosition = 'top';
    }else{
      this.tabsPosition = 'left';
    }
  }

  
  onFuncSubmitResource() {
    this.isShowAppProcessSubmission= true;
  }
  onFuncReturntoDashboard() {
    this.router.navigate(['./admin-ecres/app-ecredresource-dashboard']);
  }
  onLoadconfirmationData() {
    let data_submit = {
      'table_name': 'par_confirmations'
    }
    this.infoService.onLoadInformationSharingConfig(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.confirmationData = this.data_record.data;
          }
        },
        error => {
          
        });
  }

  onLoadResourceManagementData(appworkflow_status_id = 0) {
    this.spinnerShow('Loading Information ...........');

    var data_submit = {
      'table_name': this.table_name,
      'appworkflow_status_id': appworkflow_status_id
    }
    this.infoService.onLoadInformationSharingDataUrl(data_submit, 'onLoadExpertsResourceManagement')
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.resourceManagementData = this.decryptedPayload;
          }
          this.spinnerHide();
        },
        error => {
          
          this.spinnerHide();
        });
  }


  onFuncSaveResource() {

    const formData = new FormData();
    const invalid = [];
    const controls = this.resourceManagementForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        this.toastr.error('Fill In All Mandatory fields with (*), missing value on ' + name.replace('_id', ''), 'Alert');
        return;
      }
    }
    if (this.resourceManagementForm.invalid) {
      this.toastr.error('Please fill in all mandatory fields.', 'Alert');
      return;
    }

    this.spinnerShow('Saving resource .........');
    this.spinner.show();
    this.infoService.onSaveInformationSharingDetails(this.table_name, this.resourceManagementForm.value, 'onSaveResourceManagement')
      .subscribe(
        response => {
          this.response = response;
          if (this.response.success) {
            this.resource_id = this.response.resource_id;
            this.application_code = this.response.application_code;
            this.app_reference_no = this.response.app_reference_no;
            this.resourceManagementForm.get('id')?.setValue(this.resource_id);
            this.onLoadResourceManagementData();
            this.selectedTabIndex = 1;
            this.toastr.success(this.response.message, 'Response');
            this.spinnerHide();
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

  spinnerShow(spinnerMessage) {
    this.loadingVisible = true;
    this.spinnerMessage = spinnerMessage;
  }
  spinnerHide() {
    this.loadingVisible = false;
  }

  funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width / 100;
  }
  funcpopHeight(percentage_height) {
    return window.innerHeight * percentage_height / 100;
  }

  funcInfoTabClick(e) {
    let tab_index = e.itemIndex;

    if (tab_index > 0) {
      this.resource_id = this.resourceManagementForm.get('id')?.value;
      if (this.resource_id < 1) {
        this.selectedTabIndex = 0;
        this.toastr.error('Kindly save details before moving to the next step.', 'Response');
      }
    }
  }

  onNextNavigationItems(nextStep) {
    // this.selectedTabIndex = nextStep;
    if (nextStep > 0) {
      this.resource_id = this.resourceManagementForm.get('id')?.value;

      if (this.resource_id < 1) {
        this.selectedTabIndex = 0;
        this.toastr.error('Kindly save details before moving to the next step.', 'Response');
      } else {

        this.selectedTabIndex = nextStep;
      }
    } else {
      this.selectedTabIndex = nextStep;
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

}