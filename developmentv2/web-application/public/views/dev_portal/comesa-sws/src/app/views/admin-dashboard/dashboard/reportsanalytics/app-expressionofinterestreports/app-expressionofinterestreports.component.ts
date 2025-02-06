import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import { DxTabPanelTypes } from 'devextreme-angular/ui/tab-panel';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ToastrService } from 'ngx-toastr';
import { EncryptionService } from 'src/app/services/encryption/encryption.service';
import { ExpressionOfInterestManagementService } from 'src/app/services/expresion-of-interest-management/expression-of-interest-management.service';
import { ReportsService } from 'src/app/services/reports/reports.service';
import { UtilityService } from 'src/app/services/utilities/utility.service';


@Component({
  selector: 'app-app-expressionofinterestreports',

  templateUrl: './app-expressionofinterestreports.component.html',
  styleUrl: './app-expressionofinterestreports.component.css'
})
export class AppExpressionofinterestreportsComponent {
  parameter_name: string;
  table_name: string;
  eoiGeneralInfoData: any[] = [];
  data_record: any;
  loadingVisible: boolean;
  spinnerMessage: string;
  is_readonly: boolean;
  eoi_id: number;
  selectedTabIndex = 0;
  iconPosition: any = "top";
  tabsPositions: DxTabPanelTypes.Position[] = [
    'left', 'top', 'right', 'bottom',
  ];
  tabsPosition: DxTabPanelTypes.Position = this.tabsPositions[0];
  application_code: number;
  appworkflow_status_id: number;
  process_id: number;
  on_showeoipreview: boolean;
  languageProficiencyData: any;
  pending_approval: number = 0;
  all_eoi: number = 0;
  draft_pending_review: number = 0;
  active_eoi: number = 0;
  eoi_under_review: number = 0;
  closed_eoi: number = 0;
  selectedRowData: any;
  scopeOfWorkData: any[] = [];
  eligibilityCriteriaData: any[] = [];
  qualificationsData: any;
  supportingDocumentsData: any;
  eoiEngagementTypesata: any;
  regulatoryFunctionData: any;
  document_type_id = 2;
  app_process_id: number;
  app_application_code: number;
  eoiCategoryData: any;
  areasOfExpertiseData: any;
  eoiSubmissionMethodData: any;
  eoiProficiencyLevelsData: any;
  prevappworkflow_status_id: number;
  eoiGeneralInformationForm: FormGroup;
  eoiScopeofWorkRegulatoryFunctionForm: FormGroup;
  eoiEligibilityCriteriaForm: FormGroup;
  eoiQualificationsForm: FormGroup;
  eoiLanguageProficiencyForm: FormGroup;
  periodSpanData: any;
  eoiSupportingDocumentsForm: FormGroup;
  eoiPublishingInformationForm: FormGroup;
  show_advancesearch: boolean;
  isEOIListPreviewWin: boolean;
  documentCategoryData: any;
  eoiLevelsOfStudyData: any;
  eoiLanguagesData: any;
  expression_of_interestdata: any;
  app_reference_no: string;

  menuItems = [
    {
      text: "Action",
      icon: 'menu',
      items: [
        { text: "Preview EOI", action: 'preview_expression_of_interest', icon: 'fa fa-eye' },

      ]
    }
  ];
  decryptedPayload:any;

