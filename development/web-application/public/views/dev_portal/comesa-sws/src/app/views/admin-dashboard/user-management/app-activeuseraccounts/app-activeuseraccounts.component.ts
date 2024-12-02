import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ShareusermanagementClassComponent } from '../shareusermanagement-class/shareusermanagement-class.component';


@Component({
  selector: 'app-activeuseraccounts',
  templateUrl: './app-activeuseraccounts.component.html',
  styleUrls: ['./app-activeuseraccounts.component.css']
})
export class AppActiveUserAccounts extends ShareusermanagementClassComponent implements OnInit    {
 
  ngOnInit() {
    this.is_eacsecretariat =false;

    this.fetchExpertDetails(0, this.is_eacsecretariat);
  }

  
}
