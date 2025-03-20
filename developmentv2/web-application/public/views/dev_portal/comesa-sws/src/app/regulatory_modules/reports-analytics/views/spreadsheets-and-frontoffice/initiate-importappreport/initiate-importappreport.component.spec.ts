import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitiateImportappreportComponent } from './initiate-importappreport.component';

describe('InitiateImportappreportComponent', () => {
  let component: InitiateImportappreportComponent;
  let fixture: ComponentFixture<InitiateImportappreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InitiateImportappreportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InitiateImportappreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
