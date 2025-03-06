import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DxTabPanelModule } from 'devextreme-angular';

import { DxActionSheetModule, DxTabsModule, DxButtonModule, DxFormModule, DxCheckBoxModule, DxContextMenuModule, DxDataGridModule, DxDateBoxModule, DxFileUploaderModule, DxMenuModule, DxNumberBoxModule, DxPopupModule, DxProgressBarModule, DxRadioGroupModule, DxScrollViewModule, DxSelectBoxModule, DxTagBoxModule, DxTextAreaModule, DxTextBoxModule, DxTreeListModule, DxChartModule, DxGalleryModule } from 'devextreme-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPermissionsModule } from 'ngx-permissions';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

import { CompositeTranslateLoader } from './composite-translate-loader';
import { AppRoutingModule } from './app-routing.module';
import { AuthInterceptor } from './guards/authinterceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DxCheckBoxModule,
    DxFormModule,
    DxTabsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgbModule,
    DxActionSheetModule,
    DxFileUploaderModule,
    DxNumberBoxModule,
    DxCheckBoxModule,
    DxSelectBoxModule,
    DxTextAreaModule,
    DxContextMenuModule,
    DxMenuModule,
    DxTextBoxModule,
    DxTreeListModule,
    DxDataGridModule,
    DxPopupModule,
    DxChartModule,
    DxButtonModule,
    DxDateBoxModule,
    DxRadioGroupModule,
    DxTagBoxModule,
    DxScrollViewModule,
    DxProgressBarModule,
    DxTabPanelModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    NgxPermissionsModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => new CompositeTranslateLoader(http),
        deps: [HttpClient]
      }
    })
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    BrowserAnimationsModule
  ],
  
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }