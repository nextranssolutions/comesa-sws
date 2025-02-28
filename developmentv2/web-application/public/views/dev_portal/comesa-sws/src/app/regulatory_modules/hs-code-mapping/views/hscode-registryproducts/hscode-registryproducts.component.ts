import { Component, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ToastrService } from 'ngx-toastr';
import { ServiceAdmnistrationService } from 'src/app/core-services/system-admnistration/system-admnistration.service';
import { UtilityService } from 'src/app/core-services/utilities/utility.service';

@Component({
  selector: 'app-hscode-registryproducts',
  templateUrl: './hscode-registryproducts.component.html',
  styleUrl: './hscode-registryproducts.component.css'
})
export class HscodeRegistryproductsComponent {
  table_name: string = 'tra_hscodesproducts_registry';
  parameter_name: string = 'hscodes_products_registry';
  show_advancesearch: boolean;
  is_enabled: boolean;
  data_record: any;
  productRegistryDetails: any;



  actionsMenuItems = [
    {
      text: "Action",
      icon: 'menu',
      items: [
        //  { text: "View", action: 'view_record', icon: 'fa fa-eye' },
        { text: "Edit Permit Type", action: 'edit_record', icon: 'fa fa-edit' },
        { text: "Delete", action: 'delete_record', icon: 'fa fa-trash' },
        { text: "Enable/Disable", action: 'enable_record', icon: 'fa fa-check' }
      ]
    }
  ];

  createNewDataFrm: FormGroup;
  productRegistryPopupVisible: boolean = false;

  constructor(
      private spinner: SpinnerVisibilityService,
      private router: Router,
      public toastr: ToastrService,
      public viewRef: ViewContainerRef,
      public utilityService: UtilityService,
  
      private admnistrationService: ServiceAdmnistrationService,
     
    ) {
  
      this.createNewDataFrm = new FormGroup({
        id: new FormControl('', Validators.compose([])),
        name: new FormControl('', Validators.compose([])),
        description: new FormControl('', Validators.compose([])),
        chapters_defination_id: new FormControl('', Validators.compose([])),
        heading_definations_id: new FormControl('', Validators.compose([])),
        subheading_definations_id: new FormControl('', Validators.compose([])),
        code: new FormControl('', Validators.compose([])),
        is_enabled: new FormControl('', Validators.compose([]))
      });
    }

    ngOnInit() {
      this.fetchProductRegistryDetails();
      
  
    }

   onCellPrepared(e) {
    this.utilityService.onCellCountriesPrepared(e);
  }


  onAddNewProductRegistry() {
    this.createNewDataFrm.reset();
    this.productRegistryPopupVisible = true;
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

  fetchProductRegistryDetails() {

    var data_submit = {
      'table_name': this.table_name
    }
    this.admnistrationService.onLoadTransactionProductRegistryDetails(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.productRegistryDetails = this.data_record.data;
          }

        },
        error => {

        });

  }

  funcActionColClick(e, data) {
    var action_btn = e.itemData;
    // if (action_btn.action === 'edit_record') {
    //   this.funcEditDetails(data);
    // } else if (action_btn.action === 'delete_record') {
    //   this.funcDeleteDetails(data);
    // } else if (action_btn.action === 'enable_record') {
    //   this.funcEnableDisableRecord(data);
    // } else if (action_btn.action === 'block_record') {
    //   this.funcDeleteDetails(data);
    // }
  } 
}



