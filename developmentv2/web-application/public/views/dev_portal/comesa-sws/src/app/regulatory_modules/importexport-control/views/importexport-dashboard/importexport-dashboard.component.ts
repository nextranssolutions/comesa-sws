import { Component } from '@angular/core';

@Component({
  selector: 'app-importexport-dashboard',
  templateUrl: './importexport-dashboard.component.html',
  styleUrl: './importexport-dashboard.component.css'
})
export class ImportexportDashboardComponent {

  funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width / 100;
  }
  funcpopHeight(percentage_height) {
    return window.innerHeight * percentage_height / 100;
  }
}
