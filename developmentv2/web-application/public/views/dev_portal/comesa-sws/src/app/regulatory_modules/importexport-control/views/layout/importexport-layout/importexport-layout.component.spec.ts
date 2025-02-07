import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportexportLayoutComponent } from './importexport-layout.component';

describe('ImportexportLayoutComponent', () => {
  let component: ImportexportLayoutComponent;
  let fixture: ComponentFixture<ImportexportLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImportexportLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImportexportLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
