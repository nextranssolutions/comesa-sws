import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { WokflowManagementService } from 'src/app/services/workflow-management/wokflow-management.service';
import { TranslateService } from '@ngx-translate/core';
import { EncryptionService } from 'src/app/services/encryption/encryption.service';

// userGroupName

@Component({
  selector: 'app-appmenu',
  templateUrl: './appmenu.component.html',
  styleUrls: ['./appmenu.component.css'],
})
export class AppmenuComponent {
  nav_data: any;
  dashboard_title: string = "Admin Dashboard";
  navigation_type_id: number = 2;
  isLoggedIn: any;
  isDropdownOpen: boolean = false;
  userGroupName: string = '';
  userFirstName: string = '';
  userCountryOfOrigin: string = '';
  appmenuItems: any[] = [];
  response: any;
  loadingVisible: boolean;
  spinnerMessage: string;
  loggedInUserNavigationItems: any[] = [];
  decryptedPayload:any;
  isDrawerOpen: boolean = true; 
  constructor(
    private router: Router,
    private translate: TranslateService,
    public authService: AuthenticationService,
    public toastr: ToastrService,
    private workflow: WokflowManagementService,
    public encryptionService: EncryptionService
  ) { }


  ngOnInit(): void {
    this.getUserNavigationItems();
  }

  toggleSubMenu(menu) {
    menu.open = !menu.open;
  }

  navigationClickEvent(childGroup: any): void {

    let navigation_id = childGroup.id,
      navigation_name = childGroup.name,
      routerlink = childGroup.routerlink,
      user_group_id = childGroup.user_group_id,
      is_super_admin = childGroup.is_super_admin,
      access_level_id = childGroup.user_access_levels_id;
    this.nav_data = {
      navigation_id: navigation_id,
      navigation_name: navigation_name,
      user_group_id: user_group_id,
      is_super_admin: is_super_admin,
      access_level_id: access_level_id
    };
    if (is_super_admin) {
      this.nav_data.access_level_id = 4;
      this.nav_data.is_deleteallowed = true;
      this.nav_data.is_readonly = false;

    } else {
      if (access_level_id == 1 || access_level_id == 3) {
        this.nav_data.is_deleteallowed = false;
        this.nav_data.is_readonly = true;
      }
      else if (access_level_id == 2) {
        this.nav_data.is_deleteallowed = false;
        this.nav_data.is_readonly = false;
      } else {
        this.nav_data.is_deleteallowed = true;
        this.nav_data.is_readonly = false;
      }
    }
    localStorage.setItem('nav_data', JSON.stringify(this.nav_data));

    // this.utilityService.setNavigationData(this.nav_data);
    this.router.navigate(['./admin-cimex/' + routerlink]);
  }


  getTranslation(key: string): string {
    let translation: string = '';
    this.translate.get(key).subscribe((res: string) => {
      translation = res;
    });
    return translation;
  }

  funclogOut() {
    this.authService.funcUserLogOut();
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }


  getUserNavigationItems() {
    this.workflow.getUserNavigationItems(this.navigation_type_id)
      .subscribe(
        data => {
          this.response = data;
          if (this.response.success) {
            this.decryptedPayload=this.encryptionService.OnDecryptData(this.response.navigation_items);
            this.loggedInUserNavigationItems= this.decryptedPayload;
          }
        }
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