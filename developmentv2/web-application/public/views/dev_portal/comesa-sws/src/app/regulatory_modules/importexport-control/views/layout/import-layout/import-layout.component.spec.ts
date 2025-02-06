import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportLayoutComponent } from './import-layout.component';

describe('ImportLayoutComponent', () => {
  let component: ImportLayoutComponent;
  let fixture: ComponentFixture<ImportLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImportLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImportLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
