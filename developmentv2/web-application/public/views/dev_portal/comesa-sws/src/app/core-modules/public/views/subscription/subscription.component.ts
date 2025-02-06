import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { ConfigurationsService } from 'src/app/services/configurations/configurations.service';
import { PublicDashboardService } from 'src/app/services/public-dashboard/public-dashboard.service';
import { UserManagementService } from 'src/app/services/user-management/user-management.service';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrl: './subscription.component.css'
})
export class SubscriptionComponent {

  data_record: any;
  is_subscribed: boolean;
  email_address: string;
  subscriptionItemData: any;
  publicationData: any;
  selectedTypeId: any;
  loading: boolean;
  subscriptionFrm: FormGroup;
  loadingVisible: boolean;
  islostpassword: boolean;
  spinnerMessage: string;
  response: any;
  constructor(
    private userService: UserManagementService,
    public publicservice: PublicDashboardService,
    private configService: ConfigurationsService,
    private router: Router,
    public translate: TranslateService,
    private fb: FormBuilder,
    public toastr: ToastrService
  ) {
    this.selectedTypeId = null;
    // this.subscriptionFrm.controls['publications_types_id'].setValue(this.selectedTypeId);
    this.subscriptionFrm = new FormGroup({
      email_address: new FormControl('', Validators.compose([Validators.required])),
      // publications_type_id: new FormControl('', Validators.compose([])),
    });
  }
  ngOnInit(): void {
    // this.onSubscribe();
    this.onloadSubscriptionFields();
    this.onloadPublicationInformation();
  }

  spinnerShow(spinnerMessage) {
    this.loadingVisible = true;
    this.spinnerMessage = spinnerMessage;
  }
  spinnerHide() {
    this.loadingVisible = false;
  }

  onloadSubscriptionFields() {

    var data_submit = {
      'table_name': 'par_publication_types'
    }
    this.publicservice.onLoadServicesDataset(data_submit)
      .subscribe(
        data => {

          this.data_record = data;

          if (this.data_record.success) {
            this.subscriptionItemData = this.data_record.data;
          }

        },
        error => {

        });

  }

  onloadPublicationInformation() {

    var data_submit = {
      'table_name': 'tra_publication_management'
    }
    this.publicservice.onLoadServicesDataset(data_submit)
      .subscribe(
        data => {

          this.data_record = data;

          if (this.data_record.success) {
            this.publicationData = this.data_record.data;
          }

        },
        error => {

        });

  }


  onCheckBoxValueChanged(event, itemId) {
    if (event) {
      // Checkbox is checked, update selectedTypeId
      this.selectedTypeId = itemId;
      this.subscriptionFrm.controls['publications_types_id'].setValue(itemId);
    } else {
      // Checkbox is unchecked, set selectedTypeId to undefined or null, depending on your requirement
      this.selectedTypeId = undefined; // or null
      this.subscriptionFrm.controls['publications_types_id'].setValue(null); // Reset the value
    }
  }

  // onUserSubscriptionRequest

  // onSubscribe() {

  //   // const formData = new FormData();
  //   // const invalid = [];
  //   const controls = this.subscriptionFrm.controls;
  //   for (const name in controls) {
  //     if (controls[name].invalid) {
  //       this.toastr.error('Fill In All Mandatory fields with (*), missing value on ' + name.replace('_id', ''), 'Alert');
  //       return;
  //     }
  //   }

  //   this.loading = true;
  //   this.spinnerShow('User Subscription........');
  //   if (this.subscriptionFrm.valid) {
  //     this.userService.onUserSubscriptionRequest(this.subscriptionFrm.value, 'onUserSubscriptionRequest').subscribe(
  //       (data) => {
  //         this.response = data;
  //         if (this.response.success) {
  //           this.toastr.success(this.response.message, 'Success');
  //           this.is_subscribed = true;
  //           this.email_address = this.subscriptionFrm.get('email_address')?.value;
  //         } else {
  //           this.toastr.error('Subscription failed: ' + this.response.message, 'Error', { timeOut: 10000 });
  //         }

  //         this.spinnerHide()
  //       },
  //       (error) => {
  //         this.toastr.error('Subscription failed: ' + error.error.message, 'Error', { timeOut: 10000 });
  //         this.spinnerHide()
  //       }
  //     );

  //   } else {
  //     // Handle invalid form or fields
  //     this.toastr.warning('Please fill in all required fields.', 'Warning');
  //     this.spinnerHide()

  //   }

  // }

  onSubscribe() {
    
    // const formData = new FormData();
    // const invalid = [];
    const controls = this.subscriptionFrm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        this.toastr.error('Fill In All Mandatory fields with (*), missing value on ' + name.replace('_id', ''), 'Alert');
        return;
      }
    }
    
    this.loading = true;
    this.spinnerShow('User Subscription........');
    if (this.subscriptionFrm.valid){
      this.userService.onUserSubscriptionRequest(this.subscriptionFrm.value, 'onUserSubscriptionRequest').subscribe(
        (data) => {
          this.response = data;
          if (this.response.success) {
            this.toastr.success(this.response.message, 'Success');
            this.is_subscribed = true;
            this.email_address = this.subscriptionFrm.get('email_address')?.value;
          } else {
            this.toastr.error('Subscription failed: ' + this.response.message, 'Error', { timeOut: 10000 });
          }
          
          this.spinnerHide()
        },
        (error) => {
          this.toastr.error('Subscription failed: ' + error.error.message, 'Error', { timeOut: 10000 });
          this.spinnerHide()
        }
      );
 
    } else {
      // Handle invalid form or fields
      this.toastr.warning('Please fill in all required fields.', 'Warning');
    this.spinnerHide()

    }
      
  }
}
