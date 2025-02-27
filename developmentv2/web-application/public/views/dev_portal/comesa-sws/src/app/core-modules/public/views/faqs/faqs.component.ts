import { Component } from '@angular/core';
import { ConfigurationsService } from 'src/app/core-services/configurations/configurations.service';
import { PublicDashboardService } from 'src/app/core-services/public-dashboard/public-dashboard.service';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrl: './faqs.component.css'
})
export class FaqsComponent {
  data_record: any;
  faqData: any;
  constructor(
    public publicservice: PublicDashboardService,
    private configService: ConfigurationsService,
  ) {
    this.onLoadFAQData();
  }

  onLoadFAQData() {
    var data_submit = {
      table_name: 'par_faqs',
      is_enabled: true,
    };
    this.configService.onLoadConfigurationData(data_submit).subscribe(
      (data) => {
        this.data_record = data;
        if (this.data_record.success) {
          // this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
          // this.faqData = this.decryptedPayload;
          this.faqData = this.data_record.data;
        }
      },
      (error) => { }
    );
  }
}
