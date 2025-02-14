
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ShareusermanagementClassComponent } from '../../shareusermanagement-class/shareusermanagement-class.component';
@Component({
  selector: 'app-system-administrators',
  templateUrl: './system-administrators.component.html',
  styleUrl: './system-administrators.component.css'
})
export class SystemAdministratorsComponent extends ShareusermanagementClassComponent implements OnInit {

  ngOnInit() {
    this.is_super_admin = true;
    this.parameter_name = "system_administrators";
    this.fetchUserDetails(0, 6);
    // this.fetchUserDetails();
  }
}
