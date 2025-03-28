import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AwaitingpermitReleaseImportComponent } from './awaitingpermit-release-import.component';

describe('AwaitingpermitReleaseImportComponent', () => {
  let component: AwaitingpermitReleaseImportComponent;
  let fixture: ComponentFixture<AwaitingpermitReleaseImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AwaitingpermitReleaseImportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AwaitingpermitReleaseImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