  constructor(
    public router: Router,
    public toastr: ToastrService,
    public viewRef: ViewContainerRef,
    public utilityService: UtilityService,
    public modalService: NgxSmartModalService,
    public eoiService: ExpressionOfInterestManagementService,
    private reportingAnalytics: ReportsService,
    public translate: TranslateService,
    private formBuilder: FormBuilder,
    private encryptionService: EncryptionService
  ) {
    this.parameter_name = "expression_of_interests_requests";
    this.table_name = 'eoi_general_information';

    // this.onLoadEoiStatuseData();
    // this.onLoadExpressionOfInterestStatusCounters();

    this.onLoadExpressionOfInterestGeneralInfoData();

    this.eoiGeneralInformationForm = this.formBuilder.group({
      id: new FormControl('', Validators.compose([])),
      eoi_category_id: new FormControl('', Validators.compose([])),
      engagement_type_id: new FormControl('', Validators.compose([])),
      eoi_title: new FormControl('', Validators.compose([])),
      background_information: new FormControl('', Validators.compose([])),
      objectives: new FormControl('', Validators.compose([])),
      process_id: new FormControl('', Validators.compose([])),
      app_reference_no: new FormControl('', Validators.compose([])),
      appworkflow_status_id: new FormControl('', Validators.compose([])),
      application_code: new FormControl('', Validators.compose([])),
      eoiarea_of_expertise_id: new FormControl('', Validators.compose([])),
      eoiregulatory_function_id: new FormControl('', Validators.compose([])),
      eoi_regulatoryfunc_expertise: new FormControl('', Validators.compose([])),

    });


    this.eoiPublishingInformationForm = this.formBuilder.group({
      id: new FormControl('', Validators.compose([])),
      eoi_publishing_id: new FormControl('', Validators.compose([])),
      eoi_id: new FormControl('', Validators.compose([])),
      last_enquiry_date: new FormControl('', Validators.compose([])),
      period_spandefination_id: new FormControl('', Validators.compose([])),
      enquiries_submissions_to: new FormControl('', Validators.compose([])),
      submission_method_id: new FormControl('', Validators.compose([])),
      period_of_work: new FormControl('', Validators.compose([])),
      eoi_postingtargets_id: new FormControl('', Validators.compose([])),
      closing_date: new FormControl('', Validators.compose([])),
      publishing_remarks: new FormControl('', Validators.compose([])),
    });




    this.onloadEoiCategoryData();
    this.onloadeoiEngagementTypesata();
    this.onloadRegulatoryFunctionData();
    this.onLoadEoiScopeOfWorkConfig();
    this.onLoadEoiEligibilityCriteriaConfig();
    this.onLoadEoiQualificationsConfig();
    this.onloadLevelOfStudyData();
    this.onLoadEoiLanguageProficiencyConfig();
    this.onloadEoiLanguagesData();
    this.onloadeoiProficiencyLevelsData();
    this.onLoadEoiSupportingDocumentsConfig();
    this.onloadDocumentCategoryData();
    this.onloadEoiSubmissionMethodData();
    this.onLoadPeriodSpanData();
    this.onLoadExpressionOfInterestGeneralInfoData();
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

  // onViewEOIDetails(appworkflowstatus_category_id) {
  //   this.onLoadExpressionOfInterestGeneralInfoData(appworkflowstatus_category_id)
  // }

  funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width / 100;
  }
  funcpopHeight(percentage_height) {
    return window.innerHeight * percentage_height / 100;
  }

