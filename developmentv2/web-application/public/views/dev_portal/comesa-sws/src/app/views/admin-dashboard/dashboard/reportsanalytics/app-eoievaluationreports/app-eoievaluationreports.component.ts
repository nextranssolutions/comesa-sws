import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ToastrService } from 'ngx-toastr';
import { AppSettings } from 'src/app/app-settings';
import { EncryptionService } from 'src/app/services/encryption/encryption.service';
import { ExpertsprofileserviceService } from 'src/app/services/expertprofile/expertsprofileservice.service';
import { ExpressionOfInterestManagementService } from 'src/app/services/expresion-of-interest-management/expression-of-interest-management.service';
import { ReportsService } from 'src/app/services/reports/reports.service';
import { UtilityService } from 'src/app/services/utilities/utility.service';

@Component({
  selector: 'app-app-eoievaluationreports',
  
  templateUrl: './app-eoievaluationreports.component.html',
  styleUrl: './app-eoievaluationreports.component.css'
})
export class AppEoievaluationreportsComponent {
  printReportTitle: string;
  isPrintReportVisible: boolean = false;
  printiframeUrl: any;

  dashboard_type_id: number = 2;
  isExpertsApplicationEvaluation:boolean;
  is_expertsreadonly:boolean;
  expressionOfInteretsEvaluationsData: any;
  systems_functionality_id: number;
  eoiDetailsDataForm: FormGroup;
  expertSelectionAndAppointmentForm: FormGroup;
  parameter_name: string = 'selection_and_appointment';
  table_name: string = 'tra_expertselectionand_appointment';
  expertEoiApplicationForm: FormGroup;
  expertsprofile_information_id: number;
  expressionofinterest_posting_id: number;
  selectedTabIndex: number;
  expert_profiledata: any;
  response: any;
  process_id = 20;
  application_code: number;
  selectionandappointment_id: number;
  experts_profile_no: string;
  app_reference_no: string;
  spinnerMessage: string;
  loadingVisible: boolean;
  show_advancesearch: boolean;
  categoryOfExpertData: any;
  usersInformationData: any;
  areaOfExpertisesData: any;
  eoiRegulatoryFunctionData: any;
  eoiEngagementData: any;
  eoiCategoryData: any;
  areasOfExpertiseData: any;
  eoiStatuseData: any;
  data_resp: any;
  regulatoryFunctionData: any;
  data_record: any;
  eoiGeneralInfoData: any[] = [];
  expressionOfInteretsApplications: any[] = [];
  active_eoi: number = 0;
  eoi_applied: number = 0;
  archived_closed: number = 0;
  approvalPopupVisible: boolean = false;
  currentData: any = null;
  popupWithScrollViewVisible = false;
  selectedEoi: any = null;
  appworkflowstatus_category_id: number;
  expertsApplicationListDashData:any;
  base_url:string;
  decryptedPayload:any;
  constructor(
    public translate: TranslateService,
    private router: Router,
    private modalService: NgbModal,
    public toastr: ToastrService,
    public utilityService: UtilityService,
    private expertsProfileService: ExpertsprofileserviceService,
    private spinner: SpinnerVisibilityService,
    private eoiService: ExpressionOfInterestManagementService,
    private formBuilder: FormBuilder,
    private reportingAnalytics: ReportsService,
    private encryptionService: EncryptionService
  ) {
    this.expertSelectionAndAppointmentForm = new FormGroup({
      expressionofinterest_posting_id: new FormControl('', Validators.compose([])),
    })
    this.base_url = AppSettings.base_url + '/api/reports'; 
    //this.onLoadEoiMyApplicationsCounters();
    //this.onLoadexpressionOfInteretsApplications()
  }
  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scrolling for better UX
    });
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

  permitActionColClick(e, data) {
    let action_btn = e.itemData;
    this.funcActionsProcess(action_btn.action, data.data);
  }
  onInitiateExpressionofEval(data) {
    this.currentData = data;
    //the experts_profile id 
    this.expressionofinterest_posting_id = data.id
    // this.onSelectButtonClick();
    this.eoiService.setApplicationDetail(this.currentData);
    const targetRoute = '/admin-ecres/expressionofinterest-evaluation';
    this.router.navigate([targetRoute])
    this.scrollToTop();
  }
  onReviewExpressionofEvaluations(data) {
    this.currentData = data;
    //the experts_profile id 
    this.expressionofinterest_posting_id = data.id
    // this.onSelectButtonClick();
    this.eoiService.setApplicationDetail(this.currentData);
    const targetRoute = '/admin-ecres/expressionofinterest-evalreview';
    this.router.navigate([targetRoute])
    this.scrollToTop();
  }
  onReviewEvaluationsonExpertsAppoinment(data) {
    this.currentData = data;
    //the experts_profile id 
    this.expressionofinterest_posting_id = data.id
    // this.onSelectButtonClick();
    this.eoiService.setApplicationDetail(this.currentData);
    const targetRoute = '/admin-ecres/eoievalreviewappointment';
    this.router.navigate([targetRoute])
    this.scrollToTop();
  }
  onPreviewExpressionofEvaluations(data) {
    this.currentData = data;
    //the experts_profile id 
    this.expressionofinterest_posting_id = data.id
    // this.onSelectButtonClick();
    this.eoiService.setApplicationDetail(this.currentData);
    const targetRoute = '/admin-ecres/previeweoievaluationsappointment';
    this.router.navigate([targetRoute])
    this.scrollToTop();
  }

  funcActionsProcess(action_btn, data) {
    if (action_btn === 'proceed_with_eoievaluation') {
      this.currentData = data;
      //the experts_profile id 
      this.expressionofinterest_posting_id = data.id
      // this.onSelectButtonClick();
      this.eoiService.setApplicationDetail(this.currentData);
      const targetRoute = '/admin-ecres/expressionofinterest-evaluation';
      this.router.navigate([targetRoute])
      this.scrollToTop();
    }
  }

  funcEditDetails(data) {
    this.eoiService.setApplicationDetail(data);
    this.router.navigate(['./admin-ecres/app-expert-selectionandappointment']);
    this.scrollToTop();
  }


  singleApplicationActionColClick(data) {
    this.funcActionsProcess(data.action, data);
  }

  onLoadregulatoryFunctionData() {
    let data_submit = {
      'table_name': 'par_regulatory_functions'
    }
    this.eoiService.onLoadExpressionOfInterestConfig(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.eoiRegulatoryFunctionData = this.data_record.data;
          }
        },
        error => {

        });
  }

  onloadEoiEngagementData() {
    let data_submit = {
      'table_name': 'par_engagement_types'
    }
    this.eoiService.onLoadExpressionOfInterestConfig(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.eoiEngagementData = this.data_record.data;
          }
        },
        error => {

        });
  }

  onloadEoiCategoryData() {
    let data_submit = {
      'table_name': 'eoi_category'
    }
    this.eoiService.onLoadExpressionOfInterestConfig(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.eoiCategoryData = this.data_record.data;
          }
        },
        error => {

        });
  }

  onLoadareasOfExpertiseData() {
    let data_submit = {
      'table_name': 'par_areasof_expertises'
    }
    this.eoiService.onLoadExpressionOfInterestConfig(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.areasOfExpertiseData = this.data_record.data;
          }
        },
        error => {

        });
  }
  onLoadExpresssionOfInteretsEvaluations(appworkflowstatus_category_id) {
    this.spinnerShow('Loading Information ...........');

    var data_submit = {
      'table_name': this.table_name,
      'appworkflowstatus_category_id': appworkflowstatus_category_id
    }
    this.eoiService.onLoadExpressionOfInterestDataUrl(data_submit, 'onLoadExpresssionOfInteretsEvaluations')
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.expressionOfInteretsEvaluationsData = this.decryptedPayload;
          }
          this.spinnerHide();
        },
        error => {

          this.spinnerHide();
        });
  }

  onLoadexpressionOfInteretsApplications(appworkflowstatus_category_id) {
    this.spinnerShow('Loading Information ...........');

    var data_submit = {
      'table_name': this.table_name,
      'appworkflowstatus_category_id': appworkflowstatus_category_id
    }
    this.eoiService.onLoadExpressionOfInterestDataUrl(data_submit, 'onLoadSelectionAndAppointmentsData')
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.expressionOfInteretsApplications = this.decryptedPayload;
          }
          this.spinnerHide();
        },
        error => {

          this.spinnerHide();
        });
  }

  onLoadcategoryOfExpertData() {
    this.spinnerShow('Loading ...........');

    let data_submit = {
      'table_name': 'par_experts_categories'
    }
    this.expertsProfileService.onLoadExpertsConfigData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.categoryOfExpertData = this.data_record.data;
          }
          this.spinnerHide();
        },
        error => {

          this.spinnerHide();
        });
  }


  onLoadareaOfExpertisesData() {
    this.spinnerShow('Loading ...........');

    let data_submit = {
      'table_name': 'par_areasof_expertises'
    }
    this.expertsProfileService.onLoadExpertsConfigData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.areaOfExpertisesData = this.data_record.data;
          }
          this.spinnerHide();
        },
        error => {

          this.spinnerHide();
        });
  }

  spinnerShow(spinnerMessage: string) {
    this.loadingVisible = true;
    this.spinnerMessage = spinnerMessage;
  }

  spinnerHide() {
    this.loadingVisible = false;
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

  onLoadEoiMyApplicationsCounters() {
    this.expertsProfileService.onLoadEoiMyApplicationsCounters()
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            let records = this.data_record.data;
            for (let rec of records) {
              if (rec.appworkflow_status_id == 1) {
                this.active_eoi = rec.statuses_counter;
              } if (rec.appworkflow_status_id == 2) {
                this.eoi_applied = rec.statuses_counter;
              } if (rec.appworkflow_status_id == 3) {
                this.archived_closed = rec.statuses_counter;
              }
            }
          }
        },
        error => {

        });
  }


  onLoadNumbreofExpressionApplication

  funcpopWidth(percentage_width: number) {
    return window.innerWidth * percentage_width / 100;
  }

  funcpopHeight(percentage_height: number) {
    return window.innerHeight * percentage_height / 100;
  }

  // previewexpressionofInterests(data) {
  //   //
  //   this.eoiService.setApplicationDetail(data);
  //   this.router.navigate(['/ecres/preview-expertcredentials']);
  // this.scrollToTop();
  // }

  onCancelApply() {
    this.approvalPopupVisible = false;
  }


  onSelectButtonClick() {
    this.approvalPopupVisible = true;
  }

  onCancelPopupClick() {
    this.approvalPopupVisible = false;
  }




  onExporting(e: DxDataGridTypes.ExportingEvent) {

    if (e.format == 'pdf') {
      this.reportingAnalytics.onExportingPDF(e)
    }
    else {
      this.reportingAnalytics.onExportingExcelData(e)
    }
  }

  onExpertsListCellPrepared(e) {

    if (e.rowType === "data" && e.column.dataField === "appointment_recommendation") {
      let appointment_recommendation_id = e.data.appointment_recommendation_id;
      if (appointment_recommendation_id == 1) {
        e.cellElement.style.color = 'white';
        e.cellElement.style.backgroundColor = '#008000';
      } else if (appointment_recommendation_id == 2) {
        e.cellElement.style.color = 'white';
        e.cellElement.style.backgroundColor = '#FF0000';

      } else {
        e.cellElement.style.color = 'white';
        e.cellElement.style.backgroundColor = '#D3D3D3';
      }
    }
  }
  expertsAppointmentListDashData:any;
  onLoadExpertsAppointmentListDashData() {
    this.spinnerShow('Loading Information ...........');
    var data_submit = {
      'table_name': this.table_name
    }
    this.eoiService.onLoadExpressionOfInterestDataUrl(data_submit, 'onLoadExpertsAppointmentListDashData')
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.expertsAppointmentListDashData = this.decryptedPayload;
          }
          this.spinnerHide();
        },
        error => {

          this.spinnerHide();
        });
  }
  
  onExpertsApplicationEvaluation(data) {

      //data.expressionofint_evaluation_id = this.expressionofint_evaluation_id;
      this.is_expertsreadonly = true;
      this.expert_profiledata = data;
      this.isExpertsApplicationEvaluation = true;
    
  }
  funcGenerateRrp(report_url, title) {

    this.printiframeUrl = this.utilityService.returnReportIframe(report_url);
    this.printReportTitle = title;
    this.isPrintReportVisible = true;

  }
  
  onPrintLetterOfAppointment(data){
    //print details

    let report_url = this.base_url+'/onPrintEOIExpertsLetterOfAppointment?expressionofinterests_application_id='+data.expressionofinterests_application_id+'&expressionofint_evaluation_id='+data.expressionofint_evaluation_id+'&expertsprofile_information_id='+data.expertsprofile_information_id;
    this.funcGenerateRrp(report_url,"Application Details");

}
}
