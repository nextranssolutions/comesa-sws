import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ToastrService } from 'ngx-toastr';
import { ConfigurationsService } from 'src/app/core-services/configurations/configurations.service';
import { DocumentManagementService } from 'src/app/core-services/document-management/document-management.service';
import { UtilityService } from 'src/app/core-services/utilities/utility.service';
import { PremisesLicensingService } from '../../../services/premises-licensing.service';
import { AuthenticationService } from 'src/app/core-services/authentication/authentication.service';

@Component({
  selector: 'app-premises-productline-details',
  templateUrl: './premises-productline-details.component.html',
  styleUrl: './premises-productline-details.component.css'
})
export class PremisesProductlineDetailsComponent {
  isReadOnly: boolean;
  gmpProductLineDataRows: any;
  gmpproductDetailsInformationData: any;

  data_response: any;
  is_readonly: boolean;
  product_lineData: any;
  productlineCategoryData: any;
  productlineDescriptionData: any;

  isProductLinePopupVisible: any;
  isManufacturingSiteProductsDetails: boolean;
  isgmpAddProductsModalShow: boolean;

  gmpProductLineDetailsfrm: FormGroup;
  pharmaceuticallicGeneraldetailsfrm: FormGroup;
  pharmaceutical_license_id: number;
  section_id: number;
  title: string = 'Product Line';

  constructor(public spinner: SpinnerVisibilityService, public configService: ConfigurationsService, public appService: PremisesLicensingService, public router: Router, public formBuilder: FormBuilder, public config: ConfigurationsService,  public toastr: ToastrService, public authService: AuthenticationService, public dmsService: DocumentManagementService, public utilityService: UtilityService, public httpClient: HttpClient) {


  }
  ngOnInit() {
    if (this.section_id == 4) {

      this.title = 'Medical Devices ';
    }
    this.onLoadgmpProductLineDataRows(this.pharmaceutical_license_id)

  }
  funAddGMPproductLineDetails() {
    this.isProductLinePopupVisible = true;
    //reset the form  
    this.gmpProductLineDetailsfrm.reset();

  } funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width / 100;
  }
  funcDeleteManSiteBlockDetails(data) {
    //func_delete records 
    let record_id = data.data.id;
    let pharmaceutical_license_id = data.data.pharmaceutical_license_id;
    let table_name = 'wb_manufacturingsite_blocks';
    this.funcDeleteDetailhelper(record_id, pharmaceutical_license_id, table_name, 'site_block', 'Blocks');

  }
  onPremisesProductsLineToolbar(e, is_readonly = false) {

    this.functDataGridToolbar(e, this.funAddGMPproductLineDetails, 'Product Line Details ', is_readonly);

  } funcEditProductLineDetails(data) {
    this.gmpProductLineDetailsfrm.patchValue(data.data);
    this.isProductLinePopupVisible = true;
  }
  funcDeleteProductLineDetails(data) {
    //func_delete records 
    let record_id = data.data.id;
    let pharmaceutical_license_id = data.data.pharmaceutical_license_id;
    let table_name = 'wb_gmp_productline_details';
    this.funcDeleteDetailhelper(record_id, pharmaceutical_license_id, table_name, 'product_line', 'Product Line');

  }

  funcDeleteGMPProductLineDetails(data) {
    //func_delete records 
    let record_id = data.data.id;
    let pharmaceutical_license_id = data.data.pharmaceutical_license_id;
    let table_name = 'wb_product_pharmaceuticalinspectiondetails';
    this.funcDeleteDetailhelper(record_id, pharmaceutical_license_id, table_name, 'gmpproducts', 'Manufacturing Product Line');

  }
  funcDeleteDetailhelper(record_id, pharmaceutical_license_id, table_name, reload_type, title) {
    /*  this.modalServ.openDialog(this.viewRef, {
        title: 'Are You sure You want to delete ' + title + '?',
        childComponent: '',
        settings: {
          closeButtonClass: 'fa fa-close'
        },
        actionButtons: [
          {
            text: 'Yes',
            buttonClass: 'btn btn-danger',
            onAction: () => new Promise((resolve: any, reject: any) => {
              this.appService.onDeletePharmaceuticalLicDetails(record_id, table_name, pharmaceutical_license_id, title)
                //.pipe(first())
                .subscribe(
                  data_response => {
                    let resp = data_response.json();
  
                    if (resp.success) {
                      if(reload_type == 'product_line'){
                        this.onLoadgmpProductLineDataRows(pharmaceutical_license_id) 
                      }
                      else if(reload_type == 'gmpproducts'){
                        this.onLoadgmpproductDetailsInformationData(pharmaceutical_license_id) 
                      }
                      
                      this.toastr.success(resp.message, 'Response');
                    }
                    else {
                      this.toastr.error(resp.message, 'Alert');
                    }
                  },
                  error => {
                    return false
                  });
              resolve();
            })
          },
          {
            text: 'no',
            buttonClass: 'btn btn-default',
            onAction: () => new Promise((resolve: any) => {
  
              resolve();
  
            })
          }
        ]
      });
      */
  } onSavePremisesProductlineDetails() {
    if (this.gmpProductLineDetailsfrm.invalid) {
      return;
    }
    //also get the premises ID
    this.appService.onSavePremisesProductLineDetails(this.pharmaceutical_license_id, this.gmpProductLineDetailsfrm.value)
      .subscribe(
        response => {
          this.data_response = response;
          if (this.data_response.success) {
            this.toastr.success(this.data_response.message, 'Response');
            this.isProductLinePopupVisible = false;
            this.onLoadgmpProductLineDataRows(this.pharmaceutical_license_id);
          } else {
            this.toastr.error(this.data_response.message, 'Alert');
          }
        },
        error => {
          //    this.loading = false;
        });
  } onLoadgmpproductDetailsInformationData(pharmaceutical_license_id) {

    this.appService.getPremisesDataDetails({ pharmaceutical_license_id: pharmaceutical_license_id }, 'premises-registration/getgmpproductDetailsInformationData')
      .subscribe(
        data => {
          if (data.success) {
            this.gmpproductDetailsInformationData = data.data;
          }
          else {
            this.toastr.success(data.message, 'Alert');
          }
        },
        error => {
          return false
        });

  }
  onLoadgmpProductLineDataRows(pharmaceutical_license_id) {

    this.appService.getPremisesDataDetails({ pharmaceutical_license_id: pharmaceutical_license_id, section_id: this.section_id }, 'premises-registration/getPremisesProductLinedetails')
      .subscribe(
        data => {
          if (data.success) {
            this.gmpProductLineDataRows = data.data;
          }
          else {
            this.toastr.success(data.message, 'Alert');
          }
        },
        error => {
          return false
        });

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
}