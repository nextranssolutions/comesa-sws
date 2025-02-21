import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportexportNavigationComponent } from './importexport-navigation.component';

describe('ImportexportNavigationComponent', () => {
  let component: ImportexportNavigationComponent;
  let fixture: ComponentFixture<ImportexportNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImportexportNavigationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImportexportNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
