import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AwaitingpermitReleaseExportComponent } from './awaitingpermit-release-export.component';

describe('AwaitingpermitReleaseExportComponent', () => {
  let component: AwaitingpermitReleaseExportComponent;
  let fixture: ComponentFixture<AwaitingpermitReleaseExportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AwaitingpermitReleaseExportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AwaitingpermitReleaseExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
