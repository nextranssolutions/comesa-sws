import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitiateImportappComponent } from './initiate-importapp.component';

describe('InitiateImportappComponent', () => {
  let component: InitiateImportappComponent;
  let fixture: ComponentFixture<InitiateImportappComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InitiateImportappComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InitiateImportappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
