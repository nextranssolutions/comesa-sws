import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcredSecretariatsigninComponent } from './ecred-secretariatsignin.component';

describe('EcredSecretariatsigninComponent', () => {
  let component: EcredSecretariatsigninComponent;
  let fixture: ComponentFixture<EcredSecretariatsigninComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EcredSecretariatsigninComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EcredSecretariatsigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
