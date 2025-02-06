import { Component } from '@angular/core';

@Component({
  selector: 'app-promotionadvert-channels',
  templateUrl: './promotionadvert-channels.component.html',
  styleUrl: './promotionadvert-channels.component.css'
})
export class PromotionadvertChannelsComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'txn_promotion_advertisement_channels';
    this.parameter_name = "promotion_advertisement_channels";
  }
}
