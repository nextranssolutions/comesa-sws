import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import { ToastrService } from 'ngx-toastr';
import { ReportsService } from 'src/app/core-services/reports/reports.service';
import { WokflowManagementService } from 'src/app/core-services/workflow-management/wokflow-management.service';
import { ImportExportService } from 'src/app/regulatory_modules/importexport-control/services/import-export.service';

@Component({
  selector: 'app-sharedevaluation-checklist',
  templateUrl: './sharedevaluation-checklist.component.html',
  styleUrl: './sharedevaluation-checklist.component.css'
})
export class SharedevaluationChecklistComponent {
  response: any;
  evaluation_changes: any;
  @Input() application_code: number;
  @Input() transactionpermit_type_id: number;
  @Input() expertEvaluationFrm: FormGroup;
  issupervisors_marks: boolean;
  issecond_appraisor_marks: boolean;
  isthird_appraisor_marks: boolean;

  sectionpanel_title: string = "permittype_checklist";
  applicantEvaluationChecklistDetails: any;
  loadingVisible: boolean;
  show_advancesearch: boolean;
  spinnerMessage: string;
  data_record: any;
  process_id: number = 2;
  changes: any;
  selectTextOnEditStart: boolean;

  constructor(
    private router: Router, 
    public toastr: ToastrService, 
    private http: HttpClient,
    private reportingAnalytics: ReportsService,
    public workflowService: WokflowManagementService,
    public appService: ImportExportService,
  ) {
this.onLoadEvaluationChecklistDetails();
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

  onLoadEvaluationChecklistDetails() {
    this.spinnerShow('Loading Experts Performance Evaluation details ...........');

    var data_submit = {
      'transactionpermit_type_id': this.transactionpermit_type_id,
      'application_code': this.application_code,
      'process_id': this.process_id
    }
    this.appService.onGetApplicantProfileInformation(data_submit, 'onLoadEvaluationChecklistDetails')
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.applicantEvaluationChecklistDetails = this.data_record.data;
          }
          this.spinnerHide();

        },
        error => {

          this.spinnerHide();
        });
  }
  onAdvancedSearch(e) {
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
  }  onActivatetheAdvanceSearch(e) {

    this.show_advancesearch = e.value;

  }

  onExporting(e: DxDataGridTypes.ExportingEvent) {

    if (e.format == 'pdf') {
      this.reportingAnalytics.onExportingPDF(e)
    }
    else {
      this.reportingAnalytics.onExportingExcelData(e)
    }
  }
  onSavingApplicantEvaluationChecklistDetails(e) {
    // apply changes to local data
    // application_code expertsperformance_evaluation_id  process_id
    this.changes = [];
    this.evaluation_changes = e.changes;

    for (let rec of this.evaluation_changes) {

      let data_changeobj = {
        checklist_defination_id: rec.key.checklist_defination_id,
        // marks_allocated: rec.data.marks_allocated,
        self_assessment: rec.data.self_assessment,
        assessment: rec.data.assessment,
        assessment_review: rec.data.assessment_review,
        application_code: this.application_code,
        transactionpermit_type_id: this.transactionpermit_type_id
      };
      this.changes.push(data_changeobj);
    }
    //call to the back end 
    if (this.changes) {
      let post_data = JSON.stringify(this.changes);
      this.spinnerShow('Saving....');
      this.appService.onSavingApplicantEvaluationChecklistDetails('tra_transactionpermit_checklists', '', post_data, 'onSavingApplicantEvaluationChecklistDetails')
        .subscribe(
          response => {
            this.response = response;
            //the details 
            if (this.response.success) {
              this.onLoadEvaluationChecklistDetails();
              this.toastr.success(this.response.message, 'Response');
              this.spinnerHide();

            } else {
              this.toastr.error(this.response.message, 'Alert');
            }
            // this.spinner.hide();
            this.spinnerHide();
          },
          error => {
            this.toastr.error('Error Occurred', 'Alert');
            // this.spinner.hide();
            this.spinnerHide();
          });
    }

  }
}
