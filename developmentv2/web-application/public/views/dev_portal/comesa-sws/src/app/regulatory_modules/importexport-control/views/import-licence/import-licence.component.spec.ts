import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportLicenceComponent } from './import-licence.component';

describe('ImportLicenceComponent', () => {
  let component: ImportLicenceComponent;
  let fixture: ComponentFixture<ImportLicenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImportLicenceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImportLicenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
