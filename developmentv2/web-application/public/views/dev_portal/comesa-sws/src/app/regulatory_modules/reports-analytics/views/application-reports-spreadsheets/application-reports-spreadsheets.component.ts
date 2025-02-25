import { Component, HostListener } from '@angular/core';
import { DxTabPanelTypes } from 'devextreme-angular/ui/tab-panel';

@Component({
  selector: 'app-application-reports-spreadsheets',
  templateUrl: './application-reports-spreadsheets.component.html',
  styleUrl: './application-reports-spreadsheets.component.css'
})
export class ApplicationReportsSpreadsheetsComponent {
tabsPositions: DxTabPanelTypes.Position[] = [
    'left', 'top', 'right', 'bottom',
  ];
  tabsPosition: DxTabPanelTypes.Position = this.tabsPositions[0];
  stylingModes: DxTabPanelTypes.TabsStyle[] = ['primary', 'secondary'];
  stylingMode: DxTabPanelTypes.TabsStyle = this.stylingModes[0];
  screenWidth: any;
  constructor(){
      this.checkScreenSize();
    }
    @HostListener('window:resize', ['$event'])
    onResize(event: Event): void{
      this.screenWidth = window.innerWidth;
      this.checkScreenSize();
    }
  
    checkScreenSize(): void{
      if(this.screenWidth < 768){
        this.tabsPosition = 'top';
      }else{
        this.tabsPosition = 'top';
      }
    }
}
