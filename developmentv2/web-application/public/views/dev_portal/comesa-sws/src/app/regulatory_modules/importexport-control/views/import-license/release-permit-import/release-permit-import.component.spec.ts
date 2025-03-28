import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleasePermitImportComponent } from './release-permit-import.component';

describe('ReleasePermitImportComponent', () => {
  let component: ReleasePermitImportComponent;
  let fixture: ComponentFixture<ReleasePermitImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReleasePermitImportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReleasePermitImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
