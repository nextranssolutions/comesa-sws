import { Component, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ToastrService } from 'ngx-toastr';
import { AppSettings } from 'src/app/app-settings';
import { AuthService } from 'src/app/services/auth.service';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { timeInterval } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';


// handleLoginError
@Component({
  selector: 'app-ecred-secretariatsignin',
  templateUrl: './ecred-secretariatsignin.component.html',
  styleUrl: './ecred-secretariatsignin.component.css'
})
export class EcredSecretariatsigninComponent {
  system_title:string = AppSettings.system_title;
  signInFrm:FormGroup;
  submitted = false;
  loading = false;
  message:string;
  success:boolean;
  email_address:string;
  islostpassword:boolean;
  forgotPasswordFrm:FormGroup;
  siteKey:any = AppSettings.siteKey;
  mis_url:string = AppSettings.mis_url;
  auth_response: any;
  userGroupName: string = ''; // Initialize with an empty string or default value
  userFirstName: string = '';
  userCountryOfOrigin: string = '';

// database slide
  dataGallery: string[] = [
    '../../../../assets/dist/img/eac_partners.webp',
    '../../../../assets/dist/img/gallery/eac-data.jpg',
    '../../../../assets/dist/img/gallery/carousel-1.jpg',
    '../../../../assets/dist/img/gallery/carousel-2.jpg',
    // '../../../../assets/dist/img/gallery/carousel-3.jpg',
    // '../../../../assets/dist/img/gallery/carousel-4.jpg',
    // '../../../../assets/dist/img/gallery/carousel-5.jpg',
    // '../../../../assets/dist/img/gallery/carousel-6.jpg',
    // '../../../../assets/dist/img/gallery/carousel-7.jpg',
    // '../../../../assets/dist/img/gallery/Hargeisa.jpg',
    // '../../../../assets/dist/img/gallery/Namugongo-2.jpg',
  ];


  slideshowDelay = 3000;

valueChanged(e) {
  this.slideshowDelay = e.value ? 2000 : 0;
}
  

  private baseUrl ;

  var_1: number;
  var_2: number;
  sum_var: number;

 
partnerStatesCount: number = 0; // Initialize count
eacSupplierCount: number = 0; // Initialize count
eacManufacturersCount: number = 0; // Initialize count
healthCommoditiesCount: number = 0; // Initialize count
// total count ends here
loadingVisible: boolean;
spinnerMessage: string;
isLoggedIn: boolean;
dashboard_name: string;
dashboard_link: string;

  constructor(
    private spinner:SpinnerVisibilityService, 
    private router: Router,  
    public authService: AuthenticationService,
    public toastr: ToastrService,
    public viewRef: ViewContainerRef) {
      const base_url = AppSettings.base_url;
    
     
    }
    scrollToTop(): void {
      window.scrollTo({
        top: 0,
        behavior: 'smooth' // Smooth scrolling for better UX
      });
    }
    spinnerShow(spinnerMessage) {
      this.loadingVisible = true;
      this.spinnerMessage = spinnerMessage;
    }
    spinnerHide() {
      this.loadingVisible = false;
    }
    // LOGIN METHOD LOGIC START

    funcLoginCapture(){
        this.var_1 = Math.floor(Math.random() * 11);
        this.var_2 = Math.floor(Math.random() * 11);

        this.sum_var = this.var_1 +this.var_2;
        
    }

