import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitiateExportappComponent } from './initiate-exportapp.component';

describe('InitiateExportappComponent', () => {
  let component: InitiateExportappComponent;
  let fixture: ComponentFixture<InitiateExportappComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InitiateExportappComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InitiateExportappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
