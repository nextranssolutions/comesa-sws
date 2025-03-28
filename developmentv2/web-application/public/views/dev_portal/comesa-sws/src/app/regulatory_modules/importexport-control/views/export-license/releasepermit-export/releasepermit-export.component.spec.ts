import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleasepermitExportComponent } from './releasepermit-export.component';

describe('ReleasepermitExportComponent', () => {
  let component: ReleasepermitExportComponent;
  let fixture: ComponentFixture<ReleasepermitExportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReleasepermitExportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReleasepermitExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
