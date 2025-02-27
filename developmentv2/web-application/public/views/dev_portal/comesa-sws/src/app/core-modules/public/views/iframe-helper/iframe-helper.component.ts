import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-iframe-helper',
  templateUrl: './iframe-helper.component.html',
  styleUrl: './iframe-helper.component.css'
})
export class IframeHelperComponent {
  @Input() helpdeskUrl!: string;
  safeUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnChanges() {
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.helpdeskUrl);
  }
}
