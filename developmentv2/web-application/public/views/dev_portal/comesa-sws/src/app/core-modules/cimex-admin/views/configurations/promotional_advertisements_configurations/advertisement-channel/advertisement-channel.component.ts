import { Component } from '@angular/core';

@Component({
  selector: 'app-advertisement-channel',
  templateUrl: './advertisement-channel.component.html',
  styleUrl: './advertisement-channel.component.css'
})
export class AdvertisementChannelComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'par_advertisement_channel';
    this.parameter_name = "advertisement_channel";
  }
}
