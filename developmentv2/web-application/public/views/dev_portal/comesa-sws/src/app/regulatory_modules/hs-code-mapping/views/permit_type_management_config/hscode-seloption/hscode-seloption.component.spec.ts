import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HscodeSeloptionComponent } from './hscode-seloption.component';

describe('HscodeSeloptionComponent', () => {
  let component: HscodeSeloptionComponent;
  let fixture: ComponentFixture<HscodeSeloptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HscodeSeloptionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HscodeSeloptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