  spinnerShow(spinnerMessage) {
    this.loadingVisible = true;
    this.spinnerMessage = spinnerMessage;
  }
  spinnerHide() {
    this.loadingVisible = false;
  }
  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scrolling for better UX
    });
  }
  onLoadExpressionOfInterestGeneralInfoData() {
    this.spinnerShow('Loading Information ...........');

    var data_submit = {
      'table_name': this.table_name,
      // 'appworkflowstatus_category_id': appworkflowstatus_category_id
    }
    this.eoiService.onLoadExpressionOfInterestDataUrl(data_submit, 'onLoadEoiGenInfoData')
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.eoiGeneralInfoData = this.decryptedPayload;
          }
          this.isEOIListPreviewWin = true;
          this.spinnerHide();
        },
        error => {

          this.spinnerHide();
        });
  }

  onloadEoiCategoryData() {

    var data_submit = {
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

  onloadRegulatoryFunctionData() {

    var data_submit = {
      'table_name': 'par_regulatory_functions'
    }
    this.eoiService.onLoadExpressionOfInterestConfig(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.regulatoryFunctionData = this.data_record.data;
          }
        },
        error => {

        });
  }

  onLoadEoiScopeOfWorkConfig(eoi_id = 0) {
    this.spinnerShow('Loading scope of work regulatory and function ...........');
    var data_submit = {
      'table_name': 'eoi_scope_of_work_regulatory_function',
      'eoi_id': eoi_id
    }
    this.eoiService.onLoadExpressionOfInterestDataUrl(data_submit, 'onLoadExpressionOfInterestConfig')
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.scopeOfWorkData = this.decryptedPayload;
          }
          this.spinnerHide();
        },
        error => {

          this.spinnerHide();
        });
  }

  onLoadareasOfExpertiseData(regulatory_function_id) {
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

  onloadeoiProficiencyLevelsData() {

    var data_submit = {
      'table_name': 'par_langproficiency_levels'
    }
    this.eoiService.onLoadExpressionOfInterestConfig(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.eoiProficiencyLevelsData = this.data_record.data;
          }
        },
        error => {

        });
  }

  onloadDocumentCategoryData() {

    var data_submit = {
      'table_name': 'eoi_document_category'
    }
    this.eoiService.onLoadExpressionOfInterestConfig(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.documentCategoryData = this.data_record.data;
          }
        },
        error => {

        });
  }

  onloadEoiSubmissionMethodData() {

    var data_submit = {
      'table_name': 'par_submission_methods'
    }
    this.eoiService.onLoadExpressionOfInterestConfig(data_submit)
      .subscribe(
        data => {
          this.data_record = data;

          if (this.data_record.success) {
            this.eoiSubmissionMethodData = this.data_record.data;
          }
        },
        error => {

        });
  }

  funcRedirectToEOIRequest() {
    this.router.navigate(['/admin-ecres/eoi-reports']);
    this.scrollToTop();
  }

  onLoadPeriodSpanData() {

    var data_submit = {
      'table_name': 'par_timespan_definations'
    }
    this.eoiService.onLoadExpressionOfInterestConfig(data_submit)
      .subscribe(
        data => {
          this.data_record = data;

          if (this.data_record.success) {
            this.periodSpanData = this.data_record.data;
          }
        },
        error => {

        });

  }

  onLoadEoiSupportingDocumentsConfig(eoi_id = 0) {
    this.spinnerShow('Loading EOI documents...........');
    var data_submit = {
      'table_name': 'eoi_documents_tosubmit',
      'eoi_id': eoi_id
    }
    this.eoiService.onLoadExpressionOfInterestDataUrl(data_submit, 'onLoadExpressionOfInterestConfig')
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.supportingDocumentsData = this.decryptedPayload;
          }
          this.spinnerHide();
        },
        error => {

          this.spinnerHide();
        });
  }

  onloadEoiLanguagesData() {

    var data_submit = {
      'table_name': 'par_languages'
    }
    this.eoiService.onLoadExpressionOfInterestConfig(data_submit)
      .subscribe(
        data => {
          this.data_record = data;

          if (this.data_record.success) {
            this.eoiLanguagesData = this.data_record.data;
          }
        },
        error => {

        });
  }

  onLoadEoiLanguageProficiencyConfig(eoi_id = 0) {
    this.spinnerShow('Loading language proficiency qualification...........');
    var data_submit = {
      'table_name': 'eoi_language_proficiency',
      'eoi_id': eoi_id
    }
    this.eoiService.onLoadExpressionOfInterestDataUrl(data_submit, 'onLoadExpressionOfInterestConfig')
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.languageProficiencyData = this.decryptedPayload;
          }
          this.spinnerHide();
        },
        error => {

          this.spinnerHide();
        });
  }

  onloadLevelOfStudyData() {

    var data_submit = {
      'table_name': 'par_levelsof_study'
    }
    this.eoiService.onLoadExpressionOfInterestConfig(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.eoiLevelsOfStudyData = this.data_record.data;
          }
        },
        error => {

        });
  }

  onLoadEoiQualificationsConfig(eoi_id = 0) {
    this.spinnerShow('Loading EOI qualification...........');
    var data_submit = {
      'table_name': 'eoi_qualifications',
      'eoi_id': eoi_id
    }
    this.eoiService.onLoadExpressionOfInterestDataUrl(data_submit, 'onLoadExpressionOfInterestConfig')
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.qualificationsData = this.decryptedPayload;
          }
          this.spinnerHide();
        },
        error => {

          this.spinnerHide();
        });
  }


  onLoadEoiEligibilityCriteriaConfig(eoi_id = 0) {
    this.spinnerShow('Loading eligibility criteria ...........');
    var data_submit = {
      'table_name': 'eoi_eligibility_criteria',
      'eoi_id': eoi_id
    }
    this.eoiService.onLoadExpressionOfInterestDataUrl(data_submit, 'onLoadExpressionOfInterestConfig')
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.eligibilityCriteriaData = this.decryptedPayload;
          }
          this.spinnerHide();
        },
        error => {

          this.spinnerHide();
        });
  }

  onloadeoiEngagementTypesata() {

    var data_submit = {
      'table_name': 'par_engagement_types'
    }
    this.eoiService.onLoadExpressionOfInterestConfig(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.eoiEngagementTypesata = this.data_record.data;
          }
        },
        error => {

        });
  }

  onCellPrepared(e) {

    if (e.rowType === "data" && e.column.dataField === "appworkflow_status_id") {
      let appworkflow_status_id = e.data.appworkflow_status_id;

      if (appworkflow_status_id == 1) {

        e.cellElement.style.color = 'white';
        e.cellElement.style.backgroundColor = '#57504d';

      } else if (appworkflow_status_id == 3) {

        e.cellElement.style.color = 'white';
        e.cellElement.style.backgroundColor = '#8bbd78';

      } else if (appworkflow_status_id == 2) {
        e.cellElement.style.color = 'white';
        e.cellElement.style.backgroundColor = '#78a5a3';
      } else if (appworkflow_status_id == 5) {
        e.cellElement.style.color = 'white';
        e.cellElement.style.backgroundColor = '#fdb100';
      } else {
        e.cellElement.style.color = 'white';
        e.cellElement.style.backgroundColor = '#ce5a57';
      }
    }
  }


  // onNextNavigationItems(nextStep) {
  //   // this.selectedTabIndex = nextStep;
  //   if (nextStep > 0) {
  //     this.eoi_id = this.eoiGeneralInformationForm.get('id')?.value;
  //   } else {
  //     this.selectedTabIndex = nextStep;
  //   }
  // }

  onNextNavigationItems(nextStep) {
    // this.selectedTabIndex = nextStep;
    if (nextStep > 0) {
      this.eoi_id = this.eoiGeneralInformationForm.get('id')?.value;

      if (this.eoi_id < 1) {
        //validate the form based on saving 
        this.selectedTabIndex = 0;
        this.toastr.error('Kindly save details before moving to the next step.', 'Response');
      } else {

        this.selectedTabIndex = nextStep;
      }
    } else {
      this.selectedTabIndex = nextStep;
    }
  }

  eoiGenInfoActionClick(e, data) {
    var action_btn = e.itemData;
    if (action_btn.action === 'preview_expression_of_interest') {
      this.is_readonly = true;

      this.funcPreviewExpressionofInterets(data.data);
    }
  }


  funcPreviewExpressionofInterets(data) {
    this.eoiGeneralInformationForm.patchValue(data);
    this.eoiPublishingInformationForm.patchValue(data);
    this.onLoadEoiSupportingDocumentsConfig(data.eoi_id);
    this.onLoadEoiLanguageProficiencyConfig(data.eoi_id);
    this.onLoadEoiQualificationsConfig(data.eoi_id);
    this.onLoadEoiEligibilityCriteriaConfig(data.eoi_id);
    this.onLoadEoiScopeOfWorkConfig(data.eoi_id);

    this.on_showeoipreview = true;

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