    onSignIn() {

      const email = this.signInFrm.get('email_address')?.value;
      const password = this.signInFrm.get('password')?.value;
      const otp_value = this.signInFrm.get('otp_value')?.value;
  
      const formData = new FormData();
      const invalid = [];
      const controls = this.signInFrm.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          this.toastr.error('Fill In All Mandatory fields with (*), missing value on ' + name.replace('_id', ''), 'Alert');
          return;
        }
      }
      if (this.signInFrm.invalid) {
        return;
      }
  
      this.loading = true;
      this.spinnerShow('User Login........');
      
      this.authService.login(btoa(email), btoa(password), (otp_value))
        //.pipe(first())
        .subscribe(
          response => {
            this.auth_response = response;
            this.message = this.auth_response.message;
            this.success = this.auth_response.success;
            if (this.success) {
              let access_token = this.auth_response.access_token;
              let isLoggedIn = this.auth_response.isLoggedIn;
              if (access_token != '' && isLoggedIn) {
                localStorage.setItem('isLoggedIn', this.auth_response.isLoggedIn);
                localStorage.setItem('user', JSON.stringify(this.auth_response));
  
                this.toastr.success(this.message, 'Success!');
                this.isLoggedIn = this.auth_response.isLoggedIn;
                this.dashboard_name = this.auth_response.dashboard_name;
                this.dashboard_link = this.auth_response.dashboard_link;
  
                const token = this.auth_response.authorisation.token;
                this.authService.storeToken(token);
                // this.userFirstName = this.auth_response.first_name;
  
                localStorage.setItem('id', this.auth_response.id);
                localStorage.setItem('user_group_name', this.auth_response.user_group_name);
                localStorage.setItem('first_name', this.auth_response.first_name);
                localStorage.setItem('country_of_origin_id', this.auth_response.country_of_origin);
                localStorage.setItem('other_names', this.auth_response.other_names);
                localStorage.setItem('email_address', this.auth_response.email_address);
                localStorage.setItem('userGroupId', this.auth_response.userGroupId);
                localStorage.setItem('account_type_name', this.auth_response.account_type_name);
                localStorage.setItem('account_type_id', this.auth_response.account_type_id);
                localStorage.setItem('user_group_id', this.auth_response.user_group_id);
                localStorage.setItem('userCountryOfOrigin', this.auth_response.countryName);
                localStorage.setItem('userGroupId', this.auth_response.user_group_id);
                localStorage.setItem('usr_loggedin_id', this.auth_response.usr_loggedin_id);
  
                localStorage.setItem('dashboard_link', this.auth_response.dashboard_link);
                localStorage.setItem('dashboard_name', this.auth_response.dashboard_name);
  
                this.isLoggedIn = true;
                this.router.navigate([this.dashboard_link]);
                this.scrollToTop();
                this.authService.isLoggedIn = true;
  
              } else {
                this.toastr.error(this.message, 'Alert!');
              }
              this.spinnerHide();
            }
            else {
              this.spinnerHide();
              this.toastr.error(this.message, 'Alert!');
            }
            this.spinnerHide();
          });
      //this.router.navigate(['/online-services']);
      //this.scrollToTop();
    }
  
    
   
    

    // LOGIN METHOD LOGIC END



// FUNCTIONS TO CALCULTE THE TOTAL COUNTS STARTS HERE

fetchCountryOfOriginwithPartnerState() {
  this.authService.getUserCountryOfOriginCount().subscribe(
    (countryOfOrigin) => {
      this.partnerStatesCount = countryOfOrigin.data.filter(country => country.is_member_state).length;
    },
    (error) => {
      console.error('Error fetching country of origin:', error);
      // Handle error, show message,
    }
  );
}






// FUNCTIONS TO CALCULTE THE TOTAL COUNTS ENDS HERE
  funcReloadCapture(){
    this.funcLoginCapture();

  }
  ngOnInit() {
    this.authService.getUserGroupName().subscribe((userGroupName: string) => {
      this.userGroupName = userGroupName;
    });

    this.authService.getUserFirstName().subscribe((userFirstName: string) => {
      this.userFirstName = userFirstName;
    });

    this.authService.getCountryOfOrigin().subscribe((userCountryOfOrigin: string) => {
      this.userCountryOfOrigin = userCountryOfOrigin;
    });



     // Add this line to check the initial value
  
         this.forgotPasswordFrm = new FormGroup({
          email_address: new FormControl('', Validators.compose([Validators.required]))
        });
  
    this.signInFrm = new FormGroup({
      password: new FormControl('', Validators.compose([Validators.required])),
      email_address: new FormControl('', Validators.compose([Validators.required])),
      sum_input: new FormControl('', Validators.compose([Validators.required]))
    });
    this.funcLoginCapture();

     // functions to get the total counts starts here

     this.fetchCountryOfOriginwithPartnerState();
 
     // functions to get the total counts ends here


    
    this.spinner.hide();
  }
  helloWorld(){
    alert('Welcome')
  }

  funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width/100;
  }
  funcCreateCustomerAccount(){
    this.router.navigate(['/sign-up']);
    this.scrollToTop();
  }//
  funcPublicNavigation(){

  }
  onSignOnKeyPress(event){

    if(event.key === 'Enter'){
     
        this.onSignIn();
    }
    
} handleReset(){

}onEmailValueChange($event){
  this.email_address = $event.value;
}
handleExpire(){
  
}
handleLoad(){
  
}
onFuncRecoverPasswordRequest(){
  
}
handleSuccess($event){
  
}onSignIn1() {
  const formData = new FormData();

  const invalid = [];
  const controls = this.signInFrm.controls;
  for (const name in controls) {
      if (controls[name].invalid) {
        this.toastr.error('Fill In All Mandatory fields with (*), missing value on '+ name.replace('_id',''), 'Alert');
          return;
      }
  }
  if (this.signInFrm.invalid) {
    return;
  }
 
  this.loading = true;
  this.spinner.show();
}
funcLostPassord(){
  this.islostpassword = true;
}

funcRedirectToDashboard(){
    // Handle other status conditions if needed
    this.router.navigate(['./admin-ecres/app-dashboard']);
    this.scrollToTop();
  }
}
